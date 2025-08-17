let cooldowns = {}

// DEFINICIÓN DE LAS 100 CLASES
const classes = {
    1: { name: "Guerrero", emoji: "⚔️", health: 150, damage: 25, defense: 15 },
    2: { name: "Mago", emoji: "🧙", health: 100, damage: 35, defense: 8 },
    3: { name: "Arquero", emoji: "🏹", health: 120, damage: 30, defense: 10 },
    4: { name: "Paladín", emoji: "🛡️", health: 180, damage: 20, defense: 20 },
    5: { name: "Asesino", emoji: "🗡️", health: 110, damage: 40, defense: 5 },
    6: { name: "Berserker", emoji: "🪓", health: 160, damage: 35, defense: 8 },
    7: { name: "Druida", emoji: "🌿", health: 130, damage: 25, defense: 12 },
    8: { name: "Nigromante", emoji: "💀", health: 90, damage: 45, defense: 6 },
    9: { name: "Monje", emoji: "👊", health: 125, damage: 28, defense: 14 },
    10: { name: "Bárbaro", emoji: "🏴‍☠️", health: 170, damage: 30, defense: 10 },
    11: { name: "Hechicero", emoji: "✨", health: 95, damage: 38, defense: 7 },
    12: { name: "Cazador", emoji: "🎯", health: 115, damage: 32, defense: 9 },
    13: { name: "Caballero", emoji: "🐎", health: 155, damage: 22, defense: 18 },
    14: { name: "Ladrón", emoji: "🥷", health: 105, damage: 35, defense: 8 },
    15: { name: "Clérigo", emoji: "⛪", health: 140, damage: 18, defense: 16 },
    16: { name: "Elementalista", emoji: "🔥", health: 100, damage: 40, defense: 6 },
    17: { name: "Samurái", emoji: "🗾", health: 135, damage: 33, defense: 12 },
    18: { name: "Vikingo", emoji: "⚡", health: 165, damage: 28, defense: 11 },
    19: { name: "Chamán", emoji: "🦅", health: 120, damage: 26, defense: 13 },
    20: { name: "Demonio", emoji: "👹", health: 145, damage: 36, defense: 9 },
    21: { name: "Ángel", emoji: "👼", health: 130, damage: 24, defense: 15 },
    22: { name: "Vampiro", emoji: "🧛", health: 125, damage: 34, defense: 10 },
    23: { name: "Hombre Lobo", emoji: "🐺", health: 140, damage: 31, defense: 11 },
    24: { name: "Pirata", emoji: "🏴‍☠️", health: 135, damage: 29, defense: 10 },
    25: { name: "Ninja", emoji: "🥷", health: 110, damage: 38, defense: 7 },
    26: { name: "Espadachín", emoji: "⚔️", health: 128, damage: 32, defense: 11 },
    27: { name: "Brujo", emoji: "🔮", health: 98, damage: 42, defense: 6 },
    28: { name: "Gladiador", emoji: "🏛️", health: 150, damage: 27, defense: 13 },
    29: { name: "Explorador", emoji: "🗺️", health: 118, damage: 30, defense: 9 },
    30: { name: "Ingeniero", emoji: "⚙️", health: 125, damage: 25, defense: 14 },
    31: { name: "Alquimista", emoji: "⚗️", health: 108, damage: 33, defense: 8 },
    32: { name: "Mercenario", emoji: "💰", health: 132, damage: 31, defense: 10 },
    33: { name: "Templario", emoji: "✞", health: 160, damage: 23, defense: 17 },
    34: { name: "Espía", emoji: "🕵️", health: 112, damage: 36, defense: 8 },
    35: { name: "Guardián", emoji: "🛡️", health: 175, damage: 21, defense: 19 },
    36: { name: "Bestia", emoji: "🦁", health: 155, damage: 33, defense: 9 },
    37: { name: "Cyborg", emoji: "🤖", health: 140, damage: 35, defense: 12 },
    38: { name: "Psíquico", emoji: "🧠", health: 102, damage: 39, defense: 7 },
    39: { name: "Mutante", emoji: "🧬", health: 125, damage: 34, defense: 10 },
    40: { name: "Alienígena", emoji: "👽", health: 115, damage: 37, defense: 8 },
    41: { name: "Dragón", emoji: "🐉", health: 200, damage: 40, defense: 15 },
    42: { name: "Fénix", emoji: "🔥", health: 130, damage: 38, defense: 11 },
    43: { name: "Kraken", emoji: "🐙", health: 180, damage: 35, defense: 13 },
    44: { name: "Minotauro", emoji: "🐂", health: 170, damage: 32, defense: 12 },
    45: { name: "Centauro", emoji: "🏹", health: 145, damage: 29, defense: 11 },
    46: { name: "Gólem", emoji: "🗿", health: 190, damage: 25, defense: 20 },
    47: { name: "Espectro", emoji: "👻", health: 95, damage: 44, defense: 5 },
    48: { name: "Lich", emoji: "💀", health: 120, damage: 41, defense: 8 },
    49: { name: "Titán", emoji: "⛰️", health: 220, damage: 30, defense: 18 },
    50: { name: "Dios", emoji: "⚡", health: 250, damage: 45, defense: 20 },
    51: { name: "Cazador de Demonios", emoji: "😈", health: 135, damage: 36, defense: 10 },
    52: { name: "Inquisidor", emoji: "🔥", health: 145, damage: 28, defense: 15 },
    53: { name: "Ejecutor", emoji: "🪓", health: 150, damage: 34, defense: 9 },
    54: { name: "Verdugo", emoji: "⚔️", health: 140, damage: 37, defense: 8 },
    55: { name: "Conquistador", emoji: "👑", health: 155, damage: 30, defense: 13 },
    56: { name: "Emperador", emoji: "👑", health: 180, damage: 25, defense: 18 },
    57: { name: "Rey", emoji: "👑", health: 165, damage: 27, defense: 16 },
    58: { name: "Reina", emoji: "👸", health: 150, damage: 29, defense: 14 },
    59: { name: "Príncipe", emoji: "🤴", health: 140, damage: 31, defense: 12 },
    60: { name: "Princesa", emoji: "👸", health: 135, damage: 33, defense: 11 },
    61: { name: "Comandante", emoji: "🎖️", health: 160, damage: 32, defense: 14 },
    62: { name: "General", emoji: "⭐", health: 170, damage: 29, defense: 16 },
    63: { name: "Capitán", emoji: "🛳️", health: 145, damage: 34, defense: 11 },
    64: { name: "Almirante", emoji: "⚓", health: 155, damage: 31, defense: 13 },
    65: { name: "Corsario", emoji: "🏴‍☠️", health: 140, damage: 35, defense: 9 },
    66: { name: "Bucanero", emoji: "⚔️", health: 135, damage: 36, defense: 8 },
    67: { name: "Lobo Solitario", emoji: "🐺", health: 125, damage: 38, defense: 7 },
    68: { name: "Cazador de Brujas", emoji: "🔥", health: 130, damage: 35, defense: 10 },
    69: { name: "Exorcista", emoji: "✞", health: 140, damage: 32, defense: 12 },
    70: { name: "Sacerdote Guerrero", emoji: "⛪", health: 155, damage: 26, defense: 15 },
    71: { name: "Maestro de Armas", emoji: "⚔️", health: 145, damage: 33, defense: 11 },
    72: { name: "Duelista", emoji: "🤺", health: 120, damage: 39, defense: 8 },
    73: { name: "Espadachín Maestro", emoji: "🗡️", health: 135, damage: 36, defense: 10 },
    74: { name: "Arquero Élite", emoji: "🏹", health: 125, damage: 37, defense: 9 },
    75: { name: "Francotirador", emoji: "🎯", health: 115, damage: 42, defense: 7 },
    76: { name: "Bombardero", emoji: "💣", health: 130, damage: 40, defense: 8 },
    77: { name: "Demoledor", emoji: "🧨", health: 155, damage: 35, defense: 10 },
    78: { name: "Berserker Élite", emoji: "🪓", health: 170, damage: 38, defense: 7 },
    79: { name: "Guerrero Sombra", emoji: "🌑", health: 140, damage: 34, defense: 11 },
    80: { name: "Asesino Maestro", emoji: "🗡️", health: 110, damage: 45, defense: 6 },
    81: { name: "Hechicero Supremo", emoji: "🔮", health: 100, damage: 48, defense: 5 },
    82: { name: "Archimago", emoji: "🧙", health: 105, damage: 46, defense: 6 },
    83: { name: "Señor de la Guerra", emoji: "⚔️", health: 185, damage: 32, defense: 15 },
    84: { name: "Campeón", emoji: "🏆", health: 175, damage: 35, defense: 13 },
    85: { name: "Leyenda", emoji: "⭐", health: 190, damage: 38, defense: 14 },
    86: { name: "Héroe", emoji: "🦸", health: 165, damage: 40, defense: 12 },
    87: { name: "Vengador", emoji: "⚡", health: 155, damage: 42, defense: 10 },
    88: { name: "Destructor", emoji: "💥", health: 180, damage: 41, defense: 9 },
    89: { name: "Aniquilador", emoji: "☠️", health: 160, damage: 44, defense: 8 },
    90: { name: "Exterminador", emoji: "🔥", health: 170, damage: 43, defense: 9 },
    91: { name: "Apocalipsis", emoji: "🌋", health: 200, damage: 45, defense: 10 },
    92: { name: "Némesis", emoji: "👿", health: 185, damage: 47, defense: 8 },
    93: { name: "Abismo", emoji: "🕳️", health: 175, damage: 49, defense: 7 },
    94: { name: "Vacío", emoji: "⚫", health: 150, damage: 52, defense: 5 },
    95: { name: "Caos", emoji: "🌀", health: 165, damage: 50, defense: 6 },
    96: { name: "Infinito", emoji: "♾️", health: 180, damage: 48, defense: 8 },
    97: { name: "Eterno", emoji: "⌛", health: 195, damage: 46, defense: 10 },
    98: { name: "Supremo", emoji: "👑", health: 210, damage: 44, defense: 12 },
    99: { name: "Omnipotente", emoji: "✨", health: 225, damage: 50, defense: 15 },
    100: { name: "Creador", emoji: "🌟", health: 300, damage: 60, defense: 25 }
}

