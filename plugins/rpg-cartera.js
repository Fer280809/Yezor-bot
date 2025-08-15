let handler = async (m, {conn, usedPrefix}) => {
  let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
  
  if (who == conn.user.jid) return error
  
  if (!(who in global.db.data.users)) return conn.reply(m.chat, `${emoji4} El usuario no se encuentra en mi base de Datos. ❌`, m)
  
  let user = global.db.data.users[who]
  let username = who == m.sender ? 'Tu' : `@${who.split('@')[0]}`
  
  // Emojis y decoración para el mensaje
  let walletEmojis = ['💰', '💸', '👛', '💵', '✨']
  let randomEmoji = walletEmojis[Math.floor(Math.random() * walletEmojis.length)]
  
  // Mensaje más decorado
  let mensaje = `
╭━━━━━━━━━⬣ *${randomEmoji} CARTERA ${randomEmoji}* ⬣━━━━━━━━━╮
┃
┃ 👤 *Usuario:* ${username}
┃ 💎 *Balance:* ${user.coin} ${moneda} 💸
┃ 
┃ 🏦 *¡Guarda tus ${moneda} con cuidado!* 🔒
┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
  `
  
  await m.reply(mensaje, null, { mentions: [who] })
}

handler.help = ['wallet']
handler.tags = ['economy']
handler.command = ['wallet', 'cartera']
handler.group = true
handler.register = true

export default handler
