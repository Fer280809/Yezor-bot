let handler = async (m, { conn, args, command }) => {
    let user = global.db.data.users[m.sender];
    if (!user) return;

    // Inicializar inventarios si no existen
    if (!user.animals) user.animals = {}
    if (!user.trophies) user.trophies = {}
    if (!user.huntJunk) user.huntJunk = {}
    if (!user.fish) user.fish = {}
    if (!user.treasures) user.treasures = {}
    if (!user.junk) user.junk = {}

    // PRECIOS DE RECURSOS BÁSICOS
    let sellPrices = {
        'esmeralda': 150,
        'hierro': 8,
        'oro': 25,
        'carbon': 5,
        'piedra': 2
    };

    let buyPrices = {
        'esmeralda': 200,
        'hierro': 12,
        'oro': 35,
        'carbon': 8,
        'piedra': 4
    };

    // PRECIOS DE ANIMALES
    let animalPrices = {
        "Conejo": 8, "Ardilla": 6, "Pato": 10, "Ciervo": 25,
        "Jabalí": 30, "Lobo": 45, "Oso": 60, "Águila": 100,
        "León": 150, "Tigre": 250, "Dragón": 400, "Fénix": 600
    };

    // PRECIOS DE TROFEOS DE CAZA
    let huntTrophyPrices = {
        "Pluma Rara": 12, "Cuerno Pequeño": 20, "Piel de Calidad": 35,
        "Colmillo Afilado": 50, "Garra Poderosa": 70, "Cuerno Dorado": 120,
        "Piel Legendaria": 180, "Corona de Bestia": 350, "Cofre de Cazador": 300,
        "Reliquia Ancestral": 550, "Cofre Mítico": 900
    };

    // PRECIOS DE PECES
    let fishPrices = {
        "Sardina": 5, "Trucha": 8, "Salmón": 15, "Atún": 20,
        "Pez Espada": 35, "Pez Dorado": 50, "Tiburón": 80,
        "Pez Dragón": 120, "Pulpo Gigante": 200, "Ballena": 350, "Kraken": 500
    };

    // PRECIOS DE TESOROS MARINOS
    let treasurePrices = {
        "Concha Marina": 10, "Perla": 25, "Collar de Algas": 30,
        "Moneda Antigua": 40, "Anillo Dorado": 60, "Brújula Mágica": 100,
        "Espada del Mar": 150, "Corona de Tritón": 300, "Cofre del Tesoro": 250,
        "Tridente de Poseidón": 500, "Cofre Mítico": 800
    };

    // Mapeo de nombres alternativos
    let itemMap = {
        'esmeralda': 'emerald', 'esmeraldas': 'emerald',
        'hierro': 'iron', 'oro': 'gold', 'carbon': 'coal',
        'carbón': 'coal', 'piedra': 'stone', 'piedras': 'stone'
    };

    let itemNames = {
        'emerald': '💎 Esmeralda', 'iron': '🔩 Hierro', 'gold': '🥇 Oro',
        'coal': '⚫ Carbón', 'stone': '🪨 Piedra'
    };

    // Si no hay argumentos, mostrar la tienda completa
    if (!args[0]) {
        let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/tienda.jpeg';
        
        // Calcular valores de inventarios
        let animalValue = 0, huntTrophyValue = 0, fishValue = 0, treasureValue = 0;
        
        for (let animal of Object.keys(user.animals)) {
            if (user.animals[animal] > 0) {
                animalValue += user.animals[animal] * (animalPrices[animal] || 1);
            }
        }
        
        for (let trophy of Object.keys(user.trophies)) {
            if (user.trophies[trophy] > 0 && !trophy.includes("Cofre")) {
                huntTrophyValue += user.trophies[trophy] * (huntTrophyPrices[trophy] || 1);
            }
        }
        
        for (let fish of Object.keys(user.fish)) {
            if (user.fish[fish] > 0) {
                fishValue += user.fish[fish] * (fishPrices[fish] || 1);
            }
        }
        
        for (let treasure of Object.keys(user.treasures)) {
            if (user.treasures[treasure] > 0 && !treasure.includes("Cofre")) {
                treasureValue += user.treasures[treasure] * (treasurePrices[treasure] || 1);
            }
        }

        let totalInventoryValue = animalValue + huntTrophyValue + fishValue + treasureValue;
        let currentCoins = user.coin || 0;
        let netWorth = totalInventoryValue + currentCoins;

        let tiendaInfo = `🏪 ✨ *GRAN MERCADO CENTRAL* ✨ 🏪
━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 *TU DINERO:* ${currentCoins} ${moneda}
🏆 *PATRIMONIO TOTAL:* ${netWorth} ${moneda}

┏━━━━━━━━ 📦 *RECURSOS BÁSICOS* ━━━━━━━━┓
┃ 💎 Esmeralda: ${user.emerald || 0}
┃ 🔩 Hierro: ${user.iron || 0}
┃ 🥇 Oro: ${user.gold || 0}
┃ ⚫ Carbón: ${user.coal || 0}
┃ 🪨 Piedra: ${user.stone || 0}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━ 🎣 *INVENTARIO DE PESCA* ━━━━━━━━┓
┃ 🐟 Peces: ${Object.values(user.fish).reduce((a, b) => a + b, 0)} unidades
┃ ✨ Tesoros: ${Object.values(user.treasures).reduce((a, b) => a + b, 0)} unidades
┃ 💰 Valor estimado: ${fishValue} ${moneda}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━ 🏹 *INVENTARIO DE CAZA* ━━━━━━━━┓
┃ 🦌 Animales: ${Object.values(user.animals).reduce((a, b) => a + b, 0)} unidades
┃ 🏆 Trofeos: ${Object.values(user.trophies).reduce((a, b) => a + b, 0)} unidades
┃ 💰 Valor estimado: ${animalValue + huntTrophyValue} ${moneda}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

🛒 *COMANDOS DE COMPRA/VENTA RECURSOS:*
• .tienda comprar [recurso] [cantidad]
• .tienda vender [recurso] [cantidad]

🏪 *COMANDOS DE VENTA MASIVA:*
• .tienda venderpesca - Vender todo de pesca
• .tienda vendercaza - Vender todo de caza
• .tienda vendertodo - Vender absolutamente todo

💡 *PRECIOS DE RECURSOS:*
┌─ VENTA → COMPRA ─┐
│ 💎 Esmeralda: ${sellPrices.esmeralda} → ${buyPrices.esmeralda}
│ 🔩 Hierro: ${sellPrices.hierro} → ${buyPrices.hierro}
│ 🥇 Oro: ${sellPrices.oro} → ${buyPrices.oro}
│ ⚫ Carbón: ${sellPrices.carbon} → ${buyPrices.carbon}
│ 🪨 Piedra: ${sellPrices.piedra} → ${buyPrices.piedra}
└────────────────────┘

🎯 *Ejemplo:* .tienda vender hierro 10`;

        await conn.sendFile(m.chat, img, 'tienda.jpg', tiendaInfo, m);
        await m.react('🏪');
        return;
    }

    let action = args[0].toLowerCase();

    // VENTA MASIVA DE PESCA
    if (action === 'venderpesca') {
        let totalEarned = 0;
        let soldItems = [];

        // Vender peces
        for (let fish of Object.keys(user.fish)) {
            if (user.fish[fish] > 0) {
                let quantity = user.fish[fish];
                let price = fishPrices[fish] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`🐟 ${fish}: ${quantity}x = ${earnings} ${moneda}`);
                user.fish[fish] = 0;
            }
        }

        // Vender tesoros (excepto cofres)
        for (let treasure of Object.keys(user.treasures)) {
            if (user.treasures[treasure] > 0 && !treasure.includes("Cofre")) {
                let quantity = user.treasures[treasure];
                let price = treasurePrices[treasure] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`✨ ${treasure}: ${quantity}x = ${earnings} ${moneda}`);
                user.treasures[treasure] = 0;
            }
        }

        if (soldItems.length === 0) {
            return conn.reply(m.chat, `📦 *NO HAY NADA DE PESCA PARA VENDER*\n\n🎣 Ve a pescar primero`, m);
        }

        user.coin = (user.coin || 0) + totalEarned;
        let bonus = soldItems.length >= 5 ? Math.floor(totalEarned * 0.1) : 0;
        if (bonus > 0) user.coin += bonus;

        let message = `🏪 *¡VENTA DE PESCA EXITOSA!* 🎣\n\n${soldItems.join('\n')}\n\n💰 *Total: ${totalEarned} ${moneda}*`;
        if (bonus > 0) message += `\n🎉 *Bonus: ${bonus} ${moneda}*`;
        message += `\n💳 *Balance: ${user.coin} ${moneda}*`;

        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
        await m.react('🎣');
        return;
    }

    // VENTA MASIVA DE CAZA
    if (action === 'vendercaza') {
        let totalEarned = 0;
        let soldItems = [];

        // Vender animales
        for (let animal of Object.keys(user.animals)) {
            if (user.animals[animal] > 0) {
                let quantity = user.animals[animal];
                let price = animalPrices[animal] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`🦌 ${animal}: ${quantity}x = ${earnings} ${moneda}`);
                user.animals[animal] = 0;
            }
        }

        // Vender trofeos (excepto cofres)
        for (let trophy of Object.keys(user.trophies)) {
            if (user.trophies[trophy] > 0 && !trophy.includes("Cofre")) {
                let quantity = user.trophies[trophy];
                let price = huntTrophyPrices[trophy] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`🏆 ${trophy}: ${quantity}x = ${earnings} ${moneda}`);
                user.trophies[trophy] = 0;
            }
        }

        if (soldItems.length === 0) {
            return conn.reply(m.chat, `📦 *NO HAY NADA DE CAZA PARA VENDER*\n\n🏹 Ve a cazar primero`, m);
        }

        user.coin = (user.coin || 0) + totalEarned;
        let bonus = soldItems.length >= 5 ? Math.floor(totalEarned * 0.12) : 0;
        if (bonus > 0) user.coin += bonus;

        let message = `🏪 *¡VENTA DE CAZA EXITOSA!* 🏹\n\n${soldItems.join('\n')}\n\n💰 *Total: ${totalEarned} ${moneda}*`;
        if (bonus > 0) message += `\n🎉 *Bonus: ${bonus} ${moneda}*`;
        message += `\n💳 *Balance: ${user.coin} ${moneda}*`;

        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
        await m.react('🏹');
        return;
    }

    // VENTA MASIVA DE TODO
    if (action === 'vendertodo') {
        let totalEarned = 0;
        let soldItems = [];

        // Vender peces
        for (let fish of Object.keys(user.fish)) {
            if (user.fish[fish] > 0) {
                let quantity = user.fish[fish];
                let price = fishPrices[fish] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`🐟 ${fish}: ${quantity}x = ${earnings} ${moneda}`);
                user.fish[fish] = 0;
            }
        }

        // Vender tesoros
        for (let treasure of Object.keys(user.treasures)) {
            if (user.treasures[treasure] > 0 && !treasure.includes("Cofre")) {
                let quantity = user.treasures[treasure];
                let price = treasurePrices[treasure] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`✨ ${treasure}: ${quantity}x = ${earnings} ${moneda}`);
                user.treasures[treasure] = 0;
            }
        }

        // Vender animales
        for (let animal of Object.keys(user.animals)) {
            if (user.animals[animal] > 0) {
                let quantity = user.animals[animal];
                let price = animalPrices[animal] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`🦌 ${animal}: ${quantity}x = ${earnings} ${moneda}`);
                user.animals[animal] = 0;
            }
        }

        // Vender trofeos
        for (let trophy of Object.keys(user.trophies)) {
            if (user.trophies[trophy] > 0 && !trophy.includes("Cofre")) {
                let quantity = user.trophies[trophy];
                let price = huntTrophyPrices[trophy] || 1;
                let earnings = quantity * price;
                totalEarned += earnings;
                soldItems.push(`🏆 ${trophy}: ${quantity}x = ${earnings} ${moneda}`);
                user.trophies[trophy] = 0;
            }
        }

        if (soldItems.length === 0) {
            return conn.reply(m.chat, `📦 *NO HAY NADA PARA VENDER*\n\n🎮 Ve a pescar o cazar primero`, m);
        }

        user.coin = (user.coin || 0) + totalEarned;
        let bonus = soldItems.length >= 10 ? Math.floor(totalEarned * 0.15) : 0;
        if (bonus > 0) user.coin += bonus;

        let message = `🏪 *¡LIQUIDACIÓN TOTAL EXITOSA!* 💰\n\n${soldItems.slice(0, 15).join('\n')}`;
        if (soldItems.length > 15) message += `\n... y ${soldItems.length - 15} elementos más`;
        message += `\n\n💰 *Gran Total: ${totalEarned} ${moneda}*`;
        if (bonus > 0) message += `\n🎉 *Mega Bonus: ${bonus} ${moneda}*`;
        message += `\n💳 *Balance Final: ${user.coin} ${moneda}*`;

        if (totalEarned >= 3000) {
            message += `\n\n👑 *¡VENTA MILLONARIA! ERES UN MAGNATE!* 🌟`;
        }

        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
        await m.react('💰');
        return;
    }

    // RESTO DEL CÓDIGO ORIGINAL PARA COMPRAR/VENDER RECURSOS
    let item = args[1] ? args[1].toLowerCase() : '';
    let cantidad = parseInt(args[2]) || 1;

    if (!['vender', 'comprar'].includes(action)) {
        return conn.reply(m.chat, `❌ Acción no válida. Usa: *vender*, *comprar*, *venderpesca*, *vendercaza* o *vendertodo*`, m);
    }

    if (!item) {
        return conn.reply(m.chat, `❌ Especifica el objeto que quieres ${action}.\n\n*Objetos disponibles:* esmeralda, hierro, oro, carbon, piedra`, m);
    }

    // Convertir nombre del item
    let realItem = itemMap[item] || item;
    if (!itemNames[realItem]) {
        return conn.reply(m.chat, `❌ Objeto no válido: *${item}*\n\n*Objetos disponibles:* esmeralda, hierro, oro, carbon, piedra`, m);
    }

    if (cantidad <= 0) {
        return conn.reply(m.chat, `❌ La cantidad debe ser mayor a 0`, m);
    }

    // VENDER RECURSOS
    if (action === 'vender') {
        let userAmount = user[realItem] || 0;
        
        if (userAmount < cantidad) {
            return conn.reply(m.chat, `❌ No tienes suficiente ${itemNames[realItem]}.\n*Tienes:* ${userAmount}\n*Intentas vender:* ${cantidad}`, m);
        }

        let sellPrice = sellPrices[item] || sellPrices[realItem];
        let totalGain = sellPrice * cantidad;

        user[realItem] -= cantidad;
        user.coin = (user.coin || 0) + totalGain;

        let sellMsg = `✅ *VENTA EXITOSA* ✅\n\n` +
            `📦 *Vendiste:* ${cantidad}x ${itemNames[realItem]}\n` +
            `💰 *Ganaste:* ${totalGain} ${moneda}\n` +
            `💸 *Dinero total:* ${user.coin} ${moneda}\n` +
            `📦 *${itemNames[realItem]} restante:* ${user[realItem]}`;

        await conn.sendMessage(m.chat, { text: sellMsg }, { quoted: m });
        await m.react('💰');
    }

    // COMPRAR RECURSOS
    if (action === 'comprar') {
        let buyPrice = buyPrices[item] || buyPrices[realItem];
        let totalCost = buyPrice * cantidad;
        let userMoney = user.coin || 0;

        if (userMoney < totalCost) {
            return conn.reply(m.chat, `❌ No tienes suficiente ${moneda}.\n*Tienes:* ${userMoney} ${moneda}\n*Necesitas:* ${totalCost} ${moneda}`, m);
        }

        user.coin -= totalCost;
        user[realItem] = (user[realItem] || 0) + cantidad;

        let buyMsg = `✅ *COMPRA EXITOSA* ✅\n\n` +
            `🛒 *Compraste:* ${cantidad}x ${itemNames[realItem]}\n` +
            `💸 *Gastaste:* ${totalCost} ${moneda}\n` +
            `💰 *Dinero restante:* ${user.coin} ${moneda}\n` +
            `📦 *${itemNames[realItem]} total:* ${user[realItem]}`;

        await conn.sendMessage(m.chat, { text: buyMsg }, { quoted: m });
        await m.react('🛒');
    }
}

handler.help = ['tienda', 'shop'];
handler.tags = ['economy'];
handler.command = ['tienda', 'shop', 'store'];
handler.register = true;
handler.group = true;

export default handler;
