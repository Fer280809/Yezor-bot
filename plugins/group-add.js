let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
  if (!text) return m.reply(`${m.t('commands.help.usage')}: ${usedPrefix + command} @user`)
  
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  
  if (participants.some(p => p.id === users)) {
    return m.reply(m.t('group.added'))
  }
  
  try {
    await conn.groupParticipantsUpdate(m.chat, [users], 'add')
    await m.reply(`✅ ${m.t('group.added')}`)
    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.reply(m.t('errors.error'))
    await m.react('✖️')
  }
}

handler.help = ['add']
handler.tags = ['group']
handler.command = ['add', 'agregar']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler