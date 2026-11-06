import {RULES,STATS} from '../data/rules.js';
import {ITEMS,UNARMED} from '../data/items.js';
import {ABILITIES} from '../data/abilities.js';
import {TRAITS} from '../data/personalities.js';
import {BACKGROUNDS} from '../data/backgrounds.js';
import {COMPETITIONS} from '../data/competitions.js';
export const SAVE_KEY='casa-ceniza-v1',BACKUP_KEY=SAVE_KEY+'-backup';
const assert=(v)=>{if(!v)throw new Error('La partida está dañada o pertenece a una versión incompatible.');};
const num=(n,min=0,max=1e9)=>Number.isFinite(n)&&n>=min&&n<=max;
const id=x=>typeof x==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(x);
const str=x=>typeof x==='string'&&x.length<5000;
const arr=(x,n=2000)=>Array.isArray(x)&&x.length<=n;
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
function validateGladiator(g){
 assert(obj(g)&&id(g.id)&&str(g.name)&&str(g.story)&&str(g.region)&&str(g.crime)&&num(g.age,18,100));
 assert(BACKGROUNDS.some(b=>b.id===g.background)&&Object.hasOwn(ABILITIES,g.ability)&&arr(g.traits,3)&&g.traits.length&&g.traits.every(t=>Object.hasOwn(TRAITS,t)));
 assert(obj(g.stats)&&obj(g.statXP)&&Object.keys(STATS).every(k=>num(g.stats[k],1,60)&&num(g.statXP[k])));
 assert(Object.hasOwn(STATS,g.natural)&&['Desconocido','Normal','Prometedor','Limitado','Excepcional'].includes(g.potentialEstimate));
 assert(num(g.level,1,10000)&&num(g.xp)&&num(g.potential,.5,2)&&num(g.tactical,0,1)&&num(g.price)&&num(g.abilityXP)&&num(g.prestige));
 assert(num(g.health,0,1)&&num(g.condition,0,100)&&num(g.recovery,0,10)&&(!g.training||STATS[g.training]));
 assert(obj(g.equipment)&&['weapon','offhand','head','chest','hands','feet','accessory'].every(k=>g.equipment[k]===null||str(g.equipment[k])));
 assert(arr(g.spells,20)&&g.spells.every(id=>ITEMS[id]?.category==='scroll')&&new Set(g.spells).size===g.spells.length);
 assert(arr(g.activeSpells,4)&&g.activeSpells.every(id=>g.spells.includes(id))&&new Set(g.activeSpells).size===g.activeSpells.length);
 assert(obj(g.tactics)&&['aggression','defense','magic','conserve','distance','special'].every(k=>num(g.tactics[k],0,100)));
 assert(obj(g.record)&&['wins','losses','draws'].every(k=>num(g.record[k]))&&obj(g.appearance));
 assert(['skin','hair','tunic'].every(k=>/^#[0-9a-f]{6}$/i.test(g.appearance[k]))&&num(g.appearance.style,0,3)&&num(g.appearance.face,0,2));
}
export function validateSave(s){
 assert(obj(s)&&s.version===RULES.saveVersion&&id(s.id)&&Number.isInteger(s.day)&&num(s.day,1)&&num(s.gold)&&num(s.prestige)&&Number.isInteger(s.housing)&&num(s.housing,1,5));
 assert(obj(s.buildings)&&Object.keys(STATS).every(k=>Number.isInteger(s.buildings[k])&&num(s.buildings[k],1,5)));
 assert(arr(s.gladiators,16)&&s.gladiators.length<=RULES.capacity[s.housing]&&arr(s.market,20)&&arr(s.rivals,100)&&s.rivals.length>=3);
 [...s.gladiators,...s.market,...s.rivals].forEach(validateGladiator);
 assert(new Set([...s.gladiators,...s.market,...s.rivals].map(g=>g.id)).size===s.gladiators.length+s.market.length+s.rivals.length);
 assert(arr(s.inventory)&&s.inventory.every(u=>obj(u)&&id(u.id)&&Object.hasOwn(ITEMS,u.itemId))&&new Set(s.inventory.map(u=>u.id)).size===s.inventory.length);
 const equipped=[];for(const g of s.gladiators)for(const [slot,id] of Object.entries(g.equipment)){if(!id)continue;const u=s.inventory.find(u=>u.id===id);assert(u&&ITEMS[u.itemId].slot===slot);equipped.push(id);}
 assert(new Set(equipped).size===equipped.length);
 assert(arr(s.history,250)&&s.history.every(h=>obj(h)&&num(h.day,1)&&str(h.text)&&str(h.kind)));
 assert(arr(s.battles,150)&&s.battles.every(b=>obj(b)&&str(b.id)&&str(b.gladiator)&&str(b.enemy)&&num(b.turns,0,180)&&num(b.gold)&&num(b.xp)));
 assert(arr(s.completed,10000)&&s.completed.every(t=>COMPETITIONS.some(c=>c.id===t.id)&&str(t.gladiator)&&num(t.day,1)));
 assert(obj(s.options)&&typeof s.options.sound==='boolean'&&typeof s.options.reasoning==='boolean'&&[1,2,4].includes(s.options.speed)&&num(s.shopDiscount,0,.5));
 if(s.tournament){const t=s.tournament,c=COMPETITIONS.find(c=>c.id===t.competitionId);assert(c&&id(t.id)&&s.gladiators.some(g=>g.id===t.gladiatorId)&&Number.isInteger(t.round)&&num(t.round,0,c.rounds-1)&&arr(t.opponents,4)&&t.opponents.length===c.rounds&&arr(t.results,4));t.opponents.forEach(validateGladiator);}
 if(s.battle){const b=s.battle;assert(id(b.id)&&arr(b.fighters,2)&&b.fighters.length===2&&num(b.turn,0,180)&&[0,1].includes(b.actor)&&arr(b.log,180)&&obj(b.meta)&&['duel','tournament'].includes(b.meta.type)&&num(b.meta.reward)&&num(b.meta.fame));
  assert(s.gladiators.some(g=>g.id===b.fighters[0].id));
  for(const f of b.fighters){validateGladiator(f);assert(num(f.maxHP,1,10000)&&num(f.hp,0,f.maxHP)&&num(f.maxEnergy,1,10000)&&num(f.energy,0,f.maxEnergy)&&num(f.maxMana,1,10000)&&num(f.mana,0,f.maxMana)&&num(f.pos,0,10)&&obj(f.buffs)&&obj(f.cooldowns)&&obj(f.weapon)&&obj(f.gear)&&num(f.protection,0,1000)&&num(f.weight,0,1000)&&arr(f.recent,8));assert(JSON.stringify(f.weapon)===JSON.stringify(ITEMS[f.weapon.id]||UNARMED)&&Object.values(f.gear).every(i=>i===null||(ITEMS[i.id]&&JSON.stringify(i)===JSON.stringify(ITEMS[i.id]))));assert(Object.values(f.buffs).every(v=>obj(v)&&num(v.value,0,10000)&&num(v.turns,0,20))&&Object.values(f.cooldowns).every(v=>num(v,0,20)));}
  assert(b.log.every(e=>obj(e)&&str(e.text)&&str(e.reason)&&str(e.action)&&num(e.damage,0,10000)&&arr(e.positions,2)&&e.positions.length===2&&e.positions.every(p=>num(p,0,10))&&num(e.turn,1,180)&&[0,1].includes(e.actor)));
  assert(b.lastEvent===null||JSON.stringify(b.lastEvent)===JSON.stringify(b.log.at(-1)));
  if(b.result)assert([null,0,1].includes(b.result.winner)&&['KO','Decisión de los jueces'].includes(b.result.method)&&num(b.result.turns,0,180));
  if(b.settled)assert(b.result&&obj(b.payout)&&num(b.payout.gold)&&num(b.payout.xp)&&num(b.payout.fame)&&num(b.payout.bonus));
 }
 return s;
}
export function saveGame(s,storage=globalThis.localStorage){try{validateSave(s);const json=JSON.stringify(s),old=storage.getItem(SAVE_KEY);if(old){try{validateSave(JSON.parse(old));storage.setItem(BACKUP_KEY,old);}catch{/* Keep a previous valid backup. */}}storage.setItem(SAVE_KEY,json);return {ok:true};}catch(error){return {ok:false,error:`No se pudo guardar: ${error.message} Puedes exportar la partida desde Opciones.`};}}
export function loadGame(storage=globalThis.localStorage){let error=null;try{const raw=storage.getItem(SAVE_KEY);if(!raw)return {state:null,error:null};try{return {state:validateSave(JSON.parse(raw)),error:null};}catch{error='El guardado principal está dañado.';}const backup=storage.getItem(BACKUP_KEY);if(backup)return {state:validateSave(JSON.parse(backup)),error:`${error} Se recuperó la copia anterior.`};return {state:null,error:`${error} Puedes importar una copia o iniciar otra partida.`};}catch{return {state:null,error:'No se pudo leer una partida válida. Revisa el almacenamiento del navegador o importa una copia.'};}}
