const w = (id,name,type,damage,range,energy,speed,requirements,price,twoHanded=false,minRange=1,effect='')=>({id,name,category:'weapon',slot:'weapon',type,damage,range,minRange,energy,speed,requirements,price,twoHanded,effect});
export const WEAPONS = [
 w('dagger','Daga del callejón','dagger',7,1,5,1.25,{agility:5},70),
 w('knife','Cuchillo de contrabando','dagger',10,1,6,1.2,{agility:9,attack:6},135),
 w('sword','Espada de hierro','sword',11,1,8,1,{strength:6,attack:5},110),
 w('sabre','Sable del puerto','sword',14,1,8,1.1,{agility:9,attack:8},190),
 w('longsword','Espada larga del vigía','sword',18,2,12,0.85,{strength:12,attack:9},280,true),
 w('veteran','Mandoble del veterano','sword',25,2,16,0.7,{strength:18,attack:13},470,true),
 w('axe','Hacha de leñador','axe',15,1,11,0.8,{strength:9},140),
 w('cleaver','Hacha de la frontera','axe',21,1,14,0.75,{strength:15,attack:8},310),
 w('greataxe','Segadora de basalto','axe',29,2,20,0.65,{strength:23,attack:15},700,true),
 w('mace','Maza de bronce','mace',13,1,10,0.85,{strength:8},125,false,1,'pierce'),
 w('hammer','Martillo de la cantera','mace',23,1,17,0.65,{strength:18,endurance:12},420,true,1,'pierce'),
 w('spear','Lanza de fresno','spear',12,2,9,1,{attack:7},130,true),
 w('pike','Pica de la guardia','spear',19,3,13,0.85,{attack:13,strength:10},340,true),
 w('staff','Bastón de peregrino','staff',8,2,6,1,{magic:5},90,true),
 w('runestaff','Bastón de las mareas','staff',15,2,9,1,{magic:14,attack:7},330,true,1,'focus'),
 w('bow','Arco de cazador','bow',11,5,9,1.1,{agility:8,attack:7},160,true,2),
 w('longbow','Arco largo de tejo','bow',18,6,12,0.95,{agility:15,attack:13},390,true,2),
 w('crossbow','Ballesta del gremio','crossbow',20,5,15,0.75,{attack:13,strength:9},350,true,2),
 w('rapier','Estoque de los espejos','sword',20,1,9,1.2,{agility:18,attack:17},540),
 w('imperial','Hoja del último sol','sword',28,2,17,0.9,{strength:23,attack:22},950,true)
];
const armorNames = {
 head:['Capucha de lino','Casco de cuero','Yelmo de guardia','Yelmo del bastión'],
 chest:['Túnica acolchada','Coraza de cuero','Cota de malla','Coraza de basalto'],
 hands:['Vendas de arena','Guantes de cazador','Guanteletes de hierro','Puños del centinela'],
 feet:['Sandalias de viajero','Botas de explorador','Botas reforzadas','Grebas de piedra'],
 offhand:['Rodela de madera','Broquel de bronce','Escudo de guardia','Escudo torre']
};
export const ARMORS = Object.entries(armorNames).flatMap(([slot,names],s)=>names.map((name,i)=>({id:`${slot}-${i}`,name,category:'armor',slot,protection:[1,2,4,6][i]+(slot==='chest'?i+1:0),weight:[0,1,2,4][i],requirements:i?{strength:4+i*4,defense:3+i*3}:{},price:45+i*95+s*6,type:['light','light','medium','heavy'][i]})));
export const ACCESSORIES = [{id:'charm',name:'Talismán de cobre',category:'armor',slot:'accessory',protection:1,weight:0,requirements:{magic:6},price:140,type:'light',manaBonus:12}, {id:'offdagger',name:'Daga de parada',category:'armor',slot:'offhand',protection:2,weight:1,requirements:{agility:10},price:150,type:'light',attackBonus:2}];
export const SPELLS = [
 ['spark','Proyectil Arcano','damage',8,12,16,5,2,160,'Un impacto mágico preciso.'],
 ['shield','Escudo Arcano','shield',10,14,20,0,4,210,'Absorbe daño durante 3 turnos.'],
 ['illusion','Niebla de Espejos','blind',12,15,18,5,4,250,'Reduce la precisión durante 3 turnos.'],
 ['mend','Luz Reparadora','heal',9,16,25,0,4,200,'Restaura salud sin superar el máximo.'],
 ['frost','Lazo de Escarcha','slow',11,16,15,5,3,260,'Daña y frena el movimiento enemigo.'],
 ['drain','Sed de Luna','drain',15,20,20,4,4,360,'Daña y recupera parte del daño como salud.'],
 ['ember','Brasa Errante','burn',14,18,12,5,4,320,'Deja quemadura mágica por 3 turnos.'],
 ['vigor','Pulso de Vigor','energy',8,12,28,0,4,180,'Transforma maná en energía física.'],
 ['silence','Sello de Silencio','silence',17,22,0,4,5,450,'Impide lanzar conjuros por 2 turnos.'],
 ['blink','Paso Umbrío','blink',13,15,3,0,4,290,'Gana distancia y evasión.'],
 ['weaken','Peso de la Culpa','weaken',16,20,0,5,4,380,'Reduce daño y energía del rival.'],
 ['nova','Estrella Quebrada','damage',22,28,34,4,4,650,'Gran daño a cambio de mucho maná.']
].map(([id,name,effect,magic,mana,power,range,cooldown,price,description])=>({id:`spell-${id}`,name,category:'scroll',slot:'spell',effect,requirements:{magic},mana,power,range,cooldown,price,description}));
export const ITEMS = Object.fromEntries([...WEAPONS,...ARMORS,...ACCESSORIES,...SPELLS].map(i=>[i.id,i]));
export const SLOTS = {weapon:'Arma principal',offhand:'Secundaria / escudo',head:'Cabeza',chest:'Pecho',hands:'Manos',feet:'Pies',accessory:'Accesorio'};
export const UNARMED = w('unarmed','Puños','fist',4,1,5,1,{},0);
export const missingRequirements = (g,item) => Object.entries(item.requirements).filter(([k,v])=>g.stats[k]<v);
