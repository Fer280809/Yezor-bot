import moment from 'moment-timezone';

var handler = async (m, { conn }) => {
    // Obtener referencia al usuario
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    
    // Calcular recompensas con bonificaciones basadas en nivel
    let nivel = user.level || 1;
    let multiplier = 1 + (nivel * 0.05); // Bonificación de 5% por nivel
    
    // Calcular recompensas base aleatorias
    let coin = Math.floor((Math.random() * (500 - 100 + 1)) + 100);
    let exp = Math.floor((Math.random() * (500 - 100 + 1)) + 100);
    let diamond = Math.floor((Math.random() * (500 - 100 + 1)) + 100);
    
    // Aplicar multiplicador basado en nivel
    coin = Math.floor(coin * multiplier);
    exp = Math.floor(exp * multiplier);
    diamond = Math.floor(diamond * multiplier);
    
    // Bonificación para usuarios premium
    if (user.premium) {
        coin *= 2;
        exp *= 2;
        diamond *= 2;
    }
    
    // Verificar si puede reclamar recompensas diarias
    let cooldown = 86400000; // 24 horas en milisegundos
    let lastClaim = user.lastclaim || 0;
    let now = new Date();
    let availableAt = lastClaim + cooldown;
    
    // Verificar si el usuario está en cooldown
    if (now < availableAt) {
        // Si está en cooldown, mostrar tiempo restante
        let timeRemaining = msToTime(availableAt - now);
        
        let cooldownMessage = `*╭━━━━❰ ⏰ RECOMPENSA EN ESPERA ⏰ ❱━━━━╮*
*┃*
*┃* *${emoji4} ¡Ya reclamaste tu recompensa diaria!*
*┃* 
*┃* *⏳ Tiempo restante:* ${timeRemaining}
*┃*
*┃* *📆 Próxima recompensa disponible:*
*┃* ${moment(availableAt).format('DD/MM/YYYY HH:mm:ss')}
*┃*
*┃* *💡 Consejo:* Mientras esperas, puedes
*┃* jugar minijuegos o interactuar con el bot
*┃* para ganar más recompensas.
*┃*
*╰━━━━━━━━━━━━━━━━━━━━━━━╯*`;
        
        return conn.reply(m.chat, cooldownMessage, m);
    }
    
    // Generar eventos aleatorios para hacer más interesante la recompensa
    let events = [
        {name: "Racha de suerte", bonus: {coin: 250, exp: 150, diamond: 50}, chance: 0.15},
        {name: "Tesoro encontrado", bonus: {coin: 500, exp: 0, diamond: 100}, chance: 0.10},
        {name: "Inspiración repentina", bonus: {coin: 0, exp: 300, diamond: 0}, chance: 0.20},
        {name: "Gema brillante", bonus: {coin: 0, exp: 0, diamond: 200}, chance: 0.05}
    ];
    
    // Seleccionar evento aleatorio si hay suerte
    let specialEvent = null;
    let randomValue = Math.random();
    for (let event of events) {
        if (randomValue <= event.chance) {
            specialEvent = event;
            
            // Aplicar bonus del evento
            coin += event.bonus.coin;
            exp += event.bonus.exp;
            diamond += event.bonus.diamond;
            break;
        }
    }
    
    // Aplicar las recompensas al usuario
    user.diamond += diamond;
    user.coin += coin;
    user.exp += exp;
    user.lastclaim = now.getTime();
    
    // Calcular racha de días
    let streak = user.dailyStreak || 0;
    let lastClaimDate = lastClaim ? new Date(lastClaim) : null;
    let yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Comprobar si el último reclamo fue ayer
    if (lastClaimDate && lastClaimDate.toDateString() === yesterday.toDateString()) {
        streak++;
        
        // Bonificación por racha
        if (streak % 7 === 0) {
            // Bonificación especial cada 7 días
            let streakBonus = streak * 10;
            coin += streakBonus;
            exp += streakBonus;
            diamond += Math.floor(streakBonus / 10);
        }
    } else if (lastClaimDate && lastClaimDate.toDateString() !== now.toDateString()) {
        // Reiniciar racha si no fue el día anterior
        streak = 1;
    } else if (!lastClaimDate) {
        // Primera vez
        streak = 1;
    }
    
    user.dailyStreak = streak;
    
    // Construir mensaje de recompensa
    let rewardMessage = `*╭━━━━❰ 🎁 RECOMPENSA DIARIA 🎁 ❱━━━━╮*
*┃*
*┃* *🌟 ¡Felicidades, ${name}!*
*┃* *Has reclamado tu recompensa diaria*
*┃*
*┃* *━━━━❰ 💰 RECOMPENSAS 💰 ❱━━━━*
*┃*
*┃* *✨ Experiencia:* +${exp}
*┃* *💎 Diamantes:* +${diamond}
*┃* *💵 ${moneda}:* +${coin}
*┃*`;

    // Añadir información de racha
    rewardMessage += `
*┃* *━━━━❰ 🔥 RACHA DIARIA 🔥 ❱━━━━*
*┃*
*┃* *📆 Racha actual:* ${streak} día${streak !== 1 ? 's' : ''}
*┃* *⏰ Próxima recompensa:* En 24 horas
*┃*`;

    // Añadir evento especial si ocurrió
    if (specialEvent) {
        rewardMessage += `
*┃* *━━━━❰ 🎉 ¡EVENTO ESPECIAL! 🎉 ❱━━━━*
*┃*
*┃* *🎊 ${specialEvent.name}*
*┃* *Has recibido bonificaciones adicionales*
*┃*`;
    }
    
    // Añadir bonificación por nivel
    rewardMessage += `
*┃* *━━━━❰ 📊 BONIFICACIONES 📊 ❱━━━━*
*┃*
*┃* *🌟 Nivel ${nivel}:* +${Math.floor(multiplier * 100 - 100)}% 
*┃* ${user.premium ? '*👑 Premium:* +100% bonus' : '*💡 Consejo:* Hazte premium para x2 recompensas'}
*┃*
*╰━━━━━━━━━━━━━━━━━━━━━━━╯*

*📢 Regresa mañana para mantener tu racha*
*🎮 Usa /nivel para ver tu progreso actual*`;

    conn.reply(m.chat, rewardMessage, m);
}

handler.help = ['daily', 'claim'];
handler.tags = ['rpg'];
handler.command = ['daily', 'diario', 'claim', 'reclamar'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ' Horas ' + minutes + ' Minutos';
}
