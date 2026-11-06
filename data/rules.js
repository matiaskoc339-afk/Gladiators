export const STATS = {strength:'Fuerza', agility:'Agilidad', attack:'Ataque', defense:'Defensa', vitality:'Vitalidad', endurance:'Resistencia', magic:'Magia', charisma:'Carisma'};
export const ICONS = {strength:'⚒', agility:'➶', attack:'◎', defense:'⛨', vitality:'✚', endurance:'◈', magic:'✦', charisma:'♜'};
export const BUILDINGS = {strength:'Gimnasio del hierro', agility:'Circuito del viento', attack:'Patio de precisión', defense:'Bastión de guardia', endurance:'Pista de resistencia', vitality:'Jardín de recuperación', magic:'Cámara de las runas', charisma:'Sala de oratoria'};
export const RULES = Object.freeze({initialGold:1500, capacity:[0,3,5,8,12,16], trainingXP:[0,14,21,30,42,56], trainingSlots:[0,1,2,2,3,4], upgradeCost:[0,150,340,650,1100], housingCost:[0,350,700,1250,2000], maxStat:60, maxTurns:180, spellSlots:4, saveVersion:1});
export const statThreshold = value => 28 + value * 5;
export const levelThreshold = level => 60 + level * 40;
export const healthMax = g => 55 + g.stats.vitality * 6;
export const energyMax = g => 35 + g.stats.endurance * 4;
export const manaMax = g => 12 + g.stats.magic * 4;
