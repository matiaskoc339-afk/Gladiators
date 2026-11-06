import {RULES,STATS} from '../../data/rules.js';
import {TRAITS} from '../../data/personalities.js';
import {owned,mutable,spend,log} from '../gameState.js';
import {statExperience,combatExperience} from '../gladiators/progression.js';
import {generateGladiator} from '../gladiators/generator.js';
import {clamp,pick} from '../utils.js';
export function assignTraining(s,gid,stat){mutable(s,gid);const g=owned(s,gid);if(stat&&!STATS[stat])throw new Error('Entrenamiento desconocido.');if(stat&&s.gladiators.filter(x=>x.id!==gid&&x.training===stat).length>=RULES.trainingSlots[s.buildings[stat]])throw new Error('Esta instalación está llena. Mejórala o libera un puesto.');g.training=stat||null;}
export function upgrade(s,key){mutable(s);if(key==='housing'){if(s.housing>=5)throw new Error('Alojamiento al máximo.');spend(s,RULES.housingCost[s.housing]);s.housing++;log(s,`Alojamiento ampliado: ${RULES.capacity[s.housing]} plazas.`,'building');return;}if(!STATS[key])throw new Error('Instalación desconocida.');if(s.buildings[key]>=5)throw new Error('Instalación al máximo.');spend(s,RULES.upgradeCost[s.buildings[key]]);s.buildings[key]++;log(s,`${STATS[key]}: instalación de nivel ${s.buildings[key]}.`,'building');}
export function recover(s,gid){mutable(s,gid);const g=owned(s,gid);if(g.condition===100&&!g.recovery&&g.health===1)throw new Error('Ya está completamente recuperado.');spend(s,35);g.condition=100;g.health=1;g.recovery=0;log(s,`${g.name} recibe cuidados por 35 de oro.`,'recovery');}
export function trainingGain(g,stat,level,rng=Math.random){const personality=g.traits.reduce((n,t)=>n*(TRAITS[t].train||1),1);return Math.max(1,Math.round(RULES.trainingXP[level]*g.potential*personality*(g.natural===stat?1.15:1)*(g.condition/100)*(g.recovery?.5:1)*(.94+rng()*.12)));}
export function advanceDay(s,rng=Math.random){mutable(s);s.day++;const summary=[];
 for(const g of s.gladiators){
  if(s.tournament?.gladiatorId===g.id)continue;
  if(g.training){const xp=trainingGain(g,g.training,s.buildings[g.training],rng);const gains=statExperience(g,g.training,xp);const text=`${g.name}: +${xp} XP de ${STATS[g.training]}${gains?` · sube a ${g.stats[g.training]}`:''}.`;summary.push(text);log(s,text,'training');}
  g.recovery=Math.max(0,g.recovery-1);g.condition=clamp(g.condition+10+s.buildings.vitality*2,0,100);g.health=clamp(g.health+.16+g.stats.vitality*.006+s.buildings.vitality*.03,0,1);
 }
 const upkeep=Math.min(s.gold,s.gladiators.length*2);s.gold-=upkeep;if(upkeep)log(s,`Manutención de la casa: −${upkeep} de oro.`,'economy');
 s.shopDiscount=0;
 if(s.day%3===0){const tier=Math.min(3,Math.floor(s.prestige/25));s.market=s.market.slice(1);while(s.market.length<4)s.market.push(generateGladiator({tier,rng}));log(s,'Llegan nuevos contratos al Mercado de Condenados.','market');}
 if(s.day%5===0){s.shopDiscount=.15;log(s,'Feria del gremio: todas las tiendas ofrecen un 15 % de descuento durante esta jornada.','shop');}
 if(s.day%7===0){const r=pick(s.rivals.filter(r=>!r.champion),rng);const stat=pick(Object.keys(STATS),rng);r.stats[stat]=Math.min(40,r.stats[stat]+1);combatExperience(r,25);r.prestige++;r.record.wins++;log(s,`${r.name}, de ${r.organization}, gana una exhibición y mejora ${STATS[stat]}.`,'rival');}
 if(s.gold<80){s.gold+=12;log(s,'Un patrocinador local aporta 12 de oro para mantener abierta la casa.','economy');}
 return summary;
}
