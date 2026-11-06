import {ABILITIES} from '../../data/abilities.js';
import {ITEMS,missingRequirements} from '../../data/items.js';
import {attackCost,inRange,distance} from './combatBalance.js';
export function legalActions(a,b){
 const actions=[{type:'rest'},{type:'defend'}];
 if(distance(a,b)>1&&a.energy>=3)actions.push({type:'advance'});
 const retreatPos=a.pos+(a.pos<b.pos?-1:1);
 if(retreatPos>=0&&retreatPos<=10&&a.energy>=3)actions.push({type:'retreat'});
 if(inRange(a,b))for(const type of ['rapid','normal','power'])if(a.energy>=attackCost(a,type))actions.push({type});
 const ability=ABILITIES[a.ability];
 if(ability&&a.energy>=ability.energy&&!a.cooldowns.ability){
  let valid=true;
  if(ability.effect==='strike')valid=inRange(a,b);
  if(['resolve','rally'].includes(ability.effect))valid=a.hp<a.maxHP*.5;
  if(ability.effect==='heal')valid=a.hp<a.maxHP*.75;
  if(ability.effect==='energy')valid=a.energy<a.maxEnergy*.65;
  if(ability.effect==='focus')valid=a.mana<a.maxMana*.65;
  if(ability.effect==='siphon')valid=b.mana>8&&a.mana<a.maxMana*.8;
  if(valid)actions.push({type:'ability'});
 }
 if(!a.buffs.silence)for(const id of a.activeSpells){
  const spell=ITEMS[id];if(!spell||missingRequirements(a,spell).length||a.mana<spell.mana||a.cooldowns[id])continue;
  if(spell.range&&distance(a,b)>spell.range)continue;
  if(spell.effect==='heal'&&a.hp>=a.maxHP*.85)continue;
  if(spell.effect==='energy'&&a.energy>=a.maxEnergy*.75)continue;
  if(spell.effect==='blink'&&(distance(a,b)>3||a.pos===0||a.pos===10))continue;
  if(['blind','slow','silence','weaken','burn'].includes(spell.effect)&&b.buffs[spell.effect])continue;
  if(spell.effect==='shield'&&a.buffs.shield)continue;
  if(spell.effect==='silence'&&!b.activeSpells.length)continue;
  actions.push({type:'spell',spell:id});
 }
 if(a.energy>=5&&!a.cooldowns.taunt)actions.push({type:'taunt'});
 if(a.stats.agility>=10&&a.energy>=6&&!a.buffs.evade)actions.push({type:'maneuver'});
 return actions;
}
export const actionKey=a=>a.type+(a.spell?`:${a.spell}`:'');
