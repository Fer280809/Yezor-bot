
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`${m.t('commands.help.usage')}: ${usedPrefix + command} <texto>`)
  
  let chats = Object.keys(conn.chats).filter(jid => !jid.includes('g.us') && !jid.includes('@broadcast'))
  let groups = Object.keys(conn.chats).filter(jid => jid.endsWith('@g.us'))
  
  await m.reply(`📢 Enviando mensaje a:\n• ${chats.length} chats privados\n• ${groups.length} grupos`)
  
  let sent = 0
  let failed = 0
  
  for (let id of [...chats, ...groups]) {
    try {
      await conn.reply(id, text, null)
      sent++
      await delay(1000) // Esperar 1 segundo entre envíos
    } catch (e) {
      failed++
    }
  }
  
  await m.reply(`✅ Difusión completada:\n• Enviados: ${sent}\n• Fallidos: ${failed}`)
}

handler.help = ['broadcast', 'bc']
handler.tags = ['owner']
handler.command = ['broadcast', 'bc', 'difusion']
handler.rowner = true

export default handler

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))