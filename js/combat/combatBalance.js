import {healthMax,energyMax,manaMax} from '../../data/rules.js';
import {ITEMS,UNARMED} from '../../data/items.js';
import {clamp,copy} from '../utils.js';
export const ATTACKS={rapid:{name:'ataque rápido',cost:.7,damage:.72,accuracy:.13},normal:{name:'ataque normal',cost:1,damage:1,accuracy:0},power:{name:'ataque poderoso',cost:1.55,damage:1.55,accuracy:-.16}};
export const distance=(a,b)=>Math.abs(a.pos-b.pos);
export function combatant(g,inventory=[],pos=2){
 const resolve=id=>ITEMS[inventory.find(u=>u.id===id)?.itemId]||ITEMS[id];
 const gear=Object.fromEntries(Object.entries(g.equipment).map(([k,id])=>[k,resolve(id)||null]));
 const protection=Object.values(gear).reduce((n,i)=>n+(i?.protection||0),0),weight=Object.values(gear).reduce((n,i)=>n+(i?.weight||0),0);
 const maxHP=healthMax(g),maxEnergy=energyMax(g),maxMana=manaMax(g)+(gear.accessory?.manaBonus||0);
 return {...copy(g),gear,weapon:gear.weapon||UNARMED,protection,weight,maxHP,maxEnergy,maxMana,hp:Math.max(1,Math.round(maxHP*(g.health??1))),energy:Math.round(maxEnergy*(.65+(g.condition??100)*.0035)),mana:maxMana,pos,buffs:{},cooldowns:{},recent:[],lastAction:'idle',animation:'idle',actionText:'Pronto para combatir'};
}
export const effect=(g,key)=>g.buffs[key]?.value||0;
export function attackCost(g,type){return Math.ceil(g.weapon.energy*ATTACKS[type].cost*(1+g.weight*.025));}
export function precision(a,b,type='normal'){
 return clamp(.73+(a.stats.attack-b.stats.defense)*.012-(b.stats.agility-a.stats.agility)*.006+ATTACKS[type].accuracy+effect(a,'precision')/100-effect(a,'blind')/100-effect(b,'evade')/100-(a.energy<a.maxEnergy*.2?.08:0),.32,.94);
}
export function expectedDamage(a,b,type='normal'){
 const raw=(a.weapon.damage+a.stats.strength*.55+a.stats.agility*.15*a.weapon.speed)*ATTACKS[type].damage*(1+effect(a,'boost'))*(effect(a,'weaken')?.75:1);
 const armor=b.protection*(a.weapon.effect==='pierce'?.45:.8)+b.stats.defense*.24;
 return Math.max(2,raw-armor)*(effect(b,'guard')?.55:1);
}
export const inRange=(a,b)=>distance(a,b)>=a.weapon.minRange&&distance(a,b)<=a.weapon.range;
export function magicDamage(a,b,spell){return Math.max(3,(spell.power+a.stats.magic*.65)*(effect(a,'focus')?1.18:1)-(b.stats.magic*.22+b.stats.endurance*.12));}
