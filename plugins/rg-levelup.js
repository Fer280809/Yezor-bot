import { canLevelUp, xpRange } from '../lib/levelling.js';
import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn }) => {
    let mentionedUser = m.mentionedJid[0];
    let citedMessage = m.quoted ? m.quoted.sender : null;
    let who = mentionedUser || citedMessage || m.sender; 
    let name = conn.getName(who) || 'Usuario';
    let user = global.db.data.users[who];

    if (!user) {
        await conn.sendMessage(m.chat, { 
            text: "⚠️ *No se encontraron datos del usuario.* ⚠️\nAsegúrate de que el usuario esté registrado en el bot." 
        }, { quoted: m });
        return;
    }

    let { min, xp } = xpRange(user.level, global.multiplier);
    
    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;

    // Crear una barra de progreso visual
    const createProgressBar = (percent) => {
        const completed = Math.floor(percent / 10);
        const remaining = 10 - completed;
        return '▰'.repeat(completed) + '▱'.repeat(remaining);
    };

    // Calcular porcentaje de progreso
    const progressPercent = Math.floor(((user.exp - min) / xp) * 100);
    const progressBar = createProgressBar(progressPercent);

    // Preparar fecha con formato más amigable
    const currentDate = moment().format('DD/MM/YYYY HH:mm:ss');

    // Obtener usuarios y clasificación
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return { ...value, jid: key };
    });

    let sortedLevel = users.sort((a, b) => (b.level || 0) - (a.level || 0));
    let rank = sortedLevel.findIndex(u => u.jid === who) + 1;

    // Determinar emojis para el rango
    let rankEmoji = '👤';
    if (rank === 1) rankEmoji = '🏆';
    else if (rank === 2) rankEmoji = '🥈';
    else if (rank === 3) rankEmoji = '🥉';
    else if (rank <= 10) rankEmoji = '🌟';
    else if (rank <= 20) rankEmoji = '⭐';

    // Emoji para el rango de nivel
    let levelEmoji = '📊';
    if (user.level >= 100) levelEmoji = '🔱';
    else if (user.level >= 50) levelEmoji = '💫';
    else if (user.level >= 25) levelEmoji = '✨';
    else if (user.level >= 10) levelEmoji = '⚡';

    if (before !== user.level) {
        // Mensaje de subida de nivel
        let txt = `*╭━━━━❰ 🎉 ¡SUBIDA DE NIVEL! 🎉 ❱━━━━╮*\n`;
        txt += `*┃*\n`;
        txt += `*┃* *🌟 ¡FELICIDADES @${who.split('@')[0]}! 🌟*\n`;
        txt += `*┃*\n`;
        txt += `*┃* *━━━━❰ 🏆 NUEVA EVOLUCIÓN 🏆 ❱━━━━*\n`;
        txt += `*┃*\n`;
        txt += `*┃* *${levelEmoji} Nivel:* *${before}* ➔ *${user.level}*\n`;
        txt += `*┃* *👑 Rango:* *${user.role}*\n`;
        txt += `*┃* *⏰ Fecha:* ${currentDate}\n`;
        txt += `*┃*\n`;
        txt += `*┃* *━━━━❰ 🎯 RECOMPENSAS 🎯 ❱━━━━*\n`;
        txt += `*┃*\n`;
        txt += `*┃* *💰 Coins:* +${user.level * 100}\n`;
        txt += `*┃* *💎 Gemas:* +${user.level}\n`;
        txt += `*┃* *🔮 Puntos:* +${user.level * 5}\n`;
        txt += `*┃*\n`;
        txt += `*┃* *🔔 Nota:* Cuanto más interactúes con el Bot,\n`;
        txt += `*┃* mayor será tu nivel y mejores recompensas\n`;
        txt += `*┃* obtendrás. ¡Sigue así! 🚀\n`;
        txt += `*┃*\n`;
        txt += `*╰━━━━━━━━━━━━━━━━━━━━━━━╯*`;
        
        await conn.sendMessage(m.chat, { 
            text: txt,
            mentions: [who]
        }, { quoted: m });
    } else {
        // Mensaje de información de nivel
        let txt = `*╭━━━━❰ 📊 ESTADÍSTICAS DE NIVEL 📊 ❱━━━━╮*\n`;
        txt += `*┃*\n`;
        txt += `*┃* *👤 Usuario:* @${who.split('@')[0]}\n`;
        txt += `*┃* *🌈 Nombre:* ${name}\n`;
        txt += `*┃*\n`;
        txt += `*┃* *━━━━❰ 🏅 PROGRESO ACTUAL 🏅 ❱━━━━*\n`;
        txt += `*┃*\n`;
        txt += `*┃* *${levelEmoji} Nivel:* ${user.level}\n`;
        txt += `*┃* *✨ Experiencia:* ${user.exp.toLocaleString()} XP\n`;
        txt += `*┃* *👑 Rango:* ${user.role}\n`;
        txt += `*┃*\n`;
        txt += `*┃* *📈 Progreso:*\n`;
        txt += `*┃* *${progressBar}* ${progressPercent}%\n`;
        txt += `*┃* *${user.exp - min}/${xp} XP* para subir al nivel ${user.level + 1}\n`;
        txt += `*┃*\n`;
        txt += `*┃* *━━━━❰ 🏆 CLASIFICACIÓN 🏆 ❱━━━━*\n`;
        txt += `*┃*\n`;
        txt += `*┃* *${rankEmoji} Posición:* #${rank} de ${sortedLevel.length} usuarios\n`;
        txt += `*┃* *📝 Comandos usados:* ${user.commands || 0}\n`;
        txt += `*┃* *⏱️ Último uso:* ${user.lastLevelUp ? moment(user.lastLevelUp).fromNow() : 'Desconocido'}\n`;
        txt += `*┃*\n`;
        txt += `*┃* *💡 Consejo: Usa /daily para obtener XP diario*\n`;
        txt += `*┃* *🎮 Los minijuegos también otorgan experiencia*\n`;
        txt += `*┃*\n`;
        txt += `*╰━━━━━━━━━━━━━━━━━━━━━━━╯*`;

        await conn.sendMessage(m.chat, { 
            text: txt,
            mentions: [who]
        }, { quoted: m });
    }
}

handler.help = ['levelup', 'lvl @user']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'level', 'levelup']
handler.register = true
handler.group = true

export default handler
