/* Archivo generado desde js/main.js. Para actualizarlo: npm ci && npm run build. */
(() => {
  // data/rules.js
  var STATS = { strength: "Fuerza", agility: "Agilidad", attack: "Ataque", defense: "Defensa", vitality: "Vitalidad", endurance: "Resistencia", magic: "Magia", charisma: "Carisma" };
  var ICONS = { strength: "⚒", agility: "➶", attack: "◎", defense: "⛨", vitality: "✚", endurance: "◈", magic: "✦", charisma: "♜" };
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
  var int = (a, b, rng = Math.random) => Math.floor(rng() * (b - a + 1)) + a;
  var pick = (list, rng = Math.random) => list[int(0, list.length - 1, rng)];
  var copy = (x) => JSON.parse(JSON.stringify(x));
  var esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var money = (n) => Math.floor(n).toLocaleString("es-ES");

  // js/gladiators/generator.js
  var names = ["Kael", "Mara", "Iria", "Daren", "Nara", "Torren", "Selka", "Ruan", "Elian", "Bren", "Liora", "Varek", "Sira", "Oren", "Ada", "Valen", "Eira", "Malric", "Nerea", "Roderic"];
  var surnames = ["Varron", "Valcor", "Cenizal", "Thane", "del Junco", "Voss", "Gris", "de la Bruma", "Roca", "Viento Sur", "de Sal", "del Alba", "Manoslargas", "de los Pinos"];
  var regions = ["Costa del Ámbar", "Marcas del Norte", "Islas de Sal", "Valle de Oris", "Dunas de Aram", "Bosque de Liria"];
  function generateGladiator({ tier = 0, background = null, rng = Math.random } = {}) {
    const bg = background ? BACKGROUNDS.find((b) => b.id === background) : pick(BACKGROUNDS, rng);
    const stats = Object.fromEntries(Object.keys(STATS).map((k) => [k, clamp(int(3, 8, rng) + (bg.bias[k] || 0) + tier * 3, 1, 60)]));
    const first = pick(bg.traits, rng);
    const conflicts = { impulsive: ["calculating", "patient", "disciplined"], reckless: ["prudent", "timid"], aggressive: ["defensive"], brave: ["timid"] };
    const compatible = Object.keys(TRAITS).filter((t) => t !== first && !(conflicts[first] || []).includes(t) && !(conflicts[t] || []).includes(first));
    const traits2 = [first, pick(compatible, rng)];
    const potential = 0.8 + rng() * 0.7;
    const estimate = pick(["Desconocido", "Normal", "Prometedor", "Limitado", "Excepcional"], rng);
    const condition = int(80, 100, rng), experience = int(0, 30, rng) + tier * 30;
    const price = Math.round((Object.values(stats).reduce((a, b) => a + b, 0) * 5 + tier * 80 + (estimate === "Excepcional" ? 75 : 0)) * (0.85 + rng() * 0.3) * condition / 100 / 5) * 5;
    return { id: uid("g"), name: `${pick(names, rng)} ${pick(surnames, rng)}`, age: int(20, 49, rng), region: pick(regions, rng), background: bg.id, crime: bg.crime, story: `${pick(bg.stories, rng)} ${pick(["Ahora busca una segunda oportunidad en la arena.", "Todavía guarda una carta que nadie ha leído.", "Sueña con volver a ver las luces de su hogar.", "No habla de la última noche en libertad."], rng)}`, traits: traits2, stats, statXP: Object.fromEntries(Object.keys(STATS).map((k) => [k, 0])), level: 1 + tier, xp: experience, tactical: clamp(0.28 + tier * 0.12 + rng() * 0.2, 0.2, 0.95), potential, potentialEstimate: estimate, natural: bg.natural, ability: bg.ability, abilityXP: 0, price, condition, recovery: 0, health: 1, training: null, equipment: Object.fromEntries(["weapon", "offhand", "head", "chest", "hands", "feet", "accessory"].map((k) => [k, null])), spells: [], activeSpells: [], tactics: { aggression: 50, defense: 50, magic: 60, conserve: 50, distance: 40, special: 65 }, record: { wins: 0, losses: 0, draws: 0 }, prestige: 0, appearance: { skin: pick(["#d6a77c", "#b57550", "#80553d", "#edc7a2", "#a66e48"], rng), hair: pick(["#332c2a", "#795035", "#c6a061", "#a34e37", "#d6d1bd"], rng), style: int(0, 3, rng), beard: rng() < 0.4, tunic: pick(["#617e72", "#8b4f3b", "#50677e", "#967843", "#756180"], rng), face: int(0, 2, rng) } };
  }
  function generateMarket(rng = Math.random, tier = 0) {
    return ["thief", "deserter", "swindler", null].map((background) => generateGladiator({ tier, background, rng }));
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
  function createRivals(rng = Math.random) {
    const rivals = Array.from({ length: 8 }, (_, i) => ({ ...generateGladiator({ tier: Math.floor(i / 2), rng }), organization: ["Los Cuervos", "Casa del Bronce", "La Guardia Azul", "Hijos de Sal"][i % 4], champion: false }));
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
      const g = generateGladiator({ tier, background, rng });
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
  function createGame(rng = Math.random) {
    return { version: RULES.saveVersion, id: uid("save"), day: 1, gold: RULES.initialGold, prestige: 0, housing: 1, buildings: Object.fromEntries(Object.keys(STATS).map((k) => [k, 1])), gladiators: [], market: generateMarket(rng), inventory: [], rivals: createRivals(rng), history: [{ day: 1, text: "La Casa de Ceniza abre sus puertas. Cuatro contratos esperan en el mercado.", kind: "world" }], battles: [], completed: [], tournament: null, battle: null, shopDiscount: 0, options: { sound: false, reasoning: true, speed: 1 } };
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
  function trainingGain(g, stat, level, rng = Math.random) {
    const personality = g.traits.reduce((n, t) => n * (TRAITS[t].train || 1), 1);
    return Math.max(1, Math.round(RULES.trainingXP[level] * g.potential * personality * (g.natural === stat ? 1.15 : 1) * (g.condition / 100) * (g.recovery ? 0.5 : 1) * (0.94 + rng() * 0.12)));
  }
  function advanceDay(s, rng = Math.random) {
    mutable(s);
    s.day++;
    const summary = [];
    for (const g of s.gladiators) {
      if (s.tournament?.gladiatorId === g.id) continue;
      if (g.training) {
        const xp = trainingGain(g, g.training, s.buildings[g.training], rng);
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
      while (s.market.length < 4) s.market.push(generateGladiator({ tier, rng }));
      log(s, "Llegan nuevos contratos al Mercado de Condenados.", "market");
    }
    if (s.day % 5 === 0) {
      s.shopDiscount = 0.15;
      log(s, "Feria del gremio: todas las tiendas ofrecen un 15 % de descuento durante esta jornada.", "shop");
    }
    if (s.day % 7 === 0) {
      const r = pick(s.rivals.filter((r2) => !r2.champion), rng);
      const stat = pick(Object.keys(STATS), rng);
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
  function evaluateActions(a, b, rng = Math.random) {
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
      const noise = (rng() - 0.5) * (2 + (1 - intellect) * 10 + traitValue(a, "noise"));
      score += noise;
      const traits2 = a.traits.map((x) => TRAITS[x].name).join(", ");
      return { ...action, score, reason: `${reason}. ${traits2}${factor ? `: modificador de estilo ${factor > 0 ? "+" : ""}${factor}` : ""}. Evaluación ${score.toFixed(1)}.` };
    }).sort((x, y) => y.score - x.score);
  }
  var chooseAction = (a, b, rng = Math.random) => evaluateActions(a, b, rng)[0];

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
  function stepBattle(b, rng = Math.random, forced = null) {
    if (b.result) return b.lastEvent;
    const idx = b.actor, a = b.fighters[idx], enemy = b.fighters[1 - idx];
    if (a.buffs.burn) {
      hit(enemy, a, a.buffs.burn.value);
      if (a.hp <= 0) {
        finish(b);
        return null;
      }
    }
    const action = forced || chooseAction(a, enemy, rng);
    if (!legalActions(a, enemy).some((x) => actionKey(x) === actionKey(action))) throw new Error("La IA intentó una acción imposible.");
    let text = "", damage = 0, animation = "idle";
    if (ATTACKS[action.type]) {
      a.energy -= attackCost(a, action.type);
      animation = "attack";
      if (rng() < precision(a, enemy, action.type)) {
        damage = hit(a, enemy, expectedDamage(a, enemy, action.type) * (0.9 + rng() * 0.2));
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
  function enterTournament(s, gid, id2, rng = Math.random) {
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
      const candidate = pool[Math.floor(rng() * pool.length)];
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

  // js/ui/characterRenderer.js
  function equipmentOf(g, inventory = []) {
    return Object.fromEntries(Object.entries(g.equipment).map(([slot, id2]) => [slot, ITEMS[inventory.find((u) => u.id === id2)?.itemId] || ITEMS[id2] || null]));
  }
  function shape(c, fill, draw) {
    c.beginPath();
    draw();
    c.fillStyle = fill;
    c.fill();
    c.stroke();
  }
  function limb(c, x, y, x2, y2, color, width) {
    c.strokeStyle = "#30291f";
    c.lineWidth = width + 5;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x2, y2);
    c.stroke();
    c.strokeStyle = color;
    c.lineWidth = width;
    c.stroke();
    c.strokeStyle = "#30291f";
    c.lineWidth = 2.5;
  }
  function drawCharacter(c, g, x, y, scale = 1, flip = false, time = 0, pose = "idle", gear = null) {
    if (!g) return;
    const a = g.appearance, eq = gear || g.gear || equipmentOf(g), weapon = eq.weapon || UNARMED;
    c.save();
    c.translate(x, y);
    c.scale(flip ? -scale : scale, scale);
    c.lineJoin = "round";
    c.lineCap = "round";
    c.lineWidth = 2.5;
    c.strokeStyle = "#30291f";
    c.fillStyle = "#30291f25";
    c.beginPath();
    c.ellipse(0, 0, 35, 7, 0, 0, Math.PI * 2);
    c.fill();
    const wave = Math.sin(time * 6), bob = pose === "walk" ? Math.abs(wave) * 4 : Math.sin(time * 2) * 1.5;
    if (pose === "defeat") {
      c.translate(0, -12);
      c.rotate(-1.25);
      c.globalAlpha = 0.8;
    }
    if (pose === "hit") c.rotate(Math.sin(time * 23) * 0.025);
    c.translate(0, -bob);
    const leg = pose === "walk" ? wave * 13 : pose === "train" ? Math.sin(time * 5) * 7 : 0;
    limb(c, -12, -53, -17 + leg, -16, a.skin, 16);
    limb(c, 12, -53, 19 - leg, -16, a.skin, 16);
    shape(c, eq.feet ? "#76684e" : "#4a3b2d", () => {
      c.roundRect(-29 + leg, -18, 25, 17, 5);
    });
    shape(c, eq.feet ? "#76684e" : "#4a3b2d", () => c.roundRect(7 - leg, -18, 27, 17, 5));
    shape(c, eq.chest ? "#8d9b98" : a.tunic, () => {
      c.moveTo(-25, -108);
      c.quadraticCurveTo(0, -123, 25, -107);
      c.lineTo(21, -54);
      c.quadraticCurveTo(0, -43, -23, -54);
      c.closePath();
    });
    c.fillStyle = eq.chest ? "#c1c9ba" : "#ffffff20";
    c.fillRect(-18, -102, 11, 39);
    c.strokeStyle = "#4b4536";
    if (eq.chest) {
      for (let i = 0; i < 3; i++) {
        c.beginPath();
        c.moveTo(-20, -75 + i * 8);
        c.lineTo(20, -75 + i * 8);
        c.stroke();
      }
    }
    c.fillStyle = "#52392a";
    c.fillRect(-25, -58, 49, 9);
    c.fillStyle = "#d1aa57";
    c.fillRect(-5, -58, 11, 9);
    c.strokeStyle = "#30291f";
    let handX = 40, handY = -75;
    if (pose === "attack") {
      handX = 70 + Math.sin(time * 16) * 8;
      handY = -95;
    }
    if (pose === "cast") {
      handX = 50;
      handY = -112;
    }
    if (pose === "defend") {
      handX = 20;
      handY = -106;
    }
    if (pose === "celebrate") {
      handX = 32;
      handY = -156 + wave * 3;
    }
    if (pose === "rest") {
      handX = 27;
      handY = -64;
    }
    if (pose === "train") {
      handX = 30;
      handY = -95 + wave * 20;
    }
    limb(c, 23, -101, handX, handY, a.skin, 13);
    limb(c, -22, -99, -35, -66 + (pose === "walk" ? wave * 7 : 0), a.skin, 13);
    if (eq.offhand) {
      shape(c, "#7d6845", () => {
        c.moveTo(-49, -92);
        c.lineTo(-20, -92);
        c.lineTo(-22, -61);
        c.quadraticCurveTo(-35, -43, -48, -63);
        c.closePath();
      });
      c.fillStyle = "#c6ad73";
      c.beginPath();
      c.arc(-35, -76, 5, 0, Math.PI * 2);
      c.fill();
    }
    c.save();
    c.translate(handX, handY);
    if (pose === "attack") c.rotate(0.85);
    else c.rotate(0.13);
    if (weapon.type === "bow" || weapon.type === "crossbow") {
      c.strokeStyle = "#4c3320";
      c.lineWidth = 5;
      c.beginPath();
      c.moveTo(4, -46);
      c.quadraticCurveTo(42, 0, 4, 44);
      c.stroke();
      c.lineWidth = 1;
      c.strokeStyle = "#dfd3ad";
      c.beginPath();
      c.moveTo(4, -46);
      c.lineTo(4, 44);
      c.stroke();
      c.strokeStyle = "#30291f";
    } else if (weapon.type !== "fist") {
      const length = weapon.type === "spear" ? 90 : weapon.type === "dagger" ? 27 : weapon.type === "staff" ? 72 : 52;
      limb(c, 0, 9, 0, -length, weapon.type === "staff" || weapon.type === "spear" ? "#825c34" : "#b8cac6", weapon.type === "staff" ? 7 : weapon.type === "mace" ? 8 : 6);
      if (["sword", "dagger"].includes(weapon.type)) {
        shape(c, "#d2dfd8", () => {
          c.moveTo(-4, -12);
          c.lineTo(-4, -length);
          c.lineTo(0, -length - 10);
          c.lineTo(5, -length);
          c.lineTo(5, -12);
          c.closePath();
        });
        c.fillStyle = "#d1aa57";
        c.fillRect(-11, -14, 23, 5);
      }
      if (weapon.type === "axe") {
        shape(c, "#bac8bd", () => {
          c.moveTo(-1, -length);
          c.lineTo(19, -length - 4);
          c.quadraticCurveTo(30, -length + 13, 15, -length + 23);
          c.lineTo(-1, -length + 15);
          c.closePath();
        });
      }
      if (weapon.type === "mace") shape(c, "#8c9897", () => c.roundRect(-11, -length - 7, 24, 25, 5));
      if (weapon.type === "staff") {
        c.fillStyle = "#b0b6db";
        c.shadowColor = "#91b5fa";
        c.shadowBlur = 12;
        c.beginPath();
        c.arc(0, -length - 5, 8, 0, Math.PI * 2);
        c.fill();
        c.shadowBlur = 0;
      }
      if (weapon.type === "spear") shape(c, "#b7cfcb", () => {
        c.moveTo(-7, -length + 8);
        c.lineTo(0, -length - 17);
        c.lineTo(7, -length + 8);
        c.closePath();
      });
    }
    c.restore();
    c.fillStyle = eq.hands ? "#756f58" : a.skin;
    c.beginPath();
    c.arc(handX, handY, 8, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = a.skin;
    c.beginPath();
    c.ellipse(-29, -134, 7, 10, -0.15, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    shape(c, a.skin, () => {
      c.moveTo(-27, -155);
      c.bezierCurveTo(-35, -182, 31, -185, 31, -151);
      c.lineTo(32, -125);
      c.quadraticCurveTo(26, -106, 4, -108);
      c.quadraticCurveTo(-28, -108, -28, -133);
      c.closePath();
    });
    c.fillStyle = "#ffffff18";
    c.beginPath();
    c.ellipse(-13, -146, 10, 18, 0, 0, Math.PI * 2);
    c.fill();
    shape(c, a.hair, () => {
      c.moveTo(-28, -140);
      c.lineTo(-31, -157);
      c.quadraticCurveTo(-33, -179, -7, -179);
      if (a.style === 1) {
        c.lineTo(-2, -194);
        c.lineTo(6, -181);
        c.lineTo(16, -192);
        c.lineTo(21, -177);
      } else if (a.style === 2) {
        c.quadraticCurveTo(35, -189, 33, -155);
      } else {
        c.quadraticCurveTo(31, -183, 32, -154);
      }
      c.lineTo(23, -151);
      c.lineTo(19, -166);
      c.quadraticCurveTo(-5, -153, -21, -162);
      c.lineTo(-23, -139);
      c.closePath();
    });
    if (a.style === 3) {
      c.fillStyle = a.hair;
      c.beginPath();
      c.ellipse(-30, -134, 10, 23, 0.2, 0, Math.PI * 2);
      c.fill();
    }
    if (eq.head) {
      shape(c, "#99a5a0", () => {
        c.moveTo(-32, -155);
        c.quadraticCurveTo(-30, -188, 0, -189);
        c.quadraticCurveTo(29, -184, 34, -154);
        c.closePath();
      });
      c.fillStyle = "#cfb466";
      c.fillRect(-32, -158, 67, 7);
    }
    c.fillStyle = "#fff5d7";
    c.beginPath();
    c.ellipse(-3, -141, 7, 8, 0, 0, Math.PI * 2);
    c.ellipse(20, -141, 6, 8, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#2b2926";
    c.beginPath();
    c.arc(0, -140, 3.3, 0, Math.PI * 2);
    c.arc(23, -140, 3.1, 0, Math.PI * 2);
    c.fill();
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(-10, -153);
    c.lineTo(4, -151 + (a.face === 1 ? 3 : 0));
    c.moveTo(15, -151);
    c.lineTo(27, -153);
    c.stroke();
    shape(c, a.skin, () => {
      c.moveTo(9, -141);
      c.lineTo(15, -128);
      c.lineTo(8, -127);
    });
    if (a.beard) {
      shape(c, a.hair, () => {
        c.moveTo(-22, -126);
        c.quadraticCurveTo(3, -110, 29, -126);
        c.lineTo(24, -109);
        c.quadraticCurveTo(4, -95, -18, -112);
        c.closePath();
      });
    }
    c.strokeStyle = a.beard ? "#e9b68b" : "#633c2d";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(0, -119);
    c.quadraticCurveTo(11, -115 + (pose === "celebrate" ? 5 : 0), 20, -120);
    c.stroke();
    if (eq.accessory) {
      c.fillStyle = "#e5be57";
      c.beginPath();
      c.arc(0, -97, 4, 0, Math.PI * 2);
      c.fill();
    }
    if (pose === "cast") {
      for (let i = 0; i < 4; i++) {
        c.fillStyle = `rgba(135,184,236,${0.8 - i * 0.15})`;
        c.beginPath();
        c.arc(handX + Math.sin(time * 5 + i) * 14, handY - 23 - i * 7, 4 - i * 0.5, 0, Math.PI * 2);
        c.fill();
      }
    }
    c.restore();
  }
  function portraitCanvas(canvas, g, inventory, time = 0, pose = "idle") {
    const c = canvas.getContext("2d"), w2 = canvas.width, h = canvas.height;
    c.clearRect(0, 0, w2, h);
    const gradient = c.createRadialGradient(w2 / 2, h * 0.5, 10, w2 / 2, h * 0.5, w2 * 0.65);
    gradient.addColorStop(0, "#d9bc7a33");
    gradient.addColorStop(1, "#d9bc7a00");
    c.fillStyle = gradient;
    c.fillRect(0, 0, w2, h);
    drawCharacter(c, g, w2 / 2, h - 10, Math.min(w2 / 110, (h - 10) / 200), false, time, pose, equipmentOf(g, inventory));
  }

  // js/ui/scenery.js
  var FACILITY_POS = { strength: [0.17, 0.35], agility: [0.39, 0.27], attack: [0.63, 0.27], defense: [0.85, 0.35], endurance: [0.17, 0.79], vitality: [0.39, 0.86], magic: [0.63, 0.86], charisma: [0.85, 0.79] };
  function house(c, x, y, w2, h, color) {
    c.fillStyle = "#1b221b25";
    c.fillRect(x + 7, y + 10, w2, h);
    c.fillStyle = color;
    c.fillRect(x, y, w2, h);
    c.strokeStyle = "#3f4433";
    c.lineWidth = 2;
    c.strokeRect(x, y, w2, h);
    c.fillStyle = "#605540";
    c.beginPath();
    c.moveTo(x - 12, y);
    c.lineTo(x + w2 * 0.5, y - h * 0.55);
    c.lineTo(x + w2 + 12, y);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = "#d1ad64";
    c.fillRect(x + w2 * 0.4, y + h * 0.45, w2 * 0.2, h * 0.55);
  }
  function drawBase(canvas, s, time) {
    const c = canvas.getContext("2d"), w2 = canvas.width, h = canvas.height;
    c.clearRect(0, 0, w2, h);
    c.fillStyle = "#56634b";
    c.fillRect(0, 0, w2, h);
    for (let i = 0; i < 100; i++) {
      const x = i * 137 % w2, y = i * 97 % h;
      c.fillStyle = i % 3 ? "#697453" : "#4a5b43";
      c.beginPath();
      c.ellipse(x, y, 20 + i % 7 * 4, 5, 0, 0, Math.PI * 2);
      c.fill();
    }
    c.fillStyle = "#c3b184";
    c.fillRect(50, 26, w2 - 100, 14);
    c.fillRect(24, 38, 25, h - 70);
    c.fillRect(w2 - 49, 38, 25, h - 70);
    c.fillRect(50, h - 44, w2 - 100, 18);
    c.strokeStyle = "#665f49";
    c.lineWidth = 2;
    for (let i = 50; i < w2 - 40; i += 32) {
      c.strokeRect(i, 26, 30, 14);
      c.strokeRect(i, h - 44, 30, 18);
    }
    for (const [x, y] of [[25, 10], [w2 - 73, 10], [25, h - 66], [w2 - 73, h - 66]]) {
      c.fillStyle = "#999276";
      c.fillRect(x, y, 48, 49);
      for (let i = 0; i < 3; i++) c.fillRect(x + i * 18, y - 7, 11, 12);
    }
    c.fillStyle = "#b4a078";
    c.beginPath();
    c.ellipse(w2 * 0.5, h * 0.55, w2 * 0.27, h * 0.19, 0, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "#d4be8c";
    c.lineWidth = 9;
    c.stroke();
    c.strokeStyle = "#c2ae82";
    c.lineWidth = 26;
    c.beginPath();
    c.moveTo(w2 * 0.5, 35);
    c.lineTo(w2 * 0.5, h - 30);
    c.moveTo(49, h * 0.55);
    c.lineTo(w2 - 49, h * 0.55);
    c.stroke();
    house(c, w2 * 0.42, 59, 175, 59, "#b0a17a");
    c.fillStyle = "#4e5a44";
    c.fillRect(w2 * 0.47, 48, 55, 38);
    c.fillStyle = "#dfb967";
    c.font = "bold 15px Georgia";
    c.textAlign = "center";
    c.fillText("CC", w2 * 0.5, 73);
    for (const [key, [px, py]] of Object.entries(FACILITY_POS)) {
      const x = px * w2, y = py * h, level = s.buildings[key];
      c.fillStyle = "#45503a";
      c.fillRect(x - 69, y - 43, 138, 73);
      c.strokeStyle = level > 1 ? "#cab074" : "#7d8261";
      c.lineWidth = 3;
      c.strokeRect(x - 69, y - 43, 138, 73);
      if (key === "strength") {
        c.fillStyle = "#423d32";
        c.fillRect(x - 27, y - 23, 55, 9);
        for (const side of [-1, 1]) {
          c.fillStyle = "#858276";
          c.fillRect(x + side * 23 - 6, y - 36, 13, 34);
        }
      }
      if (key === "agility") {
        c.strokeStyle = "#a6b086";
        c.lineWidth = 5;
        for (let j = 0; j < 4; j++) {
          c.beginPath();
          c.moveTo(x - 45 + j * 30, y - 12);
          c.lineTo(x - 45 + j * 30, y + 15);
          c.stroke();
        }
        c.strokeStyle = "#ccbb8c";
        c.beginPath();
        c.moveTo(x - 48, y - 12);
        c.lineTo(x + 48, y - 12);
        c.stroke();
      }
      if (key === "attack") {
        c.fillStyle = "#aa8d5a";
        c.beginPath();
        c.arc(x, y - 10, 27, 0, Math.PI * 2);
        c.fill();
        for (let j = 3; j >= 1; j--) {
          c.strokeStyle = j % 2 ? "#5e4636" : "#d4c9a3";
          c.lineWidth = 5;
          c.beginPath();
          c.arc(x, y - 10, j * 7, 0, Math.PI * 2);
          c.stroke();
        }
      }
      if (key === "defense") {
        for (let j = 0; j < 3; j++) {
          c.fillStyle = "#79857d";
          c.fillRect(x - 43 + j * 30, y - 31, 22, 35);
          c.fillStyle = "#c5ad72";
          c.fillRect(x - 35 + j * 30, y - 28, 5, 28);
        }
      }
      if (key === "endurance") {
        c.strokeStyle = "#b4a377";
        c.lineWidth = 6;
        c.beginPath();
        c.ellipse(x, y - 8, 46, 22, 0, 0, Math.PI * 2);
        c.stroke();
      }
      if (key === "vitality") {
        c.fillStyle = "#aac4a1";
        c.fillRect(x - 45, y - 27, 90, 31);
        c.fillStyle = "#d9c9a3";
        c.fillRect(x - 44, y - 28, 20, 30);
        c.fillStyle = "#b4cbd2";
        c.fillRect(x + 33, y - 34, 12, 16);
      }
      if (key === "magic") {
        c.strokeStyle = "#91aaa4";
        c.lineWidth = 2;
        c.beginPath();
        c.ellipse(x, y - 4, 47, 23, 0, 0, Math.PI * 2);
        c.stroke();
        c.fillStyle = `rgba(140,190,219,${0.45 + Math.sin(time * 2) * 0.15})`;
        c.beginPath();
        c.arc(x, y - 19, 16 + Math.sin(time * 2) * 3, 0, Math.PI * 2);
        c.fill();
      }
      if (key === "charisma") {
        c.fillStyle = "#9d8858";
        c.fillRect(x - 39, y - 10, 78, 25);
        c.fillStyle = "#5a4e38";
        c.fillRect(x - 21, y - 35, 42, 28);
      }
      const trainees = s.gladiators.filter((g) => g.training === key);
      trainees.forEach((g, i) => drawCharacter(c, g, x - 23 + i * 21, y + 27, 0.32, false, time, "train", equipmentOf(g, s.inventory)));
    }
    const resting = s.gladiators.filter((g) => !g.training);
    resting.slice(0, 6).forEach((g, i) => drawCharacter(c, g, w2 * 0.4 + i * 42, h * 0.57 + 9, 0.37, i % 2 === 0, time, g.recovery ? "rest" : "idle", equipmentOf(g, s.inventory)));
    for (const x of [75, w2 - 75]) {
      c.fillStyle = "#42392b";
      c.fillRect(x, h * 0.54, 5, 29);
      c.fillStyle = "#e5a550";
      c.beginPath();
      c.ellipse(x + 2, h * 0.54 - 5, 6, 10 + Math.sin(time * 8 + x) * 2, 0, 0, Math.PI * 2);
      c.fill();
    }
  }
  function drawArena(canvas, b, time, progress = 1, previous = null) {
    const c = canvas.getContext("2d"), w2 = canvas.width, h = canvas.height;
    const imperial = b.meta.arena === "imperial", stone = b.meta.arena === "stone";
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, imperial ? "#343849" : stone ? "#535c65" : "#81928f");
    sky.addColorStop(1, "#d0b990");
    c.fillStyle = sky;
    c.fillRect(0, 0, w2, h);
    c.fillStyle = "#dcd4b62a";
    c.beginPath();
    c.arc(w2 * 0.8, 64, 32, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#5b6059";
    for (let i = 0; i < 12; i++) {
      const x = i * 100 - 10;
      c.fillRect(x, 70, 80, 165);
      c.fillStyle = "#3e4947";
      c.beginPath();
      c.roundRect(x + 16, 97, 48, 104, [22, 22, 0, 0]);
      c.fill();
      c.fillStyle = "#5b6059";
    }
    c.fillStyle = "#737563";
    c.fillRect(0, 180, w2, 67);
    for (let row = 0; row < 3; row++) for (let i = 0; i < 60; i++) {
      const x = i * 19 + row * 6, y = 184 + row * 21 + Math.sin(time * 2 + i) * 2;
      c.fillStyle = ["#b29d79", "#8b5846", "#a1a08a", "#747c83"][i % 4];
      c.beginPath();
      c.arc(x, y, 5, 0, Math.PI * 2);
      c.fill();
      c.fillRect(x - 4, y + 4, 8, 8);
    }
    c.fillStyle = "#9d9477";
    c.fillRect(0, 248, w2, 42);
    c.strokeStyle = "#6b6958";
    c.lineWidth = 2;
    for (let x = 0; x < w2; x += 64) c.strokeRect(x, 251, 64, 35);
    c.fillStyle = "#bb9f70";
    c.fillRect(0, 290, w2, h - 290);
    c.fillStyle = "#cbb483";
    c.beginPath();
    c.ellipse(w2 / 2, 390, w2 * 0.48, 58, 0, 0, Math.PI * 2);
    c.fill();
    for (let i = 0; i < 35; i++) {
      c.fillStyle = "#927c552b";
      c.fillRect(i * 113 % w2, 304 + i * 31 % (h - 315), 3, 2);
    }
    for (const x of [95, w2 - 95]) {
      c.fillStyle = imperial ? "#6c4b72" : "#744a3b";
      c.beginPath();
      c.moveTo(x - 24, 80);
      c.lineTo(x + 24, 80);
      c.lineTo(x + 24, 183 + Math.sin(time * 2) * 3);
      c.lineTo(x, 200);
      c.lineTo(x - 24, 183);
      c.closePath();
      c.fill();
      c.fillStyle = "#dab76a";
      c.font = "24px Georgia";
      c.textAlign = "center";
      c.fillText("✦", x, 128);
    }
    const positions = b.fighters.map((f, i) => {
      const before = previous?.[i] ?? f.pos;
      return before + (f.pos - before) * Math.min(1, progress * 1.8);
    });
    b.fighters.forEach((f, i) => {
      const x = 115 + positions[i] / 10 * (w2 - 230);
      drawCharacter(c, f, x, h - 47, 1.15, i === 1, time, f.animation, f.gear);
      if (Object.keys(f.buffs).length) {
        c.strokeStyle = f.buffs.shield ? "#a5c1e7" : "#d3bb69";
        c.lineWidth = 2;
        c.globalAlpha = 0.6;
        c.beginPath();
        c.ellipse(x, h - 151, 45, 99, 0, 0, Math.PI * 2);
        c.stroke();
        c.globalAlpha = 1;
      }
    });
    const e = b.lastEvent;
    if (e && progress < 1 && e.action === "spell") {
      const from = 115 + positions[e.actor] / 10 * (w2 - 230), to = 115 + positions[1 - e.actor] / 10 * (w2 - 230), x = from + (to - from) * progress;
      c.fillStyle = "#b8d4e8";
      c.shadowColor = "#8ebdf8";
      c.shadowBlur = 18;
      c.beginPath();
      c.arc(x, h - 152, 8, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;
    }
    if (e?.damage && progress < 1) {
      const target = 1 - e.actor, x = 115 + positions[target] / 10 * (w2 - 230);
      c.fillStyle = "#fff0c9";
      c.font = "bold 26px Georgia";
      c.textAlign = "center";
      c.globalAlpha = 1 - progress;
      c.fillText(`−${e.damage}`, x, h - 230 - progress * 30);
      c.globalAlpha = 1;
    }
  }

  // js/ui/components.js
  var crest = `<svg class="crest" viewBox="0 0 64 72" aria-hidden="true"><path d="M10 5h44v40L32 65 10 45Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 12h32v30L32 56 16 42Z" fill="currentColor" opacity=".09"/><path d="m23 24 20 20m-2-22L21 44m-1-22 5 5m14 14 5 5m-3-24-5 5M25 41l-5 5" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="32" cy="15" r="2" fill="currentColor"/></svg>`;
  var btn = (text, action, attrs = "", cls = "") => `<button class="btn ${cls}" data-action="${action}" ${attrs}>${text}</button>`;
  var tag = (text, cls = "") => `<span class="tag ${cls}">${esc(text)}</span>`;
  var portrait = (g, cls = "", width = 180, height = 205) => `<canvas class="portrait ${cls}" data-character="${esc(g.id)}" width="${width}" height="${height}" aria-label="Retrato de ${esc(g.name)}"></canvas>`;
  var traits = (g) => g.traits.map((t) => tag(TRAITS[t].name)).join("");
  var statGrid = (g, progress = false) => `<div class="stats-grid">${Object.entries(STATS).map(([key, label]) => `<div class="attribute"><span>${ICONS[key]} ${label}</span><strong>${g.stats[key]}</strong>${progress ? `<div class="meter tiny"><i style="width:${Math.min(100, g.statXP[key] / statThreshold(g.stats[key]) * 100)}%"></i></div><small>${Math.floor(g.statXP[key])} / ${statThreshold(g.stats[key])} XP</small>` : ""}</div>`).join("")}</div>`;
  var empty = (title, description, action = "market", label = "Visitar el mercado") => `<div class="empty"><span class="empty-symbol">♜</span><h2>${esc(title)}</h2><p>${esc(description)}</p>${btn(label, "navigate", `data-page="${action}"`, "primary")}</div>`;
  var sectionHeading = (eyebrow, title, description = "", action = "") => `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${description ? `<p class="lead">${description}</p>` : ""}</div>${action}</div>`;
  function selectGladiator(s, ui2, label = "Gladiador seleccionado") {
    return `<label class="select-label">${label}<select id="gladiator-select" ${!s.gladiators.length ? "disabled" : ""}>${s.gladiators.length ? s.gladiators.map((g) => `<option value="${esc(g.id)}" ${ui2.selected === g.id ? "selected" : ""}>${esc(g.name)} · nivel ${g.level}</option>`).join("") : "<option>Adquiere un contrato en el mercado</option>"}</select></label>`;
  }
  var status = (g) => g.recovery ? `Recuperación · ${g.recovery} d` : g.training ? `Entrena ${STATS[g.training].toLowerCase()}` : g.health < 0.65 || g.condition < 60 ? "Necesita descanso" : "Disponible";
  var requirements = (g, item) => Object.entries(item.requirements).map(([k, n]) => `<span class="requirement ${g ? g.stats[k] < n ? "unmet" : "met" : ""}">${STATS[k]} ${n}${g ? ` / ${g.stats[k]}` : ""}</span>`).join("") || '<span class="requirement">Sin requisitos</span>';
  var itemSymbol = (item) => item.category === "scroll" ? "✦" : item.category === "weapon" ? { sword: "⚔", dagger: "†", spear: "↟", staff: "⚚", axe: "⚒", mace: "⚒", bow: "➶", crossbow: "➶" }[item.type] || "⚔" : { head: "♜", chest: "⛨", hands: "⋈", feet: "♧", offhand: "⛨", accessory: "◇" }[item.slot];
  function itemDetails(item) {
    return item.category === "weapon" ? `${item.damage} daño · alcance ${item.minRange}–${item.range}<br>${item.energy} energía · velocidad ${item.speed}${item.twoHanded ? " · dos manos" : ""}${item.effect === "pierce" ? "<br>Penetra parte de la armadura" : ""}` : item.category === "scroll" ? `${item.mana} maná · alcance ${item.range || "propio"} · recarga ${item.cooldown} t<br>${esc(item.description)}` : `${item.protection} protección · ${item.weight} peso<br>${SLOTS[item.slot]}${item.weight ? " · +" + Math.round(item.weight * 2.5) + " % coste de energía" : ""}`;
  }
  var gold = (n) => `<span class="coin">◉</span> ${money(n)}`;
  var progressBar = (label, value, max, cls = "") => `<div class="resource ${cls}"><div><span>${label}</span><strong>${Math.ceil(value)} / ${max}</strong></div><div class="meter"><i style="width:${Math.max(0, Math.min(100, value / max * 100))}%"></i></div></div>`;
  var weaponTypeName = (type) => ({ sword: "Espada", dagger: "Daga", axe: "Hacha", mace: "Maza", spear: "Lanza", staff: "Bastón", bow: "Arco", crossbow: "Ballesta", fist: "Puños" })[type] || "Arma";

  // js/ui/screens.js
  var NAV = [["base", "⌂", "La base"], ["gladiators", "♟", "Gladiadores"], ["market", "⚖", "Mercado"], ["training", "⚒", "Entrenamiento"], ["shops", "◇", "Tiendas"], ["inventory", "▣", "Inventario"], ["arena", "⚔", "Arena"], ["tournaments", "♜", "Torneos"], ["history", "≡", "Historial"]];
  function shell(s, ui2, content) {
    const year = 1 + Math.floor((s.day - 1) / 360), day = (s.day - 1) % 360 + 1;
    return `<aside class="sidebar"><a class="brand" href="#base" data-action="navigate" data-page="base">${crest}<span>CASA DE<br><b>CENIZA</b><small>CRÓNICAS DE LA ARENA</small></span></a><div class="house-label"><i></i> UNA CASA. MUCHAS HISTORIAS.</div><nav aria-label="Navegación principal">${NAV.map(([id2, icon, label]) => `<button class="nav-item ${ui2.page === id2 ? "active" : ""}" data-action="navigate" data-page="${id2}"><span>${icon}</span>${label}${id2 === "gladiators" ? `<small>${s.gladiators.length}</small>` : id2 === "arena" && s.battle && !s.battle.result ? '<small class="live">●</small>' : ""}</button>`).join("")}</nav><div class="sidebar-bottom"><button class="nav-item" data-action="save"><span>▣</span>Guardar partida</button><button class="nav-item ${ui2.page === "options" ? "active" : ""}" data-action="navigate" data-page="options"><span>⚙</span>Opciones y ayuda</button><div class="save-caption" id="save-caption">${ui2.saveError ? "Guardado pendiente" : "Guardado automático activo"}</div></div></aside><div class="game-shell"><header class="topbar"><div class="calendar"><span class="sun">☀</span><div>Día ${day}<small>AÑO ${year} · JORNADA ${s.day}</small></div></div><div class="top-resources"><div><span class="coin">◉</span><strong>${money(s.gold)}</strong><small>ORO</small></div><div><span class="fame-icon">✦</span><strong>${s.prestige}</strong><small>PRESTIGIO</small></div><div><span>♟</span><strong>${s.gladiators.length}<em> / ${RULES.capacity[s.housing]}</em></strong><small>ALOJAMIENTO</small></div></div>${btn("Avanzar día <span>→</span>", "day", "", "primary next-day")}</header>${ui2.saveError ? `<div class="warning">${esc(ui2.saveError)}</div>` : ""}<main id="main-content">${content}</main><footer>CASA DE CENIZA <span>Tu legado se forja en la arena.</span><small>PARTIDA LOCAL · SIN CONEXIÓN EXTERNA</small></footer></div>`;
  }
  function menu(s, ui2) {
    return `<main class="main-menu"><canvas id="menu-canvas" width="1280" height="620" aria-hidden="true"></canvas><div class="menu-shade"></div><div class="menu-content">${crest}<p class="eyebrow">CRÓNICAS DE LA ARENA</p><h1>CASA DE<br><span>CENIZA</span></h1><div class="ornament">—— ✦ ——</div><p>No luchas por la gloria.<br>Construyes la casa de quienes lo harán.</p><div class="menu-actions">${btn("Continuar partida", "continue", s ? "" : "disabled", "primary")}${btn("Nueva partida", "new-game", "", "light")}${btn("Opciones y ayuda", "menu-options")}</div>${ui2.menuOptions ? `<div class="menu-options"><p>Juego local, sin cuentas ni conexión. Se guarda automáticamente en este navegador. El sonido se activa dentro de la partida.</p>${btn("Importar partida", "import")}${btn("Cerrar ayuda", "menu-options")}</div>` : ""}${ui2.loadError ? `<div class="warning">${esc(ui2.loadError)}</div>` : ""}<small>GESTIÓN DE GLADIADORES · COMBATES TÁCTICOS · HISTORIAS PROPIAS</small></div></main>`;
  }
  function baseScreen(s, ui2) {
    const ready = s.gladiators.filter((g) => !g.recovery && g.health >= 0.65 && g.condition >= 60).length;
    return `${sectionHeading("TU HISTORIA EMPIEZA AQUÍ", "El hogar de tu legado", "Una humilde casa hoy. Un nombre que la arena recordará mañana.", tag("BASE · NIVEL " + s.housing, "gold"))}<div class="dashboard-grid"><section class="panel base-panel"><div class="panel-heading"><h2>Patio de la Casa de Ceniza</h2><span class="muted">${s.gladiators.filter((g) => g.training).length} entrenando · ${s.gladiators.filter((g) => g.recovery).length} en recuperación</span></div><div class="base-map"><canvas id="base-canvas" width="1120" height="520" aria-label="Base administrable con ocho instalaciones y gladiadores animados"></canvas><span class="map-house">ALOJAMIENTO · NIVEL ${s.housing}</span>${Object.entries(FACILITY_POS).map(([key, [x, y]]) => `<button class="map-label" style="left:${x * 100}%;top:${y * 100 + 8}%" data-action="facility" data-stat="${key}">${ICONS[key]} ${STATS[key]} <small>${s.buildings[key]}</small></button>`).join("")}<div class="map-center"><strong>CASA DE CENIZA</strong><small>PATIO DE ENTRENAMIENTO</small></div></div><div class="map-bottom"><span><i class="status-dot"></i> ${ready} gladiadores preparados</span>${btn("Gestionar instalaciones →", "navigate", 'data-page="training"', "text-button")}</div></section><aside class="dashboard-side"><section class="panel next-step"><p class="eyebrow">EL SIGUIENTE PASO</p><span class="large-symbol">${!s.gladiators.length ? "⚖" : "⚔"}</span><h2>${!s.gladiators.length ? "Toda leyenda empieza con una oportunidad." : "La arena espera a tu casa."}</h2><p>${!s.gladiators.length ? "Hay cuatro contratos en el mercado. Descubre su pasado y elige a tu primer gladiador." : "Entrena con intención. Equipa con criterio. Cada personalidad encuentra su forma de vencer."}</p>${btn(!s.gladiators.length ? "Explorar el mercado →" : "Preparar un duelo →", "navigate", `data-page="${!s.gladiators.length ? "market" : "arena"}"`, "primary")}</section><section class="panel housing"><div class="panel-heading"><h3>Alojamiento</h3>${tag(`${s.gladiators.length}/${RULES.capacity[s.housing]}`)}</div><p>Una cama, una nueva historia.</p><div class="bed-slots">${Array.from({ length: RULES.capacity[s.housing] }, (_, i) => `<i class="${i < s.gladiators.length ? "occupied" : ""}">♟</i>`).join("")}</div>${s.housing < 5 ? btn(`Ampliar · ${gold(RULES.housingCost[s.housing])}`, "upgrade", 'data-stat="housing"', "wide") : tag("Capacidad máxima")}</section></aside></div><div class="section-row"><h2>Los tuyos <span class="count">${s.gladiators.length}</span></h2>${btn("Ver todos →", "navigate", 'data-page="gladiators"', "text-button")}</div>${s.gladiators.length ? `<div class="roster-strip">${s.gladiators.slice(0, 4).map((g) => `<button class="mini-gladiator" data-action="profile" data-id="${esc(g.id)}">${portrait(g, "", 90, 112)}<div><small>NIVEL ${g.level} · ${esc(BACKGROUNDS.find((b) => b.id === g.background).name)}</small><h3>${esc(g.name)}</h3><p><i class="status-dot ${g.recovery ? "amber" : ""}"></i> ${status(g)}</p></div><span>→</span></button>`).join("")}</div>` : `<div class="empty-roster"><span>♟</span><div><h3>Un patio en silencio. Por ahora.</h3><p>Adquiere tu primer contrato para dar vida a la casa.</p></div>${btn("Buscar un gladiador", "navigate", 'data-page="market"')}</div>`}<section class="recent-events"><div class="section-row"><h2>Crónicas de la casa</h2>${btn("Historial →", "navigate", 'data-page="history"', "text-button")}</div>${s.history.slice(0, 3).map((e) => `<div class="event-row"><span>DÍA ${e.day}</span><p>${esc(e.text)}</p></div>`).join("")}</section>`;
  }
  function marketScreen(s) {
    return `${sectionHeading("UNA SEGUNDA OPORTUNIDAD", "Mercado de Condenados", "No eliges su pasado. Tú decides lo que viene después.", tag("NUEVOS CONTRATOS CADA 3 DÍAS"))}<div class="notice"><span>⚖</span><p>Todos los aspirantes son adultos. El potencial es una estimación incierta; el precio refleja su capacidad actual, estado y demanda.</p><strong>${s.gladiators.length}/${RULES.capacity[s.housing]} plazas</strong></div><div class="market-grid">${s.market.map((g, i) => `<article class="panel market-card"><div class="card-ribbon"><span>CONTRATO ${String(i + 1).padStart(2, "0")}</span>${tag("Nivel " + g.level)}</div><div class="market-portrait">${portrait(g)}<span class="portrait-caption">${esc(g.region)}</span></div><div class="market-info"><p class="eyebrow">${esc(BACKGROUNDS.find((b) => b.id === g.background).name)}</p><h2>${esc(g.name)}</h2><p class="muted">${g.age} años · Estado físico ${g.condition} %</p><div class="trait-row">${traits(g)}</div><details><summary>Condena e historia</summary><p><b>${esc(g.crime)}.</b> ${esc(g.story)}</p></details>${statGrid(g)}<div class="talent"><span>✦</span><div><strong>${ABILITIES[g.ability].name}</strong><small>${ABILITIES[g.ability].description}</small></div></div><div class="market-potential"><span>Potencial <b>${g.potentialEstimate}</b></span><span>Experiencia previa <b>${g.tactical > 0.4 ? "Experimentado" : "Aprendiz"}</b></span></div><div class="purchase-row"><strong>${gold(g.price)}</strong>${btn("Adquirir contrato", "buy-gladiator", `data-id="${g.id}"`, "primary")}</div></div></article>`).join("")}</div>${!s.market.length ? empty("Todos los contratos tienen casa", "Avanza hasta la siguiente llegada de condenados.", "base", "Volver a la base") : ""}`;
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
    return `${sectionHeading("LA GLORIA SE TRABAJA", "El patio de entrenamiento", "Un atributo a la vez. Sin esperas reales: tú decides cuándo avanza el día.")}${selectGladiator(s, ui2)}${g ? `<div class="notice"><span>♟</span><p><strong>${esc(g.name)}</strong> · ${status(g)}. La recuperación reduce el rendimiento; cada día restaura salud y estado físico.</p>${btn("Descansar", "assign", 'data-stat=""')}</div>` : empty("El patio está preparado", "Adquiere un gladiador para comenzar su entrenamiento.")}<div class="training-grid">${Object.entries(BUILDINGS).map(([key, label]) => {
      const level = s.buildings[key], trainees = s.gladiators.filter((g2) => g2.training === key);
      return `<section class="panel training-card ${ui2.facility === key ? "focused" : ""}"><div class="panel-heading"><span class="building-symbol">${ICONS[key]}</span>${tag("NIVEL " + level + " / 5")}</div><h2>${label}</h2><p class="muted">${STATS[key]} · ${RULES.trainingXP[level]} XP base / día</p><div class="level-pips">${Array.from({ length: 5 }, (_, i) => `<i class="${i < level ? "filled" : ""}"></i>`).join("")}</div><div class="training-occupants">${trainees.map((t) => `<div>${portrait(t, "", 72, 90)}<span>${esc(t.name)}<small>${trainingGain(t, key, level, () => 0.5)} XP/día estimados</small></span></div>`).join("") || "<p>Puesto libre · esperando talento</p>"}</div><div class="details-row"><span>Capacidad <b>${trainees.length}/${RULES.trainingSlots[level]}</b></span>${g ? `<span>Estimación <b>+${trainingGain(g, key, level, () => 0.5)} XP/día</b></span>` : ""}</div><div class="card-actions">${btn(g?.training === key ? "Asignado ✓" : "Asignar", "assign", `data-stat="${key}" ${!g ? "disabled" : ""}`, g?.training === key ? "selected" : "primary")}${level < 5 ? btn(`Mejorar · ${gold(RULES.upgradeCost[level])}`, "upgrade", `data-stat="${key}"`) : tag("NIVEL MÁXIMO")}</div></section>`;
    }).join("")}</div><p class="footnote">La experiencia depende del potencial real, talento natural, personalidad y estado. El gasto diario es de 2 monedas por gladiador; no se genera deuda.</p>`;
  }
  function shopScreen(s, ui2) {
    const category = ui2.shopCategory || "weapon", items = category === "weapon" ? WEAPONS : category === "armor" ? [...ARMORS, ...ACCESSORIES] : SPELLS;
    const g = s.gladiators.find((g2) => g2.id === ui2.selected);
    return `${sectionHeading("HERRAMIENTAS PARA EL DESTINO", "Los gremios del mercado", "El equipo se compra para la casa. Cada unidad solo puede tener un portador.", s.shopDiscount ? tag("FERIA · −15 %", "gold") : "")}<div class="toolbar"><div class="tabs">${[["weapon", "⚔ Armas"], ["armor", "⛨ Armaduras"], ["scroll", "✦ Pergaminos"]].map(([id2, label]) => btn(label, "shop-tab", `data-category="${id2}"`, category === id2 ? "selected" : "")).join("")}</div>${selectGladiator(s, ui2, "Comparar requisitos con")}</div><p class="muted">Puedes comprar equipo para más adelante. Los requisitos se comprueban al equiparlo o aprenderlo.</p><div class="items-grid">${items.map((item) => `<article class="panel item-card"><div class="item-top"><div class="item-icon ${category}">${itemSymbol(item)}</div><span>${item.category === "weapon" ? esc(weaponTypeName(item.type).toUpperCase()) : item.category === "scroll" ? "PERGAMINO" : SLOTS[item.slot].toUpperCase()}</span></div><h3>${item.name}</h3><p class="item-details">${itemDetails(item)}</p><div class="requirements">${requirements(g, item)}</div><div class="purchase-row"><strong>${gold(itemPrice(s, item))}</strong>${btn("Comprar", "buy-item", `data-id="${item.id}"`, "primary")}</div></article>`).join("")}</div>`;
  }
  function inventoryScreen(s, ui2) {
    const g = s.gladiators.find((g2) => g2.id === ui2.selected);
    return `${sectionHeading("CADA PIEZA TIENE UN DUEÑO", "Almacén de la casa", `${s.inventory.length} unidades en propiedad. Los objetos equipados permanecen identificados en el almacén.`)}${selectGladiator(s, ui2, "Equipar o enseñar a")}${g ? `<section class="panel equipment-panel">${portrait(g, "", 120, 145)}<div><h2>${esc(g.name)}</h2><div class="equipment-slots">${Object.entries(SLOTS).map(([slot, label]) => {
      const unit = s.inventory.find((u) => u.id === g.equipment[slot]), item = ITEMS[unit?.itemId];
      return `<div><small>${label}</small><strong>${item ? esc(item.name) : "Vacío"}</strong>${item ? btn("Retirar", "unequip", `data-slot="${slot}"`, "text-button") : ""}</div>`;
    }).join("")}</div></div></section>` : ""}${s.inventory.length ? `<div class="items-grid">${s.inventory.map((unit) => {
      const item = ITEMS[unit.itemId], owner = itemOwner(s, unit.id);
      return `<article class="panel item-card"><div class="item-top"><span class="item-icon">${itemSymbol(item)}</span>${tag(owner ? "Equipado" : "Disponible", owner ? "gold" : "")}</div><h3>${item.name}</h3><p class="item-details">${itemDetails(item)}</p><div class="requirements">${requirements(g, item)}</div>${owner ? `<p class="muted">Portador: ${esc(owner.name)}</p>` : ""}<div class="card-actions">${btn(item.category === "scroll" ? "Aprender" : owner?.id === g?.id ? "Equipado ✓" : "Equipar", item.category === "scroll" ? "learn" : "equip", `data-id="${unit.id}" ${!g || owner?.id === g?.id ? "disabled" : ""}`, "primary")}${btn(`Vender · ${gold(Math.floor(item.price * 0.45))}`, "sell", `data-id="${unit.id}" ${owner ? "disabled" : ""}`)}</div></article>`;
    }).join("")}</div>` : empty("Un almacén por llenar", "Compra armas, protección y pergaminos en los gremios.", "shops", "Visitar las tiendas")}`;
  }
  function arenaScreen(s, ui2) {
    if (s.battle && (!s.battle.result || ui2.watchResult)) return combatScreen(s, ui2);
    const g = s.gladiators.find((g2) => g2.id === ui2.selected);
    return `${sectionHeading("DEJA QUE SU HISTORIA COMBATA", "La arena", "Tú preparas la estrategia. Ellos toman las decisiones.", s.battle?.result ? btn("Ver último resultado", "last-result") : "")}${selectGladiator(s, ui2, "Representante de la casa")}${s.tournament ? `<div class="notice"><span>♜</span><p>Torneo en curso · ronda ${s.tournament.round + 1}. Puedes continuar desde la sección Torneos.</p>${btn("Ver torneo", "navigate", 'data-page="tournaments"')}</div>` : ""}${!g ? empty("La grada aguarda un nombre", "Compra y prepara a tu primer gladiador.") : ""}<div class="arena-intro panel"><div><p class="eyebrow">DUELOS DE EXHIBICIÓN</p><h2>El primer paso hacia la gloria.</h2><p>Sin inscripción. Victoria: al menos 85 de oro y 65 XP.<br>Una derrota otorga 18 de oro y 35 XP, pero exige descanso.</p></div><div class="arena-rules"><span>⚔ IA contra IA</span><span>◈ Recursos y distancia</span><span>⛨ Sin consecuencias permanentes</span></div></div><div class="opponents-grid">${s.rivals.filter((r) => !r.champion).map((r) => {
      const locked = (r.level - 1) * 12 > s.prestige;
      return `<article class="panel opponent-card">${portrait(r, "", 125, 160)}<div><p class="eyebrow">${esc(r.organization)}</p><h2>${esc(r.name)}</h2><div class="trait-row">${tag("Nivel " + r.level)}${traits(r)}</div><p class="muted">${r.record.wins} victorias · ${r.record.losses} derrotas<br>FUE ${r.stats.strength} · AGI ${r.stats.agility} · MAG ${r.stats.magic}</p>${btn(locked ? `Requiere ${(r.level - 1) * 12} prestigio` : `Inscribir · premio ${gold(85 + (r.level - 1) * 55)}`, "duel", `data-id="${r.id}" ${locked || !g ? "disabled" : ""}`, "primary")}</div></article>`;
    }).join("")}</div>`;
  }
  var statusNames = { guard: "Guardia", evade: "Evasión", blind: "Confusión", boost: "Fervor", focus: "Concentración", precision: "Precisión", shield: "Escudo", burn: "Brasa", silence: "Silencio", weaken: "Debilitado", slow: "Escarcha" };
  function combatScreen(s, ui2) {
    const b = s.battle, result = b.result;
    return `${sectionHeading(b.meta.type === "tournament" ? "RONDA DE TORNEO" : "DUELO DE EXHIBICIÓN", result ? "El veredicto de la arena" : "Dos historias. Una arena.", `Turno ${b.turn} · distancia ${Math.abs(b.fighters[0].pos - b.fighters[1].pos)} · ${result ? result.method : "combate automático"}`, tag(result ? "FINALIZADO" : "EN COMBATE", result ? "" : "gold"))}<div class="fight-hud">${b.fighters.map((f, i) => `<section class="fighter-hud ${i ? "enemy" : ""}"><div class="panel-heading"><div><small>${i ? "RIVAL" : "CASA DE CENIZA"} · NIVEL ${f.level}</small><h2>${esc(f.name)}</h2></div>${tag(i ? "II" : "I")}</div>${progressBar("Salud", f.hp, f.maxHP, "health")}${progressBar("Energía", f.energy, f.maxEnergy, "energy")}${progressBar("Maná", f.mana, f.maxMana, "mana")}<div class="buffs">${Object.entries(f.buffs).map(([id2, v]) => tag(`${statusNames[id2] || id2} · ${v.turns} t`)).join("") || "<span>Sin efectos activos</span>"}</div><details><summary>Equipo y habilidad</summary><p>${esc(f.weapon.name)} · ${f.protection} protección · ${ABILITIES[f.ability].name}</p><p>Recarga de habilidad: ${f.cooldowns.ability || 0} t · ${f.activeSpells.length} conjuros preparados</p></details></section>`).join("")}</div><div class="panel combat-stage"><canvas id="combat-canvas" width="1100" height="440" aria-label="Combate animado entre ${esc(b.fighters[0].name)} y ${esc(b.fighters[1].name)}"></canvas><div class="combat-controls">${btn(ui2.paused ? "▶ Reanudar" : "Ⅱ Pausa", "pause", result ? "disabled" : "")}<div class="speed-controls">${[1, 2, 4].map((speed) => btn(`×${speed}`, "speed", `data-speed="${speed}"`, s.options.speed === speed ? "selected" : "")).join("")}</div><label class="checkbox"><input type="checkbox" id="reasoning" ${s.options.reasoning ? "checked" : ""}> Mostrar razonamiento táctico</label></div></div>${result ? resultPanel(s) : ""}<section class="panel combat-log"><div class="panel-heading"><h2>Lo que cuenta la arena</h2><span class="muted">Decisiones reales de la IA · más recientes primero</span></div>${b.log.length ? b.log.slice(-14).reverse().map((e) => `<div class="action-entry"><span>${String(e.turn).padStart(2, "0")}</span><div><p>${esc(e.text)}</p>${s.options.reasoning ? `<small>${esc(e.reason)}</small>` : ""}</div></div>`).join("") : '<p class="muted">Los gladiadores se estudian antes de actuar…</p>'}</section>`;
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
  menuBattle.fighters[0].pos = 1;
  menuBattle.fighters[1].pos = 9;
  function toast(text, error = false) {
    const container = document.querySelector("#toasts");
    while (container.children.length >= 3) container.firstElementChild.remove();
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
    "shop-tab": (el) => {
      ui.shopCategory = el.dataset.category;
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
      if (canvas) drawArena(canvas, menuBattle, t);
    } else {
      const base = document.querySelector("#base-canvas");
      if (base) drawBase(base, state, t);
      const canvas = document.querySelector("#combat-canvas");
      if (canvas && state.battle) drawArena(canvas, state.battle, t, ui.paused ? Math.min(1, (lastTick - lastVisual) / (1050 / state.options.speed)) : Math.min(1, (now - lastVisual) / (1050 / state.options.speed)), previousPositions);
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
