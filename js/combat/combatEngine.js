import {RULES} from '../../data/rules.js';
import {ABILITIES} from '../../data/abilities.js';
import {ITEMS} from '../../data/items.js';
import {uid,clamp} from '../utils.js';
import {combatant,attackCost,expectedDamage,precision,effect,magicDamage,ATTACKS,distance} from './combatBalance.js';
import {legalActions,actionKey} from './combatActions.js';
import {chooseAction} from './combatAI.js';
const buff=(g,key,value,turns=3)=>{g.buffs[key]={value,turns:turns+1};};
const heal=(a,n)=>a.hp=clamp(a.hp+n,0,a.maxHP);
const energize=(a,n)=>a.energy=clamp(a.energy+n,0,a.maxEnergy);
const mana=(a,n)=>a.mana=clamp(a.mana+n,0,a.maxMana);
function hit(a,b,n){let damage=Math.max(0,Math.round(n));if(effect(b,'shield')){const absorbed=Math.min(damage,b.buffs.shield.value);damage-=absorbed;b.buffs.shield.value-=absorbed;if(!b.buffs.shield.value)delete b.buffs.shield;}b.hp=clamp(b.hp-damage,0,b.maxHP);return damage;}
export function createBattle(g,enemy,inventory=[],meta={}){return {id:uid('battle'),fighters:[combatant(g,inventory,2),combatant(enemy,[],8)],turn:0,actor:g.stats.agility>=enemy.stats.agility?0:1,log:[],result:null,meta,startedDay:meta.day||1,lastEvent:null};}
function finish(b,method='KO'){
 const [a,c]=b.fighters;let winner=null;
 if(a.hp<=0||c.hp<=0)winner=a.hp===c.hp?null:a.hp>c.hp?0:1;
 else{const diff=a.hp/a.maxHP-c.hp/c.maxHP;winner=Math.abs(diff)<.04?null:diff>0?0:1;}
 b.result={winner,method,turns:b.turn};a.animation=winner===0?'celebrate':winner===1?'defeat':'rest';c.animation=winner===1?'celebrate':winner===0?'defeat':'rest';
}
export function stepBattle(b,rng=Math.random,forced=null){
 if(b.result)return b.lastEvent;
 const idx=b.actor,a=b.fighters[idx],enemy=b.fighters[1-idx];
 if(a.buffs.burn){hit(enemy,a,a.buffs.burn.value);if(a.hp<=0){finish(b);return null;}}
 const action=forced||chooseAction(a,enemy,rng);
 if(!legalActions(a,enemy).some(x=>actionKey(x)===actionKey(action)))throw new Error('La IA intentó una acción imposible.');
 let text='',damage=0,animation='idle';
 if(ATTACKS[action.type]){
  a.energy-=attackCost(a,action.type);animation='attack';
  if(rng()<precision(a,enemy,action.type)){damage=hit(a,enemy,expectedDamage(a,enemy,action.type)*(.9+rng()*.2));text=`${a.name} realiza un ${ATTACKS[action.type].name}: ${damage} de daño${effect(enemy,'guard')?' tras el bloqueo':''}.`;if(effect(enemy,'guard')&&enemy.ability==='veteran'&&distance(a,enemy)<=2){const counter=hit(enemy,a,3+enemy.stats.defense*.2);text+=` Contraataque: ${counter}.`;}}
  else text=`${enemy.name} esquiva el ${ATTACKS[action.type].name} de ${a.name}.`;
 }else switch(action.type){
  case 'advance':{a.energy-=3;const move=effect(a,'slow')?1:1+Math.floor(a.stats.agility/18);const gap=distance(a,enemy);a.pos+=Math.sign(enemy.pos-a.pos)*Math.min(move,gap-1);text=`${a.name} se aproxima${effect(a,'slow')?' bajo la escarcha':''}.`;animation='walk';break;}
  case 'retreat':a.energy-=3;a.pos=clamp(a.pos+(a.pos<enemy.pos?-1:1)*(effect(a,'slow')?1:2),0,10);text=`${a.name} retrocede para ganar espacio.`;animation='walk';break;
  case 'rest':{const amount=Math.round(12+a.stats.endurance*.6);energize(a,amount);mana(a,2);text=`${a.name} respira y recupera hasta ${amount} de energía.`;animation='rest';break;}
  case 'defend':buff(a,'guard',18,1);energize(a,5);text=`${a.name} adopta una guardia defensiva.`;animation='defend';break;
  case 'maneuver':a.energy-=6;buff(a,'evade',12,2);text=`${a.name} cambia de apoyo y prepara una evasión.`;animation='defend';break;
  case 'taunt':{a.energy-=5;a.cooldowns.taunt=4;const pressure=clamp(4+(a.stats.charisma-enemy.stats.charisma)*.45,2,15);energize(enemy,-pressure);buff(enemy,'blind',5+(enemy.traits.includes('proud')?7:0),1);text=`El público responde a ${a.name}: su rival pierde ${Math.round(pressure)} de energía.`;animation='taunt';break;}
  case 'ability':{
   const ab=ABILITIES[a.ability],mastery=1+Math.min(.35,a.abilityXP/500);a.energy-=ab.energy;a.cooldowns.ability=ab.cooldown+1;animation='cast';
   switch(ab.effect){
    case 'evade':case 'guard':case 'precision':case 'boost':buff(a,ab.effect,ab.power*mastery,3);break;
    case 'blind':buff(enemy,'blind',ab.power*mastery,3);break;
    case 'heal':heal(a,ab.power*mastery+a.stats.vitality*.4);break;
    case 'resolve':heal(a,ab.power*mastery);buff(a,'guard',12,2);break;
    case 'rally':heal(a,ab.power*mastery);energize(a,16);break;
    case 'energy':energize(a,ab.power*mastery);break;
    case 'focus':mana(a,ab.power*mastery);buff(a,'focus',1,3);break;
    case 'siphon':{const n=Math.min(enemy.mana,ab.power*mastery);mana(enemy,-n);mana(a,n);break;}
    case 'strike':damage=hit(a,enemy,(a.weapon.damage+a.stats.attack*.5)*mastery);animation='attack';break;
    case 'taunt':energize(enemy,-(ab.power+a.stats.charisma*.3));buff(enemy,'blind',10,2);break;
   }
   a.abilityXP+=2;text=`${a.name} utiliza ${ab.name}${damage?`: ${damage} de daño`:'. '+ab.description}`;break;
  }
  case 'spell':{
   const sp=ITEMS[action.spell];a.mana-=sp.mana;a.cooldowns[sp.id]=sp.cooldown+1;animation='cast';const power=sp.power+a.stats.magic*.45;
   switch(sp.effect){
    case 'damage':damage=hit(a,enemy,magicDamage(a,enemy,sp));break;
    case 'burn':damage=hit(a,enemy,magicDamage(a,enemy,sp)*.6);buff(enemy,'burn',Math.round(3+a.stats.magic*.12),3);break;
    case 'slow':damage=hit(a,enemy,magicDamage(a,enemy,sp)*.7);buff(enemy,'slow',1,3);break;
    case 'drain':damage=hit(a,enemy,magicDamage(a,enemy,sp));heal(a,damage*.5);break;
    case 'heal':heal(a,power);break;
    case 'energy':energize(a,power);break;
    case 'shield':buff(a,'shield',power,3);break;
    case 'blind':buff(enemy,'blind',sp.power,3);break;
    case 'silence':buff(enemy,'silence',1,2);break;
    case 'blink':a.pos=clamp(a.pos+(a.pos<enemy.pos?-3:3),0,10);buff(a,'evade',12,2);break;
    case 'weaken':energize(enemy,-12);buff(enemy,'weaken',1,3);break;
   }
   text=`${a.name} lanza ${sp.name}${damage?`: ${damage} de daño`:'. '+sp.description}`;break;
  }
 }
 a.energy=clamp(a.energy,0,a.maxEnergy);a.mana=clamp(a.mana,0,a.maxMana);a.hp=clamp(a.hp,0,a.maxHP);
 a.animation=animation;enemy.animation=damage?'hit':'idle';a.lastAction=action.type;a.actionText=text;a.recent.push(action.type);a.recent=a.recent.slice(-8);
 for(const key of Object.keys(a.cooldowns)){a.cooldowns[key]=Math.max(0,a.cooldowns[key]-1);}
 for(const key of Object.keys(a.buffs)){a.buffs[key].turns--;if(a.buffs[key].turns<=0)delete a.buffs[key];}
 b.turn++;const event={turn:b.turn,actor:idx,action:action.type,spell:action.spell||null,text,reason:action.reason||'Acción de prueba',damage,positions:b.fighters.map(f=>f.pos)};b.lastEvent=event;b.log.push(event);b.actor=1-idx;
 if(a.hp<=0||enemy.hp<=0)finish(b);else if(b.turn>=RULES.maxTurns)finish(b,'Decisión de los jueces');
 return event;
}
