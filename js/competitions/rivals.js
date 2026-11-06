import {generateGladiator} from '../gladiators/generator.js';
import {uid} from '../utils.js';
import {WEAPONS,missingRequirements} from '../../data/items.js';
export function createRivals(rng=Math.random){
 const rivals=Array.from({length:8},(_,i)=>({...generateGladiator({tier:Math.floor(i/2),rng}),organization:['Los Cuervos','Casa del Bronce','La Guardia Azul','Hijos de Sal'][i%4],champion:false}));
 for(const r of rivals){
  if(r.level>1){const types=r.stats.magic>=r.stats.strength&&r.stats.magic>=r.stats.agility?['staff']:r.stats.agility>r.stats.strength?['bow','dagger','sword']:['sword','axe','mace','spear'];const options=WEAPONS.filter(w=>types.includes(w.type)&&!missingRequirements(r,w).length&&w.price<=r.level*130).sort((a,b)=>b.damage-a.damage);r.equipment.weapon=options[0]?.id||null;r.equipment.chest='chest-0';r.equipment.head='head-0';}
  if(r.stats.magic>=8){r.spells=['spell-spark','spell-vigor'];r.activeSpells=[...r.spells];}
 }
 const legends=[['Bruna Rompepiedras','deserter',1,'defensive','veteran','hammer','chest-1'],['Sahir del Espejo','swindler',2,'calculating','illusion','runestaff','chest-1'],['Iria Sol de Hierro','mercenary',3,'aggressive','mercenary','imperial','chest-3']];
 legends.forEach(([name,background,tier,trait,ability,weapon,chest])=>{
 const g=generateGladiator({tier,background,rng});Object.assign(g,{name,champion:true,organization:'Los Inmortales',traits:[trait,'disciplined'],ability,condition:100,tactical:.7+tier*.07});
 if(tier===1)g.stats.strength=18;
 if(tier===2){g.stats.magic=20;g.spells=['spell-spark','spell-illusion','spell-mend'];g.activeSpells=[...g.spells];}
 if(tier===3){g.stats.strength=24;g.stats.attack=24;}
 g.equipment.weapon=weapon;g.equipment.chest=chest;
 g.story=`${name} defiende el estandarte de ${g.organization}. ${g.story}`; rivals.push(g);
 });
 return rivals;
}
export function prepareRival(g){const rival=JSON.parse(JSON.stringify(g));rival.id=uid('enemy');return rival;}
