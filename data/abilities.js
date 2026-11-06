export const ABILITIES = Object.fromEntries([
 ['slip','Paso Escurridizo','Aumenta la evasión durante 3 turnos propios.','evade',18,9,5],
 ['veteran','Guardia Veterana','Refuerza el bloqueo y permite contraatacar durante 3 turnos.','guard',18,10,5],
 ['illusion','Ilusión Engañosa','Reduce la precisión enemiga durante 3 turnos.','blind',17,10,5],
 ['resolve','Voluntad Inquebrantable','A poca salud recupera vida y refuerza la guardia.','resolve',16,8,6],
 ['mercenary','Instinto Mercenario','Aumenta el daño de los siguientes 3 turnos.','boost',0.3,10,5],
 ['secondwind','Segundo Aliento','Recupera energía para volver a la ofensiva.','energy',30,0,6],
 ['feint','Finta del Zorro','Un golpe preciso que ignora parte de la armadura.','strike',12,9,4],
 ['shout','Voz de Hierro','La presión del público agota y desconcentra al rival.','taunt',15,8,5],
 ['focus','Concentración Arcana','Recupera maná y potencia el siguiente conjuro.','focus',24,10,6],
 ['siphon','Sello del Vacío','Absorbe maná del adversario.','siphon',20,8,5],
 ['precision','Ojo del Halcón','Aumenta la precisión durante 3 turnos.','precision',18,8,5],
 ['rally','Coraje Rebelde','Recupera salud y energía cuando queda menos de media vida.','rally',18,8,6],
 ['mend','Manos de Luz','Recupera salud con una técnica de respiración.','heal',20,12,6]
].map(([id,name,description,effect,power,energy,cooldown])=>[id,{id,name,description,effect,power,energy,cooldown}]));
