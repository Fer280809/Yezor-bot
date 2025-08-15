import db from '../lib/database.js';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    
    if (!(who in global.db.data.users)) {
        return conn.reply(m.chat, `❌ *Usuario no encontrado*`, m);
    }
    
    let user = global.db.data.users[who];
    let name = conn.getName(who);
    
    // Inicializar todos los inventarios
    if (!user.animals) user.animals = {};
    if (!user.trophies) user.trophies = {};
    if (!user.fish) user.fish = {};
    if (!user.treasures) user.treasures = {};
    if (!user.huntJunk) user.huntJunk = {};
    if (!user.junk) user.junk = {};
    
    // Calcular nivel y experiencia
    let level = Math.floor(Math.log((user.exp || 0) + 1) / Math.log(4));
    if (level < 0) level = 0;
    
    // Barra de salud visual
    let healthPercentage = Math.min((user.health || 100) / 100, 1);
    let healthBlocks = Math.floor(healthPercentage * 10);
    let healthBar = '█'.repeat(healthBlocks) + '░'.repeat(10 - healthBlocks);
    
    // Filtrar elementos que el usuario posee
    let ownedAnimals = Object.entries(user.animals).filter(([item, qty]) => qty > 0);
    let ownedTrophies = Object.entries(user.trophies).filter(([item, qty]) => qty > 0);
    let ownedFish = Object.entries(user.fish).filter(([item, qty]) => qty > 0);
    let ownedTreasures = Object.entries(user.treasures).filter(([item, qty]) => qty > 0);
    
    // Calcular valores para determinar rango
    let animalPrices = {
        "Conejo": 8, "Ardilla": 6, "Pato": 10, "Ciervo": 25, "Jabalí": 30,
        "Lobo": 45, "Oso": 60, "Águila": 100, "León": 150, "Tigre": 250,
        "Dragón": 400, "Fénix": 600
    };
    
    let trophyPrices = {
        "Pluma Rara": 12, "Cuerno Pequeño": 20, "Piel de Calidad": 35,
        "Colmillo Afilado": 50, "Garra Poderosa": 70, "Cuerno Dorado": 120,
        "Piel Legendaria": 180, "Corona de Bestia": 350, "Cofre de Cazador": 300,
        "Reliquia Ancestral": 550, "Cofre Mítico": 900
    };
    
    let fishPrices = {
        "Sardina": 5, "Trucha": 8, "Salmón": 15, "Atún": 20, "Pez Espada": 35,
        "Pez Dorado": 50, "Tiburón": 80, "Pez Dragón": 120, "Pulpo Gigante": 200,
        "Ballena": 350, "Kraken": 500
    };
    
    let treasurePrices = {
        "Concha Marina": 10, "Perla": 25, "Collar de Algas": 30, "Moneda Antigua": 40,
        "Anillo Dorado": 60, "Brújula Mágica": 100, "Espada del Mar": 150,
        "Corona de Tritón": 300, "Cofre del Tesoro": 250, "Tridente de Poseidón": 500,
        "Cofre Mítico": 800
    };
    
    // Calcular valores totales
    let animalValue = ownedAnimals.reduce((sum, [item, qty]) => sum + qty * (animalPrices[item] || 1), 0);
    let trophyValue = ownedTrophies.reduce((sum, [item, qty]) => sum + qty * (trophyPrices[item] || 1), 0);
    let fishValue = ownedFish.reduce((sum, [item, qty]) => sum + qty * (fishPrices[item] || 1), 0);
    let treasureValue = ownedTreasures.reduce((sum, [item, qty]) => sum + qty * (treasurePrices[item] || 1), 0);
    
    let totalInventoryValue = animalValue + trophyValue + fishValue + treasureValue;
    let totalWealth = totalInventoryValue + (user.coin || 0) + (user.bank || 0);
    
    // Determinar rango
    let rankData = {};
    if (totalWealth >= 15000) { rankData = { emoji: '👑', title: 'EMPERADOR LEGENDARIO', color: '🟨' }; }
    else if (totalWealth >= 8000) { rankData = { emoji: '💎', title: 'MAESTRO SUPREMO', color: '🟦' }; }
    else if (totalWealth >= 4000) { rankData = { emoji: '⭐', title: 'EXPERTO AVANZADO', color: '🟪' }; }
    else if (totalWealth >= 2000) { rankData = { emoji: '🏹', title: 'AVENTURERO HÁBIL', color: '🟩' }; }
    else if (totalWealth >= 800) { rankData = { emoji: '🎯', title: 'EXPLORADOR ACTIVO', color: '🟧' }; }
    else { rankData = { emoji: '🌱', title: 'NOVATO PROMETEDOR', color: '🟫' }; }
    
    // Estado premium y aventuras
    let premiumEmoji = user.premium ? '👑 Premium' : '🆓 Gratuito';
    let adventureCooldown = 3600000;
    let timeLeft = user.lastAdventure ? adventureCooldown - (Date.now() - user.lastAdventure) : 0;
    let adventureStatus = timeLeft <= 0 ? '🟢 Disponible' : '🔴 En espera';
    
    // Fecha actual
    let now = new Date();
    let formattedDate = now.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Construir mensaje con formato continuo
    let text = `╔═══════════════════════╗
║ 🎒 *INVENTARIO DE AVENTURERO* 🎒
╠═══════════════════════╝
║ 👤 *Aventurero:* ${name}
║ ${rankData.emoji} *Rango:* ${rankData.title}
║ 🌟 *Nivel:* ${level}
║ ✨ *Experiencia:* ${(user.exp || 0).toLocaleString()} EXP
╠═══════════════════════
║ 💰 *ECONOMÍA* 💰
╠═══════════════════════
║ 💸 *Monedas en Cartera:* ${(user.coin || 0).toLocaleString()}
║ 🏦 *Monedas en Banco:* ${(user.bank || 0).toLocaleString()}
║ 🎟️ *Tokens:* ${user.joincount || 0}
║ 💎 *Patrimonio Total:* ${totalWealth.toLocaleString()}
╠═══════════════════════
║ 💎 *RECURSOS* 💎
╠═══════════════════════
║ 💎 *Diamantes:* ${user.diamond || 0}
║ ♦️ *Esmeraldas:* ${user.emerald || 0}
║ 🏅 *Oro:* ${user.gold || 0}
║ 🔩 *Hierro:* ${user.iron || 0}
║ 🕋 *Carbón:* ${user.coal || 0}
║ 🪨 *Piedra:* ${user.stone || 0}`;

    // Agregar sección de animales si los tiene
    if (ownedAnimals.length > 0) {
        text += `
╠═══════════════════════
║ 🦌 *ANIMALES DE CAZA* 🦌
╠═══════════════════════`;
        ownedAnimals.slice(0, 5).forEach(([animal, qty]) => {
            text += `\n║ 🦌 *${animal}:* ${qty}x`;
        });
        if (ownedAnimals.length > 5) {
            text += `\n║ 📦 *+${ownedAnimals.length - 5} animales más*`;
        }
        text += `\n║ 💰 *Valor:* ${animalValue.toLocaleString()} monedas`;
    }
    
    // Agregar sección de trofeos si los tiene
    if (ownedTrophies.length > 0) {
        text += `
╠═══════════════════════
║ 🏆 *TROFEOS DE CAZA* 🏆
╠═══════════════════════`;
        ownedTrophies.slice(0, 4).forEach(([trophy, qty]) => {
            text += `\n║ 🏆 *${trophy}:* ${qty}x`;
        });
        if (ownedTrophies.length > 4) {
            text += `\n║ 📦 *+${ownedTrophies.length - 4} trofeos más*`;
        }
        text += `\n║ 💰 *Valor:* ${trophyValue.toLocaleString()} monedas`;
    }
    
    // Agregar sección de peces si los tiene
    if (ownedFish.length > 0) {
        text += `
╠═══════════════════════
║ 🐟 *PECES CAPTURADOS* 🐟
╠═══════════════════════`;
        ownedFish.slice(0, 5).forEach(([fish, qty]) => {
            text += `\n║ 🐟 *${fish}:* ${qty}x`;
        });
        if (ownedFish.length > 5) {
            text += `\n║ 📦 *+${ownedFish.length - 5} peces más*`;
        }
        text += `\n║ 💰 *Valor:* ${fishValue.toLocaleString()} monedas`;
    }
    
    // Agregar sección de tesoros si los tiene
    if (ownedTreasures.length > 0) {
        text += `
╠═══════════════════════
║ ✨ *TESOROS MARINOS* ✨
╠═══════════════════════`;
        ownedTreasures.slice(0, 4).forEach(([treasure, qty]) => {
            text += `\n║ ✨ *${treasure}:* ${qty}x`;
        });
        if (ownedTreasures.length > 4) {
            text += `\n║ 📦 *+${ownedTreasures.length - 4} tesoros más*`;
        }
        text += `\n║ 💰 *Valor:* ${treasureValue.toLocaleString()} monedas`;
    }
    
    // Agregar coleccionables si existen
    if (user.candies || user.gifts) {
        text += `
╠═══════════════════════
║ 🎁 *COLECCIONABLES* 🎁
╠═══════════════════════`;
        if (user.candies) text += `\n║ 🍬 *Dulces:* ${user.candies}`;
        if (user.gifts) text += `\n║ 🎁 *Regalos:* ${user.gifts}`;
    }
    
    // Finalizar con estado y fecha
    text += `
╠═══════════════════════
║ ❤️ *ESTADO* ❤️
╠═══════════════════════
║ ${healthBar} (${user.health || 100}/100)
║ 👑 *Premium:* ${premiumEmoji}
║ 🔮 *Aventura:* ${adventureStatus}
╠═══════════════════════
║ 📅 *${formattedDate}*
╚═══════════════════════

🎯 *Comandos rápidos:*
\`${usedPrefix}cazar\` • \`${usedPrefix}pescar\` • \`${usedPrefix}minar\`
\`${usedPrefix}vendercaza\` • \`${usedPrefix}aventura\`

${rankData.color} ${rankData.emoji} *¡Sigue coleccionando para subir de rango!* ${rankData.emoji} ${rankData.color}`;

    // Si no tiene nada en inventarios especiales
    if (ownedAnimals.length === 0 && ownedTrophies.length === 0 && ownedFish.length === 0 && ownedTreasures.length === 0) {
        text += `\n\n🎒 *Tu inventario de aventuras está vacío*\n🏹 ¡Comienza a cazar, pescar y explorar!`;
    }

    await conn.reply(m.chat, text, m);
}

handler.help = ['inv', 'inventario', 'mochila'];
handler.tags = ['rpg'];
handler.command = ['inv', 'inventario', 'mochila', 'bag', 'recursos'];
handler.register = true;

export default handler;
