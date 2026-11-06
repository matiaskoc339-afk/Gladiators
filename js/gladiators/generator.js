import {BACKGROUNDS} from '../../data/backgrounds.js';
import {TRAITS} from '../../data/personalities.js';
import {STATS} from '../../data/rules.js';
import {int,pick,uid,clamp} from '../utils.js';
const names=['Kael','Mara','Iria','Daren','Nara','Torren','Selka','Ruan','Elian','Bren','Liora','Varek','Sira','Oren','Ada','Valen','Eira','Malric','Nerea','Roderic'];
const surnames=['Varron','Valcor','Cenizal','Thane','del Junco','Voss','Gris','de la Bruma','Roca','Viento Sur','de Sal','del Alba','Manoslargas','de los Pinos'];
const regions=['Costa del Ámbar','Marcas del Norte','Islas de Sal','Valle de Oris','Dunas de Aram','Bosque de Liria'];
export function generateGladiator({tier=0,background=null,rng=Math.random}={}) {
 const bg=background?BACKGROUNDS.find(b=>b.id===background):pick(BACKGROUNDS,rng);
 const stats=Object.fromEntries(Object.keys(STATS).map(k=>[k,clamp(int(3,8,rng)+(bg.bias[k]||0)+tier*3,1,60)]));
 const first=pick(bg.traits,rng); const conflicts={impulsive:['calculating','patient','disciplined'],reckless:['prudent','timid'],aggressive:['defensive'],brave:['timid']};
 const compatible=Object.keys(TRAITS).filter(t=>t!==first&&!(conflicts[first]||[]).includes(t)&&!(conflicts[t]||[]).includes(first));
 const traits=[first,pick(compatible,rng)];
 const potential=0.8+rng()*0.7;
 const estimate=pick(['Desconocido','Normal','Prometedor','Limitado','Excepcional'],rng);
 const condition=int(80,100,rng), experience=int(0,30,rng)+tier*30;
 const price=Math.round((Object.values(stats).reduce((a,b)=>a+b,0)*5+tier*80+(estimate==='Excepcional'?75:0))*(0.85+rng()*.3)*condition/100/5)*5;
 return {id:uid('g'),name:`${pick(names,rng)} ${pick(surnames,rng)}`,age:int(20,49,rng),region:pick(regions,rng),background:bg.id,crime:bg.crime,story:`${pick(bg.stories,rng)} ${pick(['Ahora busca una segunda oportunidad en la arena.','Todavía guarda una carta que nadie ha leído.','Sueña con volver a ver las luces de su hogar.','No habla de la última noche en libertad.'],rng)}`,traits,stats,statXP:Object.fromEntries(Object.keys(STATS).map(k=>[k,0])),level:1+tier,xp:experience,tactical:clamp(.28+tier*.12+rng()*.2,.2,.95),potential,potentialEstimate:estimate,natural:bg.natural,ability:bg.ability,abilityXP:0,price,condition,recovery:0,health:1,training:null,equipment:Object.fromEntries(['weapon','offhand','head','chest','hands','feet','accessory'].map(k=>[k,null])),spells:[],activeSpells:[],tactics:{aggression:50,defense:50,magic:60,conserve:50,distance:40,special:65},record:{wins:0,losses:0,draws:0},prestige:0,appearance:{skin:pick(['#d6a77c','#b57550','#80553d','#edc7a2','#a66e48'],rng),hair:pick(['#332c2a','#795035','#c6a061','#a34e37','#d6d1bd'],rng),style:int(0,3,rng),beard:rng()<.4,tunic:pick(['#617e72','#8b4f3b','#50677e','#967843','#756180'],rng),face:int(0,2,rng)}};
}
export function generateMarket(rng=Math.random,tier=0){return ['thief','deserter','swindler',null].map(background=>generateGladiator({tier,background,rng}));}
