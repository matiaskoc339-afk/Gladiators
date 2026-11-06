import {RULES,STATS} from '../data/rules.js';
import {generateMarket} from './gladiators/generator.js';
import {createRivals} from './competitions/rivals.js';
import {uid} from './utils.js';
export function createGame(rng=Math.random){return {version:RULES.saveVersion,id:uid('save'),day:1,gold:RULES.initialGold,prestige:0,housing:1,buildings:Object.fromEntries(Object.keys(STATS).map(k=>[k,1])),gladiators:[],market:generateMarket(rng),inventory:[],rivals:createRivals(rng),history:[{day:1,text:'La Casa de Ceniza abre sus puertas. Cuatro contratos esperan en el mercado.',kind:'world'}],battles:[],completed:[],tournament:null,battle:null,shopDiscount:0,options:{sound:false,reasoning:true,speed:1}};}
export function log(state,text,kind='world'){state.history.unshift({day:state.day,text,kind});state.history=state.history.slice(0,250);}
export const owned=(s,id)=>{const g=s.gladiators.find(g=>g.id===id);if(!g)throw new Error('No se encontró al gladiador.');return g;};
export function mutable(s,id=null){if(s.battle&&!s.battle.result)throw new Error('Termina el combate en curso antes de administrar la casa.');if(id&&s.tournament?.gladiatorId===id)throw new Error('Este gladiador está inscrito en un torneo. Termínalo o retíralo primero.');}
export function spend(s,amount){if(s.gold<amount)throw new Error('No hay suficiente oro.');s.gold-=amount;}
