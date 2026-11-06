import {statThreshold,levelThreshold,RULES} from '../../data/rules.js';
export function statExperience(g,stat,xp){
 const cap=Math.min(RULES.maxStat,Math.round(30+g.potential*20)); let gains=0;
 if(g.stats[stat]>=cap) return 0;
 g.statXP[stat]+=xp;
 while(g.statXP[stat]>=statThreshold(g.stats[stat])&&g.stats[stat]<cap){g.statXP[stat]-=statThreshold(g.stats[stat]);g.stats[stat]++;gains++;}
 if(g.stats[stat]>=cap)g.statXP[stat]=0;
 return gains;
}
export function combatExperience(g,xp){g.xp+=xp;let levels=0;while(g.xp>=levelThreshold(g.level)){g.xp-=levelThreshold(g.level);g.level++;g.tactical=Math.min(.98,g.tactical+.045);levels++;}return levels;}
