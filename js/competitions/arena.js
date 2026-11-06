import {COMPETITIONS} from '../../data/competitions.js';
import {RULES} from '../../data/rules.js';
import {owned,mutable,spend,log} from '../gameState.js';
import {createBattle} from '../combat/combatEngine.js';
import {combatExperience} from '../gladiators/progression.js';
import {copy,uid,clamp} from '../utils.js';
export function eligible(s,g){if(g.recovery>0||g.condition<60||g.health<.65)throw new Error('Necesita descansar: avanza días o solicita cuidados en la base.');}
export function startDuel(s,gid,rid){mutable(s,gid);const g=owned(s,gid);eligible(s,g);const r=s.rivals.find(x=>x.id===rid);if(!r)throw new Error('Rival desconocido.');if(r.champion)throw new Error('Los campeones solo participan en torneos.');const tier=Math.max(0,r.level-1);if(tier>Math.floor(s.prestige/12))throw new Error(`Este circuito requiere ${tier*12} de prestigio.`);s.battle=createBattle(g,r,s.inventory,{type:'duel',reward:85+tier*55,fame:2+tier,day:s.day,rivalId:r.id});return s.battle;}
export function enterTournament(s,gid,id,rng=Math.random){mutable(s,gid);if(s.tournament)throw new Error('Ya hay un torneo en curso.');const t=COMPETITIONS.find(x=>x.id===id);if(!t)throw new Error('Torneo desconocido.');const g=owned(s,gid);eligible(s,g);if(s.prestige<t.prestige||g.level<t.level)throw new Error(`Requiere prestigio ${t.prestige} y gladiador de nivel ${t.level}.`);spend(s,t.entry);
 const pool=s.rivals.filter(r=>!r.champion&&r.level<=t.tier+1);const opponents=[];
 for(let i=0;i<t.rounds-1;i++){const candidate=pool[Math.floor(rng()*pool.length)];const r=copy(candidate);r.id=uid('entrant');opponents.push(r);}
 opponents.push(copy(s.rivals.filter(r=>r.champion)[t.champion]));
 s.tournament={id:uid('tour'),competitionId:id,gladiatorId:gid,round:0,opponents,status:'active',results:[]};log(s,`${g.name} se inscribe en ${t.name}.`,'tournament');nextRound(s);}
export function nextRound(s){if(s.battle&&!s.battle.result)throw new Error('Hay un combate en curso.');const tour=s.tournament;if(!tour)throw new Error('No hay torneo activo.');const t=COMPETITIONS.find(t=>t.id===tour.competitionId),g=owned(s,tour.gladiatorId);s.battle=createBattle(g,tour.opponents[tour.round],s.inventory,{type:'tournament',tournamentId:tour.id,arena:t.arena,reward:45+t.tier*15,fame:1,day:s.day});return s.battle;}
export function abandonTournament(s){if(s.battle&&!s.battle.result)throw new Error('Primero termina el combate.');if(!s.tournament)throw new Error('No hay torneo activo.');log(s,'La casa se retira del torneo. La inscripción no se devuelve.','tournament');s.tournament=null;}
export function settleBattle(s){const b=s.battle;if(!b?.result)throw new Error('El combate no ha terminado.');if(b.settled)return b.payout;const g=owned(s,b.fighters[0].id);const won=b.result.winner===0,draw=b.result.winner===null;
 const gold=won?b.meta.reward:draw?28:18,xp=won?65:35,fame=won?b.meta.fame:0;
 s.gold+=gold;s.prestige+=fame;g.prestige+=fame;g.record[won?'wins':draw?'draws':'losses']++;const levels=combatExperience(g,xp);
 g.condition=clamp(g.condition-(won?15:28),35,100);g.health=clamp(b.fighters[0].hp/b.fighters[0].maxHP,.12,1);g.recovery=won?1:2;g.abilityXP=b.fighters[0].abilityXP;g.training=null;
 const r=s.rivals.find(r=>r.id===b.meta.rivalId);if(r){r.record[won?'losses':draw?'draws':'wins']++;r.xp+=15;if(!won)r.prestige++;}
 const record={id:b.id,day:s.day,gladiator:g.name,gladiatorId:g.id,enemy:b.fighters[1].name,won,draw,turns:b.turn,gold,xp,fame,method:b.result.method};s.battles.unshift(record);s.battles=s.battles.slice(0,150);
 const payout={gold,xp,fame,levels,bonus:0,title:null};
 if(b.meta.type==='tournament'&&s.tournament?.id===b.meta.tournamentId){const tour=s.tournament,t=COMPETITIONS.find(t=>t.id===tour.competitionId);tour.results.push({round:tour.round,won,enemy:b.fighters[1].name});if(won){tour.round++;if(tour.round===t.rounds){s.gold+=t.reward;s.prestige+=t.fame;g.prestige+=t.fame;payout.bonus=t.reward;payout.fame+=t.fame;payout.title=t.name;s.completed.push({id:t.id,day:s.day,gladiator:g.name});log(s,`${g.name} conquista ${t.name}: +${t.reward} de oro y +${t.fame} de prestigio.`,'tournament');s.tournament=null;}else{g.health=clamp(g.health+.38,.4,1);g.condition=clamp(g.condition+15,0,100);g.recovery=0;}}else{s.tournament=null;log(s,`${g.name} queda fuera del torneo tras la ronda ${tour.round+1}.`,'tournament');}}
 b.settled=true;b.payout=payout;log(s,`${g.name} ${won?'vence a':draw?'empata con':'pierde ante'} ${record.enemy}. +${gold} de oro, +${xp} XP.`,'combat');return payout;
}