// ENEMIGOS Y MISIONES
const MAX_LEVEL = 50

const combatActions = [
    { name: "Ataque Normal", emoji: "⚔️", multiplier: 1 },
    { name: "Ataque Fuerte", emoji: "💥", multiplier: 1.5 },
    { name: "Ataque Crítico", emoji: "⚡", multiplier: 2 }
]

function generateMissionsForLevel(level) {
    const baseMissions = [
        {
            id: 1,
            name: "Explorar el Bosque Maldito",
            description: "Aventúrate en las profundidades del bosque encantado",
            emoji: "🌲",
            difficulty: "Fácil",
            enemies: [{
                name: "Lobo Salvaje",
                emoji: "🐺",
                health: 50 + (level * 10),
                damage: 15 + (level * 2)
            }]
        },
        {
            id: 2,
            name: "Infiltrar la Fortaleza Oscura",
            description: "Penetra en las defensas de la fortaleza enemiga",
            emoji: "🏰",
            difficulty: "Medio",
            enemies: [{
                name: "Guardia Esqueleto",
                emoji: "💀",
                health: 80 + (level * 15),
                damage: 20 + (level * 3)
            }]
        },
        {
            id: 3,
            name: "Derrotar al Dragón Antiguo",
            description: "Enfréntate al legendario dragón de las montañas",
            emoji: "🐉",
            difficulty: "Difícil",
            enemies: [{
                name: "Dragón Anciano",
                emoji: "🐲",
                health: 150 + (level * 25),
                damage: 35 + (level * 5)
            }]
        },
        {
            id: 4,
            name: "Conquistar el Abismo",
            description: "Desciende a las profundidades del inframundo",
            emoji: "🕳️",
            difficulty: "Extremo",
            enemies: [{
                name: "Demonio del Abismo",
                emoji: "👹",
                health: 200 + (level * 30),
                damage: 45 + (level * 7)
            }]
        }
    ]
    return baseMissions
}

