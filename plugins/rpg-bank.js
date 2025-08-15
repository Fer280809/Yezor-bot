import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    // Define emojis and visual elements
    const moneda = '🪙';
    const emojis = {
        header: '👑',
        cash: '💵',
        bank: '🏦',
        total: '💎',
        security: '🔐',
        warning: '⚠️',
        info: '📊',
        user: '👤',
        safe: '🔒',
        gold: '🏆',
        star: '⭐',
        money: '💰',
        gem: '💠',
        crown: '👑'
    };
    
    // Get the target user
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    
    // Check if trying to get bot's balance
    if (who == conn.user.jid) return m.react('❌')
    
    // Check if user exists in database
    if (!(who in global.db.data.users)) {
        return m.reply(`${emojis.warning} *El usuario no se encuentra en mi base de datos* ${emojis.warning}`)
    }
  
    let user = global.db.data.users[who]
    
    // Calculate totals
    let total = (user.coin || 0) + (user.bank || 0);
    let percentage = Math.floor((user.bank / total) * 100) || 0;
    
    // Create a visual progress bar for bank percentage
    const barLength = 10;
    const filledLength = Math.round((percentage / 100) * barLength);
    const bar = '■'.repeat(filledLength) + '□'.repeat(barLength - filledLength);

    // Format numbers with commas for better readability
    const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Determine wealth status with emojis
    let wealthStatus = '🪙';
    if (total > 100000) wealthStatus = '💰';
    if (total > 500000) wealthStatus = '💎';
    if (total > 1000000) wealthStatus = '👑';
    
    // Create fancy borders
    const border = '┏━━━━━━━━━━━┓';
    const borderEnd = '┗━━━━━━━━━━━┛';
    const divider = '┣━━━━━━━━━━┫';
    
    // Make the text more colorful and visually appealing
    const texto = `
${emojis.crown} *BALANCE VIP* ${emojis.crown}
${border}
${emojis.user} *Usuario:* *${conn.getName(who)}* ${wealthStatus}
${divider}
${emojis.cash} *Efectivo:* *${formatNumber(user.coin || 0)}* ${moneda}
${emojis.bank} *Banco:* *${formatNumber(user.bank || 0)}* ${moneda}
${emojis.total} *Total:* *${formatNumber(total)}* ${moneda}
${divider}
${emojis.security} *Seguridad:* [${percentage}%]
${emojis.info} *Estado:* ${bar}
${divider}
${emojis.star} *COMANDOS RÁPIDOS* ${emojis.star}
${emojis.money} ${usedPrefix}deposit <cantidad> 
${emojis.gem} ${usedPrefix}withdraw <cantidad>
${emojis.safe} ${usedPrefix}transfer @usuario <cantidad>
${divider}
${emojis.warning} *¡RECUERDA PROTEGER TU DINERO!* ${emojis.warning}
${borderEnd}`;

    // Send a fancy message with cool reaction
    await conn.sendMessage(m.chat, {
        text: texto,
        contextInfo: {
            externalAdReply: {
                title: `🏦 BANCO RPG - ${conn.getName(who)}`,
                body: `Total: ${formatNumber(total)} ${moneda}`,
                thumbnail: await (await fetch('https://i.ibb.co/BsJs1r8/bank.png')).buffer(),
                sourceUrl: 'https://github.com/'
            }
        }
    }, { quoted: m });
    
    // Random reaction
    const reactions = ['💰', '🏦', '💵', '💸', '🤑', '💎', '👑'];
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    await m.react(randomReaction);
}

handler.help = ['bal', 'balance', 'bank']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank', 'economia', 'dinero', 'banco'] 
handler.register = true 
handler.group = true 

export default handler

