import {TRAITS,traitValue} from '../../data/personalities.js';
import {BACKGROUNDS} from '../../data/backgrounds.js';
import {ITEMS} from '../../data/items.js';
import {ABILITIES} from '../../data/abilities.js';
import {legalActions} from './combatActions.js';
import {precision,expectedDamage,attackCost,distance,inRange,magicDamage,effect} from './combatBalance.js';
export function evaluateActions(a,b,rng=Math.random){
 const hp=a.hp/a.maxHP,en=a.energy/a.maxEnergy,dist=distance(a,b),t=a.tactics;
 const bg=BACKGROUNDS.find(x=>x.id===a.background)?.tactics||{};
 const intellect=Math.min(1,a.tactical+traitValue(a,'intellect'));
 const history=b.recent.slice(-4),powerMemory=history.filter(x=>x==='power').length;
 const repeats=type=>a.recent.slice(-2).filter(x=>x===type).length;
 const offense=(t.aggression-50)*.12;
 const preference=key=>traitValue(a,key)+(bg[key]||0);
 return legalActions(a,b).map(action=>{
  let score=0,reason='',factor=0;
  switch(action.type){
   case 'rapid':case 'normal':case 'power':{
    const type=action.type,chance=precision(a,b,type),damage=expectedDamage(a,b,type),cost=attackCost(a,type);
    factor=preference('attack')+preference(type)+offense;
    score=10+damage*chance*1.1-cost*(.22+t.conserve*.003)+factor;
    if(damage>=b.hp)score+=25*chance*(.6+intellect);
    if(b.energy<b.maxEnergy*.25)score+=5+preference('punish');
    if(en<.25)score-=8+t.conserve*.08;
    if(effect(b,'guard'))score-=5*intellect;
    reason=`${Math.round(chance*100)} % de precisión, ${Math.round(damage)} de daño estimado y ${cost} de energía${b.energy<b.maxEnergy*.25?'; rival agotado':''}`;
    break;
   }
   case 'rest':factor=preference('rest');score=3+(1-en)*39+(en<.25?25:0)+t.conserve*.06+factor-(inRange(b,a)?7:0);reason=`energía al ${Math.round(en*100)} %; conservación ${t.conserve}/100`;break;
   case 'defend':factor=preference('defend');score=5+(1-hp)*10+(1-en)*10+(inRange(b,a)?7:0)+t.defense*.1+powerMemory*5*intellect+factor-repeats('defend')*22;reason=`prioridad defensiva ${t.defense}/100${powerMemory?`; observó ${powerMemory} ataques poderosos recientes`:''}; salud ${Math.round(hp*100)} %`;break;
   case 'advance':score=dist>a.weapon.range?35:1;if(dist>a.weapon.range&&b.activeSpells.length)score+=6*intellect;if(dist<a.weapon.minRange)score=-15;score+=offense-(t.distance-50)*.1;score-=repeats('advance')*2;reason=`distancia ${dist}; alcance útil ${a.weapon.minRange}–${a.weapon.range}${b.activeSpells.length?'; necesita cerrar espacio ante un conjurador':''}`;break;
   case 'retreat':factor=preference('retreat');score=dist<a.weapon.minRange?43:0;score+=(en<.3?14:0)+(hp<.3?7:0)+(a.weapon.range>2&&dist<3?15:0)+(t.distance-50)*.15+factor;score-=repeats('retreat')*14;reason=`distancia ${dist}; alcance mínimo ${a.weapon.minRange}; energía ${Math.round(en*100)} %`;break;
   case 'ability':{
    const ab=ABILITIES[a.ability];factor=preference('ability');score=11+t.special*.18+factor;
    if(['heal','resolve','rally'].includes(ab.effect))score+=(1-hp)*30;
    if(ab.effect==='energy')score+=(1-en)*30;
    if(ab.effect==='focus')score+=a.activeSpells.length?15:-25;
    if(ab.effect==='siphon')score+=a.activeSpells.length?8:-20;
    if(ab.effect==='strike')score+=b.energy<b.maxEnergy*.3?18:3;
    if(['guard','evade','precision','boost'].includes(ab.effect))score-=effect(a,ab.effect)?40:0;
    reason=`${ab.name} disponible; preferencia especial ${t.special}/100`;break;
   }
   case 'spell':{
    const sp=ITEMS[action.spell];factor=preference('magic');score=7+t.magic*.16+factor-sp.mana*.14;
    if(['damage','burn','slow','drain'].includes(sp.effect)){const dmg=magicDamage(a,b,sp);score+=dmg*.8;if(dmg>=b.hp)score+=23;if(sp.effect==='drain')score+=(1-hp)*12;}
    if(sp.effect==='heal')score+=Math.min(a.maxHP-a.hp,sp.power+a.stats.magic*.5)*.9;
    if(sp.effect==='energy')score+=(1-en)*37;
    if(sp.effect==='shield')score+=(inRange(b,a)?9:0)+(1-hp)*12;
    if(sp.effect==='blind')score+=inRange(b,a)?11:4;
    if(sp.effect==='silence')score+=b.recent.includes('spell')?22:8;
    if(sp.effect==='blink')score+=(1-en)*10+(dist<a.weapon.minRange?15:0);
    if(sp.effect==='weaken')score+=b.stats.strength*.5;
    reason=`${sp.name}: ${sp.mana} de maná; ${sp.description.toLowerCase()}`;break;
   }
   case 'taunt':factor=preference('taunt');score=2+a.stats.charisma*.65-b.stats.charisma*.2+factor+(b.traits.includes('proud')?8:0)-repeats('taunt')*25;reason=`carisma ${a.stats.charisma} frente a ${b.stats.charisma}${b.traits.includes('proud')?'; rival orgulloso':''}`;break;
   case 'maneuver':score=7+a.stats.agility*.35+(1-hp)*9+preference('rapid')-repeats('maneuver')*20;reason=`agilidad ${a.stats.agility}; maniobra evasiva disponible`;break;
  }
  const noise=(rng()-.5)*(2+(1-intellect)*10+traitValue(a,'noise'));
  score+=noise;
  const traits=a.traits.map(x=>TRAITS[x].name).join(', ');
  return {...action,score,reason:`${reason}. ${traits}${factor?`: modificador de estilo ${factor>0?'+':''}${factor}`:''}. Evaluación ${score.toFixed(1)}.`};
 }).sort((x,y)=>y.score-x.score);
}
export const chooseAction=(a,b,rng=Math.random)=>evaluateActions(a,b,rng)[0];
