let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return { ...value, jid: key };
    });

    let sortedLim = users.sort((a, b) => (b.coin || 0) + (b.bank || 0) - (a.coin || 0) - (a.bank || 0));
    let len = args[0] && args[0].length > 0 ? Math.min(20, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedLim.length);
    
    // Encabezado más llamativo
    let text = `╭─────────────────────╮\n`;
    text += `│  🏆 *RANKING ECONÓMICO* 🏆  │\n`;
    text += `│     💰 TOP ${len} RICOS 💰     │\n`;
    text += `╰─────────────────────╯\n\n`;

    // Emojis para posiciones
    const positionEmojis = ['🥇', '🥈', '🥉', '🏅', '⭐', '💎', '👑', '🔥', '💫', '✨', '🌟', '💯', '🎯', '🚀', '⚡', '🎊', '🎉', '💥', '🌈', '🎁'];
    
    text += sortedLim.slice(0, len).map(({ jid, coin, bank }, i) => {
        let total = (coin || 0) + (bank || 0);
        let emoji = positionEmojis[i] || '🌟';
        let userName = participants.some(p => jid === p.jid) ? conn.getName(jid) : jid.split`@`[0];
        
        // Formato especial para el top 3
        if (i === 0) {
            return `${emoji} *#${i + 1} » ${userName}*\n` +
                   `┌─ 💰 *¥${total.toLocaleString()} ${moneda}*\n` +
                   `└─ 👑 *¡MILLONARIO!*\n`;
        } else if (i === 1) {
            return `${emoji} *#${i + 1} » ${userName}*\n` +
                   `┌─ 💵 *¥${total.toLocaleString()} ${moneda}*\n` +
                   `└─ 🥈 *¡Segundo lugar!*\n`;
        } else if (i === 2) {
            return `${emoji} *#${i + 1} » ${userName}*\n` +
                   `┌─ 💸 *¥${total.toLocaleString()} ${moneda}*\n` +
                   `└─ 🥉 *¡Tercer lugar!*\n`;
        } else {
            return `${emoji} *#${i + 1} » ${userName}*\n` +
                   `└─ 💳 *¥${total.toLocaleString()} ${moneda}*\n`;
        }
    }).join('\n');

    // Pie del mensaje
    text += `\n╭─────────────────────╮\n`;
    text += `│  📊 *ESTADÍSTICAS* 📊    │\n`;
    text += `│ Total usuarios: ${users.length}      │\n`;
    text += `│ Mostrando top: ${len}        │\n`;
    text += `╰─────────────────────╯\n`;
    text += `\n💡 *Tip:* Usa .work, .crime o .rob para ganar más ${moneda}`;

    await conn.reply(m.chat, text.trim(), m, { mentions: conn.parseMention(text) });
}

handler.help = ['baltop'];
handler.tags = ['rpg'];
handler.command = ['baltop', 'eboard'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;

function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
    else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
        return { ...b[i], [property]: a[property] === undefined ? _default : a[property] };
    }
    else return a => a === undefined ? _default : a;
}
