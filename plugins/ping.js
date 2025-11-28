import speed from 'performance-now'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let latensi = speed() - timestamp
  let uptime = process.uptime()
  
  // Formatear uptime
  let days = Math.floor(uptime / 86400)
  let hours = Math.floor((uptime % 86400) / 3600)
  let minutes = Math.floor((uptime % 3600) / 60)
  let seconds = Math.floor(uptime % 60)
  
  let uptimeText = m.t('bot.uptime') + ': '
  if (days > 0) uptimeText += `${days}d `
  if (hours > 0) uptimeText += `${hours}h `
  if (minutes > 0) uptimeText += `${minutes}m `
  uptimeText += `${seconds}s`
  
  let txt = `
╭━━━━━━━━━━━━━━━╮
┃ ✦ ${m.t('bot.online')}
┃━━━━━━━━━━━━━━━
┃ ⚡ *Ping*: ${latensi.toFixed(4)} ms
┃ ⏱️ ${uptimeText}
┃ 🤖 *Bot*: ${global.botname}
╰━━━━━━━━━━━━━━━╯
`.trim()

  await conn.reply(m.chat, txt, m)
  await m.react('🏓')
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'speed', 'status']

export default handler
