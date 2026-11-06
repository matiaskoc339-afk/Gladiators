/* Archivo generado desde js/main.js. Para actualizarlo: npm ci && npm run build. */
(() => {
  // data/rules.js
  var STATS = { strength: "Fuerza", agility: "Agilidad", attack: "Ataque", defense: "Defensa", vitality: "Vitalidad", endurance: "Resistencia", magic: "Magia", charisma: "Carisma" };
  var BUILDINGS = { strength: "Gimnasio del hierro", agility: "Circuito del viento", attack: "Patio de precisión", defense: "Bastión de guardia", endurance: "Pista de resistencia", vitality: "Jardín de recuperación", magic: "Cámara de las runas", charisma: "Sala de oratoria" };
  var RULES = Object.freeze({ initialGold: 1500, capacity: [0, 3, 5, 8, 12, 16], trainingXP: [0, 14, 21, 30, 42, 56], trainingSlots: [0, 1, 2, 2, 3, 4], upgradeCost: [0, 150, 340, 650, 1100], housingCost: [0, 350, 700, 1250, 2e3], maxStat: 60, maxTurns: 180, spellSlots: 4, saveVersion: 1 });
  var statThreshold = (value) => 28 + value * 5;
  var levelThreshold = (level) => 60 + level * 40;
  var healthMax = (g) => 55 + g.stats.vitality * 6;
  var energyMax = (g) => 35 + g.stats.endurance * 4;
  var manaMax = (g) => 12 + g.stats.magic * 4;

  // data/backgrounds.js
  var BACKGROUNDS = [
    ["thief", "Ladrón", "Robo y allanamiento", { agility: 6, attack: 2 }, ["opportunist", "distrustful", "timid"], "slip", "agility", { rapid: 4, retreat: 3 }, ["Sobrevivió vaciando los bolsillos de los recaudadores.", "Conocía cada tejado y cada salida del barrio viejo."]],
    ["swindler", "Estafador arcano", "Fraude mediante magia", { magic: 7, charisma: 4 }, ["calculating", "proud", "distrustful"], "illusion", "magic", { magic: 5, retreat: 2 }, ["Vendía recuerdos que nunca habían ocurrido.", "Sus ilusiones engañaron a toda una corte hasta el amanecer."]],
    ["deserter", "Desertor", "Deserción militar", { defense: 6, endurance: 4 }, ["disciplined", "proud", "patient"], "veteran", "defense", { defend: 4, rest: 2 }, ["Abandonó la compañía antes de incendiar una aldea.", "Regresó a buscar a sus compañeros y fue acusado de huir."]],
    ["mercenary", "Mercenario", "Incumplimiento de contrato", { strength: 5, attack: 4 }, ["aggressive", "calculating", "ambitious"], "mercenary", "attack", { power: 3, attack: 3 }, ["Protegía caravanas por monedas y nunca por banderas.", "Se negó a cobrar un contrato escrito con sangre ajena."]],
    ["smuggler", "Contrabandista", "Tráfico de reliquias", { agility: 4, endurance: 4 }, ["prudent", "opportunist", "distrustful"], "secondwind", "endurance", { retreat: 4 }, ["Cruzó el paso nevado llevando medicinas prohibidas.", "Ocultaba reliquias entre barriles de arenques."]],
    ["guard", "Antiguo guardia", "Insubordinación", { defense: 5, vitality: 4 }, ["disciplined", "defensive", "patient"], "resolve", "vitality", { defend: 5 }, ["Abrió las puertas de la cárcel durante una inundación.", "Se interpuso entre un magistrado y una familia hambrienta."]],
    ["spy", "Espía", "Espionaje", { agility: 4, attack: 4, charisma: 2 }, ["calculating", "distrustful", "prudent"], "feint", "attack", { rapid: 4 }, ["Su última identidad fue la única que no logró abandonar.", "Aprendió a leer labios desde la otra orilla del río."]],
    ["forger", "Falsificador", "Falsificación de sellos", { charisma: 6, magic: 3 }, ["calculating", "patient", "ambitious"], "shout", "charisma", { taunt: 4 }, ["Copió el sello real para liberar a su hermano.", "Sus mapas inventados terminaron siendo demasiado ciertos."]],
    ["apprentice", "Aprendiz de mago", "Hechicería sin licencia", { magic: 6, attack: 2 }, ["ambitious", "impulsive", "prudent"], "focus", "magic", { magic: 5 }, ["Estudió en una biblioteca que oficialmente no existía.", "Su primer conjuro iluminó el puerto durante tres noches."]],
    ["warlock", "Hechicero clandestino", "Ritos prohibidos", { magic: 8, endurance: 2 }, ["proud", "calculating", "reckless"], "siphon", "magic", { magic: 6 }, ["Investigó las voces que dormían bajo la ciudad.", "Utilizó una runa antigua para detener la peste del ganado."]],
    ["poacher", "Cazador furtivo", "Caza en tierras reales", { agility: 4, attack: 5 }, ["patient", "prudent", "opportunist"], "precision", "agility", { rapid: 4 }, ["Alimentó a su pueblo con los ciervos del duque.", "Podía seguir un rastro incluso sobre la piedra mojada."]],
    ["adventurer", "Aventurero", "Saqueo de ruinas", { strength: 3, vitality: 3, agility: 2 }, ["brave", "reckless", "ambitious"], "mercenary", "strength", { attack: 3 }, ["Regresó de las ruinas con un objeto que no quiso entregar.", "Vio ciudades enterradas que los cronistas niegan."]],
    ["rebel", "Rebelde", "Sedición", { strength: 4, charisma: 4 }, ["brave", "aggressive", "proud"], "rally", "strength", { power: 4, taunt: 2 }, ["Encabezó la marcha de los panaderos contra el impuesto.", "Su canción se convirtió en el himno de una revuelta."]],
    ["healer", "Sanador perseguido", "Práctica de curación prohibida", { magic: 5, vitality: 4 }, ["prudent", "disciplined", "patient"], "mend", "vitality", { defend: 3, magic: 2 }, ["Curó a los dos bandos y ambos lo declararon traidor.", "Repartió una medicina que el gremio reservaba a los nobles."]],
    ["saboteur", "Saboteador", "Sabotaje de arsenales", { attack: 4, agility: 4 }, ["impulsive", "calculating", "opportunist"], "feint", "attack", { rapid: 3, power: 2 }, ["Hizo caer un puente después de evacuar a los vecinos.", "Cambió la pólvora del arsenal por ceniza de cocina."]],
    ["political", "Prisionero político", "Disidencia", { charisma: 6, defense: 3 }, ["patient", "proud", "disciplined"], "shout", "charisma", { taunt: 5, defend: 2 }, ["Publicó el libro que nadie debía leer en voz alta.", "Fue el único voto contrario en el consejo del reino."]],
    ["innocent", "Acusado injustamente", "Testimonio comprado", { vitality: 3, endurance: 3 }, ["brave", "distrustful", "prudent"], "resolve", "endurance", { rest: 2 }, ["Otra persona utilizó su nombre en el juicio.", "El verdadero culpable ocupaba el sillón del juez."]]
  ].map(([id2, name, crime, bias, traits2, ability, natural, tactics, stories]) => ({ id: id2, name, crime, bias, traits: traits2, ability, natural, tactics, stories }));

  // data/personalities.js
  var TRAITS = {
    aggressive: { name: "Agresivo", attack: 9, power: 5, rest: -5, train: 1 },
    prudent: { name: "Prudente", defend: 9, rest: 5, rapid: 4, power: -5, train: 1.04 },
    impulsive: { name: "Impulsivo", power: 13, defend: -4, noise: 5, train: 0.97 },
    calculating: { name: "Calculador", defend: 4, rapid: 5, magic: 4, intellect: 0.2, train: 1.05 },
    proud: { name: "Orgulloso", attack: 5, taunt: 10, retreat: -7, train: 1 },
    opportunist: { name: "Oportunista", rapid: 9, punish: 10, train: 1 },
    defensive: { name: "Defensivo", defend: 16, power: -4, train: 1 },
    brave: { name: "Valiente", attack: 5, retreat: -5, train: 1.02 },
    timid: { name: "Cauteloso", retreat: 10, defend: 5, train: 0.98 },
    disciplined: { name: "Disciplinado", rest: 4, intellect: 0.1, train: 1.12 },
    ambitious: { name: "Ambicioso", power: 4, ability: 5, train: 1.08 },
    patient: { name: "Paciente", defend: 6, rest: 7, power: -3, train: 1.06 },
    distrustful: { name: "Desconfiado", retreat: 5, rapid: 4, train: 1 },
    reckless: { name: "Temerario", power: 10, attack: 4, rest: -6, train: 0.98 }
  };
  var traitValue = (g, key) => g.traits.reduce((n, t) => n + (TRAITS[t]?.[key] ?? 0), 0);

  // js/utils.js
  var serial = 0;
  var uid = (prefix = "id") => `${prefix}-${Date.now().toString(36)}-${(++serial).toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  var clamp = (n, a, b) => Math.min(b, Math.max(a, Number.isFinite(n) ? n : a));
  var int = (a, b, rng2 = Math.random) => Math.floor(rng2() * (b - a + 1)) + a;
  var pick = (list, rng2 = Math.random) => list[int(0, list.length - 1, rng2)];
  var copy = (x) => JSON.parse(JSON.stringify(x));
  var esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var money = (n) => Math.floor(n).toLocaleString("es-ES");

  // js/gladiators/generator.js
  var names = ["Kael", "Mara", "Iria", "Daren", "Nara", "Torren", "Selka", "Ruan", "Elian", "Bren", "Liora", "Varek", "Sira", "Oren", "Ada", "Valen", "Eira", "Malric", "Nerea", "Roderic"];
  var surnames = ["Varron", "Valcor", "Cenizal", "Thane", "del Junco", "Voss", "Gris", "de la Bruma", "Roca", "Viento Sur", "de Sal", "del Alba", "Manoslargas", "de los Pinos"];
  var regions = ["Costa del Ámbar", "Marcas del Norte", "Islas de Sal", "Valle de Oris", "Dunas de Aram", "Bosque de Liria"];
  function generateGladiator({ tier = 0, background = null, rng: rng2 = Math.random } = {}) {
    const bg = background ? BACKGROUNDS.find((b) => b.id === background) : pick(BACKGROUNDS, rng2);
    const stats = Object.fromEntries(Object.keys(STATS).map((k) => [k, clamp(int(3, 8, rng2) + (bg.bias[k] || 0) + tier * 3, 1, 60)]));
    const first = pick(bg.traits, rng2);
    const conflicts = { impulsive: ["calculating", "patient", "disciplined"], reckless: ["prudent", "timid"], aggressive: ["defensive"], brave: ["timid"] };
    const compatible = Object.keys(TRAITS).filter((t) => t !== first && !(conflicts[first] || []).includes(t) && !(conflicts[t] || []).includes(first));
    const traits2 = [first, pick(compatible, rng2)];
    const potential = 0.8 + rng2() * 0.7;
    const estimate = pick(["Desconocido", "Normal", "Prometedor", "Limitado", "Excepcional"], rng2);
    const condition = int(80, 100, rng2), experience = int(0, 30, rng2) + tier * 30;
    const price = Math.round((Object.values(stats).reduce((a, b) => a + b, 0) * 5 + tier * 80 + (estimate === "Excepcional" ? 75 : 0)) * (0.85 + rng2() * 0.3) * condition / 100 / 5) * 5;
    return { id: uid("g"), name: `${pick(names, rng2)} ${pick(surnames, rng2)}`, age: int(20, 49, rng2), region: pick(regions, rng2), background: bg.id, crime: bg.crime, story: `${pick(bg.stories, rng2)} ${pick(["Ahora busca una segunda oportunidad en la arena.", "Todavía guarda una carta que nadie ha leído.", "Sueña con volver a ver las luces de su hogar.", "No habla de la última noche en libertad."], rng2)}`, traits: traits2, stats, statXP: Object.fromEntries(Object.keys(STATS).map((k) => [k, 0])), level: 1 + tier, xp: experience, tactical: clamp(0.28 + tier * 0.12 + rng2() * 0.2, 0.2, 0.95), potential, potentialEstimate: estimate, natural: bg.natural, ability: bg.ability, abilityXP: 0, price, condition, recovery: 0, health: 1, training: null, equipment: Object.fromEntries(["weapon", "offhand", "head", "chest", "hands", "feet", "accessory"].map((k) => [k, null])), spells: [], activeSpells: [], tactics: { aggression: 50, defense: 50, magic: 60, conserve: 50, distance: 40, special: 65 }, record: { wins: 0, losses: 0, draws: 0 }, prestige: 0, appearance: { skin: pick(["#d6a77c", "#b57550", "#80553d", "#edc7a2", "#a66e48"], rng2), hair: pick(["#332c2a", "#795035", "#c6a061", "#a34e37", "#d6d1bd"], rng2), style: int(0, 3, rng2), beard: rng2() < 0.4, tunic: pick(["#617e72", "#8b4f3b", "#50677e", "#967843", "#756180"], rng2), face: int(0, 2, rng2) } };
  }
  function generateMarket(rng2 = Math.random, tier = 0) {
    return ["thief", "deserter", "swindler", null].map((background) => generateGladiator({ tier, background, rng: rng2 }));
  }

  // data/items.js
  var w = (id2, name, type, damage, range, energy, speed, requirements2, price, twoHanded = false, minRange = 1, effect2 = "") => ({ id: id2, name, category: "weapon", slot: "weapon", type, damage, range, minRange, energy, speed, requirements: requirements2, price, twoHanded, effect: effect2 });
  var WEAPONS = [
    w("dagger", "Daga del callejón", "dagger", 7, 1, 5, 1.25, { agility: 5 }, 70),
    w("knife", "Cuchillo de contrabando", "dagger", 10, 1, 6, 1.2, { agility: 9, attack: 6 }, 135),
    w("sword", "Espada de hierro", "sword", 11, 1, 8, 1, { strength: 6, attack: 5 }, 110),
    w("sabre", "Sable del puerto", "sword", 14, 1, 8, 1.1, { agility: 9, attack: 8 }, 190),
    w("longsword", "Espada larga del vigía", "sword", 18, 2, 12, 0.85, { strength: 12, attack: 9 }, 280, true),
    w("veteran", "Mandoble del veterano", "sword", 25, 2, 16, 0.7, { strength: 18, attack: 13 }, 470, true),
    w("axe", "Hacha de leñador", "axe", 15, 1, 11, 0.8, { strength: 9 }, 140),
    w("cleaver", "Hacha de la frontera", "axe", 21, 1, 14, 0.75, { strength: 15, attack: 8 }, 310),
    w("greataxe", "Segadora de basalto", "axe", 29, 2, 20, 0.65, { strength: 23, attack: 15 }, 700, true),
    w("mace", "Maza de bronce", "mace", 13, 1, 10, 0.85, { strength: 8 }, 125, false, 1, "pierce"),
    w("hammer", "Martillo de la cantera", "mace", 23, 1, 17, 0.65, { strength: 18, endurance: 12 }, 420, true, 1, "pierce"),
    w("spear", "Lanza de fresno", "spear", 12, 2, 9, 1, { attack: 7 }, 130, true),
    w("pike", "Pica de la guardia", "spear", 19, 3, 13, 0.85, { attack: 13, strength: 10 }, 340, true),
    w("staff", "Bastón de peregrino", "staff", 8, 2, 6, 1, { magic: 5 }, 90, true),
    w("runestaff", "Bastón de las mareas", "staff", 15, 2, 9, 1, { magic: 14, attack: 7 }, 330, true, 1, "focus"),
    w("bow", "Arco de cazador", "bow", 11, 5, 9, 1.1, { agility: 8, attack: 7 }, 160, true, 2),
    w("longbow", "Arco largo de tejo", "bow", 18, 6, 12, 0.95, { agility: 15, attack: 13 }, 390, true, 2),
    w("crossbow", "Ballesta del gremio", "crossbow", 20, 5, 15, 0.75, { attack: 13, strength: 9 }, 350, true, 2),
    w("rapier", "Estoque de los espejos", "sword", 20, 1, 9, 1.2, { agility: 18, attack: 17 }, 540),
    w("imperial", "Hoja del último sol", "sword", 28, 2, 17, 0.9, { strength: 23, attack: 22 }, 950, true)
  ];
  var armorNames = {
    head: ["Capucha de lino", "Casco de cuero", "Yelmo de guardia", "Yelmo del bastión"],
    chest: ["Túnica acolchada", "Coraza de cuero", "Cota de malla", "Coraza de basalto"],
    hands: ["Vendas de arena", "Guantes de cazador", "Guanteletes de hierro", "Puños del centinela"],
    feet: ["Sandalias de viajero", "Botas de explorador", "Botas reforzadas", "Grebas de piedra"],
    offhand: ["Rodela de madera", "Broquel de bronce", "Escudo de guardia", "Escudo torre"]
  };
  var ARMORS = Object.entries(armorNames).flatMap(([slot, names2], s) => names2.map((name, i) => ({ id: `${slot}-${i}`, name, category: "armor", slot, protection: [1, 2, 4, 6][i] + (slot === "chest" ? i + 1 : 0), weight: [0, 1, 2, 4][i], requirements: i ? { strength: 4 + i * 4, defense: 3 + i * 3 } : {}, price: 45 + i * 95 + s * 6, type: ["light", "light", "medium", "heavy"][i] })));
  var ACCESSORIES = [{ id: "charm", name: "Talismán de cobre", category: "armor", slot: "accessory", protection: 1, weight: 0, requirements: { magic: 6 }, price: 140, type: "light", manaBonus: 12 }, { id: "offdagger", name: "Daga de parada", category: "armor", slot: "offhand", protection: 2, weight: 1, requirements: { agility: 10 }, price: 150, type: "light", attackBonus: 2 }];
  var SPELLS = [
    ["spark", "Proyectil Arcano", "damage", 8, 12, 16, 5, 2, 160, "Un impacto mágico preciso."],
    ["shield", "Escudo Arcano", "shield", 10, 14, 20, 0, 4, 210, "Absorbe daño durante 3 turnos."],
    ["illusion", "Niebla de Espejos", "blind", 12, 15, 18, 5, 4, 250, "Reduce la precisión durante 3 turnos."],
    ["mend", "Luz Reparadora", "heal", 9, 16, 25, 0, 4, 200, "Restaura salud sin superar el máximo."],
    ["frost", "Lazo de Escarcha", "slow", 11, 16, 15, 5, 3, 260, "Daña y frena el movimiento enemigo."],
    ["drain", "Sed de Luna", "drain", 15, 20, 20, 4, 4, 360, "Daña y recupera parte del daño como salud."],
    ["ember", "Brasa Errante", "burn", 14, 18, 12, 5, 4, 320, "Deja quemadura mágica por 3 turnos."],
    ["vigor", "Pulso de Vigor", "energy", 8, 12, 28, 0, 4, 180, "Transforma maná en energía física."],
    ["silence", "Sello de Silencio", "silence", 17, 22, 0, 4, 5, 450, "Impide lanzar conjuros por 2 turnos."],
    ["blink", "Paso Umbrío", "blink", 13, 15, 3, 0, 4, 290, "Gana distancia y evasión."],
    ["weaken", "Peso de la Culpa", "weaken", 16, 20, 0, 5, 4, 380, "Reduce daño y energía del rival."],
    ["nova", "Estrella Quebrada", "damage", 22, 28, 34, 4, 4, 650, "Gran daño a cambio de mucho maná."]
  ].map(([id2, name, effect2, magic, mana2, power, range, cooldown, price, description]) => ({ id: `spell-${id2}`, name, category: "scroll", slot: "spell", effect: effect2, requirements: { magic }, mana: mana2, power, range, cooldown, price, description }));
  var ITEMS = Object.fromEntries([...WEAPONS, ...ARMORS, ...ACCESSORIES, ...SPELLS].map((i) => [i.id, i]));
  var SLOTS = { weapon: "Arma principal", offhand: "Secundaria / escudo", head: "Cabeza", chest: "Pecho", hands: "Manos", feet: "Pies", accessory: "Accesorio" };
  var UNARMED = w("unarmed", "Puños", "fist", 4, 1, 5, 1, {}, 0);
  var missingRequirements = (g, item) => Object.entries(item.requirements).filter(([k, v]) => g.stats[k] < v);

  // js/competitions/rivals.js
  function createRivals(rng2 = Math.random) {
    const rivals = Array.from({ length: 8 }, (_, i) => ({ ...generateGladiator({ tier: Math.floor(i / 2), rng: rng2 }), organization: ["Los Cuervos", "Casa del Bronce", "La Guardia Azul", "Hijos de Sal"][i % 4], champion: false }));
    for (const r of rivals) {
      if (r.level > 1) {
        const types = r.stats.magic >= r.stats.strength && r.stats.magic >= r.stats.agility ? ["staff"] : r.stats.agility > r.stats.strength ? ["bow", "dagger", "sword"] : ["sword", "axe", "mace", "spear"];
        const options = WEAPONS.filter((w2) => types.includes(w2.type) && !missingRequirements(r, w2).length && w2.price <= r.level * 130).sort((a, b) => b.damage - a.damage);
        r.equipment.weapon = options[0]?.id || null;
        r.equipment.chest = "chest-0";
        r.equipment.head = "head-0";
      }
      if (r.stats.magic >= 8) {
        r.spells = ["spell-spark", "spell-vigor"];
        r.activeSpells = [...r.spells];
      }
    }
    const legends = [["Bruna Rompepiedras", "deserter", 1, "defensive", "veteran", "hammer", "chest-1"], ["Sahir del Espejo", "swindler", 2, "calculating", "illusion", "runestaff", "chest-1"], ["Iria Sol de Hierro", "mercenary", 3, "aggressive", "mercenary", "imperial", "chest-3"]];
    legends.forEach(([name, background, tier, trait, ability, weapon, chest]) => {
      const g = generateGladiator({ tier, background, rng: rng2 });
      Object.assign(g, { name, champion: true, organization: "Los Inmortales", traits: [trait, "disciplined"], ability, condition: 100, tactical: 0.7 + tier * 0.07 });
      if (tier === 1) g.stats.strength = 18;
      if (tier === 2) {
        g.stats.magic = 20;
        g.spells = ["spell-spark", "spell-illusion", "spell-mend"];
        g.activeSpells = [...g.spells];
      }
      if (tier === 3) {
        g.stats.strength = 24;
        g.stats.attack = 24;
      }
      g.equipment.weapon = weapon;
      g.equipment.chest = chest;
      g.story = `${name} defiende el estandarte de ${g.organization}. ${g.story}`;
      rivals.push(g);
    });
    return rivals;
  }

  // js/gameState.js
  function createGame(rng2 = Math.random) {
    return { version: RULES.saveVersion, id: uid("save"), day: 1, gold: RULES.initialGold, prestige: 0, housing: 1, buildings: Object.fromEntries(Object.keys(STATS).map((k) => [k, 1])), gladiators: [], market: generateMarket(rng2), inventory: [], rivals: createRivals(rng2), history: [{ day: 1, text: "La Casa de Ceniza abre sus puertas. Cuatro contratos esperan en el mercado.", kind: "world" }], battles: [], completed: [], tournament: null, battle: null, shopDiscount: 0, options: { sound: false, reasoning: true, speed: 1 } };
  }
  function log(state2, text, kind = "world") {
    state2.history.unshift({ day: state2.day, text, kind });
    state2.history = state2.history.slice(0, 250);
  }
  var owned = (s, id2) => {
    const g = s.gladiators.find((g2) => g2.id === id2);
    if (!g) throw new Error("No se encontró al gladiador.");
    return g;
  };
  function mutable(s, id2 = null) {
    if (s.battle && !s.battle.result) throw new Error("Termina el combate en curso antes de administrar la casa.");
    if (id2 && s.tournament?.gladiatorId === id2) throw new Error("Este gladiador está inscrito en un torneo. Termínalo o retíralo primero.");
  }
  function spend(s, amount) {
    if (s.gold < amount) throw new Error("No hay suficiente oro.");
    s.gold -= amount;
  }

  // data/abilities.js
  var ABILITIES = Object.fromEntries([
    ["slip", "Paso Escurridizo", "Aumenta la evasión durante 3 turnos propios.", "evade", 18, 9, 5],
    ["veteran", "Guardia Veterana", "Refuerza el bloqueo y permite contraatacar durante 3 turnos.", "guard", 18, 10, 5],
    ["illusion", "Ilusión Engañosa", "Reduce la precisión enemiga durante 3 turnos.", "blind", 17, 10, 5],
    ["resolve", "Voluntad Inquebrantable", "A poca salud recupera vida y refuerza la guardia.", "resolve", 16, 8, 6],
    ["mercenary", "Instinto Mercenario", "Aumenta el daño de los siguientes 3 turnos.", "boost", 0.3, 10, 5],
    ["secondwind", "Segundo Aliento", "Recupera energía para volver a la ofensiva.", "energy", 30, 0, 6],
    ["feint", "Finta del Zorro", "Un golpe preciso que ignora parte de la armadura.", "strike", 12, 9, 4],
    ["shout", "Voz de Hierro", "La presión del público agota y desconcentra al rival.", "taunt", 15, 8, 5],
    ["focus", "Concentración Arcana", "Recupera maná y potencia el siguiente conjuro.", "focus", 24, 10, 6],
    ["siphon", "Sello del Vacío", "Absorbe maná del adversario.", "siphon", 20, 8, 5],
    ["precision", "Ojo del Halcón", "Aumenta la precisión durante 3 turnos.", "precision", 18, 8, 5],
    ["rally", "Coraje Rebelde", "Recupera salud y energía cuando queda menos de media vida.", "rally", 18, 8, 6],
    ["mend", "Manos de Luz", "Recupera salud con una técnica de respiración.", "heal", 20, 12, 6]
  ].map(([id2, name, description, effect2, power, energy, cooldown]) => [id2, { id: id2, name, description, effect: effect2, power, energy, cooldown }]));

  // data/competitions.js
  var COMPETITIONS = [
    { id: "regional", name: "Copa de las Cenizas", subtitle: "TORNEO REGIONAL", prestige: 0, level: 1, rounds: 2, reward: 280, fame: 8, tier: 1, champion: 0, entry: 25, arena: "regional", description: "Dos rondas para que una casa desconocida se gane un nombre." },
    { id: "stone", name: "Círculo de Piedra", subtitle: "TORNEO MAYOR", prestige: 12, level: 2, rounds: 3, reward: 650, fame: 15, tier: 2, champion: 1, entry: 70, arena: "stone", description: "Las casas del norte exigen precisión, temple y una buena reserva de energía." },
    { id: "champions", name: "Corona de los Tres", subtitle: "TORNEO DE CAMPEONES", prestige: 35, level: 4, rounds: 3, reward: 1200, fame: 25, tier: 3, champion: 2, entry: 140, arena: "imperial", description: "Tres estilos, tres leyendas. Una oportunidad de entrar en la historia." },
    { id: "grand", name: "El Último Sol", subtitle: "GRAN CAMPEONATO", prestige: 70, level: 6, rounds: 4, reward: 2400, fame: 50, tier: 4, champion: 2, entry: 240, arena: "imperial", description: "La casa que se alce aquí ya no volverá a ser olvidada." }
  ];

  // js/saveSystem.js
  var SAVE_KEY = "casa-ceniza-v1";
  var BACKUP_KEY = SAVE_KEY + "-backup";
  var assert = (v) => {
    if (!v) throw new Error("La partida está dañada o pertenece a una versión incompatible.");
  };
  var num = (n, min = 0, max = 1e9) => Number.isFinite(n) && n >= min && n <= max;
  var id = (x) => typeof x === "string" && /^[a-zA-Z0-9_-]{1,100}$/.test(x);
  var str = (x) => typeof x === "string" && x.length < 5e3;
  var arr = (x, n = 2e3) => Array.isArray(x) && x.length <= n;
  var obj = (x) => x && typeof x === "object" && !Array.isArray(x);
  function validateGladiator(g) {
    assert(obj(g) && id(g.id) && str(g.name) && str(g.story) && str(g.region) && str(g.crime) && num(g.age, 18, 100));
    assert(BACKGROUNDS.some((b) => b.id === g.background) && Object.hasOwn(ABILITIES, g.ability) && arr(g.traits, 3) && g.traits.length && g.traits.every((t) => Object.hasOwn(TRAITS, t)));
    assert(obj(g.stats) && obj(g.statXP) && Object.keys(STATS).every((k) => num(g.stats[k], 1, 60) && num(g.statXP[k])));
    assert(Object.hasOwn(STATS, g.natural) && ["Desconocido", "Normal", "Prometedor", "Limitado", "Excepcional"].includes(g.potentialEstimate));
    assert(num(g.level, 1, 1e4) && num(g.xp) && num(g.potential, 0.5, 2) && num(g.tactical, 0, 1) && num(g.price) && num(g.abilityXP) && num(g.prestige));
    assert(num(g.health, 0, 1) && num(g.condition, 0, 100) && num(g.recovery, 0, 10) && (!g.training || STATS[g.training]));
    assert(obj(g.equipment) && ["weapon", "offhand", "head", "chest", "hands", "feet", "accessory"].every((k) => g.equipment[k] === null || str(g.equipment[k])));
    assert(arr(g.spells, 20) && g.spells.every((id2) => ITEMS[id2]?.category === "scroll") && new Set(g.spells).size === g.spells.length);
    assert(arr(g.activeSpells, 4) && g.activeSpells.every((id2) => g.spells.includes(id2)) && new Set(g.activeSpells).size === g.activeSpells.length);
    assert(obj(g.tactics) && ["aggression", "defense", "magic", "conserve", "distance", "special"].every((k) => num(g.tactics[k], 0, 100)));
    assert(obj(g.record) && ["wins", "losses", "draws"].every((k) => num(g.record[k])) && obj(g.appearance));
    assert(["skin", "hair", "tunic"].every((k) => /^#[0-9a-f]{6}$/i.test(g.appearance[k])) && num(g.appearance.style, 0, 3) && num(g.appearance.face, 0, 2));
  }
  function validateSave(s) {
    assert(obj(s) && s.version === RULES.saveVersion && id(s.id) && Number.isInteger(s.day) && num(s.day, 1) && num(s.gold) && num(s.prestige) && Number.isInteger(s.housing) && num(s.housing, 1, 5));
    assert(obj(s.buildings) && Object.keys(STATS).every((k) => Number.isInteger(s.buildings[k]) && num(s.buildings[k], 1, 5)));
    assert(arr(s.gladiators, 16) && s.gladiators.length <= RULES.capacity[s.housing] && arr(s.market, 20) && arr(s.rivals, 100) && s.rivals.length >= 3);
    [...s.gladiators, ...s.market, ...s.rivals].forEach(validateGladiator);
    assert(new Set([...s.gladiators, ...s.market, ...s.rivals].map((g) => g.id)).size === s.gladiators.length + s.market.length + s.rivals.length);
    assert(arr(s.inventory) && s.inventory.every((u) => obj(u) && id(u.id) && Object.hasOwn(ITEMS, u.itemId)) && new Set(s.inventory.map((u) => u.id)).size === s.inventory.length);
    const equipped = [];
    for (const g of s.gladiators) for (const [slot, id2] of Object.entries(g.equipment)) {
      if (!id2) continue;
      const u = s.inventory.find((u2) => u2.id === id2);
      assert(u && ITEMS[u.itemId].slot === slot);
      equipped.push(id2);
    }
    assert(new Set(equipped).size === equipped.length);
    assert(arr(s.history, 250) && s.history.every((h) => obj(h) && num(h.day, 1) && str(h.text) && str(h.kind)));
    assert(arr(s.battles, 150) && s.battles.every((b) => obj(b) && str(b.id) && str(b.gladiator) && str(b.enemy) && num(b.turns, 0, 180) && num(b.gold) && num(b.xp)));
    assert(arr(s.completed, 1e4) && s.completed.every((t) => COMPETITIONS.some((c) => c.id === t.id) && str(t.gladiator) && num(t.day, 1)));
    assert(obj(s.options) && typeof s.options.sound === "boolean" && typeof s.options.reasoning === "boolean" && [1, 2, 4].includes(s.options.speed) && num(s.shopDiscount, 0, 0.5));
    if (s.tournament) {
      const t = s.tournament, c = COMPETITIONS.find((c2) => c2.id === t.competitionId);
      assert(c && id(t.id) && s.gladiators.some((g) => g.id === t.gladiatorId) && Number.isInteger(t.round) && num(t.round, 0, c.rounds - 1) && arr(t.opponents, 4) && t.opponents.length === c.rounds && arr(t.results, 4));
      t.opponents.forEach(validateGladiator);
    }
    if (s.battle) {
      const b = s.battle;
      assert(id(b.id) && arr(b.fighters, 2) && b.fighters.length === 2 && num(b.turn, 0, 180) && [0, 1].includes(b.actor) && arr(b.log, 180) && obj(b.meta) && ["duel", "tournament"].includes(b.meta.type) && num(b.meta.reward) && num(b.meta.fame));
      assert(s.gladiators.some((g) => g.id === b.fighters[0].id));
      for (const f of b.fighters) {
        validateGladiator(f);
        assert(num(f.maxHP, 1, 1e4) && num(f.hp, 0, f.maxHP) && num(f.maxEnergy, 1, 1e4) && num(f.energy, 0, f.maxEnergy) && num(f.maxMana, 1, 1e4) && num(f.mana, 0, f.maxMana) && num(f.pos, 0, 10) && obj(f.buffs) && obj(f.cooldowns) && obj(f.weapon) && obj(f.gear) && num(f.protection, 0, 1e3) && num(f.weight, 0, 1e3) && arr(f.recent, 8));
        assert(JSON.stringify(f.weapon) === JSON.stringify(ITEMS[f.weapon.id] || UNARMED) && Object.values(f.gear).every((i) => i === null || ITEMS[i.id] && JSON.stringify(i) === JSON.stringify(ITEMS[i.id])));
        assert(Object.values(f.buffs).every((v) => obj(v) && num(v.value, 0, 1e4) && num(v.turns, 0, 20)) && Object.values(f.cooldowns).every((v) => num(v, 0, 20)));
      }
      assert(b.log.every((e) => obj(e) && str(e.text) && str(e.reason) && str(e.action) && num(e.damage, 0, 1e4) && arr(e.positions, 2) && e.positions.length === 2 && e.positions.every((p) => num(p, 0, 10)) && num(e.turn, 1, 180) && [0, 1].includes(e.actor)));
      assert(b.lastEvent === null || JSON.stringify(b.lastEvent) === JSON.stringify(b.log.at(-1)));
      if (b.result) assert([null, 0, 1].includes(b.result.winner) && ["KO", "Decisión de los jueces"].includes(b.result.method) && num(b.result.turns, 0, 180));
      if (b.settled) assert(b.result && obj(b.payout) && num(b.payout.gold) && num(b.payout.xp) && num(b.payout.fame) && num(b.payout.bonus));
    }
    return s;
  }
  function saveGame(s, storage) {
    try {
      if (storage === void 0) storage = globalThis.localStorage;
      validateSave(s);
      const json = JSON.stringify(s), old = storage.getItem(SAVE_KEY);
      if (old) {
        try {
          validateSave(JSON.parse(old));
          storage.setItem(BACKUP_KEY, old);
        } catch {
        }
      }
      storage.setItem(SAVE_KEY, json);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: `No se pudo guardar: ${error.message} Puedes exportar la partida desde Opciones.` };
    }
  }
  function loadGame(storage) {
    let error = null;
    try {
      if (storage === void 0) storage = globalThis.localStorage;
      const raw = storage.getItem(SAVE_KEY);
      if (!raw) return { state: null, error: null };
      try {
        return { state: validateSave(JSON.parse(raw)), error: null };
      } catch {
        error = "El guardado principal está dañado.";
      }
      const backup = storage.getItem(BACKUP_KEY);
      if (backup) return { state: validateSave(JSON.parse(backup)), error: `${error} Se recuperó la copia anterior.` };
      return { state: null, error: `${error} Puedes importar una copia o iniciar otra partida.` };
    } catch {
      return { state: null, error: "No se pudo leer una partida válida. Revisa el almacenamiento del navegador o importa una copia." };
    }
  }

  // js/economy/management.js
  function buyGladiator(s, id2) {
    mutable(s);
    const g = s.market.find((g2) => g2.id === id2);
    if (!g) throw new Error("Ese contrato ya no está disponible.");
    if (s.gladiators.length >= RULES.capacity[s.housing]) throw new Error("Alojamiento lleno. Amplía la base antes de adquirir otro contrato.");
    spend(s, g.price);
    s.market = s.market.filter((x) => x.id !== id2);
    s.gladiators.push(g);
    log(s, `${g.name} se incorpora a la casa por ${g.price} de oro.`, "market");
    return g;
  }
  var itemPrice = (s, item) => Math.round(item.price * (1 - s.shopDiscount));
  function buyItem(s, itemId) {
    mutable(s);
    const item = ITEMS[itemId];
    if (!item) throw new Error("Objeto desconocido.");
    spend(s, itemPrice(s, item));
    const unit = { id: uid("item"), itemId };
    s.inventory.push(unit);
    log(s, `Compra: ${item.name}.`, "shop");
    return unit;
  }
  function itemOwner(s, id2) {
    return s.gladiators.find((g) => Object.values(g.equipment).includes(id2));
  }
  function equip(s, gid, unitId) {
    mutable(s, gid);
    const g = owned(s, gid), unit = s.inventory.find((u) => u.id === unitId);
    if (!unit) throw new Error("El objeto no está en el almacén.");
    const item = ITEMS[unit.itemId];
    if (item.category === "scroll") throw new Error("Los pergaminos se aprenden, no se equipan.");
    const owner = itemOwner(s, unitId);
    if (owner && owner.id !== gid) throw new Error(`Lo está usando ${owner.name}. Retíralo primero.`);
    if (missingRequirements(g, item).length) throw new Error("No cumple los requisitos de estadísticas.");
    const currentWeapon = s.inventory.find((u) => u.id === g.equipment.weapon);
    if (item.slot === "offhand" && ITEMS[currentWeapon?.itemId]?.twoHanded) throw new Error("El arma principal requiere ambas manos.");
    if (item.twoHanded) g.equipment.offhand = null;
    g.equipment[item.slot] = unitId;
    log(s, `${g.name} equipa ${item.name}.`, "shop");
  }
  function unequip(s, gid, slot) {
    mutable(s, gid);
    const g = owned(s, gid);
    if (!(slot in g.equipment)) throw new Error("Ranura desconocida.");
    g.equipment[slot] = null;
  }
  function learn(s, gid, unitId) {
    mutable(s, gid);
    const g = owned(s, gid), unit = s.inventory.find((u) => u.id === unitId), item = ITEMS[unit?.itemId];
    if (!item || item.category !== "scroll") throw new Error("Elige un pergamino del inventario.");
    if (g.spells.includes(item.id)) throw new Error("Ya conoce ese hechizo.");
    if (missingRequirements(g, item).length) throw new Error("Debe entrenar Magia para comprender este pergamino.");
    g.spells.push(item.id);
    if (g.activeSpells.length < RULES.spellSlots) g.activeSpells.push(item.id);
    s.inventory = s.inventory.filter((u) => u.id !== unitId);
    log(s, `${g.name} aprende ${item.name}. El pergamino se consume.`, "training");
  }
  function toggleSpell(s, gid, id2) {
    mutable(s, gid);
    const g = owned(s, gid);
    if (!g.spells.includes(id2)) throw new Error("Hechizo desconocido.");
    if (g.activeSpells.includes(id2)) g.activeSpells = g.activeSpells.filter((x) => x !== id2);
    else {
      if (g.activeSpells.length >= RULES.spellSlots) throw new Error("Solo puede preparar cuatro hechizos. Desactiva otro.");
      g.activeSpells.push(id2);
    }
  }
  function sellItem(s, id2) {
    mutable(s);
    const unit = s.inventory.find((u) => u.id === id2);
    if (!unit) throw new Error("Objeto desconocido.");
    if (itemOwner(s, id2)) throw new Error("Retira el objeto antes de venderlo.");
    s.gold += Math.floor(ITEMS[unit.itemId].price * 0.45);
    s.inventory = s.inventory.filter((u) => u.id !== id2);
  }
  function setTactic(s, gid, key, value) {
    mutable(s, gid);
    const g = owned(s, gid);
    if (!(key in g.tactics)) throw new Error("Preferencia desconocida.");
    g.tactics[key] = Math.max(0, Math.min(100, Number(value) || 0));
  }

  // js/gladiators/progression.js
  function statExperience(g, stat, xp) {
    const cap = Math.min(RULES.maxStat, Math.round(30 + g.potential * 20));
    let gains = 0;
    if (g.stats[stat] >= cap) return 0;
    g.statXP[stat] += xp;
    while (g.statXP[stat] >= statThreshold(g.stats[stat]) && g.stats[stat] < cap) {
      g.statXP[stat] -= statThreshold(g.stats[stat]);
      g.stats[stat]++;
      gains++;
    }
    if (g.stats[stat] >= cap) g.statXP[stat] = 0;
    return gains;
  }
  function combatExperience(g, xp) {
    g.xp += xp;
    let levels = 0;
    while (g.xp >= levelThreshold(g.level)) {
      g.xp -= levelThreshold(g.level);
      g.level++;
      g.tactical = Math.min(0.98, g.tactical + 0.045);
      levels++;
    }
    return levels;
  }

  // js/base/training.js
  function assignTraining(s, gid, stat) {
    mutable(s, gid);
    const g = owned(s, gid);
    if (stat && !STATS[stat]) throw new Error("Entrenamiento desconocido.");
    if (stat && s.gladiators.filter((x) => x.id !== gid && x.training === stat).length >= RULES.trainingSlots[s.buildings[stat]]) throw new Error("Esta instalación está llena. Mejórala o libera un puesto.");
    g.training = stat || null;
  }
  function upgrade(s, key) {
    mutable(s);
    if (key === "housing") {
      if (s.housing >= 5) throw new Error("Alojamiento al máximo.");
      spend(s, RULES.housingCost[s.housing]);
      s.housing++;
      log(s, `Alojamiento ampliado: ${RULES.capacity[s.housing]} plazas.`, "building");
      return;
    }
    if (!STATS[key]) throw new Error("Instalación desconocida.");
    if (s.buildings[key] >= 5) throw new Error("Instalación al máximo.");
    spend(s, RULES.upgradeCost[s.buildings[key]]);
    s.buildings[key]++;
    log(s, `${STATS[key]}: instalación de nivel ${s.buildings[key]}.`, "building");
  }
  function recover(s, gid) {
    mutable(s, gid);
    const g = owned(s, gid);
    if (g.condition === 100 && !g.recovery && g.health === 1) throw new Error("Ya está completamente recuperado.");
    spend(s, 35);
    g.condition = 100;
    g.health = 1;
    g.recovery = 0;
    log(s, `${g.name} recibe cuidados por 35 de oro.`, "recovery");
  }
  function trainingGain(g, stat, level, rng2 = Math.random) {
    const personality = g.traits.reduce((n, t) => n * (TRAITS[t].train || 1), 1);
    return Math.max(1, Math.round(RULES.trainingXP[level] * g.potential * personality * (g.natural === stat ? 1.15 : 1) * (g.condition / 100) * (g.recovery ? 0.5 : 1) * (0.94 + rng2() * 0.12)));
  }
  function advanceDay(s, rng2 = Math.random) {
    mutable(s);
    s.day++;
    const summary = [];
    for (const g of s.gladiators) {
      if (s.tournament?.gladiatorId === g.id) continue;
      if (g.training) {
        const xp = trainingGain(g, g.training, s.buildings[g.training], rng2);
        const gains = statExperience(g, g.training, xp);
        const text = `${g.name}: +${xp} XP de ${STATS[g.training]}${gains ? ` · sube a ${g.stats[g.training]}` : ""}.`;
        summary.push(text);
        log(s, text, "training");
      }
      g.recovery = Math.max(0, g.recovery - 1);
      g.condition = clamp(g.condition + 10 + s.buildings.vitality * 2, 0, 100);
      g.health = clamp(g.health + 0.16 + g.stats.vitality * 6e-3 + s.buildings.vitality * 0.03, 0, 1);
    }
    const upkeep = Math.min(s.gold, s.gladiators.length * 2);
    s.gold -= upkeep;
    if (upkeep) log(s, `Manutención de la casa: −${upkeep} de oro.`, "economy");
    s.shopDiscount = 0;
    if (s.day % 3 === 0) {
      const tier = Math.min(3, Math.floor(s.prestige / 25));
      s.market = s.market.slice(1);
      while (s.market.length < 4) s.market.push(generateGladiator({ tier, rng: rng2 }));
      log(s, "Llegan nuevos contratos al Mercado de Condenados.", "market");
    }
    if (s.day % 5 === 0) {
      s.shopDiscount = 0.15;
      log(s, "Feria del gremio: todas las tiendas ofrecen un 15 % de descuento durante esta jornada.", "shop");
    }
    if (s.day % 7 === 0) {
      const r = pick(s.rivals.filter((r2) => !r2.champion), rng2);
      const stat = pick(Object.keys(STATS), rng2);
      r.stats[stat] = Math.min(40, r.stats[stat] + 1);
      combatExperience(r, 25);
      r.prestige++;
      r.record.wins++;
      log(s, `${r.name}, de ${r.organization}, gana una exhibición y mejora ${STATS[stat]}.`, "rival");
    }
    if (s.gold < 80) {
      s.gold += 12;
      log(s, "Un patrocinador local aporta 12 de oro para mantener abierta la casa.", "economy");
    }
    return summary;
  }

  // js/combat/combatBalance.js
  var ATTACKS = { rapid: { name: "ataque rápido", cost: 0.7, damage: 0.72, accuracy: 0.13 }, normal: { name: "ataque normal", cost: 1, damage: 1, accuracy: 0 }, power: { name: "ataque poderoso", cost: 1.55, damage: 1.55, accuracy: -0.16 } };
  var distance = (a, b) => Math.abs(a.pos - b.pos);
  function combatant(g, inventory = [], pos = 2) {
    const resolve = (id2) => ITEMS[inventory.find((u) => u.id === id2)?.itemId] || ITEMS[id2];
    const gear = Object.fromEntries(Object.entries(g.equipment).map(([k, id2]) => [k, resolve(id2) || null]));
    const protection = Object.values(gear).reduce((n, i) => n + (i?.protection || 0), 0), weight = Object.values(gear).reduce((n, i) => n + (i?.weight || 0), 0);
    const maxHP = healthMax(g), maxEnergy = energyMax(g), maxMana = manaMax(g) + (gear.accessory?.manaBonus || 0);
    return { ...copy(g), gear, weapon: gear.weapon || UNARMED, protection, weight, maxHP, maxEnergy, maxMana, hp: Math.max(1, Math.round(maxHP * (g.health ?? 1))), energy: Math.round(maxEnergy * (0.65 + (g.condition ?? 100) * 35e-4)), mana: maxMana, pos, buffs: {}, cooldowns: {}, recent: [], lastAction: "idle", animation: "idle", actionText: "Pronto para combatir" };
  }
  var effect = (g, key) => g.buffs[key]?.value || 0;
  function attackCost(g, type) {
    return Math.ceil(g.weapon.energy * ATTACKS[type].cost * (1 + g.weight * 0.025));
  }
  function precision(a, b, type = "normal") {
    return clamp(0.73 + (a.stats.attack - b.stats.defense) * 0.012 - (b.stats.agility - a.stats.agility) * 6e-3 + ATTACKS[type].accuracy + effect(a, "precision") / 100 - effect(a, "blind") / 100 - effect(b, "evade") / 100 - (a.energy < a.maxEnergy * 0.2 ? 0.08 : 0), 0.32, 0.94);
  }
  function expectedDamage(a, b, type = "normal") {
    const raw = (a.weapon.damage + a.stats.strength * 0.55 + a.stats.agility * 0.15 * a.weapon.speed) * ATTACKS[type].damage * (1 + effect(a, "boost")) * (effect(a, "weaken") ? 0.75 : 1);
    const armor = b.protection * (a.weapon.effect === "pierce" ? 0.45 : 0.8) + b.stats.defense * 0.24;
    return Math.max(2, raw - armor) * (effect(b, "guard") ? 0.55 : 1);
  }
  var inRange = (a, b) => distance(a, b) >= a.weapon.minRange && distance(a, b) <= a.weapon.range;
  function magicDamage(a, b, spell) {
    return Math.max(3, (spell.power + a.stats.magic * 0.65) * (effect(a, "focus") ? 1.18 : 1) - (b.stats.magic * 0.22 + b.stats.endurance * 0.12));
  }

  // js/combat/combatActions.js
  function legalActions(a, b) {
    const actions2 = [{ type: "rest" }, { type: "defend" }];
    if (distance(a, b) > 1 && a.energy >= 3) actions2.push({ type: "advance" });
    const retreatPos = a.pos + (a.pos < b.pos ? -1 : 1);
    if (retreatPos >= 0 && retreatPos <= 10 && a.energy >= 3) actions2.push({ type: "retreat" });
    if (inRange(a, b)) {
      for (const type of ["rapid", "normal", "power"]) if (a.energy >= attackCost(a, type)) actions2.push({ type });
    }
    const ability = ABILITIES[a.ability];
    if (ability && a.energy >= ability.energy && !a.cooldowns.ability) {
      let valid = true;
      if (ability.effect === "strike") valid = inRange(a, b);
      if (["resolve", "rally"].includes(ability.effect)) valid = a.hp < a.maxHP * 0.5;
      if (ability.effect === "heal") valid = a.hp < a.maxHP * 0.75;
      if (ability.effect === "energy") valid = a.energy < a.maxEnergy * 0.65;
      if (ability.effect === "focus") valid = a.mana < a.maxMana * 0.65;
      if (ability.effect === "siphon") valid = b.mana > 8 && a.mana < a.maxMana * 0.8;
      if (valid) actions2.push({ type: "ability" });
    }
    if (!a.buffs.silence) for (const id2 of a.activeSpells) {
      const spell = ITEMS[id2];
      if (!spell || missingRequirements(a, spell).length || a.mana < spell.mana || a.cooldowns[id2]) continue;
      if (spell.range && distance(a, b) > spell.range) continue;
      if (spell.effect === "heal" && a.hp >= a.maxHP * 0.85) continue;
      if (spell.effect === "energy" && a.energy >= a.maxEnergy * 0.75) continue;
      if (spell.effect === "blink" && (distance(a, b) > 3 || a.pos === 0 || a.pos === 10)) continue;
      if (["blind", "slow", "silence", "weaken", "burn"].includes(spell.effect) && b.buffs[spell.effect]) continue;
      if (spell.effect === "shield" && a.buffs.shield) continue;
      if (spell.effect === "silence" && !b.activeSpells.length) continue;
      actions2.push({ type: "spell", spell: id2 });
    }
    if (a.energy >= 5 && !a.cooldowns.taunt) actions2.push({ type: "taunt" });
    if (a.stats.agility >= 10 && a.energy >= 6 && !a.buffs.evade) actions2.push({ type: "maneuver" });
    return actions2;
  }
  var actionKey = (a) => a.type + (a.spell ? `:${a.spell}` : "");

  // js/combat/combatAI.js
  function evaluateActions(a, b, rng2 = Math.random) {
    const hp = a.hp / a.maxHP, en = a.energy / a.maxEnergy, dist = distance(a, b), t = a.tactics;
    const bg = BACKGROUNDS.find((x) => x.id === a.background)?.tactics || {};
    const intellect = Math.min(1, a.tactical + traitValue(a, "intellect"));
    const history = b.recent.slice(-4), powerMemory = history.filter((x) => x === "power").length;
    const repeats = (type) => a.recent.slice(-2).filter((x) => x === type).length;
    const offense = (t.aggression - 50) * 0.12;
    const preference = (key) => traitValue(a, key) + (bg[key] || 0);
    return legalActions(a, b).map((action) => {
      let score = 0, reason = "", factor = 0;
      switch (action.type) {
        case "rapid":
        case "normal":
        case "power": {
          const type = action.type, chance = precision(a, b, type), damage = expectedDamage(a, b, type), cost = attackCost(a, type);
          factor = preference("attack") + preference(type) + offense;
          score = 10 + damage * chance * 1.1 - cost * (0.22 + t.conserve * 3e-3) + factor;
          if (damage >= b.hp) score += 25 * chance * (0.6 + intellect);
          if (b.energy < b.maxEnergy * 0.25) score += 5 + preference("punish");
          if (en < 0.25) score -= 8 + t.conserve * 0.08;
          if (effect(b, "guard")) score -= 5 * intellect;
          reason = `${Math.round(chance * 100)} % de precisión, ${Math.round(damage)} de daño estimado y ${cost} de energía${b.energy < b.maxEnergy * 0.25 ? "; rival agotado" : ""}`;
          break;
        }
        case "rest":
          factor = preference("rest");
          score = 3 + (1 - en) * 39 + (en < 0.25 ? 25 : 0) + t.conserve * 0.06 + factor - (inRange(b, a) ? 7 : 0);
          reason = `energía al ${Math.round(en * 100)} %; conservación ${t.conserve}/100`;
          break;
        case "defend":
          factor = preference("defend");
          score = 5 + (1 - hp) * 10 + (1 - en) * 10 + (inRange(b, a) ? 7 : 0) + t.defense * 0.1 + powerMemory * 5 * intellect + factor - repeats("defend") * 22;
          reason = `prioridad defensiva ${t.defense}/100${powerMemory ? `; observó ${powerMemory} ataques poderosos recientes` : ""}; salud ${Math.round(hp * 100)} %`;
          break;
        case "advance":
          score = dist > a.weapon.range ? 35 : 1;
          if (dist > a.weapon.range && b.activeSpells.length) score += 6 * intellect;
          if (dist < a.weapon.minRange) score = -15;
          score += offense - (t.distance - 50) * 0.1;
          score -= repeats("advance") * 2;
          reason = `distancia ${dist}; alcance útil ${a.weapon.minRange}–${a.weapon.range}${b.activeSpells.length ? "; necesita cerrar espacio ante un conjurador" : ""}`;
          break;
        case "retreat":
          factor = preference("retreat");
          score = dist < a.weapon.minRange ? 43 : 0;
          score += (en < 0.3 ? 14 : 0) + (hp < 0.3 ? 7 : 0) + (a.weapon.range > 2 && dist < 3 ? 15 : 0) + (t.distance - 50) * 0.15 + factor;
          score -= repeats("retreat") * 14;
          reason = `distancia ${dist}; alcance mínimo ${a.weapon.minRange}; energía ${Math.round(en * 100)} %`;
          break;
        case "ability": {
          const ab = ABILITIES[a.ability];
          factor = preference("ability");
          score = 11 + t.special * 0.18 + factor;
          if (["heal", "resolve", "rally"].includes(ab.effect)) score += (1 - hp) * 30;
          if (ab.effect === "energy") score += (1 - en) * 30;
          if (ab.effect === "focus") score += a.activeSpells.length ? 15 : -25;
          if (ab.effect === "siphon") score += a.activeSpells.length ? 8 : -20;
          if (ab.effect === "strike") score += b.energy < b.maxEnergy * 0.3 ? 18 : 3;
          if (["guard", "evade", "precision", "boost"].includes(ab.effect)) score -= effect(a, ab.effect) ? 40 : 0;
          reason = `${ab.name} disponible; preferencia especial ${t.special}/100`;
          break;
        }
        case "spell": {
          const sp = ITEMS[action.spell];
          factor = preference("magic");
          score = 7 + t.magic * 0.16 + factor - sp.mana * 0.14;
          if (["damage", "burn", "slow", "drain"].includes(sp.effect)) {
            const dmg = magicDamage(a, b, sp);
            score += dmg * 0.8;
            if (dmg >= b.hp) score += 23;
            if (sp.effect === "drain") score += (1 - hp) * 12;
          }
          if (sp.effect === "heal") score += Math.min(a.maxHP - a.hp, sp.power + a.stats.magic * 0.5) * 0.9;
          if (sp.effect === "energy") score += (1 - en) * 37;
          if (sp.effect === "shield") score += (inRange(b, a) ? 9 : 0) + (1 - hp) * 12;
          if (sp.effect === "blind") score += inRange(b, a) ? 11 : 4;
          if (sp.effect === "silence") score += b.recent.includes("spell") ? 22 : 8;
          if (sp.effect === "blink") score += (1 - en) * 10 + (dist < a.weapon.minRange ? 15 : 0);
          if (sp.effect === "weaken") score += b.stats.strength * 0.5;
          reason = `${sp.name}: ${sp.mana} de maná; ${sp.description.toLowerCase()}`;
          break;
        }
        case "taunt":
          factor = preference("taunt");
          score = 2 + a.stats.charisma * 0.65 - b.stats.charisma * 0.2 + factor + (b.traits.includes("proud") ? 8 : 0) - repeats("taunt") * 25;
          reason = `carisma ${a.stats.charisma} frente a ${b.stats.charisma}${b.traits.includes("proud") ? "; rival orgulloso" : ""}`;
          break;
        case "maneuver":
          score = 7 + a.stats.agility * 0.35 + (1 - hp) * 9 + preference("rapid") - repeats("maneuver") * 20;
          reason = `agilidad ${a.stats.agility}; maniobra evasiva disponible`;
          break;
      }
      const noise = (rng2() - 0.5) * (2 + (1 - intellect) * 10 + traitValue(a, "noise"));
      score += noise;
      const traits2 = a.traits.map((x) => TRAITS[x].name).join(", ");
      return { ...action, score, reason: `${reason}. ${traits2}${factor ? `: modificador de estilo ${factor > 0 ? "+" : ""}${factor}` : ""}. Evaluación ${score.toFixed(1)}.` };
    }).sort((x, y) => y.score - x.score);
  }
  var chooseAction = (a, b, rng2 = Math.random) => evaluateActions(a, b, rng2)[0];

  // js/combat/combatEngine.js
  var buff = (g, key, value, turns = 3) => {
    g.buffs[key] = { value, turns: turns + 1 };
  };
  var heal = (a, n) => a.hp = clamp(a.hp + n, 0, a.maxHP);
  var energize = (a, n) => a.energy = clamp(a.energy + n, 0, a.maxEnergy);
  var mana = (a, n) => a.mana = clamp(a.mana + n, 0, a.maxMana);
  function hit(a, b, n) {
    let damage = Math.max(0, Math.round(n));
    if (effect(b, "shield")) {
      const absorbed = Math.min(damage, b.buffs.shield.value);
      damage -= absorbed;
      b.buffs.shield.value -= absorbed;
      if (!b.buffs.shield.value) delete b.buffs.shield;
    }
    b.hp = clamp(b.hp - damage, 0, b.maxHP);
    return damage;
  }
  function createBattle(g, enemy, inventory = [], meta = {}) {
    return { id: uid("battle"), fighters: [combatant(g, inventory, 2), combatant(enemy, [], 8)], turn: 0, actor: g.stats.agility >= enemy.stats.agility ? 0 : 1, log: [], result: null, meta, startedDay: meta.day || 1, lastEvent: null };
  }
  function finish(b, method = "KO") {
    const [a, c] = b.fighters;
    let winner = null;
    if (a.hp <= 0 || c.hp <= 0) winner = a.hp === c.hp ? null : a.hp > c.hp ? 0 : 1;
    else {
      const diff = a.hp / a.maxHP - c.hp / c.maxHP;
      winner = Math.abs(diff) < 0.04 ? null : diff > 0 ? 0 : 1;
    }
    b.result = { winner, method, turns: b.turn };
    a.animation = winner === 0 ? "celebrate" : winner === 1 ? "defeat" : "rest";
    c.animation = winner === 1 ? "celebrate" : winner === 0 ? "defeat" : "rest";
  }
  function stepBattle(b, rng2 = Math.random, forced = null) {
    if (b.result) return b.lastEvent;
    const idx = b.actor, a = b.fighters[idx], enemy = b.fighters[1 - idx];
    if (a.buffs.burn) {
      hit(enemy, a, a.buffs.burn.value);
      if (a.hp <= 0) {
        finish(b);
        return null;
      }
    }
    const action = forced || chooseAction(a, enemy, rng2);
    if (!legalActions(a, enemy).some((x) => actionKey(x) === actionKey(action))) throw new Error("La IA intentó una acción imposible.");
    let text = "", damage = 0, animation = "idle";
    if (ATTACKS[action.type]) {
      a.energy -= attackCost(a, action.type);
      animation = "attack";
      if (rng2() < precision(a, enemy, action.type)) {
        damage = hit(a, enemy, expectedDamage(a, enemy, action.type) * (0.9 + rng2() * 0.2));
        text = `${a.name} realiza un ${ATTACKS[action.type].name}: ${damage} de daño${effect(enemy, "guard") ? " tras el bloqueo" : ""}.`;
        if (effect(enemy, "guard") && enemy.ability === "veteran" && distance(a, enemy) <= 2) {
          const counter = hit(enemy, a, 3 + enemy.stats.defense * 0.2);
          text += ` Contraataque: ${counter}.`;
        }
      } else text = `${enemy.name} esquiva el ${ATTACKS[action.type].name} de ${a.name}.`;
    } else switch (action.type) {
      case "advance": {
        a.energy -= 3;
        const move = effect(a, "slow") ? 1 : 1 + Math.floor(a.stats.agility / 18);
        const gap = distance(a, enemy);
        a.pos += Math.sign(enemy.pos - a.pos) * Math.min(move, gap - 1);
        text = `${a.name} se aproxima${effect(a, "slow") ? " bajo la escarcha" : ""}.`;
        animation = "walk";
        break;
      }
      case "retreat":
        a.energy -= 3;
        a.pos = clamp(a.pos + (a.pos < enemy.pos ? -1 : 1) * (effect(a, "slow") ? 1 : 2), 0, 10);
        text = `${a.name} retrocede para ganar espacio.`;
        animation = "walk";
        break;
      case "rest": {
        const amount = Math.round(12 + a.stats.endurance * 0.6);
        energize(a, amount);
        mana(a, 2);
        text = `${a.name} respira y recupera hasta ${amount} de energía.`;
        animation = "rest";
        break;
      }
      case "defend":
        buff(a, "guard", 18, 1);
        energize(a, 5);
        text = `${a.name} adopta una guardia defensiva.`;
        animation = "defend";
        break;
      case "maneuver":
        a.energy -= 6;
        buff(a, "evade", 12, 2);
        text = `${a.name} cambia de apoyo y prepara una evasión.`;
        animation = "defend";
        break;
      case "taunt": {
        a.energy -= 5;
        a.cooldowns.taunt = 4;
        const pressure = clamp(4 + (a.stats.charisma - enemy.stats.charisma) * 0.45, 2, 15);
        energize(enemy, -pressure);
        buff(enemy, "blind", 5 + (enemy.traits.includes("proud") ? 7 : 0), 1);
        text = `El público responde a ${a.name}: su rival pierde ${Math.round(pressure)} de energía.`;
        animation = "taunt";
        break;
      }
      case "ability": {
        const ab = ABILITIES[a.ability], mastery = 1 + Math.min(0.35, a.abilityXP / 500);
        a.energy -= ab.energy;
        a.cooldowns.ability = ab.cooldown + 1;
        animation = "cast";
        switch (ab.effect) {
          case "evade":
          case "guard":
          case "precision":
          case "boost":
            buff(a, ab.effect, ab.power * mastery, 3);
            break;
          case "blind":
            buff(enemy, "blind", ab.power * mastery, 3);
            break;
          case "heal":
            heal(a, ab.power * mastery + a.stats.vitality * 0.4);
            break;
          case "resolve":
            heal(a, ab.power * mastery);
            buff(a, "guard", 12, 2);
            break;
          case "rally":
            heal(a, ab.power * mastery);
            energize(a, 16);
            break;
          case "energy":
            energize(a, ab.power * mastery);
            break;
          case "focus":
            mana(a, ab.power * mastery);
            buff(a, "focus", 1, 3);
            break;
          case "siphon": {
            const n = Math.min(enemy.mana, ab.power * mastery);
            mana(enemy, -n);
            mana(a, n);
            break;
          }
          case "strike":
            damage = hit(a, enemy, (a.weapon.damage + a.stats.attack * 0.5) * mastery);
            animation = "attack";
            break;
          case "taunt":
            energize(enemy, -(ab.power + a.stats.charisma * 0.3));
            buff(enemy, "blind", 10, 2);
            break;
        }
        a.abilityXP += 2;
        text = `${a.name} utiliza ${ab.name}${damage ? `: ${damage} de daño` : ". " + ab.description}`;
        break;
      }
      case "spell": {
        const sp = ITEMS[action.spell];
        a.mana -= sp.mana;
        a.cooldowns[sp.id] = sp.cooldown + 1;
        animation = "cast";
        const power = sp.power + a.stats.magic * 0.45;
        switch (sp.effect) {
          case "damage":
            damage = hit(a, enemy, magicDamage(a, enemy, sp));
            break;
          case "burn":
            damage = hit(a, enemy, magicDamage(a, enemy, sp) * 0.6);
            buff(enemy, "burn", Math.round(3 + a.stats.magic * 0.12), 3);
            break;
          case "slow":
            damage = hit(a, enemy, magicDamage(a, enemy, sp) * 0.7);
            buff(enemy, "slow", 1, 3);
            break;
          case "drain":
            damage = hit(a, enemy, magicDamage(a, enemy, sp));
            heal(a, damage * 0.5);
            break;
          case "heal":
            heal(a, power);
            break;
          case "energy":
            energize(a, power);
            break;
          case "shield":
            buff(a, "shield", power, 3);
            break;
          case "blind":
            buff(enemy, "blind", sp.power, 3);
            break;
          case "silence":
            buff(enemy, "silence", 1, 2);
            break;
          case "blink":
            a.pos = clamp(a.pos + (a.pos < enemy.pos ? -3 : 3), 0, 10);
            buff(a, "evade", 12, 2);
            break;
          case "weaken":
            energize(enemy, -12);
            buff(enemy, "weaken", 1, 3);
            break;
        }
        text = `${a.name} lanza ${sp.name}${damage ? `: ${damage} de daño` : ". " + sp.description}`;
        break;
      }
    }
    a.energy = clamp(a.energy, 0, a.maxEnergy);
    a.mana = clamp(a.mana, 0, a.maxMana);
    a.hp = clamp(a.hp, 0, a.maxHP);
    a.animation = animation;
    enemy.animation = damage ? "hit" : "idle";
    a.lastAction = action.type;
    a.actionText = text;
    a.recent.push(action.type);
    a.recent = a.recent.slice(-8);
    for (const key of Object.keys(a.cooldowns)) {
      a.cooldowns[key] = Math.max(0, a.cooldowns[key] - 1);
    }
    for (const key of Object.keys(a.buffs)) {
      a.buffs[key].turns--;
      if (a.buffs[key].turns <= 0) delete a.buffs[key];
    }
    b.turn++;
    const event = { turn: b.turn, actor: idx, action: action.type, spell: action.spell || null, text, reason: action.reason || "Acción de prueba", damage, positions: b.fighters.map((f) => f.pos) };
    b.lastEvent = event;
    b.log.push(event);
    b.actor = 1 - idx;
    if (a.hp <= 0 || enemy.hp <= 0) finish(b);
    else if (b.turn >= RULES.maxTurns) finish(b, "Decisión de los jueces");
    return event;
  }

  // js/competitions/arena.js
  function eligible(s, g) {
    if (g.recovery > 0 || g.condition < 60 || g.health < 0.65) throw new Error("Necesita descansar: avanza días o solicita cuidados en la base.");
  }
  function startDuel(s, gid, rid) {
    mutable(s, gid);
    const g = owned(s, gid);
    eligible(s, g);
    const r = s.rivals.find((x) => x.id === rid);
    if (!r) throw new Error("Rival desconocido.");
    if (r.champion) throw new Error("Los campeones solo participan en torneos.");
    const tier = Math.max(0, r.level - 1);
    if (tier > Math.floor(s.prestige / 12)) throw new Error(`Este circuito requiere ${tier * 12} de prestigio.`);
    s.battle = createBattle(g, r, s.inventory, { type: "duel", reward: 85 + tier * 55, fame: 2 + tier, day: s.day, rivalId: r.id });
    return s.battle;
  }
  function enterTournament(s, gid, id2, rng2 = Math.random) {
    mutable(s, gid);
    if (s.tournament) throw new Error("Ya hay un torneo en curso.");
    const t = COMPETITIONS.find((x) => x.id === id2);
    if (!t) throw new Error("Torneo desconocido.");
    const g = owned(s, gid);
    eligible(s, g);
    if (s.prestige < t.prestige || g.level < t.level) throw new Error(`Requiere prestigio ${t.prestige} y gladiador de nivel ${t.level}.`);
    spend(s, t.entry);
    const pool = s.rivals.filter((r) => !r.champion && r.level <= t.tier + 1);
    const opponents = [];
    for (let i = 0; i < t.rounds - 1; i++) {
      const candidate = pool[Math.floor(rng2() * pool.length)];
      const r = copy(candidate);
      r.id = uid("entrant");
      opponents.push(r);
    }
    opponents.push(copy(s.rivals.filter((r) => r.champion)[t.champion]));
    s.tournament = { id: uid("tour"), competitionId: id2, gladiatorId: gid, round: 0, opponents, status: "active", results: [] };
    log(s, `${g.name} se inscribe en ${t.name}.`, "tournament");
    nextRound(s);
  }
  function nextRound(s) {
    if (s.battle && !s.battle.result) throw new Error("Hay un combate en curso.");
    const tour = s.tournament;
    if (!tour) throw new Error("No hay torneo activo.");
    const t = COMPETITIONS.find((t2) => t2.id === tour.competitionId), g = owned(s, tour.gladiatorId);
    s.battle = createBattle(g, tour.opponents[tour.round], s.inventory, { type: "tournament", tournamentId: tour.id, arena: t.arena, reward: 45 + t.tier * 15, fame: 1, day: s.day });
    return s.battle;
  }
  function abandonTournament(s) {
    if (s.battle && !s.battle.result) throw new Error("Primero termina el combate.");
    if (!s.tournament) throw new Error("No hay torneo activo.");
    log(s, "La casa se retira del torneo. La inscripción no se devuelve.", "tournament");
    s.tournament = null;
  }
  function settleBattle(s) {
    const b = s.battle;
    if (!b?.result) throw new Error("El combate no ha terminado.");
    if (b.settled) return b.payout;
    const g = owned(s, b.fighters[0].id);
    const won = b.result.winner === 0, draw = b.result.winner === null;
    const gold2 = won ? b.meta.reward : draw ? 28 : 18, xp = won ? 65 : 35, fame = won ? b.meta.fame : 0;
    s.gold += gold2;
    s.prestige += fame;
    g.prestige += fame;
    g.record[won ? "wins" : draw ? "draws" : "losses"]++;
    const levels = combatExperience(g, xp);
    g.condition = clamp(g.condition - (won ? 15 : 28), 35, 100);
    g.health = clamp(b.fighters[0].hp / b.fighters[0].maxHP, 0.12, 1);
    g.recovery = won ? 1 : 2;
    g.abilityXP = b.fighters[0].abilityXP;
    g.training = null;
    const r = s.rivals.find((r2) => r2.id === b.meta.rivalId);
    if (r) {
      r.record[won ? "losses" : draw ? "draws" : "wins"]++;
      r.xp += 15;
      if (!won) r.prestige++;
    }
    const record = { id: b.id, day: s.day, gladiator: g.name, gladiatorId: g.id, enemy: b.fighters[1].name, won, draw, turns: b.turn, gold: gold2, xp, fame, method: b.result.method };
    s.battles.unshift(record);
    s.battles = s.battles.slice(0, 150);
    const payout = { gold: gold2, xp, fame, levels, bonus: 0, title: null };
    if (b.meta.type === "tournament" && s.tournament?.id === b.meta.tournamentId) {
      const tour = s.tournament, t = COMPETITIONS.find((t2) => t2.id === tour.competitionId);
      tour.results.push({ round: tour.round, won, enemy: b.fighters[1].name });
      if (won) {
        tour.round++;
        if (tour.round === t.rounds) {
          s.gold += t.reward;
          s.prestige += t.fame;
          g.prestige += t.fame;
          payout.bonus = t.reward;
          payout.fame += t.fame;
          payout.title = t.name;
          s.completed.push({ id: t.id, day: s.day, gladiator: g.name });
          log(s, `${g.name} conquista ${t.name}: +${t.reward} de oro y +${t.fame} de prestigio.`, "tournament");
          s.tournament = null;
        } else {
          g.health = clamp(g.health + 0.38, 0.4, 1);
          g.condition = clamp(g.condition + 15, 0, 100);
          g.recovery = 0;
        }
      } else {
        s.tournament = null;
        log(s, `${g.name} queda fuera del torneo tras la ronda ${tour.round + 1}.`, "tournament");
      }
    }
    b.settled = true;
    b.payout = payout;
    log(s, `${g.name} ${won ? "vence a" : draw ? "empata con" : "pierde ante"} ${record.enemy}. +${gold2} de oro, +${xp} XP.`, "combat");
    return payout;
  }

  // js/ui/icons.js
  var paths = {
    base: "M3 11 12 3l9 8M5 10v11h14V10M9 21v-8h6v8M9 7h6",
    gladiators: "M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0M3 22v-3c0-5 18-5 18 0v3M5 12l-3 4M19 12l3 4",
    market: "M12 3v18M8 21h8M3 7h18M5 7l-4 8h8L5 7Zm14 0-4 8h8l-4-8Z",
    training: "m4 3 17 17M3 5l2-2 5 3-4 4-3-5Zm12 11 3-3 4 4-3 3-4-4ZM15 3l6 6M18 2l4 4M4 21l8-8",
    shops: "M3 9 5 3h14l2 6M3 9c0 4 6 4 6 0 0 4 6 4 6 0 0 4 6 4 6 0M4 12v10h16V12M9 22v-7h6v7",
    inventory: "M3 7h18v14H3V7Zm0 0 3-4h12l3 4M3 12h18M10 10h4v5h-4v-5Z",
    arena: "m4 2 15 17m-1-1 3-3M2 4l3-2 5 7-2 2-6-7ZM20 2 5 19m1-1-3-3M22 4l-3-2-5 7 2 2 6-7ZM3 20l2 2M19 22l2-2",
    tournaments: "M7 3h10v7c0 7-10 7-10 0V3Zm0 2H3v4c0 3 4 4 5 4m9-8h4v4c0 3-4 4-5 4M12 16v5M7 22h10",
    history: "M5 3h13v19H5V3Zm-2 0h2M8 7h7M8 11h7M8 15h7M8 19h4",
    save: "M3 3h15l3 3v15H3V3Zm4 0v7h10V3M7 21v-7h10v7M13 4v4",
    options: "m10 2-1 4-3-1-3 5 3 2-3 3 3 5 4-1 2 3 4-1 1-4 3 1 3-5-3-2 3-3-3-5-4 1-2-3-4 1Zm-2 10a4 4 0 1 0 8 0 4 4 0 0 0-8 0",
    fullscreen: "M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6",
    strength: "m3 9 3-3 3 3-3 3-3-3Zm12 9 3-3 3 3-3 3-3-3ZM6 9l12 9M1 11l5-5M18 20l5-5",
    agility: "m2 18 6-9 5 5 9-11M15 3h7v7M3 22h5",
    attack: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm5 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 1v7M16 12h7",
    defense: "m12 2 9 4v7c0 5-9 9-9 9s-9-4-9-9V6l9-4ZM12 6v12M7 9h10",
    vitality: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z",
    endurance: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm9-6v6l4 3M10 1h4",
    magic: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7ZM3 3l2 2M19 3l2 2M3 19l2 2",
    charisma: "M3 9h18M6 9V5l6-3 6 3v4M5 11v8M10 11v8M15 11v8M20 11v8M3 22h19",
    gold: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm4 0 5-5 5 5-5 5-5-5Z",
    sun: "M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2"
  };
  function glyph(name, size = 24) {
    return `<svg class="glyph" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.magic}"/></svg>`;
  }
  function itemArt(item) {
    const metal = item.price > 400 ? "#dae3e5" : "#a3b1b2", gold2 = item.price > 300 ? "#e3b969" : "#a38752";
    let art = "";
    if (item.category === "weapon") {
      const type = item.type;
      if (type === "bow" || type === "crossbow") art = `<path d="M20 10Q76 40 20 75" fill="none" stroke="#38261d" stroke-width="11"/><path d="M20 10Q76 40 20 75" fill="none" stroke="${gold2}" stroke-width="5"/><path d="M20 10 30 43 20 75" fill="none" stroke="#e9ddbd" stroke-width="1.5"/><path d="m10 53 52-29m-8-2 9 1-4 9" stroke="${metal}" stroke-width="3" fill="none"/>${type === "crossbow" ? '<path d="m26 68 22-45" stroke="#73472a" stroke-width="9"/>' : ""}`;
      else if (type === "spear") art = `<g transform="rotate(28 42 44)"><path d="M42 85V18" stroke="#2d2921" stroke-width="8"/><path d="M42 85V18" stroke="#a47b48" stroke-width="4"/><path d="m42 2-12 23 12 13 12-13Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="M42 7v24M38 38h9m-9 5h9" stroke="${gold2}" stroke-width="2"/></g>`;
      else if (type === "staff") art = `<path d="m29 76 18-59" stroke="#3e281e" stroke-width="10"/><path d="m29 76 18-59" stroke="#99744b" stroke-width="5"/><path d="m37 15 13-10 10 16-16 12Z" fill="#75d5dd" stroke="${gold2}" stroke-width="3"/><path d="m49 9-3 17 10-6Z" fill="#d2ffff"/><path d="m39 35 13 4M36 44l12 4" stroke="${gold2}" stroke-width="3"/>`;
      else if (type === "axe" || type === "mace") art = `<g transform="rotate(30 42 44)"><path d="M42 78V16" stroke="#34251f" stroke-width="10"/><path d="M42 78V16" stroke="#926039" stroke-width="5"/>${type === "axe" ? `<path d="M42 18 17 8Q4 32 18 45l24-14 15 6Q68 24 56 11Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="M17 12Q10 29 20 40" fill="none" stroke="#edf5ed" stroke-width="3"/>` : `<path d="m29 9 9-6h13l8 8v23l-10 8H36l-9-8Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="M35 10v24m12-27v31" stroke="${gold2}" stroke-width="4"/>`}<path d="M39 51h7m-7 7h7m-7 7h7" stroke="${gold2}" stroke-width="2"/></g>`;
      else {
        const tip = type === "dagger" ? 24 : item.twoHanded ? 2 : 8, wide = item.twoHanded ? 9 : item.id === "rapier" ? 3 : 5;
        art = `<g transform="rotate(35 42 44)"><path d="M${44 - wide} 55V${tip + 10}l${wide}-${10} ${wide} 10v${45 - tip}Z" fill="${metal}" stroke="#263137" stroke-width="3"/><path d="m44 ${tip + 5}-1 ${48 - tip}" stroke="#f6f8e3" stroke-width="2"/><path d="M29 55h31l-3 5H31Z" fill="${gold2}" stroke="#3d2c21" stroke-width="2"/><path d="M40 61h9v16h-9Z" fill="#75432a" stroke="#34251f" stroke-width="2"/><path d="M39 79h12" stroke="${gold2}" stroke-width="5"/>${type === "spear" ? `<path d="M44 60v25" stroke="#7d5432" stroke-width="5"/>` : ""}</g>`;
      }
    } else if (item.category === "scroll") art = `<path d="M21 16h41v48H22Z" fill="#c9ac73" stroke="#4d3528" stroke-width="3"/><path d="M21 16c-9-8-18 4-10 11h11m40 36c11 6 10 16 0 16H25c-9 0-12-14-3-16" fill="#e6ce93" stroke="#62452b" stroke-width="3"/><path d="m42 29 4 9 9 4-9 4-4 9-4-9-9-4 9-4Z" fill="#577a8a"/><path d="M27 58h26M31 21h23" stroke="#8e764c" stroke-width="2"/><circle cx="56" cy="63" r="9" fill="#8b3d32" stroke="${gold2}" stroke-width="2"/>`;
    else {
      if (item.slot === "head") art = `<path d="M19 51V31C19 5 65 5 65 31v20l-15 16V42H34v25Z" fill="${metal}" stroke="#273137" stroke-width="3"/><path d="M42 8v36M20 35h44" stroke="${gold2}" stroke-width="5"/><path d="M28 44h7m15 0h8" stroke="#17232a" stroke-width="5"/><path d="M37 9Q32-5 52 4l9 10-15-4" fill="#8c4735"/>`;
      else if (item.slot === "chest") art = `<path d="M29 12 16 17 9 35l13 4 3 30 17 10 18-10 4-30 13-4-8-18-14-5-13 9Z" fill="${metal}" stroke="#283137" stroke-width="3"/><path d="M42 23v44m-17-8 17 8 18-8M27 42l15 6 16-6" stroke="${gold2}" stroke-width="3"/><path d="m20 21 10-4 3 17-13 3Z" fill="#dbe2d7" opacity=".6"/>`;
      else if (item.slot === "offhand") art = `<path d="m42 6 27 11-3 34c-1 12-24 28-24 28S19 63 18 51l-3-34Z" fill="#4c696e" stroke="#b79b61" stroke-width="5"/><path d="M42 15v51M24 30h36" stroke="${gold2}" stroke-width="6"/><circle cx="42" cy="34" r="8" fill="${metal}" stroke="#263137" stroke-width="2"/>`;
      else if (item.slot === "feet") art = `<path d="M27 10h24l-2 37 16 14v12H17V62l10-13Z" fill="#73503b" stroke="#302720" stroke-width="3"/><path d="M26 15h25l-1 10H27Zm0 28h24v10H25Z" fill="${metal}" stroke="${gold2}" stroke-width="2"/><path d="M18 64h46" stroke="#b2945a" stroke-width="4"/>`;
      else if (item.slot === "hands") art = `<path d="m18 63 5-22 2-22c1-6 8-6 8 0v16-23c0-7 9-7 9 0v23-26c0-6 8-6 8 0v26-20c0-5 8-5 8 0v27l9-9c6-4 10 2 6 7L57 65l-2 12H23Z" fill="${metal}" stroke="#2c3537" stroke-width="3"/><path d="M23 59h33v12H22Z" fill="#735340" stroke="${gold2}" stroke-width="3"/><path d="M29 41h25" stroke="${gold2}" stroke-width="3"/>`;
      else art = `<path d="M21 9c-8 38 50 38 42 0" fill="none" stroke="${gold2}" stroke-width="3"/><path d="m42 34 15 17-15 26-15-26Z" fill="#4b9a9c" stroke="${gold2}" stroke-width="4"/><path d="m42 42 5 10-5 12-6-12Z" fill="#b2ece4"/>`;
    }
    return `<svg class="item-art" viewBox="0 0 84 88" aria-hidden="true">${art}</svg>`;
  }

  // js/ui/characterRenderer.js
  function equipmentOf(g, inventory = []) {
    return Object.fromEntries(Object.entries(g.equipment).map(([slot, id2]) => [slot, ITEMS[inventory.find((u) => u.id === id2)?.itemId] || ITEMS[id2] || null]));
  }
  var TAU = Math.PI * 2;
  function tint(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    return `rgb(${[n >> 16, n >> 8 & 255, n & 255].map((v) => Math.max(0, Math.min(255, v + amount))).join(",")})`;
  }
  function grad(c, x, y, w2, h, colors) {
    const g = c.createLinearGradient(x, y, w2, h);
    colors.forEach((color, i) => g.addColorStop(i / (colors.length - 1), color));
    return g;
  }
  function path(c, points, fill, stroke = "#1b1919", width = 2.5) {
    c.beginPath();
    points(c);
    if (fill) {
      c.fillStyle = fill;
      c.fill();
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = width;
      c.stroke();
    }
  }
  function ellipse(c, x, y, rx, ry, fill, stroke = null, width = 2) {
    path(c, (p) => p.ellipse(x, y, rx, ry, 0, 0, TAU), fill, stroke, width);
  }
  function line(c, points, color, width = 2) {
    path(c, (p) => {
      p.moveTo(...points[0]);
      for (const point of points.slice(1)) p.lineTo(...point);
    }, null, color, width);
  }
  function capsule(c, a, b, r, fill) {
    line(c, [a, b], "#1e1a19", r + 5);
    line(c, [a, b], fill, r);
    line(c, [[a[0] - r * 0.18, a[1]], [b[0] - r * 0.18, b[1]]], "#ffffff13", Math.max(2, r * 0.22));
  }
  function hand(c, x, y, skin, glove) {
    ellipse(c, x, y, 8, 9, glove ? grad(c, x - 5, y - 7, x + 6, y + 7, ["#b3b9ac", "#5c6662"]) : skin, "#251e1a");
    line(c, [[x + 2, y - 4], [x + 4, y + 3]], "#2c242470", 1.5);
  }
  function drawWeapon(c, weapon, x, y, angle = 0, time = 0) {
    if (!weapon || weapon.type === "fist") return;
    c.save();
    c.translate(x, y);
    c.rotate(angle);
    c.lineCap = "round";
    c.lineJoin = "round";
    const rare = weapon.price > 450, metal = grad(c, -10, 0, 12, 0, ["#69767c", "#d5e3df", "#81979b"]), gold2 = rare ? "#e4bb6c" : "#b49b65";
    const length = weapon.type === "dagger" ? 40 : weapon.type === "spear" ? 124 : weapon.type === "staff" ? 112 : rare ? 91 : 74;
    if (weapon.type === "bow") {
      path(c, (p) => {
        p.moveTo(-3, -58);
        p.bezierCurveTo(43, -47, 43, 35, -3, 50);
      }, null, "#241b16", 9);
      path(c, (p) => {
        p.moveTo(-3, -58);
        p.bezierCurveTo(43, -47, 43, 35, -3, 50);
      }, null, "#a16c3e", 5);
      line(c, [[-3, -58], [9, -5], [-3, 50]], "#ebd8a8", 1.3);
      line(c, [[-13, 8], [50, -22]], "#9a7750", 3);
      path(c, (p) => {
        p.moveTo(50, -22);
        p.lineTo(44, -22);
        p.lineTo(48, -16);
        p.closePath();
      }, "#d1d4c1");
    } else if (weapon.type === "crossbow") {
      capsule(c, [0, 20], [0, -38], 10, "#775037");
      line(c, [[-31, -26], [0, -39], [34, -24]], "#b19862", 6);
      line(c, [[-31, -26], [0, -10], [34, -24]], "#d7ccab", 1.5);
      line(c, [[0, -47], [0, -8]], "#e2e7d6", 3);
    } else if (weapon.type === "staff") {
      path(c, (p) => {
        p.moveTo(-3, 24);
        p.lineTo(-4, -length + 14);
        p.quadraticCurveTo(-23, -length - 3, -9, -length - 15);
        p.lineTo(6, -length - 22);
        p.lineTo(17, -length - 8);
        p.lineTo(6, -length + 10);
        p.lineTo(3, 24);
        p.closePath();
      }, grad(c, -8, 0, 13, 0, ["#3b2d2a", "#ab8150", "#65503c"]));
      for (let i = 0; i < 4; i++) line(c, [[-5, -10 - i * 17], [5, -14 - i * 17]], gold2, 2);
      c.shadowColor = "#55d6ea";
      c.shadowBlur = 14;
      path(c, (p) => {
        p.moveTo(-6, -length - 8);
        p.lineTo(3, -length - 20);
        p.lineTo(11, -length - 8);
        p.lineTo(2, -length);
        p.closePath();
      }, "#7adce8", "#d0f6e7", 1.5);
      c.shadowBlur = 0;
    } else {
      capsule(c, [0, 20], [0, -length + 12], weapon.type === "spear" ? 5 : 7, "#765037");
      if (weapon.type === "axe") {
        path(c, (p) => {
          p.moveTo(0, -length + 5);
          p.lineTo(-12, -length - 5);
          p.quadraticCurveTo(-42, -length - 13, -44, -length - 2);
          p.quadraticCurveTo(-45, -length + 22, -30, -length + 37);
          p.lineTo(-5, -length + 24);
          p.lineTo(14, -length + 30);
          p.quadraticCurveTo(26, -length + 15, 13, -length + 6);
          p.closePath();
        }, metal);
        path(c, (p) => {
          p.moveTo(-42, -length - 2);
          p.quadraticCurveTo(-45, -length + 22, -30, -length + 34);
        }, null, "#e4efdf", 3);
      } else if (weapon.type === "mace") {
        path(c, (p) => {
          p.moveTo(-13, -length - 4);
          p.lineTo(-7, -length - 12);
          p.lineTo(9, -length - 12);
          p.lineTo(17, -length - 2);
          p.lineTo(14, -length + 22);
          p.lineTo(6, -length + 29);
          p.lineTo(-13, -length + 23);
          p.closePath();
        }, metal);
        line(c, [[-7, -length - 8], [-6, -length + 22]], gold2, 4);
        line(c, [[7, -length - 8], [8, -length + 22]], "#e0e7d4", 3);
      } else if (weapon.type === "spear") {
        path(c, (p) => {
          p.moveTo(0, -length - 26);
          p.lineTo(-12, -length + 5);
          p.lineTo(-1, -length + 21);
          p.lineTo(10, -length + 3);
          p.closePath();
        }, metal);
        line(c, [[0, -length - 18], [0, -length + 12]], "#e8edda", 1.5);
        line(c, [[-5, -length + 22], [5, -length + 22]], gold2, 4);
      } else {
        const width = weapon.twoHanded ? 10 : weapon.type === "dagger" ? 5 : 7;
        path(c, (p) => {
          p.moveTo(-width, -16);
          p.lineTo(-width, -length + 8);
          p.lineTo(0, -length - 8);
          p.lineTo(width, -length + 8);
          p.lineTo(width, -16);
          p.closePath();
        }, metal);
        line(c, [[0, -length], [0, -19]], "#eef5e4", 2);
        path(c, (p) => {
          p.moveTo(-19, -17);
          p.lineTo(-17, -24);
          p.lineTo(-7, -21);
          p.lineTo(8, -21);
          p.lineTo(18, -25);
          p.lineTo(21, -17);
          p.lineTo(8, -13);
          p.lineTo(-7, -13);
          p.closePath();
        }, gold2);
        for (let i = 0; i < 4; i++) line(c, [[-3, i * 5 - 6], [4, i * 5 - 8]], "#c4a572", 1.4);
        ellipse(c, 0, 22, 7, 5, gold2, "#30241c");
        if (rare) {
          c.shadowColor = "#e7c577";
          c.shadowBlur = 8;
          line(c, [[-2, -length + 20], [-2, -length + 44]], "#f4d68b", 1.4);
          c.shadowBlur = 0;
        }
      }
    }
    c.restore();
  }
  function drawCharacter(c, g, x, y, scale = 1, flip = false, time = 0, pose = "idle", gear = null) {
    if (!g) return;
    const a = g.appearance, eq = gear || g.gear || equipmentOf(g), weapon = eq.weapon || UNARMED;
    c.save();
    c.translate(x, y);
    c.scale(flip ? -scale : scale, scale);
    c.lineJoin = "round";
    c.lineCap = "round";
    const shadow = c.createRadialGradient(0, 0, 2, 0, 0, 49);
    shadow.addColorStop(0, "#130f0cb0");
    shadow.addColorStop(1, "#130f0c00");
    ellipse(c, 0, 0, 54, 12, shadow);
    c.scale(1 + Math.min(0.13, Math.max(-0.035, (g.stats.strength - 8) * 6e-3)), 1);
    const wave = Math.sin(time * 7), breath = Math.sin(time * 2.3 + (a.face || 0)), walking = pose === "walk", training = pose === "train";
    const pulse = Math.sin(time * 14), attack = pose === "attack";
    if (pose === "defeat") {
      c.translate(-12, -13);
      c.rotate(-1.27);
    }
    if (pose === "hit") c.translate(-5 - Math.abs(pulse) * 4, 0);
    const stride = walking ? wave * 14 : training ? wave * 3 : 0;
    c.translate(attack ? 7 : 0, walking ? -Math.abs(wave) * 4 : breath * 0.8);
    const skin = grad(c, -35, -170, 35, -80, [tint(a.skin, 30), a.skin, tint(a.skin, -34)]);
    const cloth = grad(c, -32, -130, 32, -56, [tint(a.tunic, 18), a.tunic, tint(a.tunic, -38)]);
    const steel = grad(c, -35, -120, 35, -60, ["#b2c0b9", "#62787b", "#39484e"]);
    const leather = grad(c, -30, -120, 35, -60, ["#99714a", "#674b36", "#382c28"]);
    capsule(c, [-18, -66], [-22 - stride, -34], 19, skin);
    capsule(c, [-22 - stride, -34], [-25 - stride, -9], 16, skin);
    capsule(c, [17, -65], [24 + stride, -32], 20, skin);
    capsule(c, [24 + stride, -32], [26 + stride, -8], 16, skin);
    for (const [lx, knee] of [[-25 - stride, -22 - stride], [26 + stride, 24 + stride]]) {
      path(c, (p) => {
        p.moveTo(lx - 9, -18);
        p.lineTo(lx + 8, -18);
        p.lineTo(lx + 13, -7);
        p.lineTo(lx + 21, -3);
        p.quadraticCurveTo(lx + 21, 4, lx + 12, 5);
        p.lineTo(lx - 12, 4);
        p.lineTo(lx - 12, -9);
        p.closePath();
      }, "#3c302a");
      line(c, [[lx - 10, -1], [lx + 16, 0]], "#ad8b55", 2);
      if (eq.feet) {
        path(c, (p) => {
          p.moveTo(knee - 9, -41);
          p.lineTo(knee + 10, -41);
          p.lineTo(lx + 8, -16);
          p.lineTo(lx - 9, -13);
          p.closePath();
        }, steel);
        line(c, [[knee - 9, -36], [knee + 10, -36]], "#c9ab70", 2);
      } else for (let i = 0; i < 2; i++) line(c, [[lx - 9, -21 - i * 9], [lx + 8, -24 - i * 9]], "#72523a", 3);
    }
    const arcane = ["swindler", "apprentice", "warlock", "healer"].includes(g.background);
    if (arcane && !eq.chest) {
      path(c, (p) => {
        p.moveTo(-25, -88);
        p.lineTo(23, -87);
        p.quadraticCurveTo(23, -47, 38, -21);
        p.lineTo(22, -13);
        p.lineTo(4, -19);
        p.lineTo(-12, -13);
        p.lineTo(-35, -20);
        p.quadraticCurveTo(-23, -52, -25, -88);
        p.closePath();
      }, cloth, "#211d1b", 2.5);
      for (let j = 0; j < 4; j++) path(c, (p) => {
        p.moveTo(-18 + j * 11, -70);
        p.quadraticCurveTo(-15 + j * 12, -40, -21 + j * 16, -22);
      }, null, j % 2 ? "#c7b77e25" : "#111c2150", 2);
      line(c, [[-34, -21], [-12, -15], [4, -21], [22, -15], [36, -23]], "#c6ab71", 2.5);
    }
    let backHand = [-39, -77], frontHand = [47, -78], elbow = [42, -104];
    if (walking) {
      backHand = [-41 - wave * 10, -78];
      frontHand = [45 + wave * 10, -78];
    }
    if (attack) {
      frontHand = [76 + pulse * 9, -112];
      elbow = [51, -115];
      backHand = [-31, -92];
    }
    if (pose === "defend") {
      frontHand = [28, -120];
      elbow = [40, -107];
      backHand = [-19, -113];
    }
    if (pose === "cast") {
      frontHand = [59, -126 + breath * 2];
      elbow = [42, -111];
      backHand = [-34, -99];
    }
    if (pose === "celebrate") {
      frontHand = [39, -184 + wave * 3];
      elbow = [45, -153];
      backHand = [-45, -150];
    }
    if (pose === "rest") {
      frontHand = [32, -71];
      elbow = [39, -93];
      backHand = [-33, -71];
    }
    if (training) {
      frontHand = [45, -103 + wave * 18];
      elbow = [39, -108];
      backHand = [-34, -86 - wave * 15];
    }
    path(c, (p) => {
      p.moveTo(-29, -135);
      p.quadraticCurveTo(-48, -109, -39, -56);
      p.lineTo(-29, -68);
      p.lineTo(-21, -56);
      p.lineTo(-8, -126);
      p.closePath();
    }, tint(a.tunic, -40));
    capsule(c, [-29, -126], [-40, -104], 18, skin);
    capsule(c, [-40, -104], backHand, 15, skin);
    hand(c, ...backHand, skin, eq.hands);
    path(c, (p) => {
      p.moveTo(-30, -137);
      p.quadraticCurveTo(-13, -146, 2, -141);
      p.lineTo(27, -134);
      p.quadraticCurveTo(34, -115, 27, -92);
      p.lineTo(24, -66);
      p.quadraticCurveTo(0, -55, -26, -67);
      p.lineTo(-28, -97);
      p.quadraticCurveTo(-37, -124, -30, -137);
      p.closePath();
    }, eq.chest ? eq.chest.weight >= 2 ? steel : leather : cloth);
    path(c, (p) => {
      p.moveTo(-22, -130);
      p.quadraticCurveTo(-13, -139, 0, -136);
      p.lineTo(-4, -72);
      p.lineTo(-23, -73);
      p.closePath();
    }, "#ffffff0e", null);
    if (eq.chest?.weight >= 2) {
      path(c, (p) => {
        p.moveTo(-24, -121);
        p.quadraticCurveTo(-5, -111, 1, -109);
        p.quadraticCurveTo(16, -111, 24, -119);
        p.lineTo(21, -99);
        p.lineTo(0, -91);
        p.lineTo(-25, -100);
        p.closePath();
      }, steel, "#263237", 2);
      for (let j = 0; j < 3; j++) path(c, (p) => {
        p.moveTo(-24, -93 + j * 8);
        p.lineTo(0, -86 + j * 8);
        p.lineTo(24, -94 + j * 8);
      }, null, "#b3b8a45c", 2);
      line(c, [[0, -126], [0, -96]], "#d5ba78", 2);
      ellipse(c, 0, -118, 5, 5, "#c4a668", "#4c4130", 1);
    } else {
      path(c, (p) => {
        p.moveTo(-26, -134);
        p.lineTo(-18, -137);
        p.lineTo(24, -83);
        p.lineTo(23, -72);
        p.closePath();
      }, "#69442d", "#2b211d", 1.5);
      for (let i = 0; i < 4; i++) ellipse(c, -20 + i * 10, -129 + i * 13, 1.7, 1.7, "#be9c61");
      line(c, [[-4, -125], [-4, -79]], "#1f211e50", 1.5);
    }
    for (let i = 0; i < 5; i++) {
      const xx = -28 + i * 12;
      path(c, (p) => {
        p.moveTo(xx, -66);
        p.lineTo(xx + 11, -66);
        p.lineTo(xx + 10, -45);
        p.lineTo(xx + 5, -41);
        p.lineTo(xx, -46);
        p.closePath();
      }, i % 2 ? "#5a3a28" : "#73503a", "#251c18", 1.5);
      ellipse(c, xx + 5, -48, 1.5, 1.5, "#b99a5e");
    }
    path(c, (p) => {
      p.moveTo(-28, -72);
      p.lineTo(27, -72);
      p.lineTo(28, -61);
      p.lineTo(-28, -60);
      p.closePath();
    }, "#3c3024");
    path(c, (p) => p.rect(-6, -74, 14, 15), "#c5a366", "#3c3024", 2);
    path(c, (p) => p.rect(-2, -70, 6, 7), "#433329", null);
    if (["thief", "smuggler", "spy", "poacher", "saboteur"].includes(g.background) && !eq.chest) {
      path(c, (p) => {
        p.moveTo(-22, -131);
        p.lineTo(22, -128);
        p.lineTo(12, -108);
        p.lineTo(-15, -119);
        p.lineTo(-28, -104);
        p.lineTo(-31, -120);
        p.closePath();
      }, tint(a.tunic, 30), "#2c2d23", 2);
      line(c, [[-17, -124], [7, -114]], "#d6ca9633", 1.5);
    }
    capsule(c, [-1, -146], [-1, -134], 18, skin);
    line(c, [[-21, -135], [-2, -125], [22, -134]], "#ae935d", 4);
    capsule(c, [28, -127], elbow, 21, skin);
    capsule(c, elbow, frontHand, 16, skin);
    const shoulderFill = eq.chest?.weight >= 2 ? steel : leather;
    path(c, (p) => {
      p.moveTo(17, -138);
      p.quadraticCurveTo(35, -143, 43, -126);
      p.lineTo(39, -114);
      p.lineTo(24, -117);
      p.closePath();
    }, shoulderFill);
    line(c, [[24, -134], [37, -129]], "#d5bc8580", 2);
    path(c, (p) => {
      p.moveTo(frontHand[0] - 9, frontHand[1] - 14);
      p.lineTo(frontHand[0] + 7, frontHand[1] - 15);
      p.lineTo(frontHand[0] + 10, frontHand[1] - 2);
      p.lineTo(frontHand[0] - 7, frontHand[1] + 2);
      p.closePath();
    }, eq.hands ? steel : "#60432f");
    line(c, [[frontHand[0] - 7, frontHand[1] - 9], [frontHand[0] + 7, frontHand[1] - 11]], "#ba9d62", 2);
    if (eq.offhand) {
      c.save();
      c.translate(backHand[0] + 1, backHand[1] + 2);
      c.rotate(pose === "defend" ? -0.25 : 0.1);
      path(c, (p) => {
        p.moveTo(0, -34);
        p.lineTo(25, -24);
        p.lineTo(22, 12);
        p.quadraticCurveTo(18, 29, 0, 38);
        p.quadraticCurveTo(-19, 29, -23, 12);
        p.lineTo(-25, -24);
        p.closePath();
      }, grad(c, -25, -25, 25, 25, ["#72918d", "#354f52", "#202f35"]), "#b99b60", 4);
      line(c, [[0, -28], [0, 29]], "#aa8d52", 4);
      line(c, [[-20, -9], [20, -9]], "#aa8d52", 4);
      ellipse(c, 0, -8, 8, 9, steel, "#d0b374", 2);
      c.restore();
    }
    const angle = attack ? 1.12 + Math.sin(time * 14) * 0.22 : pose === "celebrate" ? -0.3 : pose === "defend" ? 0.2 : -0.19;
    drawWeapon(c, weapon, ...frontHand, angle, time);
    hand(c, ...frontHand, skin, eq.hands);
    c.save();
    c.translate(pose === "hit" ? -2 : 0, pose === "rest" ? 3 : 0);
    c.rotate(pose === "rest" ? 0.09 : attack ? 0.035 : 0);
    ellipse(c, -23, -163, 6, 10, skin, "#33251f");
    ellipse(c, -24, -162, 2, 5, tint(a.skin, -28));
    path(c, (p) => {
      p.moveTo(-22, -187);
      p.quadraticCurveTo(-9, -202, 14, -194);
      p.quadraticCurveTo(29, -187, 26, -164);
      p.lineTo(25, -149);
      p.lineTo(13, -138);
      p.quadraticCurveTo(-3, -133, -17, -147);
      p.lineTo(-23, -167);
      p.closePath();
    }, grad(c, -25, -189, 28, -144, [tint(a.skin, 32), a.skin, tint(a.skin, -29)]));
    path(c, (p) => {
      p.moveTo(9, -188);
      p.lineTo(24, -179);
      p.lineTo(24, -153);
      p.lineTo(12, -141);
      p.lineTo(5, -145);
      p.lineTo(13, -167);
      p.closePath();
    }, tint(a.skin, -17), null);
    const hair = a.hair;
    if (a.style === 1) {
      path(c, (p) => {
        p.moveTo(-17, -187);
        p.lineTo(-13, -204);
        p.lineTo(-5, -201);
        p.lineTo(0, -214);
        p.lineTo(10, -205);
        p.lineTo(19, -207);
        p.lineTo(23, -192);
        p.lineTo(12, -190);
        p.closePath();
      }, grad(c, -15, -210, 22, -185, [tint(hair, 30), hair, tint(hair, -25)]));
    } else if (a.style === 2) {
      path(c, (p) => {
        p.moveTo(-23, -172);
        p.quadraticCurveTo(-34, -199, -4, -203);
        p.quadraticCurveTo(24, -209, 29, -185);
        p.lineTo(20, -174);
        p.lineTo(16, -192);
        p.quadraticCurveTo(-3, -182, -16, -188);
        p.lineTo(-16, -166);
        p.closePath();
      }, grad(c, -23, -200, 24, -166, [tint(hair, 20), hair, tint(hair, -25)]));
      for (let i = 0; i < 3; i++) line(c, [[-14 + i * 10, -197], [-15 + i * 10, -187]], tint(hair, 30), 1.2);
    } else if (a.style === 3) {
      path(c, (p) => {
        p.moveTo(-20, -166);
        p.quadraticCurveTo(-34, -197, -7, -204);
        p.quadraticCurveTo(31, -211, 31, -180);
        p.lineTo(30, -143);
        p.lineTo(19, -146);
        p.lineTo(19, -184);
        p.lineTo(3, -190);
        p.lineTo(-14, -181);
        p.lineTo(-18, -144);
        p.lineTo(-30, -149);
        p.closePath();
      }, grad(c, -25, -200, 25, -140, [tint(hair, 30), hair, tint(hair, -30)]));
      line(c, [[-24, -174], [-24, -151]], tint(hair, 35), 2);
    } else {
      path(c, (p) => {
        p.moveTo(-22, -174);
        p.quadraticCurveTo(-31, -200, -3, -202);
        p.quadraticCurveTo(29, -205, 29, -181);
        p.lineTo(20, -184);
        p.lineTo(13, -192);
        p.quadraticCurveTo(-2, -183, -14, -188);
        p.lineTo(-15, -172);
        p.closePath();
      }, grad(c, -20, -200, 25, -175, [tint(hair, 30), hair, tint(hair, -25)]));
    }
    const blink = Math.sin(time * 0.91 + a.face * 1.7) > 0.996;
    const fierce = g.traits.includes("aggressive") || g.traits.includes("impulsive");
    line(c, [[-13, -174], [-3, -172 + (fierce ? 2 : 0)]], tint(hair, -20), 3.5);
    line(c, [[12, -172], [22, -176 + (fierce ? 3 : 0)]], tint(hair, -20), 3.3);
    if (blink) {
      line(c, [[-11, -167], [-2, -166]], "#39291f", 2);
      line(c, [[13, -166], [21, -167]], "#39291f", 2);
    } else {
      ellipse(c, -6, -166, 5, 3.3, "#d8d4b9", "#36291f", 1);
      ellipse(c, 17, -166, 4.5, 3.1, "#d8d4b9", "#36291f", 1);
      ellipse(c, -3, -166, 2.2, 2.8, "#283638");
      ellipse(c, 19, -166, 2, 2.7, "#283638");
      ellipse(c, -2.4, -167, 0.7, 0.7, "#fffbe0");
    }
    path(c, (p) => {
      p.moveTo(6, -170);
      p.lineTo(12, -157);
      p.lineTo(5, -155);
    }, tint(a.skin, -4), "#714e3b", 1.5);
    line(c, [[5, -158], [10, -159]], tint(a.skin, 28), 1.4);
    if (a.face === 1) line(c, [[-15, -172], [-11, -157]], tint(a.skin, -35), 1.4);
    if (a.beard) {
      path(c, (p) => {
        p.moveTo(-18, -157);
        p.lineTo(-9, -151);
        p.lineTo(4, -155);
        p.lineTo(20, -152);
        p.lineTo(24, -157);
        p.lineTo(20, -141);
        p.lineTo(8, -132);
        p.lineTo(-8, -139);
        p.closePath();
      }, grad(c, -17, -156, 23, -134, [tint(hair, 15), hair, tint(hair, -25)]), "#382a22", 1.5);
      for (let i = 0; i < 5; i++) line(c, [[-8 + i * 5, -144], [-5 + i * 4, -138]], tint(hair, 25), 0.9);
    }
    const mouthY = a.beard ? -148 : -147;
    path(c, (p) => {
      p.moveTo(0, mouthY);
      p.quadraticCurveTo(10, mouthY + (pose === "celebrate" ? 6 : 1), 18, mouthY - 2);
    }, null, a.beard ? "#d0a47d" : "#5d392c", 2);
    if (eq.head) {
      if (eq.head.weight === 0) {
        path(c, (p) => {
          p.moveTo(-27, -150);
          p.quadraticCurveTo(-40, -202, -10, -210);
          p.quadraticCurveTo(28, -215, 31, -183);
          p.lineTo(26, -170);
          p.lineTo(21, -191);
          p.quadraticCurveTo(-7, -202, -21, -176);
          p.lineTo(-18, -150);
          p.closePath();
        }, "#4a4533", "#211e1b", 3);
      } else {
        path(c, (p) => {
          p.moveTo(-29, -174);
          p.lineTo(-26, -194);
          p.quadraticCurveTo(-12, -215, 11, -209);
          p.quadraticCurveTo(31, -205, 32, -176);
          p.lineTo(23, -171);
          p.lineTo(21, -187);
          p.lineTo(-18, -186);
          p.lineTo(-21, -169);
          p.closePath();
        }, steel);
        line(c, [[-27, -181], [30, -181]], "#c0a164", 4);
        path(c, (p) => {
          p.moveTo(3, -207);
          p.lineTo(8, -208);
          p.lineTo(10, -159);
          p.lineTo(3, -157);
          p.closePath();
        }, "#b8bba4", "#3d4440", 1.5);
        if (eq.head.weight >= 2) {
          path(c, (p) => {
            p.moveTo(-4, -207);
            p.quadraticCurveTo(-4, -230, 24, -225);
            p.lineTo(35, -213);
            p.quadraticCurveTo(10, -221, 10, -207);
            p.closePath();
          }, "#914c3a", "#3d2522", 2);
        }
      }
    }
    if (eq.accessory) {
      line(c, [[-17, -136], [0, -122], [19, -133]], "#c7ad70", 1.5);
      path(c, (p) => {
        p.moveTo(0, -126);
        p.lineTo(5, -119);
        p.lineTo(0, -112);
        p.lineTo(-5, -119);
        p.closePath();
      }, "#7bc7ca", "#d6b56e", 1.5);
    }
    c.restore();
    if (pose === "cast") {
      const orb = grad(c, frontHand[0] - 13, frontHand[1] - 30, frontHand[0] + 17, frontHand[1], ["#e0ffff", "#70cddc", "#267a98"]);
      c.shadowColor = "#55d9ef";
      c.shadowBlur = 25;
      ellipse(c, frontHand[0] + 9, frontHand[1] - 16, 11 + Math.sin(time * 5) * 2, 11, orb);
      c.shadowBlur = 0;
      for (let i = 0; i < 6; i++) {
        const t = time * 2 + i;
        ellipse(c, frontHand[0] + Math.cos(t) * 25, frontHand[1] - 16 + Math.sin(t) * 21, 1.8, 1.8, "#b3f3ea");
      }
    }
    c.restore();
  }
  function portraitCanvas(canvas, g, inventory, time = 0, pose = "idle") {
    const c = canvas.getContext("2d"), w2 = canvas.width, h = canvas.height;
    c.clearRect(0, 0, w2, h);
    const halo = c.createRadialGradient(w2 * 0.5, h * 0.45, 5, w2 * 0.5, h * 0.52, w2 * 0.65);
    halo.addColorStop(0, "#b8934c22");
    halo.addColorStop(1, "#5a422500");
    c.fillStyle = halo;
    c.fillRect(0, 0, w2, h);
    c.save();
    c.strokeStyle = "#ad8a4530";
    c.lineWidth = 1;
    c.beginPath();
    c.ellipse(w2 * 0.5, h * 0.55, w2 * 0.37, h * 0.4, 0, 0, TAU);
    c.stroke();
    c.restore();
    drawCharacter(c, g, w2 * 0.48, h - 12, Math.min(w2 / 145, (h - 18) / 238), false, time, pose, equipmentOf(g, inventory));
  }

  // js/ui/scenery.js
  var FACILITY_POS = { strength: [0.22, 0.43], agility: [0.37, 0.35], attack: [0.68, 0.35], defense: [0.82, 0.45], endurance: [0.18, 0.71], vitality: [0.37, 0.76], magic: [0.65, 0.73], charisma: [0.83, 0.7] };
  var TAU2 = Math.PI * 2;
  var cache = /* @__PURE__ */ new Map();
  function rng(seed) {
    return () => {
      seed = Math.imul(seed, 1664525) + 1013904223 | 0;
      return (seed >>> 0) / 4294967296;
    };
  }
  function polygon(c, pts, fill, stroke = null, width = 1) {
    c.beginPath();
    c.moveTo(...pts[0]);
    pts.slice(1).forEach((p) => c.lineTo(...p));
    c.closePath();
    c.fillStyle = fill;
    c.fill();
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = width;
      c.stroke();
    }
  }
  function ellipse2(c, x, y, rx, ry, color) {
    c.fillStyle = color;
    c.beginPath();
    c.ellipse(x, y, rx, ry, 0, 0, TAU2);
    c.fill();
  }
  function gradient(c, x, y, x2, y2, colors) {
    const g = c.createLinearGradient(x, y, x2, y2);
    colors.forEach((color, i) => g.addColorStop(i / (colors.length - 1), color));
    return g;
  }
  function line2(c, pts, color, width = 2) {
    c.beginPath();
    c.moveTo(...pts[0]);
    pts.slice(1).forEach((p) => c.lineTo(...p));
    c.strokeStyle = color;
    c.lineWidth = width;
    c.stroke();
  }
  function glow(c, x, y, r, color) {
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "#00000000");
    ellipse2(c, x, y, r, r, g);
  }
  function cached(key, w2, h, render2) {
    if (cache.has(key)) return cache.get(key);
    const canvas = document.createElement("canvas");
    canvas.width = w2;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.scale(w2 / 1600, h / 900);
    render2(ctx);
    if (cache.size > 6) cache.delete(cache.keys().next().value);
    cache.set(key, canvas);
    return canvas;
  }
  function pine(c, x, y, size, color) {
    c.fillStyle = "#211f1d";
    c.fillRect(x - size * 0.045, y - size * 0.2, size * 0.09, size * 0.3);
    for (let i = 0; i < 4; i++) {
      const yy = y - size + i * size * 0.2, ww = size * (0.21 + i * 0.11);
      polygon(c, [[x, yy], [x - ww, yy + size * 0.4], [x + ww, yy + size * 0.4]], color);
      line2(c, [[x, yy + size * 0.05], [x + ww * 0.7, yy + size * 0.32]], "#ffffff05", 1);
    }
  }
  function mountain(c, points, fill, highlight) {
    polygon(c, points, fill);
    for (let i = 1; i < points.length - 1; i += 2) polygon(c, [points[i], points[i + 1], [points[i][0] - 40, points[i][1] + 120]], highlight);
  }
  function stones(c, x, y, w2, h, rand, color = "#ffffff0a") {
    for (let i = 0; i < w2 * h / 130; i++) {
      const xx = x + rand() * w2, yy = y + rand() * h;
      c.fillStyle = i % 3 === 0 ? "#060b0b20" : color;
      c.fillRect(xx, yy, 2 + rand() * 4, 1 + rand() * 2);
    }
  }
  function wall(c, x, y, w2, h) {
    c.fillStyle = gradient(c, x, y, x, y + h, ["#a58d65", "#6f6650", "#514f41"]);
    c.fillRect(x, y, w2, h);
    c.strokeStyle = "#322f29";
    c.lineWidth = 1.3;
    for (let row = 0; row < Math.ceil(h / 16); row++) for (let col = 0; col < w2 / 36; col++) {
      const xx = x + col * 36 - (row % 2 ? 18 : 0);
      c.strokeRect(xx, y + row * 16, 36, 16);
    }
    c.fillStyle = "#b6a077";
    c.fillRect(x - 2, y - 4, w2 + 4, 7);
    for (let j = 0; j < w2; j += 27) c.fillRect(x + j, y - 15, 18, 15);
  }
  function house(c, x, y, w2, h, roof = "#655649", level = 1) {
    c.save();
    c.translate(x, y);
    ellipse2(c, 12, 10, w2 * 0.68, 22, "#080e0d55");
    const depth = w2 * 0.27;
    polygon(c, [[-w2 / 2, 0], [w2 / 2, 0], [w2 / 2, -h], [-w2 / 2, -h]], gradient(c, 0, -h, 0, 0, ["#b69c72", "#89704f", "#574c38"]), "#302e25", 2);
    polygon(c, [[w2 / 2, 0], [w2 / 2 + depth, -depth * 0.5], [w2 / 2 + depth, -h - depth * 0.5], [w2 / 2, -h]], "#5e5540", "#302e25", 2);
    for (let i = 0; i < 4; i++) line2(c, [[-w2 / 2, -h + i * h / 4], [w2 / 2, -h + i * h / 4]], "#423e2d40", 1);
    for (const xx of [-w2 * 0.4, w2 * 0.4]) {
      c.fillStyle = "#493c2c";
      c.fillRect(xx - 4, -h, 8, h);
      line2(c, [[xx - 2, -h], [xx - 2, 0]], "#b7955b", 1);
    }
    const apex = [0, -h - w2 * 0.37];
    polygon(c, [[-w2 * 0.64, -h + 6], apex, [w2 * 0.66, -h + 6]], gradient(c, 0, -h - w2 * 0.4, 0, -h, [roof, "#302f2c"]), "#202421", 3);
    polygon(c, [apex, [depth, -h - w2 * 0.37 - depth * 0.5], [w2 * 0.66 + depth, -h - depth * 0.5 + 6], [w2 * 0.66, -h + 6]], roof, "#292c26", 2);
    for (let j = 0; j < 5; j++) {
      const yy = -h - w2 * 0.31 + j * w2 * 0.075;
      const spread = (j + 1) * w2 * 0.11;
      line2(c, [[-spread, yy], [spread, yy]], "#c5b07a25", 2);
    }
    for (let j = 0; j < 7; j++) line2(c, [[w2 * 0.65 + j * depth / 6, -h + 5 - j * depth / 12], [j * depth / 6, -h - w2 * 0.37 - j * depth / 12]], "#bda37422", 1);
    c.fillStyle = "#2a2d24";
    c.beginPath();
    c.roundRect(-w2 * 0.12, -h * 0.65, w2 * 0.24, h * 0.65, [w2 * 0.12, w2 * 0.12, 0, 0]);
    c.fill();
    c.fillStyle = "#8d6638";
    c.fillRect(-w2 * 0.1, -h * 0.5, w2 * 0.2, h * 0.5);
    line2(c, [[0, -h * 0.5], [0, 0]], "#31271e", 2);
    ellipse2(c, w2 * 0.055, -h * 0.22, 2, 2, "#d9ae5e");
    for (const xx of [-w2 * 0.31, w2 * 0.3]) {
      c.fillStyle = "#2c352c";
      c.fillRect(xx - 9, -h * 0.68, 18, 23);
      c.fillStyle = "#e9bb62";
      c.fillRect(xx - 6, -h * 0.65, 12, 17);
      line2(c, [[xx, -h * 0.66], [xx, -h * 0.4]], "#5b492b", 2);
      line2(c, [[xx - 8, -h * 0.54], [xx + 8, -h * 0.54]], "#5b492b", 2);
    }
    if (level > 1) {
      line2(c, [[-w2 * 0.4, -h * 0.9], [w2 * 0.4, -h * 0.9]], "#c3a25d", 3);
      for (let i = 0; i < level; i++) ellipse2(c, -(level - 1) * 7 + i * 14, -h * 0.82, 2.5, 2.5, "#d6b363");
    }
    c.restore();
  }
  function tent(c, x, y, w2, color) {
    ellipse2(c, x + 7, y + 7, w2 * 0.65, 19, "#09100d50");
    polygon(c, [[x - w2 * 0.6, y], [x, y - w2 * 0.85], [x + w2 * 0.6, y]], gradient(c, x - w2 * 0.5, y - w2 * 0.6, x + w2 * 0.5, y, [color, "#584c3a"]), "#302e25", 2);
    polygon(c, [[x, y - w2 * 0.85], [x + w2 * 0.6, y], [x + w2 * 0.8, y - 18], [x + w2 * 0.22, y - w2 * 0.9]], color, "#302e25", 2);
    polygon(c, [[x - w2 * 0.15, y], [x, y - w2 * 0.5], [x + w2 * 0.15, y]], "#292c24");
    line2(c, [[x, y - w2 * 0.9], [x, y + 4]], "#b5aa84", 3);
    line2(c, [[x - w2 * 0.5, y - 8], [x - w2 * 0.7, y + 9]], "#a4a18a", 1);
  }
  function barrel(c, x, y, scale = 1) {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    c.fillStyle = gradient(c, -13, 0, 13, 0, ["#4d3826", "#a47b42", "#5d432b"]);
    c.beginPath();
    c.roundRect(-13, -29, 26, 30, 6);
    c.fill();
    ellipse2(c, 0, -28, 12, 4, "#b08a50");
    for (const yy of [-22, -7]) {
      c.fillStyle = "#444e45";
      c.fillRect(-13, yy, 26, 4);
      line2(c, [[-12, yy], [12, yy]], "#889180", 1);
    }
    line2(c, [[0, -24], [0, -9]], "#4b362a", 1);
    c.restore();
  }
  function target(c, x, y, size = 1) {
    c.save();
    c.translate(x, y);
    c.scale(size, size);
    line2(c, [[-11, 0], [0, -55], [12, 0]], "#6c4c2e", 7);
    for (let i = 4; i >= 1; i--) ellipse2(c, 0, -45, i * 7, i * 8, ["", "#923b2b", "#d1b778", "#69452e", "#a1854e"][i]);
    line2(c, [[4, -47], [31, -66]], "#bfab7d", 2);
    polygon(c, [[31, -66], [24, -64], [28, -60]], "#798b87");
    c.restore();
  }
  function banner(c, x, y, color, time, scale = 1) {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    line2(c, [[0, 0], [0, 100]], "#58442d", 5);
    line2(c, [[-4, 3], [43, 3]], "#c3a66b", 3);
    const wind = Math.sin(time * 1.8 + x) * 4;
    polygon(c, [[3, 5], [43, 7 + wind], [40, 70 + wind], [24, 83], [4, 70]], gradient(c, 2, 0, 45, 0, [color, "#29262a"]), "#221f1c", 1);
    line2(c, [[8, 10], [8, 66], [24, 77], [35, 67]], "#d7b77890", 1);
    polygon(c, [[24, 24], [31, 38], [24, 51], [17, 38]], "#d2b073");
    c.restore();
  }
  function torch(c, x, y, time, scale = 1) {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    glow(c, 0, -21, 62, "#f1a44428");
    line2(c, [[0, 4], [0, -20]], "#332b20", 6);
    line2(c, [[-9, -18], [9, -18]], "#8e7751", 3);
    const flick = Math.sin(time * 11 + x) * 3;
    polygon(c, [[-7, -19], [-9, -29], [0, -48 - flick], [5, -31], [9, -26], [6, -18]], "#d88332");
    polygon(c, [[-4, -20], [-4, -31], [1, -40 - flick], [5, -26], [3, -20]], "#f6cf68");
    ellipse2(c, 0, -25, 2, 5, "#fff4c6");
    c.restore();
  }
  function baseBackdrop(c, s) {
    const random = rng(7284);
    c.fillStyle = gradient(c, 0, 0, 0, 900, ["#243e4a", "#9b9b7b", "#b49a66"]);
    c.fillRect(0, 0, 1600, 900);
    glow(c, 1200, 115, 340, "#f0c47855");
    ellipse2(c, 1200, 112, 46, 46, "#eadbaa");
    mountain(c, [[0, 210], [130, 95], [290, 190], [480, 62], [670, 177], [830, 85], [1e3, 218], [1220, 74], [1450, 171], [1600, 93], [1600, 360], [0, 360]], "#42595a", "#607172");
    mountain(c, [[0, 260], [180, 185], [310, 243], [580, 139], [740, 243], [940, 163], [1080, 246], [1300, 165], [1510, 239], [1600, 184], [1600, 420], [0, 420]], "#354e46", "#4b6050");
    for (let i = 0; i < 90; i++) {
      const x = i * 19, y = 262 + Math.sin(i * 3.5) * 26;
      pine(c, x, y, 40 + random() * 67, "#263e35");
    }
    polygon(c, [[0, 302], [420, 258], [1040, 258], [1600, 330], [1600, 900], [0, 900]], gradient(c, 0, 300, 0, 900, ["#69704a", "#646340", "#35472e"]));
    ellipse2(c, 817, 579, 647, 264, gradient(c, 0, 330, 0, 845, ["#9c8a59", "#a58b55", "#72673e"]));
    c.save();
    c.strokeStyle = "#b5a16b70";
    c.lineWidth = 45;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(820, 875);
    c.bezierCurveTo(850, 700, 746, 493, 815, 283);
    c.stroke();
    c.beginPath();
    c.moveTo(180, 588);
    c.bezierCurveTo(539, 491, 1061, 483, 1430, 588);
    c.stroke();
    c.restore();
    stones(c, 80, 310, 1440, 590, random, "#d2b67b30");
    for (let i = 0; i < 200; i++) {
      const x = random() * 1600, y = 370 + random() * 520;
      if (x < 180 || x > 1440) {
        line2(c, [[x, y], [x + random() * 6 - 3, y - 7 - random() * 8]], "#82936555", 1);
      }
    }
    wall(c, 185, 307, 1220, 43);
    for (const x of [176, 1379]) {
      house(c, x, 355, 53, 91, "#56605b", s.housing);
    }
    house(c, 787, 331, 220, 105, "#596762", s.housing);
    c.fillStyle = "#443a2c";
    c.fillRect(768, 178, 12, 43);
    c.fillStyle = "#c5a56a";
    c.fillRect(760, 176, 27, 5);
    for (let i = 0; i < 5; i++) ellipse2(c, 775 + Math.sin(i * 3) * 5, 162 - i * 10, 8 + i * 5, 7 + i * 3, `rgba(180,182,158,${0.13 - i * 0.018})`);
    for (const [key, [px, py]] of Object.entries(FACILITY_POS)) {
      const x = px * 1600, y = py * 900, level = s.buildings[key];
      ellipse2(c, x + 12, y + 27, 100, 38, "#2c372040");
      if (key === "strength") {
        house(c, x - 17, y - 8, 130, 73, "#7e5140", level);
        c.fillStyle = "#3b352c";
        c.fillRect(x - 72, y - 79, 29, 58);
        c.fillStyle = "#ed9a48";
        c.fillRect(x - 66, y - 64, 17, 21);
        glow(c, x - 56, y - 53, 45, "#ff9c392d");
        polygon(c, [[x + 29, y + 20], [x + 72, y + 20], [x + 83, y + 10], [x + 34, y + 9], [x + 18, y + 13]], "#91a29b", "#28332c", 2);
        polygon(c, [[x + 41, y + 19], [x + 61, y + 19], [x + 57, y + 37], [x + 38, y + 37]], "#4d5d54");
        barrel(c, x - 75, y + 27, 0.7);
      } else if (key === "agility") {
        tent(c, x - 13, y - 7, 96, "#73764c");
        for (let i = 0; i < 4; i++) {
          const xx = x - 78 + i * 46;
          line2(c, [[xx, y + 37], [xx, y - 4]], "#695137", 8);
          line2(c, [[xx - 10, y - 3], [xx + 11, y - 3]], "#bda370", 4);
        }
        line2(c, [[x - 78, y + 10], [x + 60, y + 10]], "#baa880", 2);
      } else if (key === "attack") {
        house(c, x + 18, y - 12, 125, 64, "#6c5d43", level);
        target(c, x - 67, y + 31, 0.75);
        target(c, x + 3, y + 34, 0.9);
        barrel(c, x + 85, y + 20, 0.8);
      } else if (key === "defense") {
        house(c, x, y, 143, 89, "#505e5e", level);
        for (let i = 0; i < 3; i++) {
          const xx = x - 62 + i * 54;
          line2(c, [[xx, y + 29], [xx, y - 6]], "#6a5034", 6);
          polygon(c, [[xx - 15, y - 9], [xx + 15, y - 9], [xx + 12, y + 15], [xx, y + 25], [xx - 12, y + 15]], i % 2 ? "#7e6650" : "#687d78", "#b6a073", 2);
        }
      } else if (key === "endurance") {
        c.strokeStyle = "#c3ac76";
        c.lineWidth = 7;
        c.beginPath();
        c.ellipse(x, y, 113, 43, -0.15, 0, TAU2);
        c.stroke();
        c.strokeStyle = "#7c6e43";
        c.lineWidth = 2;
        c.beginPath();
        c.ellipse(x, y, 95, 32, -0.15, 0, TAU2);
        c.stroke();
        for (let j = 0; j < 3; j++) {
          const xx = x - 62 + j * 60;
          line2(c, [[xx, y + 26], [xx, y + 2], [xx + 34, y - 4], [xx + 34, y + 20]], "#5f4930", 7);
        }
        barrel(c, x - 91, y - 23, 0.8);
      } else if (key === "vitality") {
        tent(c, x, y - 1, 122, "#bcb68a");
        c.fillStyle = "#658b6a";
        c.fillRect(x - 8, y - 74, 18, 39);
        c.fillRect(x - 19, y - 64, 40, 17);
        for (let j = 0; j < 4; j++) {
          const xx = x - 83 + j * 52;
          ellipse2(c, xx, y + 20, 14, 6, "#4e4731");
          for (let k = 0; k < 5; k++) ellipse2(c, xx + k * 3 - 6, y + 7 - k % 2 * 4, 5, 10, k % 2 ? "#7b9860" : "#537f54");
        }
      } else if (key === "magic") {
        house(c, x, y - 4, 132, 118, "#415e6b", level);
        polygon(c, [[x - 20, y - 148], [x, y - 205], [x + 25, y - 148], [x, y - 124]], gradient(c, x - 20, y - 200, x + 25, y - 130, ["#a1e6e4", "#3f8399", "#245363"]), "#162d36", 3);
        line2(c, [[x, y - 197], [x, y - 135]], "#cffcf0", 1.5);
        c.strokeStyle = "#64afa588";
        c.lineWidth = 2;
        c.beginPath();
        c.ellipse(x, y + 21, 95, 27, 0, 0, TAU2);
        c.stroke();
        for (let i = 0; i < 8; i++) {
          const a = i * TAU2 / 8;
          line2(c, [[x + Math.cos(a) * 86, y + 21 + Math.sin(a) * 23], [x + Math.cos(a) * 98, y + 21 + Math.sin(a) * 29]], "#a4c6a4", 2);
        }
      } else {
        house(c, x - 2, y - 12, 142, 82, "#825e4e", level);
        polygon(c, [[x - 63, y + 10], [x + 54, y + 10], [x + 73, y + 24], [x - 81, y + 24]], "#756342", "#453d2d", 2);
        c.fillStyle = "#574b32";
        c.fillRect(x - 15, y - 25, 32, 42);
        polygon(c, [[x - 20, y - 25], [x + 18, y - 27], [x + 25, y - 20], [x - 18, y - 17]], "#c1ab74");
      }
      if (level > 1) {
        for (let j = 0; j < level - 1; j++) {
          ellipse2(c, x - 22 + j * 14, y + 43, 2.3, 2.3, "#dfc377");
        }
      }
    }
    for (const [x, y] of [[624, 430], [943, 402], [1302, 577], [235, 571]]) {
      barrel(c, x, y, 0.85);
      barrel(c, x + 22, y + 8, 0.6);
    }
    for (let i = 0; i < 24; i++) {
      const x = i < 12 ? random() * 140 : 1460 + random() * 160, y = 460 + random() * 500;
      pine(c, x, y, 90 + random() * 120, i % 2 ? "#243c2c" : "#2e4932");
    }
    c.fillStyle = gradient(c, 0, 0, 0, 900, ["#07131250", "#07131200", "#07131200", "#071312a0"]);
    c.fillRect(0, 0, 1600, 900);
  }
  function drawBase(canvas, s, time) {
    const c = canvas.getContext("2d"), w2 = canvas.width, h = canvas.height, key = `base:${w2}:${h}:${s.housing}:${Object.values(s.buildings).join(",")}`;
    c.drawImage(cached(key, w2, h, (ctx) => baseBackdrop(ctx, s)), 0, 0);
    c.save();
    c.scale(w2 / 1600, h / 900);
    banner(c, 634, 275, "#814a36", time, 0.72);
    banner(c, 967, 275, "#814a36", time, 0.72);
    for (const [xx, yy] of [[276, 481], [1315, 489], [767, 371], [901, 371], [555, 697], [1212, 686]]) torch(c, xx, yy, time, 0.7);
    const mx = FACILITY_POS.magic[0] * 1600, my = FACILITY_POS.magic[1] * 900;
    glow(c, mx, my - 152, 64 + Math.sin(time * 2) * 7, "#70d8de24");
    for (let i = 0; i < 9; i++) {
      const a = time * 0.5 + i * TAU2 / 9;
      ellipse2(c, mx + Math.cos(a) * 51, my - 150 + Math.sin(a) * 22, 1.4, 1.4, "#b4f0df");
    }
    for (const [key2, [px, py]] of Object.entries(FACILITY_POS)) {
      const trainees = s.gladiators.filter((g) => g.training === key2);
      trainees.forEach((g, i) => {
        const x = px * 1600 - 40 + i * 29, y = py * 900 + 43;
        drawCharacter(c, g, x, y, 0.31, false, time, "train", equipmentOf(g, s.inventory));
      });
    }
    s.gladiators.filter((g) => !g.training).slice(0, 9).forEach((g, i) => {
      const x = 686 + i % 4 * 64 + Math.sin(time * 0.3 + i) * 14, y = 508 + Math.floor(i / 4) * 40;
      drawCharacter(c, g, x, y, 0.37, i % 2 === 0, time, g.recovery ? "rest" : "idle", equipmentOf(g, s.inventory));
    });
    for (let i = 0; i < 26; i++) {
      const x = (i * 137 + time * (7 + i % 3)) % 1600, y = 390 + i * 79 % 420 + Math.sin(time + i) * 12;
      c.globalAlpha = 0.15 + 0.2 * Math.sin(time * 0.8 + i) ** 2;
      ellipse2(c, x, y, i % 3 === 0 ? 1.8 : 1, 1, "#f0c672");
    }
    c.globalAlpha = 1;
    c.restore();
  }
  function arenaBackdrop(c, type) {
    const night = type === "imperial", stone = type === "stone", r = rng(8721);
    c.fillStyle = gradient(c, 0, 0, 0, 900, night ? ["#101b2b", "#3d425a", "#977355"] : stone ? ["#253d49", "#6e8a8a", "#a7a188"] : ["#263e4b", "#a4a789", "#e0bb76"]);
    c.fillRect(0, 0, 1600, 900);
    glow(c, 1187, 142, 400, night ? "#8c9cb92a" : "#f0d38c60");
    ellipse2(c, 1187, 142, night ? 44 : 52, night ? 44 : 52, night ? "#cedbc5" : "#f2dca0");
    mountain(c, [[0, 299], [150, 194], [302, 255], [524, 146], [700, 230], [892, 173], [1082, 258], [1320, 182], [1600, 305], [1600, 430], [0, 430]], night ? "#263445" : "#6d7b74", night ? "#334153" : "#8a9180");
    for (let tier = 0; tier < 3; tier++) {
      const y = 210 + tier * 105;
      c.fillStyle = gradient(c, 0, y, 0, y + 114, [night ? "#67716d" : "#afa17d", night ? "#3c514f" : "#6e7560"]);
      c.beginPath();
      c.moveTo(0, y - 35);
      c.quadraticCurveTo(800, y + 50, 1600, y - 35);
      c.lineTo(1600, y + 104);
      c.quadraticCurveTo(800, y + 170, 0, y + 104);
      c.closePath();
      c.fill();
      for (let i = 0; i < 18; i++) {
        const x = i * 100 - 45, curve = Math.sin((x + 45) / 1600 * Math.PI) * 45;
        const archY = y + 8 + curve;
        c.fillStyle = night ? "#172f37" : "#414f45";
        c.beginPath();
        c.roundRect(x + 20, archY, 48, 77, [24, 24, 0, 0]);
        c.fill();
        c.strokeStyle = night ? "#8b908075" : "#c9b68a";
        c.lineWidth = 8;
        c.beginPath();
        c.roundRect(x + 17, archY - 3, 54, 83, [28, 28, 0, 0]);
        c.stroke();
        c.strokeStyle = "#292e2944";
        c.lineWidth = 1;
        for (let j = 0; j < 4; j++) {
          c.beginPath();
          c.moveTo(x + 6, archY + j * 22);
          c.lineTo(x + 15, archY + j * 22);
          c.stroke();
        }
        if (tier === 1) {
          c.fillStyle = "#d4ad6750";
          c.fillRect(x + 37, archY + 39, 7, 12);
        }
      }
      c.strokeStyle = night ? "#b3aa8d" : "#e1cba0";
      c.lineWidth = 8;
      c.beginPath();
      c.moveTo(0, y + 104);
      c.quadraticCurveTo(800, y + 170, 1600, y + 104);
      c.stroke();
    }
    for (let row = 0; row < 4; row++) for (let i = 0; i < 100; i++) {
      const x = i * 17 + row % 2 * 8, curve = Math.sin(x / 1600 * Math.PI) * 35, y = 463 + row * 13 + curve;
      const colors = night ? ["#7b8376", "#8b6d57", "#596c72", "#a18a68"] : ["#a8aa8b", "#9b6848", "#566b67", "#c2ae7a"];
      c.fillStyle = colors[(i * 7 + row) % 4];
      c.beginPath();
      c.roundRect(x - 3, y + 3, 7, 11, [3, 3, 0, 0]);
      c.fill();
      ellipse2(c, x, y, 3.5, 4.5, i % 5 === 0 ? "#b69b72" : "#7d806c");
    }
    c.fillStyle = gradient(c, 0, 530, 0, 630, night ? ["#8d8771", "#4a564c"] : ["#c1ac7e", "#7e805f"]);
    c.beginPath();
    c.moveTo(0, 518);
    c.quadraticCurveTo(800, 590, 1600, 518);
    c.lineTo(1600, 620);
    c.quadraticCurveTo(800, 659, 0, 620);
    c.closePath();
    c.fill();
    for (let row = 0; row < 3; row++) for (let i = 0; i < 30; i++) {
      const x = i * 57 - (row % 2 ? 25 : 0), y = 530 + row * 26 + Math.sin(x / 1600 * Math.PI) * 40;
      c.strokeStyle = "#333d3355";
      c.lineWidth = 1.5;
      c.strokeRect(x, y, 57, 25);
      line2(c, [[x + 2, y + 1], [x + 53, y + 1]], "#e7d3a040", 1);
    }
    for (const x of [38, 1422]) {
      polygon(c, [[x, 310], [x + 142, 310], [x + 142, 664], [x, 647]], gradient(c, x, 0, x + 142, 0, ["#6d705b", "#a59b76", "#454e44"]), "#334036", 3);
      c.fillStyle = "#182b2a";
      c.beginPath();
      c.roundRect(x + 23, 462, 96, 177, [46, 46, 0, 0]);
      c.fill();
      for (let j = 0; j < 6; j++) line2(c, [[x + 32 + j * 15, 483], [x + 32 + j * 15, 638]], "#4f6457", 5);
      line2(c, [[x + 20, 573], [x + 120, 573]], "#72806a", 6);
      c.fillStyle = "#afa17a";
      c.fillRect(x - 8, 303, 159, 17);
      for (let j = 0; j < 5; j++) {
        c.fillRect(x + j * 32 - 3, 286, 23, 23);
      }
    }
    c.fillStyle = gradient(c, 0, 618, 0, 900, night ? ["#827557", "#a18c60", "#4d4d37"] : ["#b9a070", "#d4b67d", "#877647"]);
    c.beginPath();
    c.moveTo(0, 642);
    c.quadraticCurveTo(800, 694, 1600, 642);
    c.lineTo(1600, 900);
    c.lineTo(0, 900);
    c.closePath();
    c.fill();
    ellipse2(c, 800, 781, 668, 99, "#dbbc7d16");
    c.strokeStyle = "#d8bf8870";
    c.lineWidth = 3;
    c.beginPath();
    c.ellipse(800, 793, 650, 101, 0, 0, TAU2);
    c.stroke();
    stones(c, 0, 661, 1600, 239, r, night ? "#d6bd7930" : "#f4d39860");
    for (let i = 0; i < 45; i++) {
      const x = r() * 1600, y = 674 + r() * 209;
      line2(c, [[x, y], [x + 7 + r() * 12, y - 2]], "#6b59372b", 1);
    }
    for (const x of [274, 1280]) {
      c.fillStyle = "#4b4636";
      c.fillRect(x - 13, 618, 27, 67);
      ellipse2(c, x, 618, 22, 7, "#7a7355");
      line2(c, [[x - 15, 622], [x + 15, 622]], "#ad9b69", 3);
    }
    const vignette = c.createRadialGradient(800, 540, 180, 800, 520, 920);
    vignette.addColorStop(0, "#00000000");
    vignette.addColorStop(0.65, "#0612140c");
    vignette.addColorStop(1, "#061214b0");
    c.fillStyle = vignette;
    c.fillRect(0, 0, 1600, 900);
  }
  function drawArena(canvas, b, time, progress = 1, previous = null) {
    const c = canvas.getContext("2d"), w2 = canvas.width, h = canvas.height, type = b.meta.arena || "regional";
    c.clearRect(0, 0, w2, h);
    c.drawImage(cached(`arena:${w2}:${h}:${type}`, w2, h, (ctx) => arenaBackdrop(ctx, type)), 0, 0);
    c.save();
    c.scale(w2 / 1600, h / 900);
    banner(c, 193, 315, type === "imperial" ? "#735174" : "#a2643f", time, 1.15);
    banner(c, 1362, 315, type === "imperial" ? "#735174" : "#a2643f", time, 1.15);
    torch(c, 274, 630, time, 1.3);
    torch(c, 1280, 630, time, 1.3);
    const positions = b.fighters.map((f, i) => {
      const before = previous?.[i] ?? f.pos;
      return before + (f.pos - before) * Math.min(1, progress * 2.8);
    });
    const px = (pos) => 190 + pos / 10 * 1220;
    b.fighters.forEach((f, i) => {
      const x = px(positions[i]), y = 808;
      if (f.buffs.guard || f.buffs.shield) {
        c.strokeStyle = f.buffs.shield ? "#91c7df90" : "#e4c16d60";
        c.lineWidth = 3;
        c.beginPath();
        c.ellipse(x, y - 144, 66, 150, 0, 0, TAU2);
        c.stroke();
        glow(c, x, y - 100, 120, f.buffs.shield ? "#81bedb12" : "#e0c8770d");
      }
      drawCharacter(c, f, x, y, 1.54, i === 1, time, b.result || progress < 0.85 ? f.animation : "idle", f.gear);
      if (f.buffs.burn) {
        glow(c, x, y - 25, 65, "#e6a44c20");
        for (let j = 0; j < 5; j++) ellipse2(c, x + Math.sin(time * 3 + j) * 28, y - 30 - (time * 30 + j * 17) % 80, 2, 3, "#e8ab65");
      }
    });
    const e = b.lastEvent;
    if (e && progress < 1) {
      const x1 = px(positions[e.actor]), x2 = px(positions[1 - e.actor]), impact = Math.sin(Math.PI * progress);
      if (e.action === "spell") {
        const spell = ITEMS[e.spell], self = spell && !spell.range, flame = spell?.effect === "burn", healing = ["heal", "energy"].includes(spell?.effect);
        const xx = self ? x1 : x1 + (x2 - x1) * Math.min(1, progress * 1.5), yy = self ? 663 : 640 - Math.sin(progress * Math.PI) * 45;
        if (self) {
          c.strokeStyle = healing ? "#c6df8ba0" : "#8cdddfaa";
          c.lineWidth = 3;
          c.beginPath();
          c.ellipse(xx, yy + 92, 54 + impact * 20, 16, 0, 0, TAU2);
          c.stroke();
          for (let j = 0; j < 8; j++) {
            const a = j * TAU2 / 8 + progress * 2;
            ellipse2(c, xx + Math.cos(a) * 45, yy + 65 - progress * 100 + j % 3 * 12, 2, 3, healing ? "#e9efac" : "#a7e9e5");
          }
          glow(c, xx, yy, 100, healing ? "#abc96b25" : "#6fcfdf25");
        } else {
          glow(c, xx, yy, 80, flame ? "#efaf4545" : "#77d9ee45");
          c.strokeStyle = flame ? "#f7c676" : "#a6e5e6";
          c.lineWidth = 3;
          c.beginPath();
          c.moveTo(xx - (x2 > x1 ? 1 : -1) * 50, yy + 3);
          c.lineTo(xx, yy);
          c.stroke();
          if (spell?.effect === "slow") polygon(c, [[xx, yy - 18], [xx + 9, yy], [xx, yy + 18], [xx - 9, yy]], "#c9fff5", "#77bccf", 2);
          else ellipse2(c, xx, yy, 10 + impact * 3, 10, gradient(c, xx - 10, yy, xx + 10, yy, flame ? ["#fffbd3", "#ffd573", "#cf6635"] : ["#f4fff1", "#8fe8df", "#2b8faf"]));
        }
      }
      if (e.action === "rapid" || e.action === "normal" || e.action === "power") {
        c.save();
        c.translate((x1 + x2) * 0.5, 653);
        c.rotate(e.actor ? -0.4 : 0.4);
        c.strokeStyle = `rgba(247,226,174,${impact * 0.7})`;
        c.lineWidth = e.action === "power" ? 8 : 4;
        c.beginPath();
        c.arc(0, 0, e.action === "power" ? 84 : 61, -1.8, -0.05);
        c.stroke();
        c.restore();
      }
      if (e.damage) {
        const tx = x2 + Math.sin(progress * 5) * 4, ty = 484 - progress * 63;
        c.globalAlpha = Math.min(1, (1 - progress) * 2);
        c.font = "bold 40px Georgia";
        c.textAlign = "center";
        c.lineWidth = 5;
        c.strokeStyle = "#251c18";
        c.strokeText(`−${e.damage}`, tx, ty);
        c.fillStyle = e.damage >= 25 ? "#ffd07b" : "#fff1cf";
        c.fillText(`−${e.damage}`, tx, ty);
        c.globalAlpha = 1;
        if (progress < 0.5) {
          for (let i = 0; i < 8; i++) {
            const a = i * TAU2 / 8, d = progress * 95;
            line2(c, [[x2 + Math.cos(a) * d, 654 + Math.sin(a) * d], [x2 + Math.cos(a) * (d + 9), 654 + Math.sin(a) * (d + 9)]], "#f9d28290", 2);
          }
        }
      }
    }
    for (let i = 0; i < 27; i++) {
      const xx = (i * 127 + time * 9) % 1600, yy = 710 + i * 13 % 157;
      ellipse2(c, xx, yy + Math.sin(time + i) * 7, i % 4 === 0 ? 2 : 1, 1, "#f5cf9025");
    }
    c.restore();
  }
  function drawMenu(canvas, b, time) {
    drawArena(canvas, b, time, 1);
    const c = canvas.getContext("2d"), w2 = canvas.width, h = canvas.height;
    c.fillStyle = gradient(c, 0, 0, w2, 0, ["#081012f5", "#081012e0", "#08101230", "#08101212"]);
    c.fillRect(0, 0, w2, h);
    c.fillStyle = gradient(c, 0, 0, 0, h, ["#02080950", "#02080900", "#020809a0"]);
    c.fillRect(0, 0, w2, h);
  }
  function drawFacility(canvas, s, stat, time) {
    const c = canvas.getContext("2d"), [px, py] = FACILITY_POS[stat], key = `base:1600:900:${s.housing}:${Object.values(s.buildings).join(",")}`;
    const image = cached(key, 1600, 900, (ctx) => baseBackdrop(ctx, s));
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(image, px * 1600 - 155, py * 900 - 220, 330, 270, 0, 0, canvas.width, canvas.height);
    c.fillStyle = gradient(c, 0, 0, 0, canvas.height, ["#16262310", "#16262300", "#162623cc"]);
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (stat === "magic") glow(c, canvas.width * 0.46, canvas.height * 0.1, 38 + Math.sin(time * 2) * 4, "#98dfe521");
  }

  // js/ui/components.js
  var crest = `<svg class="crest" viewBox="0 0 64 72" aria-hidden="true"><path d="M10 5h44v40L32 65 10 45Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 12h32v30L32 56 16 42Z" fill="currentColor" opacity=".09"/><path d="m23 24 20 20m-2-22L21 44m-1-22 5 5m14 14 5 5m-3-24-5 5M25 41l-5 5" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="15" r="2" fill="currentColor"/></svg>`;
  var btn = (text, action, attrs = "", cls = "") => `<button class="btn ${cls}" data-action="${action}" ${attrs}>${text}</button>`;
  var tag = (text, cls = "") => `<span class="tag ${cls}">${esc(text)}</span>`;
  var portrait = (g, cls = "", width = 180, height = 205) => `<canvas class="portrait ${cls}" data-character="${esc(g.id)}" width="${width}" height="${height}" aria-label="Retrato de ${esc(g.name)}"></canvas>`;
  var traits = (g) => g.traits.map((t) => tag(TRAITS[t].name)).join("");
  var statGrid = (g, progress = false) => `<div class="stats-grid">${Object.entries(STATS).map(([key, label]) => `<div class="attribute"><span>${glyph(key, 16)} ${label}</span><strong>${g.stats[key]}</strong>${progress ? `<div class="meter tiny"><i style="width:${Math.min(100, g.statXP[key] / statThreshold(g.stats[key]) * 100)}%"></i></div><small>${Math.floor(g.statXP[key])} / ${statThreshold(g.stats[key])} XP</small>` : ""}</div>`).join("")}</div>`;
  var empty = (title, description, action = "market", label = "Visitar el mercado") => `<div class="empty"><span class="empty-symbol">♜</span><h2>${esc(title)}</h2><p>${esc(description)}</p>${btn(label, "navigate", `data-page="${action}"`, "primary")}</div>`;
  var sectionHeading = (eyebrow, title, description = "", action = "") => `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${description ? `<p class="lead">${description}</p>` : ""}</div>${action}</div>`;
  function selectGladiator(s, ui2, label = "Gladiador seleccionado") {
    return `<label class="select-label">${label}<select id="gladiator-select" ${!s.gladiators.length ? "disabled" : ""}>${s.gladiators.length ? s.gladiators.map((g) => `<option value="${esc(g.id)}" ${ui2.selected === g.id ? "selected" : ""}>${esc(g.name)} · nivel ${g.level}</option>`).join("") : "<option>Adquiere un contrato en el mercado</option>"}</select></label>`;
  }
  var status = (g) => g.recovery ? `Recuperación · ${g.recovery} d` : g.training ? `Entrena ${STATS[g.training].toLowerCase()}` : g.health < 0.65 || g.condition < 60 ? "Necesita descanso" : "Disponible";
  var requirements = (g, item) => Object.entries(item.requirements).map(([k, n]) => `<span class="requirement ${g ? g.stats[k] < n ? "unmet" : "met" : ""}">${STATS[k]} ${n}${g ? ` / ${g.stats[k]}` : ""}</span>`).join("") || '<span class="requirement">Sin requisitos</span>';
  var itemSymbol = (item) => itemArt(item);
  function itemDetails(item) {
    return item.category === "weapon" ? `${item.damage} daño · alcance ${item.minRange}–${item.range}<br>${item.energy} energía · velocidad ${item.speed}${item.twoHanded ? " · dos manos" : ""}${item.effect === "pierce" ? "<br>Penetra parte de la armadura" : ""}` : item.category === "scroll" ? `${item.mana} maná · alcance ${item.range || "propio"} · recarga ${item.cooldown} t<br>${esc(item.description)}` : `${item.protection} protección · ${item.weight} peso<br>${SLOTS[item.slot]}${item.weight ? " · +" + Math.round(item.weight * 2.5) + " % coste de energía" : ""}`;
  }
  var gold = (n) => `<span class="coin">${glyph("gold", 17)}</span> ${money(n)}`;
  var progressBar = (label, value, max, cls = "") => `<div class="resource ${cls}"><div><span>${label}</span><strong>${Math.ceil(value)} / ${max}</strong></div><div class="meter"><i style="width:${Math.max(0, Math.min(100, value / max * 100))}%"></i></div></div>`;
  var weaponTypeName = (type) => ({ sword: "Espada", dagger: "Daga", axe: "Hacha", mace: "Maza", spear: "Lanza", staff: "Bastón", bow: "Arco", crossbow: "Ballesta", fist: "Puños" })[type] || "Arma";

  // js/ui/screens.js
  var NAV = [["base", "⌂", "La base"], ["gladiators", "♟", "Gladiadores"], ["market", "⚖", "Mercado"], ["training", "⚒", "Entrenamiento"], ["shops", "◇", "Tiendas"], ["inventory", "▣", "Inventario"], ["arena", "⚔", "Arena"], ["tournaments", "♜", "Torneos"], ["history", "≡", "Historial"]];
  function shell(s, ui2, content) {
    const year = 1 + Math.floor((s.day - 1) / 360), day = (s.day - 1) % 360 + 1;
    return `<div class="game-shell"><header class="topbar"><a class="brand" href="#base" data-action="navigate" data-page="base">${crest}<span>CASA DE <b>CENIZA</b><small>SEÑOR DEL LUDUS</small></span></a><div class="calendar"><span class="sun">${glyph("sun", 24)}</span><div>Día ${day}<small>AÑO ${year}</small></div></div><div class="top-resources"><div><span class="coin">${glyph("gold", 25)}</span><strong>${money(s.gold)}</strong><small>ORO</small></div><div><span class="fame-icon">${glyph("tournaments", 24)}</span><strong>${s.prestige}</strong><small>PRESTIGIO</small></div><div><span>${glyph("gladiators", 24)}</span><strong>${s.gladiators.length}<em> / ${RULES.capacity[s.housing]}</em></strong><small>GLADIADORES</small></div></div>${btn("Avanzar día <span>»</span>", "day", "", "primary next-day")}</header>${ui2.saveError ? `<div class="warning">${esc(ui2.saveError)}</div>` : ""}<main id="main-content" class="screen-${ui2.page}">${content}</main><aside class="sidebar"><nav aria-label="Navegación principal">${NAV.map(([id2, icon, label]) => `<button class="nav-item ${ui2.page === id2 ? "active" : ""}" data-action="navigate" data-page="${id2}"><span>${glyph(id2, 26)}</span><b>${label}</b>${id2 === "gladiators" && s.gladiators.length ? `<small>${s.gladiators.length}</small>` : id2 === "arena" && s.battle && !s.battle.result ? '<small class="live">●</small>' : ""}</button>`).join("")}</nav><div class="sidebar-bottom"><button class="utility-button" data-action="save" title="Guardar partida" aria-label="Guardar partida">${glyph("save", 21)}</button><button class="utility-button ${ui2.page === "options" ? "active" : ""}" data-action="navigate" data-page="options" title="Opciones y ayuda" aria-label="Opciones y ayuda">${glyph("options", 21)}</button><button class="utility-button" data-action="fullscreen" title="Pantalla completa" aria-label="Pantalla completa">${glyph("fullscreen", 21)}</button></div></aside></div>`;
  }
  function menu(s, ui2) {
    return `<main class="main-menu"><canvas id="menu-canvas" width="1600" height="900" aria-hidden="true"></canvas><div class="menu-vignette"></div><div class="menu-content"><div class="menu-kicker"><span></span> CRÓNICAS DE LA ARENA <span></span></div>${crest}<h1>CASA DE<br><span>CENIZA</span></h1><div class="ornament">◆</div><p>De las cenizas de un condenado,<br>puede nacer una leyenda.</p><div class="menu-actions">${btn('Continuar partida <span aria-hidden="true">»</span>', "continue", s ? 'aria-label="Continuar partida"' : 'aria-label="Continuar partida" disabled', "primary")}${btn('Nueva partida <span aria-hidden="true">»</span>', "new-game", 'aria-label="Nueva partida"', "light")}${btn("Opciones y ayuda", "menu-options", "", "text-button")}</div>${ui2.menuOptions ? `<div class="menu-options"><h3>Tu casa. Tu historia.</h3><p>Compra contratos, entrena y equipa a tus gladiadores. Ellos luchan con su propia IA. La partida se guarda en este navegador.</p>${btn("Importar partida", "import")}${btn("Volver", "menu-options")}</div>` : ""}${ui2.loadError ? `<div class="warning">${esc(ui2.loadError)}</div>` : ""}<small>UN JUEGO DE GESTIÓN Y COMBATE TÁCTICO</small></div><div class="menu-world-caption"><span>EL COLISEO DEL ÚLTIMO SOL</span><p>La gloria no se hereda. Se forja.</p></div></main>`;
  }
  function baseScreen(s, ui2) {
    const ready = s.gladiators.filter((g) => !g.recovery && g.health >= 0.65 && g.condition >= 60).length;
    return `<div class="base-layout"><section class="base-world"><canvas id="base-canvas" width="1600" height="900" aria-label="Campamento medieval ilustrado con ocho instalaciones de entrenamiento"></canvas><div class="world-title"><p class="eyebrow">EL LUDUS · NIVEL ${s.housing}</p><h1>Casa de Ceniza</h1><span>${ready} preparados <i>◆</i> ${s.gladiators.filter((g) => g.training).length} entrenando <i>◆</i> ${s.gladiators.filter((g) => g.recovery).length} descansando</span></div><div class="world-housing"><span>${glyph("base", 23)}</span><div><small>ALOJAMIENTO</small><strong>${s.gladiators.length} / ${RULES.capacity[s.housing]} plazas</strong></div>${s.housing < 5 ? btn(`Ampliar · ${gold(RULES.housingCost[s.housing])}`, "upgrade", 'data-stat="housing"') : tag("NIVEL MÁXIMO")}</div><div class="base-hotspots">${Object.entries(FACILITY_POS).map(([key, [x, y]]) => `<button class="map-label" style="left:${x * 100}%;top:${y * 100 + 6.5}%" data-action="facility" data-stat="${key}" aria-label="${BUILDINGS[key]}, nivel ${s.buildings[key]}"><span>${glyph(key, 17)}</span><b>${STATS[key]}</b><small>${s.buildings[key]}</small></button>`).join("")}</div><div class="world-quest"><div class="quest-seal">${glyph(!s.gladiators.length ? "market" : "arena", 29)}</div><div><p class="eyebrow">${!s.gladiators.length ? "EL PRIMER CONTRATO" : "LA ARENA TE ESPERA"}</p><h3>${!s.gladiators.length ? "Toda casa necesita un campeón." : "Es hora de ponerlos a prueba."}</h3>${btn(!s.gladiators.length ? "Ir al mercado »" : "Preparar un duelo »", "navigate", `data-page="${!s.gladiators.length ? "market" : "arena"}"`, "primary")}</div></div><div class="world-caption"><span>MARCA DEL ÁMBAR</span><small>Territorio de tu casa</small></div></section><section class="base-roster"><div class="roster-title"><span>${glyph("gladiators", 26)}</span><div><small>BAJO TU ESTANDARTE</small><h2>Tus gladiadores</h2></div>${btn("Ver todos »", "navigate", 'data-page="gladiators"', "text-button")}</div>${s.gladiators.length ? `<div class="roster-strip">${s.gladiators.slice(0, 4).map((g) => `<button class="mini-gladiator" data-action="profile" data-id="${esc(g.id)}">${portrait(g, "", 100, 130)}<div><small>NIVEL ${g.level}</small><h3>${esc(g.name)}</h3><p><i class="status-dot ${g.recovery ? "amber" : ""}"></i>${status(g)}</p></div><span>›</span></button>`).join("")}</div>` : `<div class="empty-roster"><p>Las puertas están abiertas.<br><strong>Tu primera leyenda espera en el mercado.</strong></p>${btn("Adquirir un contrato »", "navigate", 'data-page="market"')}</div>`}</section><div class="world-journal"><span>${glyph("history", 16)} DÍA ${s.history[0].day}</span><p>${esc(s.history[0].text)}</p>${btn("Crónicas »", "navigate", 'data-page="history"', "text-button")}</div></div>`;
  }
  function marketScreen(s) {
    return `${sectionHeading("UNA SEGUNDA OPORTUNIDAD", "Mercado de Condenados", "No eliges su pasado. Tú decides lo que viene después.", tag("NUEVOS CONTRATOS CADA 3 DÍAS"))}<div class="notice"><span>${glyph("market", 26)}</span><p>Todos los aspirantes son adultos. El potencial es una estimación incierta; el precio refleja su capacidad actual, estado y demanda.</p><strong>${s.gladiators.length}/${RULES.capacity[s.housing]} plazas</strong></div><div class="market-grid">${s.market.map((g, i) => `<article class="panel market-card"><div class="card-ribbon"><span>CONTRATO ${String(i + 1).padStart(2, "0")}</span>${tag("Nivel " + g.level)}</div><div class="market-portrait">${portrait(g)}<span class="portrait-caption">${esc(g.region)}</span></div><div class="market-info"><p class="eyebrow">${esc(BACKGROUNDS.find((b) => b.id === g.background).name)}</p><h2>${esc(g.name)}</h2><p class="muted">${g.age} años · Estado físico ${g.condition} %</p><div class="trait-row">${traits(g)}</div><details><summary>Condena e historia</summary><p><b>${esc(g.crime)}.</b> ${esc(g.story)}</p></details>${statGrid(g)}<div class="talent"><span>✦</span><div><strong>${ABILITIES[g.ability].name}</strong><small>${ABILITIES[g.ability].description}</small></div></div><div class="market-potential"><span>Potencial <b>${g.potentialEstimate}</b></span><span>Experiencia previa <b>${g.tactical > 0.4 ? "Experimentado" : "Aprendiz"}</b></span></div><div class="purchase-row"><strong>${gold(g.price)}</strong>${btn("Adquirir contrato", "buy-gladiator", `data-id="${g.id}"`, "primary")}</div></div></article>`).join("")}</div>${!s.market.length ? empty("Todos los contratos tienen casa", "Avanza hasta la siguiente llegada de condenados.", "base", "Volver a la base") : ""}`;
  }
  function gladiatorScreen(s, ui2) {
    if (!s.gladiators.length) return sectionHeading("PERSONAS, NO PIEZAS", "Tus gladiadores") + empty("Tu casa aún no tiene gladiadores", "Visita el mercado y conoce a quienes escribirán tu historia.");
    const g = s.gladiators.find((g2) => g2.id === ui2.selected) || s.gladiators[0];
    const ability = ABILITIES[g.ability];
    return `${sectionHeading("PERSONAS, NO PIEZAS", "Los nombres de tu casa", "Conoce su pasado. Descubre en quiénes pueden convertirse.")}${selectGladiator(s, ui2)}<div class="profile-grid"><section class="panel profile-identity"><div class="profile-art">${portrait(g, "", 300, 300)}</div><p class="eyebrow">${esc(BACKGROUNDS.find((b) => b.id === g.background).name)}</p><h2>${esc(g.name)}</h2><p>${g.age} años · ${esc(g.region)}</p><div class="trait-row">${traits(g)}</div><p class="condition">${status(g)} · Estado ${g.condition} % · Salud ${Math.round(g.health * 100)} %</p><h3>Su historia</h3><p class="story">${esc(g.story)}</p><small>Condena: ${esc(g.crime)}</small><div class="profile-record"><div><strong>${g.record.wins}</strong><small>VICTORIAS</small></div><div><strong>${g.record.losses}</strong><small>DERROTAS</small></div><div><strong>${g.record.draws}</strong><small>EMPATES</small></div></div>${btn("Solicitar cuidados · " + gold(35), "recover", `data-id="${g.id}"`, "wide")}</section><div class="profile-details"><section class="panel"><div class="panel-heading"><h2>Atributos</h2>${tag("NIVEL " + g.level, "gold")}</div><p class="muted">Los atributos mejoran entrenando, nunca automáticamente al subir de nivel.</p>${statGrid(g, true)}${progressBar("Experiencia de combate", g.xp, levelThreshold(g.level), "xp")}<div class="details-row"><span>Potencial estimado <b>${g.potentialEstimate}</b></span><span>Capacidad táctica <b>${Math.round(g.tactical * 100)} %</b></span></div>${btn("Asignar entrenamiento →", "navigate", 'data-page="training"', "text-button")}</section><section class="panel"><p class="eyebrow">TALENTO DISTINTIVO</p><h2>✦ ${ability.name}</h2><p>${ability.description}</p><p class="muted">${ability.energy} energía · ${ability.cooldown} turnos de recarga · dominio ${Math.floor(Math.min(0.35, g.abilityXP / 500) * 100)} %</p></section><section class="panel"><h2>Preferencias tácticas</h2><p class="muted">Son orientaciones para su IA. Las decisiones siempre respetan sus recursos y capacidades.</p><div class="tactics">${Object.entries({ aggression: "Agresividad", defense: "Prioridad defensiva", magic: "Uso de magia", conserve: "Conservar energía", distance: "Mantener distancia", special: "Habilidad especial" }).map(([key, label]) => `<label>${label}<output>${g.tactics[key]}</output><input type="range" min="0" max="100" step="5" value="${g.tactics[key]}" data-tactic="${key}" data-id="${g.id}" aria-label="${label}"></label>`).join("")}</div></section><section class="panel"><div class="panel-heading"><h2>Equipo y hechizos</h2>${btn("Abrir almacén →", "navigate", 'data-page="inventory"', "text-button")}</div><div class="equipment-summary">${Object.entries(SLOTS).map(([slot, label]) => {
      const unit = s.inventory.find((u) => u.id === g.equipment[slot]);
      return `<div><small>${label}</small><strong>${unit ? esc(ITEMS[unit.itemId].name) : "—"}</strong></div>`;
    }).join("")}</div><div class="prepared-spells">${g.spells.length ? g.spells.map((id2) => btn(`${g.activeSpells.includes(id2) ? "✓" : "○"} ${ITEMS[id2].name}`, "toggle-spell", `data-id="${id2}" data-gladiator="${g.id}"`, g.activeSpells.includes(id2) ? "selected" : "")).join("") : '<p class="muted">Aún no conoce hechizos. Compra un pergamino y enséñaselo desde el inventario.</p>'}</div></section><section class="panel"><h2>Últimos combates</h2>${s.battles.filter((b) => b.gladiatorId === g.id).slice(0, 5).map((b) => `<div class="event-row"><span>${b.won ? "VICTORIA" : b.draw ? "EMPATE" : "DERROTA"}</span><p>vs. ${esc(b.enemy)} · día ${b.day} · ${b.turns} turnos</p></div>`).join("") || '<p class="muted">Su historia en la arena está por escribir.</p>'}</section></div></div>`;
  }
  function trainingScreen(s, ui2) {
    const g = s.gladiators.find((g2) => g2.id === ui2.selected);
    return `${sectionHeading("LA GLORIA SE TRABAJA", "El patio de entrenamiento", "Un atributo a la vez. Sin esperas reales: tú decides cuándo avanza el día.")}${selectGladiator(s, ui2)}${g ? `<div class="notice"><span>${glyph("gladiators", 26)}</span><p><strong>${esc(g.name)}</strong> · ${status(g)}. La recuperación reduce el rendimiento; cada día restaura salud y estado físico.</p>${btn("Descansar", "assign", 'data-stat=""')}</div>` : empty("El patio está preparado", "Adquiere un gladiador para comenzar su entrenamiento.")}<div class="training-grid">${Object.entries(BUILDINGS).map(([key, label]) => {
      const level = s.buildings[key], trainees = s.gladiators.filter((g2) => g2.training === key);
      return `<section class="panel training-card ${ui2.facility === key ? "focused" : ""}"><div class="panel-heading"><span class="building-symbol">${glyph(key, 30)}</span>${tag("NIVEL " + level + " / 5")}</div><h2>${label}</h2><p class="muted">${STATS[key]} · ${RULES.trainingXP[level]} XP base / día</p><canvas class="building-art" data-building="${key}" width="440" height="245" aria-hidden="true"></canvas><div class="level-pips">${Array.from({ length: 5 }, (_, i) => `<i class="${i < level ? "filled" : ""}"></i>`).join("")}</div><div class="training-occupants">${trainees.map((t) => `<div>${portrait(t, "", 72, 90)}<span>${esc(t.name)}<small>${trainingGain(t, key, level, () => 0.5)} XP/día estimados</small></span></div>`).join("") || "<p>Puesto libre · esperando talento</p>"}</div><div class="details-row"><span>Capacidad <b>${trainees.length}/${RULES.trainingSlots[level]}</b></span>${g ? `<span>Estimación <b>+${trainingGain(g, key, level, () => 0.5)} XP/día</b></span>` : ""}</div><div class="card-actions">${btn(g?.training === key ? "Asignado ✓" : "Asignar", "assign", `data-stat="${key}" ${!g ? "disabled" : ""}`, g?.training === key ? "selected" : "primary")}${level < 5 ? btn(`Mejorar · ${gold(RULES.upgradeCost[level])}`, "upgrade", `data-stat="${key}"`) : tag("NIVEL MÁXIMO")}</div></section>`;
    }).join("")}</div><p class="footnote">La experiencia depende del potencial real, talento natural, personalidad y estado. El gasto diario es de 2 monedas por gladiador; no se genera deuda.</p>`;
  }
  function shopScreen(s, ui2) {
    const category = ui2.shopCategory || "weapon", items = category === "weapon" ? WEAPONS : category === "armor" ? [...ARMORS, ...ACCESSORIES] : SPELLS;
    const g = s.gladiators.find((g2) => g2.id === ui2.selected), item = items.find((i) => i.id === ui2.shopItem) || items[0];
    return `${sectionHeading("HIERRO, CUERO Y PODER ARCANO", "Los gremios del mercado", "Elige una pieza del expositor para examinarla.", s.shopDiscount ? tag("FERIA · −15 %", "gold") : "")}<div class="shop-layout"><section class="forge-corner"><svg class="forge-art" viewBox="0 0 320 510" aria-hidden="true"><defs><linearGradient id="forgeWall" x2="1" y2="1"><stop stop-color="#605b46"/><stop offset="1" stop-color="#1c302d"/></linearGradient><radialGradient id="forgeFire"><stop stop-color="#ffe9a4"/><stop offset=".35" stop-color="#e9a94d"/><stop offset="1" stop-color="#6c3a2466"/></radialGradient><linearGradient id="forgeAnvil" x2="0" y2="1"><stop stop-color="#c0c8aa"/><stop offset=".3" stop-color="#80948a"/><stop offset="1" stop-color="#344e4c"/></linearGradient><pattern id="forgeBrick" width="72" height="45" patternUnits="userSpaceOnUse"><path d="M0 0h72v45H0Zm0 23h72M36 0v23M16 23v22" fill="none" stroke="#151d1a" opacity=".45"/></pattern></defs><path fill="url(#forgeWall)" d="M0 0h320v510H0z"/><path fill="url(#forgeBrick)" d="M0 0h320v510H0z"/><path d="M19 325V181a119 119 0 0 1 238 0v144Z" fill="#111b19" stroke="#7f7654" stroke-width="18"/><path d="M42 318V185a96 96 0 0 1 192 0v133Z" fill="url(#forgeFire)"/><path d="m70 318-6-46 26-42-9 42 36-92 22 63 33-41-4 61 35-27-7 82Z" fill="#eaa24a"/><path d="m92 318 15-45 5-41 19 48 21-25-4 36 30-11-8 38Z" fill="#ffe49a"/><path d="M25 328h225v21H25z" fill="#8c8159" stroke="#2a3025" stroke-width="4"/><path d="M250 30v213m-13-212h27M235 239h31" stroke="#917b4e" stroke-width="8"/><path d="m264 83-4-55 12-22 10 20-7 57Z" fill="#aab9b1" stroke="#263c3c" stroke-width="3"/><path d="M253 83h32" stroke="#bc9e59" stroke-width="5"/><path d="M14 353 320 333v177H0Z" fill="#384132"/><ellipse cx="153" cy="453" rx="123" ry="20" fill="#0a1717aa"/><path d="m48 384 144 2 58-31-8 38-38 17-19 15 12 28H72l20-28-7-25H44Z" fill="url(#forgeAnvil)" stroke="#233936" stroke-width="4"/><path d="m48 384 144 2 58-31-38-9-30 23H49Z" fill="#a6b7a5" stroke="#314a44" stroke-width="2"/><path d="m88 378 16-38m-23 3 34-9 8 16-35 9Z" fill="#5f4631" stroke="#b8a46e" stroke-width="3"/><path d="m22 461 268-13m-268 25 268-13" stroke="#69704a" stroke-width="2"/><g fill="#eccc76"><circle cx="114" cy="137" r="2"/><circle cx="181" cy="156" r="1.4"/><circle cx="149" cy="109" r="1.5"/></g></svg><div class="forge-caption"><span>GREMIO DE LA FORJA</span><h2>Acero para<br>una nueva leyenda.</h2><small>Cada arma encuentra su mano.</small></div></section><section class="shop-stock"><div class="tabs">${[["weapon", "Armas"], ["armor", "Armaduras"], ["scroll", "Pergaminos"]].map(([id2, label]) => btn(label, "shop-tab", `data-category="${id2}"`, category === id2 ? "selected" : "")).join("")}</div><div class="stock-heading"><span>${items.length} PIEZAS DISPONIBLES</span><small>Selecciona para examinar</small></div><div class="stock-grid">${items.map((i) => `<button class="stock-slot ${i.id === item.id ? "selected" : ""} ${i.price > 400 ? "rare" : ""}" data-action="shop-select" data-id="${i.id}" title="${esc(i.name)}" aria-label="Examinar ${esc(i.name)}">${itemSymbol(i)}<span>${gold(itemPrice(s, i))}</span></button>`).join("")}</div><p class="stock-help">Puedes adquirir equipo para más adelante. Los requisitos se comprueban al equiparlo.</p></section><aside class="panel item-inspect"><p class="eyebrow">${item.category === "weapon" ? weaponTypeName(item.type) : item.category === "scroll" ? "PERGAMINO ARCANO" : SLOTS[item.slot]}</p><div class="inspect-art">${itemSymbol(item)}</div><h2>${item.name}</h2><p class="item-details">${itemDetails(item)}</p><div class="inspect-compare">${selectGladiator(s, ui2, "Comprobar requisitos con")}<div class="requirements">${requirements(g, item)}</div></div><div class="purchase-row"><strong>${gold(itemPrice(s, item))}</strong>${btn("Comprar", "buy-item", `data-id="${item.id}"`, "primary")}</div><small class="inspect-note">Se guardará como una unidad única en el almacén de la casa.</small></aside></div>`;
  }
  function inventoryScreen(s, ui2) {
    const g = s.gladiators.find((g2) => g2.id === ui2.selected), unit = s.inventory.find((u) => u.id === ui2.inventoryUnit) || s.inventory.find((u) => !itemOwner(s, u.id)) || s.inventory[0], item = ITEMS[unit?.itemId], owner = unit ? itemOwner(s, unit.id) : null;
    return `${sectionHeading("EL ARSENAL DE TU CASA", "Inventario", `${s.inventory.length} piezas en propiedad. Cada unidad tiene un único portador.`)}${selectGladiator(s, ui2, "Equipar o enseñar a")}${g ? `<section class="panel equipment-panel"><div class="equipment-character">${portrait(g, "", 210, 290)}<span>NIVEL ${g.level}</span></div><div><p class="eyebrow">PORTADOR SELECCIONADO</p><h2>${esc(g.name)}</h2><div class="equipment-slots">${Object.entries(SLOTS).map(([slot, label]) => {
      const u = s.inventory.find((u2) => u2.id === g.equipment[slot]), i = ITEMS[u?.itemId];
      return `<div class="gear-slot"><span>${i ? itemSymbol(i) : glyph(slot === "weapon" ? "arena" : slot === "offhand" ? "defense" : slot === "accessory" ? "magic" : "inventory", 22)}</span><div><small>${label}</small><strong>${i ? esc(i.name) : "Vacío"}</strong>${i ? btn("Retirar", "unequip", `data-slot="${slot}"`, "text-button") : ""}</div></div>`;
    }).join("")}</div></div></section>` : ""}${s.inventory.length ? `<div class="stash-layout"><section class="panel stash-bag"><div class="panel-heading"><h2>Almacén de la casa</h2>${tag(s.inventory.length + " UNIDADES")}</div><div class="stock-grid">${s.inventory.map((u) => {
      const i = ITEMS[u.itemId], o = itemOwner(s, u.id);
      return `<button class="stock-slot ${u.id === unit.id ? "selected" : ""} ${i.price > 400 ? "rare" : ""}" data-action="inventory-select" data-id="${u.id}" title="${esc(i.name)}${o ? " · " + esc(o.name) : ""}" aria-label="Examinar ${esc(i.name)}">${itemSymbol(i)}<span>${o ? "EQUIPADO" : i.category === "scroll" ? "PERGAMINO" : "DISPONIBLE"}</span></button>`;
    }).join("")}</div></section><aside class="panel item-inspect"><p class="eyebrow">${owner ? "EQUIPADO POR " + esc(owner.name) : "DISPONIBLE EN EL ALMACÉN"}</p><div class="inspect-art">${itemSymbol(item)}</div><h2>${item.name}</h2><p class="item-details">${itemDetails(item)}</p><div class="requirements">${requirements(g, item)}</div><div class="card-actions">${btn(item.category === "scroll" ? "Aprender hechizo" : owner?.id === g?.id ? "Equipado ✓" : "Equipar", item.category === "scroll" ? "learn" : "equip", `data-id="${unit.id}" ${!g || owner?.id === g?.id ? "disabled" : ""}`, "primary wide")}${btn(`Vender · ${gold(Math.floor(item.price * 0.45))}`, "sell", `data-id="${unit.id}" ${owner ? "disabled" : ""}`, "wide")}</div></aside></div>` : empty("Un arsenal por forjar", "Compra armas, protección y pergaminos en los gremios.", "shops", "Visitar los gremios")}`;
  }
  function arenaScreen(s, ui2) {
    if (s.battle && (!s.battle.result || ui2.watchResult)) return combatScreen(s, ui2);
    const g = s.gladiators.find((g2) => g2.id === ui2.selected);
    return `${sectionHeading("DEJA QUE SU HISTORIA COMBATA", "La arena", "Tú preparas la estrategia. Ellos toman las decisiones.", s.battle?.result ? btn("Ver último resultado", "last-result") : "")}${selectGladiator(s, ui2, "Representante de la casa")}${s.tournament ? `<div class="notice"><span>${glyph("tournaments", 26)}</span><p>Torneo en curso · ronda ${s.tournament.round + 1}. Puedes continuar desde la sección Torneos.</p>${btn("Ver torneo", "navigate", 'data-page="tournaments"')}</div>` : ""}${!g ? empty("La grada aguarda un nombre", "Compra y prepara a tu primer gladiador.") : ""}<div class="arena-intro panel"><div><p class="eyebrow">DUELOS DE EXHIBICIÓN</p><h2>El primer paso hacia la gloria.</h2><p>Sin inscripción. Victoria: al menos 85 de oro y 65 XP.<br>Una derrota otorga 18 de oro y 35 XP, pero exige descanso.</p></div><div class="arena-rules"><span>⚔ IA contra IA</span><span>◈ Recursos y distancia</span><span>⛨ Sin consecuencias permanentes</span></div></div><div class="opponents-grid">${s.rivals.filter((r) => !r.champion).map((r) => {
      const locked = (r.level - 1) * 12 > s.prestige;
      return `<article class="panel opponent-card">${portrait(r, "", 125, 160)}<div><p class="eyebrow">${esc(r.organization)}</p><h2>${esc(r.name)}</h2><div class="trait-row">${tag("Nivel " + r.level)}${traits(r)}</div><p class="muted">${r.record.wins} victorias · ${r.record.losses} derrotas<br>FUE ${r.stats.strength} · AGI ${r.stats.agility} · MAG ${r.stats.magic}</p>${btn(locked ? `Requiere ${(r.level - 1) * 12} prestigio` : `Inscribir · premio ${gold(85 + (r.level - 1) * 55)}`, "duel", `data-id="${r.id}" ${locked || !g ? "disabled" : ""}`, "primary")}</div></article>`;
    }).join("")}</div>`;
  }
  var statusNames = { guard: "Guardia", evade: "Evasión", blind: "Confusión", boost: "Fervor", focus: "Concentración", precision: "Precisión", shield: "Escudo", burn: "Brasa", silence: "Silencio", weaken: "Debilitado", slow: "Escarcha" };
  function combatScreen(s, ui2) {
    const b = s.battle, result = b.result;
    return `<div class="battle-heading"><p class="eyebrow">${b.meta.type === "tournament" ? "COMBATE DE TORNEO" : "DUELO DE EXHIBICIÓN"}</p><h1>${result ? "El veredicto de la arena" : "Que la arena decida"}</h1>${tag(result ? "FINALIZADO" : "EN COMBATE", result ? "" : "gold")}</div><section class="panel combat-stage"><div class="fight-hud">${b.fighters.map((f, i) => `<section class="fighter-hud ${i ? "enemy" : ""}"><div class="fighter-name"><div class="fighter-seal">${glyph(i ? "arena" : "base", 23)}</div><div><small>${i ? "RIVAL" : "CASA DE CENIZA"} · NIVEL ${f.level}</small><h2>${esc(f.name)}</h2></div></div>${progressBar("Salud", f.hp, f.maxHP, "health")}<div class="secondary-resources">${progressBar("Energía", f.energy, f.maxEnergy, "energy")}${progressBar("Maná", f.mana, f.maxMana, "mana")}</div><div class="buffs">${Object.entries(f.buffs).map(([id2, v]) => tag(`${statusNames[id2] || id2} · ${v.turns} t`)).join("")}</div><details><summary>Equipo y habilidad</summary><p>${esc(f.weapon.name)} · ${f.protection} protección<br>${ABILITIES[f.ability].name} · recarga ${f.cooldowns.ability || 0} t</p></details></section>`).join('<span class="versus">VS</span>')}</div><canvas id="combat-canvas" width="1600" height="900" aria-label="Combate animado entre ${esc(b.fighters[0].name)} y ${esc(b.fighters[1].name)}"></canvas><div class="arena-readout"><b>TURNO ${String(b.turn).padStart(2, "0")}</b><span>DISTANCIA ${Math.abs(b.fighters[0].pos - b.fighters[1].pos)}</span></div>${result ? resultPanel(s) : ""}<div class="combat-controls">${btn(ui2.paused ? "▶ Reanudar" : "Ⅱ Pausa", "pause", result ? "disabled" : "")}<div class="speed-controls">${[1, 2, 4].map((speed) => btn(`×${speed}`, "speed", `data-speed="${speed}"`, s.options.speed === speed ? "selected" : "")).join("")}</div><label class="checkbox"><input type="checkbox" id="reasoning" ${s.options.reasoning ? "checked" : ""}> Mostrar razonamiento táctico</label></div></section><section class="panel combat-log"><div class="panel-heading"><h2>La voz de la arena</h2><span class="muted">Últimas decisiones</span></div>${b.log.length ? b.log.slice(-5).reverse().map((e) => `<div class="action-entry"><span>${String(e.turn).padStart(2, "0")}</span><div><p>${esc(e.text)}</p>${s.options.reasoning ? `<small>${esc(e.reason)}</small>` : ""}</div></div>`).join("") : '<p class="muted">Los gladiadores se estudian antes de actuar…</p>'}</section>`;
  }
  function resultPanel(s) {
    const b = s.battle, p = b.payout || {}, winner = b.result.winner;
    return `<section class="result-panel ${winner === 0 ? "victory" : ""}"><div><p class="eyebrow">${winner === 0 ? "VICTORIA DE LA CASA" : winner === 1 ? "ESTA VEZ NO PUDO SER" : "HONORES COMPARTIDOS"}</p><h2>${winner === null ? "Empate" : esc(b.fighters[winner].name)}</h2><p>${p.title ? "Título obtenido: " + esc(p.title) + " · " : ""}${b.turn} turnos · ${b.result.method} · ${b.log.filter((e) => e.damage >= 20).length} impactos de 20+ de daño</p><p>Estado de tu gladiador: ${Math.round(s.gladiators.find((g) => g.id === b.fighters[0].id).health * 100)} % de salud. Necesita descanso después de la competición.</p></div><div><div class="reward-row"><strong>${gold((p.gold || 0) + (p.bonus || 0))}</strong><span>+${p.xp || 0} XP</span><span>+${p.fame || 0} prestigio</span></div>${s.tournament ? btn("Siguiente ronda →", "next-round", "", "primary") : btn("Volver a la base →", "navigate", 'data-page="base"', "primary")}</div></section>`;
  }
  function tournamentsScreen(s, ui2) {
    const g = s.gladiators.find((g2) => g2.id === ui2.selected), tour = s.tournament;
    return `${sectionHeading("UN NOMBRE ENTRE LEYENDAS", "Las grandes competiciones", "Cada ronda cuenta. Entre victorias, la enfermería del torneo restaura un 38 % de salud.")}${selectGladiator(s, ui2, "Inscribir a")}${tour ? `<section class="panel active-tournament"><p class="eyebrow">INSCRIPCIÓN ACTIVA</p><h2>${COMPETITIONS.find((t) => t.id === tour.competitionId).name}</h2><p>${esc(s.gladiators.find((g2) => g2.id === tour.gladiatorId).name)} · ronda ${tour.round + 1}/${tour.opponents.length}</p><div class="bracket">${tour.opponents.map((r, i) => `<div class="${i < tour.round ? "won" : i === tour.round ? "current" : ""}"><small>RONDA ${i + 1}</small><strong>${esc(r.name)}</strong><span>${i < tour.round ? "✓ Victoria" : i === tour.round ? "Próximo combate" : "Pendiente"}</span></div>`).join("")}</div><div class="card-actions">${btn(s.battle && !s.battle.result ? "Observar combate" : "Disputar siguiente ronda", s.battle && !s.battle.result ? "watch" : "next-round", "", "primary")}${btn("Retirarse del torneo", "abandon-tournament")}</div></section>` : ""}<div class="tournament-grid">${COMPETITIONS.map((t, i) => {
      const champion = s.rivals.filter((r) => r.champion)[t.champion], completed = s.completed.filter((c) => c.id === t.id).length;
      const locked = s.prestige < t.prestige || !g || g.level < t.level;
      return `<article class="panel tournament-card"><div class="tournament-banner tier-${i}"><span>${["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"][i]}</span><p>${t.subtitle}</p><h2>${t.name}</h2>${completed ? tag(`${completed} títulos conquistados`, "gold") : ""}</div><div class="tournament-info"><p>${t.description}</p><div class="details-row"><span>Combates <b>${t.rounds}</b></span><span>Dificultad <b>${["Iniciación", "Exigente", "Élite", "Legendaria"][i]}</b></span></div><div class="requirements"><span class="requirement ${s.prestige < t.prestige ? "unmet" : "met"}">Prestigio ${t.prestige}</span><span class="requirement ${!g || g.level < t.level ? "unmet" : "met"}">Nivel ${t.level}</span></div><details><summary>Campeón y participantes</summary><div class="champion-info">${portrait(champion, "", 90, 110)}<div><strong>${esc(champion.name)}</strong><p>${ABILITIES[champion.ability].name} · nivel ${champion.level}</p></div></div><p>${esc(champion.story)}</p><small>${2 ** t.rounds} aspirantes en el circuito; los emparejamientos de tu ruta se sortean al inscribirte.</small></details><div class="tournament-prize"><strong>${gold(t.reward)}</strong><span>+${t.fame} prestigio al ganar</span></div>${btn(locked ? "Requisitos pendientes" : `Inscribir · ${gold(t.entry)}`, "tournament", `data-id="${t.id}" ${locked || tour ? "disabled" : ""}`, "primary wide")}</div></article>`;
    }).join("")}</div>`;
  }
  function historyScreen(s) {
    return `${sectionHeading("NINGUNA VICTORIA SE OLVIDA", "Crónicas de la casa", `${s.battles.filter((b) => b.won).length} victorias registradas · ${s.completed.length} títulos conquistados`)}<div class="history-grid"><section class="panel"><h2>En la arena</h2>${s.battles.map((b) => `<div class="battle-record"><span class="result-icon ${b.won ? "won" : ""}">${b.won ? "✦" : b.draw ? "＝" : "—"}</span><div><strong>${esc(b.gladiator)}</strong><p>vs. ${esc(b.enemy)} · ${b.turns} turnos · día ${b.day}</p></div><span>${b.won ? "Victoria" : b.draw ? "Empate" : "Derrota"}<small>+${b.gold} oro · +${b.xp} XP</small></span></div>`).join("") || '<p class="muted">No se han disputado combates todavía.</p>'}<h3>Palmarés</h3>${s.completed.map((c) => `<p>♜ ${COMPETITIONS.find((t) => t.id === c.id).name} · ${esc(c.gladiator)} · día ${c.day}</p>`).join("") || '<p class="muted">Los primeros títulos están por llegar.</p>'}</section><section class="panel"><h2>El diario de la casa</h2>${s.history.slice(0, 80).map((e) => `<div class="event-row"><span>DÍA ${e.day}</span><p>${esc(e.text)}</p></div>`).join("")}</section></div>`;
  }
  function optionsScreen(s) {
    return `${sectionHeading("TU PARTIDA, A TU MANERA", "Opciones y ayuda", "El juego funciona sin cuentas ni recursos externos. El progreso vive en este navegador.")}<div class="options-grid"><section class="panel"><h2>La partida</h2><p>Guardado automático después de cada acción y turno. Exporta una copia para trasladarla a otro navegador.</p><div class="card-actions">${btn("Guardar ahora", "save", "", "primary")}${btn("Exportar JSON", "export")}${btn("Importar JSON", "import")}</div><div class="divider"></div><label class="checkbox"><input type="checkbox" id="sound" ${s.options.sound ? "checked" : ""}> Sonidos originales sintetizados</label><p class="muted">El sonido se genera localmente con Web Audio y comienza tras una interacción.</p><div class="card-actions">${btn("Volver al menú", "main-menu")}${btn("Nueva partida", "new-game", "", "danger")}</div></section><section class="panel help"><h2>Una casa que puede crecer</h2><ol><li><b>Adquiere un contrato.</b> Empiezas con 1.500 monedas y tres plazas.</li><li><b>Entrena un atributo.</b> Asigna un puesto y avanza días para acumular XP individual.</li><li><b>Equipa con criterio.</b> Compra objetos, revisa requisitos y asígnalos en el almacén. Las armas a dos manos excluyen el escudo.</li><li><b>Enseña magia.</b> Los pergaminos se consumen; prepara hasta cuatro conjuros en la ficha.</li><li><b>Observa sus decisiones.</b> Usa pausa, velocidades y razonamiento táctico en la arena.</li><li><b>Recupera y progresa.</b> Descansa o paga cuidados. El prestigio abre circuitos y torneos.</li></ol><h3>Lo que decide un combate</h3><p>La precisión se limita entre 32 % y 94 %. El daño considera arma, fuerza, agilidad, protección y guardia. El peso aumenta el gasto de energía. Cada gladiador aprende a leer las últimas cuatro acciones del rival según su capacidad táctica.</p><p>Al llegar a 180 turnos, los jueces comparan la proporción de salud restante. Una diferencia inferior al 4 % da un empate.</p><p>La capacidad táctica mejora con niveles; los atributos solo mejoran con entrenamiento. No hay muerte permanente ni lesiones gráficas.</p></section></div>`;
  }
  var SCREENS = { base: baseScreen, gladiators: gladiatorScreen, market: marketScreen, training: trainingScreen, shops: shopScreen, inventory: inventoryScreen, arena: arenaScreen, tournaments: tournamentsScreen, history: historyScreen, options: optionsScreen };

  // js/ui/audio.js
  var context;
  function playSound(kind, enabled) {
    if (!enabled) return;
    try {
      context ||= new (window.AudioContext || window.webkitAudioContext)();
      if (context.state === "suspended") context.resume();
      const osc = context.createOscillator(), gain = context.createGain(), t = context.currentTime;
      osc.connect(gain);
      gain.connect(context.destination);
      osc.type = kind === "hit" ? "triangle" : "sine";
      const frequency = kind === "win" ? 660 : kind === "hit" ? 120 : kind === "magic" ? 440 : 280;
      osc.frequency.setValueAtTime(frequency, t);
      osc.frequency.exponentialRampToValueAtTime(frequency * (kind === "win" ? 1.5 : 0.6), t + 0.13);
      gain.gain.setValueAtTime(0.045, t);
      gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.19);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch {
    }
  }

  // js/main.js
  var loaded = loadGame();
  var state = loaded.state;
  var ui = { started: false, page: "base", selected: state?.gladiators[0]?.id || null, shopCategory: "weapon", paused: false, watchResult: false, menuOptions: false, loadError: loaded.error, saveError: null };
  var app = document.querySelector("#app");
  var lastTick = performance.now();
  var lastVisual = lastTick;
  var previousPositions = null;
  var animationTime = 0;
  var previousFrame = lastTick;
  var demo = createGame();
  var menuBattle = createBattle(demo.market[0], demo.rivals[8], [], { arena: "regional" });
  menuBattle.fighters[0].pos = 5.5;
  menuBattle.fighters[1].pos = 8.7;
  function toast(text, error = false) {
    const container = document.querySelector("#toasts");
    while (container.children.length >= 2) container.firstElementChild.remove();
    const el = document.createElement("div");
    el.className = "toast" + (error ? " error" : "");
    el.setAttribute("role", error ? "alert" : "status");
    el.textContent = text;
    document.querySelector("#toasts").append(el);
    setTimeout(() => el.remove(), error ? 7500 : 4200);
  }
  function persist() {
    if (!state) return;
    const result = saveGame(state);
    const was = ui.saveError;
    ui.saveError = result.ok ? null : result.error;
    if (!result.ok && !was) toast(result.error, true);
  }
  function render() {
    if (state && !state.gladiators.some((g) => g.id === ui.selected)) ui.selected = state.gladiators[0]?.id || null;
    app.innerHTML = ui.started && state ? shell(state, ui, (SCREENS[ui.page] || SCREENS.base)(state, ui)) : menu(state, ui);
  }
  function navigate(page) {
    ui.page = page;
    ui.watchResult = false;
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function requireSelected() {
    if (!ui.selected) throw new Error("Primero adquiere y selecciona un gladiador.");
    return ui.selected;
  }
  var actions = {
    fullscreen: () => {
      if (!document.fullscreenEnabled) {
        toast("Este navegador no permite activar la pantalla completa.", true);
        return;
      }
      const task = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
      Promise.resolve(task).catch(() => toast("Este navegador no permite activar la pantalla completa.", true));
    },
    navigate: (el) => navigate(el.dataset.page),
    "menu-options": () => {
      ui.menuOptions = !ui.menuOptions;
      render();
    },
    continue: () => {
      if (!state) throw new Error("No hay una partida válida.");
      ui.started = true;
      lastTick = performance.now();
      render();
    },
    "new-game": () => {
      if (state && !window.confirm("¿Iniciar una nueva partida? Se reemplazará el progreso actual. Exporta una copia desde Opciones para conservarlo.")) return;
      state = createGame();
      ui.started = true;
      ui.page = "base";
      ui.selected = null;
      ui.loadError = null;
      ui.watchResult = false;
      ui.paused = false;
      persist();
      render();
      toast("La Casa de Ceniza abre sus puertas. Tu primera historia espera en el mercado.");
    },
    "main-menu": () => {
      persist();
      ui.started = false;
      render();
    },
    save: () => {
      persist();
      render();
      if (!ui.saveError) toast("Partida guardada en este navegador.");
    },
    day: () => {
      const summary = advanceDay(state);
      persist();
      render();
      toast(`Día ${state.day}. ${summary.length ? summary[0] + (summary.length > 1 ? ` Y ${summary.length - 1} entrenamientos más.` : "") : "La casa se recupera y el mundo sigue adelante."}`);
    },
    "buy-gladiator": (el) => {
      const g = buyGladiator(state, el.dataset.id);
      ui.selected = g.id;
      persist();
      render();
      toast(`${g.name} ya forma parte de tu casa.`);
      playSound("buy", state.options.sound);
    },
    profile: (el) => {
      ui.selected = el.dataset.id;
      navigate("gladiators");
    },
    facility: (el) => {
      ui.facility = el.dataset.stat;
      navigate("training");
    },
    assign: (el) => {
      assignTraining(state, requireSelected(), el.dataset.stat);
      persist();
      render();
      toast(el.dataset.stat ? "Entrenamiento asignado. Avanza el día para obtener experiencia." : "Gladiador asignado al descanso.");
    },
    upgrade: (el) => {
      upgrade(state, el.dataset.stat);
      persist();
      render();
      toast("La ampliación está terminada. Sus beneficios ya están activos.");
    },
    recover: (el) => {
      recover(state, el.dataset.id);
      persist();
      render();
      toast("Salud, estado y energía restaurados. Listo para volver a la arena.");
    },
    "shop-select": (el) => {
      ui.shopItem = el.dataset.id;
      render();
    },
    "inventory-select": (el) => {
      ui.inventoryUnit = el.dataset.id;
      render();
    },
    "shop-tab": (el) => {
      ui.shopCategory = el.dataset.category;
      ui.shopItem = null;
      render();
    },
    "buy-item": (el) => {
      buyItem(state, el.dataset.id);
      persist();
      render();
      toast("Objeto comprado. Asígnalo desde el Inventario.");
      playSound("buy", state.options.sound);
    },
    equip: (el) => {
      equip(state, requireSelected(), el.dataset.id);
      persist();
      render();
      toast("Equipamiento actualizado.");
    },
    unequip: (el) => {
      unequip(state, requireSelected(), el.dataset.slot);
      persist();
      render();
    },
    learn: (el) => {
      learn(state, requireSelected(), el.dataset.id);
      persist();
      render();
      toast("Hechizo aprendido. Consulta los conjuros preparados en la ficha.");
    },
    "toggle-spell": (el) => {
      toggleSpell(state, el.dataset.gladiator, el.dataset.id);
      persist();
      render();
    },
    sell: (el) => {
      sellItem(state, el.dataset.id);
      persist();
      render();
      toast("Objeto vendido.");
    },
    duel: (el) => {
      startDuel(state, requireSelected(), el.dataset.id);
      startWatching();
    },
    tournament: (el) => {
      enterTournament(state, requireSelected(), el.dataset.id);
      startWatching();
    },
    "next-round": () => {
      nextRound(state);
      startWatching();
    },
    "abandon-tournament": () => {
      if (window.confirm("¿Retirar al gladiador? No se devuelve la inscripción.")) {
        abandonTournament(state);
        persist();
        render();
      }
    },
    watch: () => {
      ui.page = "arena";
      render();
    },
    "last-result": () => {
      ui.watchResult = true;
      render();
    },
    pause: () => {
      ui.paused = !ui.paused;
      lastTick = performance.now();
      render();
    },
    speed: (el) => {
      state.options.speed = Number(el.dataset.speed);
      lastTick = performance.now();
      persist();
      render();
    },
    export: () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }), url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url;
      a.download = `casa-de-ceniza-dia-${state.day}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
      toast("Copia de la partida exportada.");
    },
    import: () => document.querySelector("#import-file").click()
  };
  function startWatching() {
    ui.page = "arena";
    ui.watchResult = true;
    ui.paused = false;
    lastTick = performance.now();
    lastVisual = lastTick;
    previousPositions = null;
    persist();
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  app.addEventListener("click", (event) => {
    const el = event.target.closest("[data-action]");
    if (!el || el.disabled) return;
    event.preventDefault();
    try {
      actions[el.dataset.action]?.(el);
    } catch (error) {
      toast(error.message, true);
    }
  });
  app.addEventListener("input", (event) => {
    if (event.target.matches("[data-tactic]")) event.target.closest("label").querySelector("output").textContent = event.target.value;
  });
  app.addEventListener("change", (event) => {
    const el = event.target;
    try {
      if (el.id === "gladiator-select") {
        ui.selected = el.value;
        render();
      } else if (el.dataset.tactic) {
        setTactic(state, el.dataset.id, el.dataset.tactic, el.value);
        persist();
      } else if (el.id === "reasoning") {
        state.options.reasoning = el.checked;
        persist();
        render();
      } else if (el.id === "sound") {
        state.options.sound = el.checked;
        playSound("buy", el.checked);
        persist();
      }
    } catch (error) {
      toast(error.message, true);
      render();
    }
  });
  document.querySelector("#import-file").addEventListener("change", async (event) => {
    const input = event.target, file = input.files[0];
    if (!file) return;
    try {
      if (file.size > 4e6) throw new Error("La copia es demasiado grande (máximo 4 MB).");
      const candidate = validateSave(JSON.parse(await file.text()));
      if (state && !window.confirm("¿Reemplazar la partida actual por esta copia?")) return;
      state = candidate;
      ui.selected = state.gladiators[0]?.id || null;
      ui.started = true;
      ui.page = state.battle && !state.battle.result ? "arena" : "base";
      ui.paused = !!state.battle && !state.battle.result;
      ui.watchResult = false;
      persist();
      render();
      toast("Partida importada y validada.");
    } catch (error) {
      toast(`No se pudo importar la partida. ${error.message}`, true);
    } finally {
      input.value = "";
    }
  });
  window.addEventListener("beforeunload", () => persist());
  window.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (state?.battle && !state.battle.result) {
        ui.paused = true;
        render();
      }
      persist();
    }
    lastTick = performance.now();
  });
  if (state?.battle?.result && !state.battle.settled) {
    try {
      settleBattle(state);
      persist();
    } catch (error) {
      ui.loadError = error.message;
    }
  }
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function frame(now) {
    const elapsed = Math.min(0.05, (now - previousFrame) / 1e3);
    previousFrame = now;
    if (!ui.paused) animationTime += elapsed;
    if (ui.started && state?.battle && !state.battle.result && !ui.paused && !document.hidden) {
      const interval = 1050 / state.options.speed;
      if (now - lastTick >= interval) {
        try {
          previousPositions = state.battle.fighters.map((f) => f.pos);
          const event = stepBattle(state.battle);
          lastVisual = now;
          lastTick = now;
          if (state.battle.result) {
            settleBattle(state);
            ui.watchResult = true;
            playSound(state.battle.result.winner === 0 ? "win" : "hit", state.options.sound);
          } else if (event) playSound(event.action === "spell" ? "magic" : event.damage ? "hit" : "move", state.options.sound);
          persist();
          if (ui.page === "arena") render();
        } catch (error) {
          ui.paused = true;
          toast("El combate se ha pausado: " + error.message, true);
          render();
        }
      }
    }
    const t = reducedMotion ? 0 : animationTime;
    if (!ui.started) {
      const canvas = document.querySelector("#menu-canvas");
      if (canvas) drawMenu(canvas, menuBattle, t);
    } else {
      const base = document.querySelector("#base-canvas");
      if (base) drawBase(base, state, t);
      const canvas = document.querySelector("#combat-canvas");
      if (canvas && state.battle) drawArena(canvas, state.battle, t, ui.paused ? Math.min(1, (lastTick - lastVisual) / (1050 / state.options.speed)) : Math.min(1, (now - lastVisual) / (1050 / state.options.speed)), previousPositions);
      for (const canvas2 of document.querySelectorAll("[data-building]")) drawFacility(canvas2, state, canvas2.dataset.building, t);
      for (const canvas2 of document.querySelectorAll("[data-character]")) {
        const id2 = canvas2.dataset.character;
        const g = [...state.gladiators, ...state.market, ...state.rivals].find((g2) => g2.id === id2);
        if (g) portraitCanvas(canvas2, g, state.inventory, t, g.training ? "train" : g.recovery ? "rest" : "idle");
      }
    }
    requestAnimationFrame(frame);
  }
  render();
  app.dataset.ready = "true";
  requestAnimationFrame(frame);
})();
