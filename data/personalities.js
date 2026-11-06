// Utility deltas are deliberately small enough that resources and legality dominate.
export const TRAITS = {
 aggressive:{name:'Agresivo', attack:9, power:5, rest:-5, train:1},
 prudent:{name:'Prudente', defend:9, rest:5, rapid:4, power:-5, train:1.04},
 impulsive:{name:'Impulsivo', power:13, defend:-4, noise:5, train:0.97},
 calculating:{name:'Calculador', defend:4, rapid:5, magic:4, intellect:0.2, train:1.05},
 proud:{name:'Orgulloso', attack:5, taunt:10, retreat:-7, train:1},
 opportunist:{name:'Oportunista', rapid:9, punish:10, train:1},
 defensive:{name:'Defensivo', defend:16, power:-4, train:1},
 brave:{name:'Valiente', attack:5, retreat:-5, train:1.02},
 timid:{name:'Cauteloso', retreat:10, defend:5, train:0.98},
 disciplined:{name:'Disciplinado', rest:4, intellect:0.1, train:1.12},
 ambitious:{name:'Ambicioso', power:4, ability:5, train:1.08},
 patient:{name:'Paciente', defend:6, rest:7, power:-3, train:1.06},
 distrustful:{name:'Desconfiado', retreat:5, rapid:4, train:1},
 reckless:{name:'Temerario', power:10, attack:4, rest:-6, train:0.98}
};
export const traitValue = (g, key) => g.traits.reduce((n,t)=>n+(TRAITS[t]?.[key] ?? 0),0);