let handler = async (m, { conn, args, command }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    // El objeto fkontak debe estar aquí para usar m
    const fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m?.sender?.split('@')[0]}:${m?.sender?.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    }

    
    if (!user.rpg) {
        user.rpg = {
            class: null,
            level: 1,
            exp: 0,
            maxHealth: 100,
            currentHealth: 100,
            damage: 20,
            defense: 10,
            coins: 100,
            iron: 0,
            gold: 0,
            emerald: 0,
            coal: 0,
            stone: 0,
            lastMission: 0,
            inCombat: false,
            enemy: null,
            selectedMission: null,
            selectingClass: false,
            completedMissions: {}
        };
    }

    let img = 'https://github.com/Fer280809/Asta_bot/blob/main/tmp/imajen-bosque.jpeg?raw=true'
    let text = (m.text || '').trim().toLowerCase();

    // --- REGENERACIÓN AUTOMÁTICA DE SALUD ---
    if (user.rpg.currentHealth <= 0) {
        let now = Date.now();
        let lastDeath = user.rpg.lastDeath || 0;
        let regenTime = 600000; // 10 minutos
        
        if (now - lastDeath > regenTime) {
            user.rpg.currentHealth = Math.floor(user.rpg.maxHealth * 0.5); // Regenera 50% de salud
            await conn.reply(m.chat, '💚 Tu salud se ha regenerado parcialmente. ¡Puedes continuar tu aventura!', m);
        }
    }

    // --- INICIO DE JUEGO ---
    if (text === 'comenzar') {
        if (user.rpg.class) {
            return conn.reply(m.chat, `${classes[user.rpg.class].emoji} Ya has comenzado tu aventura como ${classes[user.rpg.class].name}. Usa *mision* para continuar.`, m);
        }
        user.rpg.selectingClass = true;

        let classSelection = `🏰 *¡Bienvenido a Reinos de Sombras!* 🏰\n\n✨ *Elige tu clase de aventurero (1-100):* ✨\n\n`;
        for (let i = 1; i <= 100; i++) {
            classSelection += `${i}️⃣ ${classes[i].emoji} *${classes[i].name}*\n   ❤️ Vida: ${classes[i].health} | ⚔️ Daño: ${classes[i].damage} | 🛡️ Defensa: ${classes[i].defense}\n`
        }
        classSelection += `\n📝 *Escribe el número de tu elección (1-100)*`;

        await conn.sendFile(m.chat, img, 'rpg.jpg', classSelection, fkontak);
        await m.react('🏰');
        return;
    }

    // --- MENÚ DE MISIONES ---
    if (text === 'mision' || text === 'menumision') {
        if (!user.rpg.class) {
            return conn.reply(m.chat, '❌ Primero debes usar *comenzar* para seleccionar tu clase.', m);
        }
        let level = user.rpg.level;
        if (!user.rpg.completedMissions[level]) user.rpg.completedMissions[level] = [];
        let allMissions = generateMissionsForLevel(level);
        let availableMissions = allMissions.filter(mis => !user.rpg.completedMissions[level].includes(mis.id));
        
        if (availableMissions.length === 0) {
            if (level < MAX_LEVEL) {
                user.rpg.level++;
                user.rpg.completedMissions[user.rpg.level] = [];
                await conn.reply(m.chat, `🎉 ¡Has completado todas las misiones de nivel ${level}! Subes a nivel ${user.rpg.level} y tienes nuevas misiones. Usa *mision* de nuevo.`, m);
            } else {
                user.rpg.completedMissions = {};
                user.rpg.level = 1;
                await conn.reply(m.chat, `🏆 ¡Completaste el ciclo de misiones! Todo se reinicia y puedes volver a jugar desde el nivel 1.`, m);
            }
            return;
        }
        
        let missionMenu = `🗺️ *MISIONES DISPONIBLES NIVEL ${level}* 🗺️\n\n`;
        availableMissions.forEach((mission) => {
            let difficultyColor = {Fácil:'🟢',Medio:'🟡',Difícil:'🟠',Extremo:'🔴'}[mission.difficulty];
            missionMenu += `${mission.id}️⃣ ${mission.emoji} *${mission.name}*\n   ${mission.description}\n   ${difficultyColor} Dificultad: ${mission.difficulty}\n\n`;
        });
        missionMenu += `📝 *Escribe el número de la misión que deseas realizar*\n💡 *Usa estado para ver tu información actual*`;
        
        await conn.sendFile(m.chat, img, 'missions.jpg', missionMenu, fkontak);
        await m.react('🗺️');
        return;
    }

    // --- ESTADO ---
    if (text === 'estado') {
        if (!user.rpg.class) {
            return conn.reply(m.chat, '❌ Primero debes usar *comenzar* para seleccionar tu clase.', m);
        }
        let selectedClassInfo = classes[user.rpg.class];
        let statusMsg = `📊 *ESTADO DEL AVENTURERO* 📊\n\n` +
            `${selectedClassInfo.emoji} *Clase:* ${selectedClassInfo.name}\n` +
            `🆙 *Nivel:* ${user.rpg.level}\n` +
            `✨ *Experiencia:* ${user.rpg.exp}\n` +
            `❤️ *Vida:* ${user.rpg.currentHealth}/${user.rpg.maxHealth}\n` +
            `⚔️ *Daño:* ${user.rpg.damage}\n` +
            `🛡️ *Defensa:* ${user.rpg.defense}\n` +
            `💰 *Monedas:* ${user.rpg.coins}\n\n` +
            `🎒 *RECURSOS:*\n` +
            `🔩 *Hierro:* ${user.rpg.iron}\n` +
            `🥇 *Oro:* ${user.rpg.gold}\n` +
            `💎 *Esmeraldas:* ${user.rpg.emerald}\n` +
            `⚫ *Carbón:* ${user.rpg.coal}\n` +
            `🪨 *Piedra:* ${user.rpg.stone}`;
        await conn.reply(m.chat, statusMsg, m);
        await m.react('📊');
        return;
    }

    // --- RENDIRSE ---
    if (text === 'rendirse') {
        user.rpg = {
            class: null,
            level: 1,
            exp: 0,
            maxHealth: 100,
            currentHealth: 100,
            damage: 20,
            defense: 10,
            coins: 100,
            iron: 0,
            gold: 0,
            emerald: 0,
            coal: 0,
            stone: 0,
            lastMission: 0,
            inCombat: false,
            enemy: null,
            selectedMission: null,
            selectingClass: false,
            completedMissions: {}
        }
        await conn.reply(m.chat, `🎲 Has reiniciado tu aventura. Usa *comenzar* para elegir personaje y nivel de nuevo.`, m)
        await m.react('🔄')
        return;
    }

    // --- SELECCIÓN DE CLASE ---
    if (
        user.rpg.selectingClass &&
        !user.rpg.class &&
        !isNaN(text) &&
        Number(text) >= 1 && Number(text) <= 100
    ) {
        let selectedClass = classes[parseInt(text)];
        user.rpg.class = parseInt(text);
        user.rpg.maxHealth = selectedClass.health;
        user.rpg.currentHealth = selectedClass.health;
        user.rpg.damage = selectedClass.damage;
        user.rpg.defense = selectedClass.defense;
        user.rpg.selectingClass = false;

        let welcome = `⚡ *¡Clase seleccionada!* ⚡\n\n` +
            `${selectedClass.emoji} *Ahora eres un ${selectedClass.name}*\n\n` +
            `📊 *Tus estadísticas:*\n` +
            `❤️ Vida: ${selectedClass.health}/${selectedClass.health}\n` +
            `⚔️ Daño: ${selectedClass.damage}\n` +
            `🛡️ Defensa: ${selectedClass.defense}\n` +
            `💰 Monedas: ${user.rpg.coins}\n\n` +
            `🗡️ *¡Tu aventura comienza ahora!*\n` +
            `Usa *mision* para emprender tu primera misión`;

        await conn.reply(m.chat, welcome, m);
        await m.react('⚡');
        return;
    }

    // --- SELECCIÓN DE MISIÓN ---
    if (
        user.rpg.class &&
        !user.rpg.selectingClass &&
        !user.rpg.inCombat &&
        !isNaN(text)
    ) {
        let level = user.rpg.level;
        let allMissions = generateMissionsForLevel(level);
        let selectedMission = allMissions.find(mis => mis.id === parseInt(text));
        
        if (!selectedMission) return;
        
        if (!user.rpg.completedMissions[level]) user.rpg.completedMissions[level] = [];
        if (user.rpg.completedMissions[level].includes(selectedMission.id)) {
            return conn.reply(m.chat, '✅ Ya completaste esta misión. Elige otra.', m);
        }
        
        if (user.rpg.currentHealth <= 0) {
            return conn.reply(m.chat, '💀 Estás muerto. Espera un momento para que tu salud se regenere automáticamente.', m);
        }
        
        let time = user.rpg.lastMission + 300000; // 5 minutos
        let now = Date.now();
        if (now < time) {
            let wait = Math.ceil((time - now)/1000);
            return conn.reply(m.chat, `⏳ Debes esperar ${wait} segundos antes de intentar una nueva misión.`, m);
        }
        
        // Iniciar combate
        user.rpg.inCombat = true;
        user.rpg.enemy = {
            ...selectedMission.enemies[0],
            health: selectedMission.enemies[0].health
        };
        user.rpg.selectedMission = selectedMission.id;

        let startMsg = `⚔️ *¡Combate iniciado!* ⚔️\n\n` +
            `🎯 *Misión:* ${selectedMission.name}\n` +
            `Te enfrentas a: ${selectedMission.enemies[0].emoji} *${selectedMission.enemies[0].name}*\n` +
            `❤️ Vida enemigo: ${selectedMission.enemies[0].health}\n` +
            `⚔️ Daño enemigo: ${selectedMission.enemies[0].damage}\n\n` +
            `Tu vida: ❤️ ${user.rpg.currentHealth}\n\n` +
            `🎮 *Elige tu acción:*\n` +
            combatActions.map((a, i) => `${i+1}️⃣ ${a.emoji} *${a.name}*`).join('\n') +
            `\n\n📝 Escribe el número de tu acción (1-3)`;

        await conn.reply(m.chat, startMsg, m);
        await m.react('⚔️');
        return;
    }

    // --- ACCIONES DE COMBATE ---
    if (
        user.rpg.inCombat &&
        user.rpg.enemy &&
        !isNaN(text) &&
        Number(text) >= 1 && Number(text) <= 3
    ) {
        let action = combatActions[Number(text)-1];
        let userDamage = Math.floor(user.rpg.damage * action.multiplier);
        let enemy = user.rpg.enemy;
        let enemyDamage = Math.floor(enemy.damage - user.rpg.defense/2);
        if (enemyDamage < 0) enemyDamage = 0;

        let resultMsg = `🔥 *RESULTADO DEL TURNO* 🔥\n\n`;

        // Ataca usuario
        enemy.health -= userDamage;
        resultMsg += `⚔️ Atacaste con ${action.name} (${action.emoji}) e hiciste ${userDamage} de daño.\n`;
        
        if (enemy.health <= 0) {
            resultMsg += `\n🎉 ¡Derrotaste a ${enemy.emoji} *${enemy.name}*! 🎉\n`;
            let expGained = 30 + Math.floor(Math.random()*10);
            let coinsGained = 50 + Math.floor(Math.random()*30);
            user.rpg.exp += expGained;
            user.rpg.coins += coinsGained;
            user.rpg.completedMissions[user.rpg.level].push(user.rpg.selectedMission);
            user.rpg.inCombat = false;
            user.rpg.enemy = null;
            user.rpg.selectedMission = null;
            user.rpg.lastMission = Date.now();
            resultMsg += `\n🏅 Recompensas: +${expGained} EXP, +${coinsGained} monedas.\n`;
            await conn.reply(m.chat, resultMsg, m);
            await m.react('🏅');
            return;
        }

        // Ataca enemigo
        user.rpg.currentHealth -= enemyDamage;
        resultMsg += `🩸 El enemigo contraataca e hizo ${enemyDamage} de daño.\n`;
        
        if (user.rpg.currentHealth <= 0) {
            user.rpg.currentHealth = 0;
            user.rpg.inCombat = false;
            user.rpg.enemy = null;
            user.rpg.selectedMission = null;
            user.rpg.lastDeath = Date.now();
            resultMsg += `\n💀 ¡Has sido derrotado! Espera para que tu salud se regenere automáticamente. Puedes intentar de nuevo más tarde.`;
            await conn.reply(m.chat, resultMsg, m);
            await m.react('💀');
            return;
        }

        // Continuar combate
        resultMsg += `\n❤️ Tu vida: ${user.rpg.currentHealth}\n`;
        resultMsg += `❤️ Vida del enemigo: ${enemy.health}\n`;
        resultMsg += `\n🎮 *Elige tu siguiente acción:*\n` +
            combatActions.map((a, i) => `${i+1}️⃣ ${a.emoji} *${a.name}*`).join('\n') +
            `\n\n📝 Escribe el número de tu acción (1-3)`;

        await conn.reply(m.chat, resultMsg, m);
        await m.react('⚔️');
        return;
    }

    // --- AYUDA ---
    if (text === 'ayuda' || text === 'help') {
        let helpMsg = `🎮 *GUÍA DE COMANDOS - REINOS DE SOMBRAS* 🎮\n\n` +
            `🏁 *comenzar* - Iniciar aventura y elegir clase\n` +
            `🗺️ *mision* - Ver misiones disponibles\n` +
            `📊 *estado* - Ver tu información de jugador\n` +
            `🔄 *rendirse* - Reiniciar completamente\n` +
            `❓ *ayuda* - Mostrar esta guía\n\n` +
            `📋 *CÓMO JUGAR:*\n` +
            `1️⃣ Usa *comenzar* para elegir una clase (1-100)\n` +
            `2️⃣ Usa *mision* para ver misiones disponibles\n` +
            `3️⃣ Escribe el número de la misión para combatir\n` +
            `4️⃣ En combate, elige acciones (1-3)\n` +
            `5️⃣ Gana experiencia y monedas por victorias\n\n` +
            `⚡ ¡Disfruta tu aventura épica!`;
        
        await conn.reply(m.chat, helpMsg, m);
        await m.react('❓');
        return;
    }
}

// COMANDO PRINCIPAL Y TODOS LOS NÚMEROS
handler.command = [
    'comenzar', 'mision', 'menumision', 'estado', 'rendirse', 'ayuda', 'help',
    ...Array.from({length: 100}, (_, i) => (i+1).toString()),
    '1', '2', '3' // Para las acciones de combate
]

handler.tags = ['rpg']
handler.help = ['comenzar', 'mision', 'estado']

export default handler
