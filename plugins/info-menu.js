import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    
    // Obtener imagen
    let img = await (await fetch(global.icono || global.imageUrl)).buffer()
    
    // Crear el menú con traducciones
    let txt = `
╭━━━━━━━━━━━━━━━━━╮
┃ ✦ ${m.t('commands.menu.title')}
┃━━━━━━━━━━━━━━━━━
┃ ◈ ${m.t('bot.owner')}: Fernando
┃ ◈ ${m.t('bot.prefix')}: [ ${usedPrefix} ]
┃ ◈ ${m.t('bot.version')}: ${global.vs}
╰━━━━━━━━━━━━━━━━━╯

╭━━[ ${m.t('commands.menu.categories.info')} ]━━╮
┃ ❯ ${usedPrefix}menu
┃ ❯ ${usedPrefix}info
┃ ❯ ${usedPrefix}owner
┃ ❯ ${usedPrefix}ping
╰━━━━━━━━━━━━━━━━━━╯

╭━━[ ${m.t('commands.menu.categories.anime')} ]━━╮
┃ ❯ ${usedPrefix}ppcouple
┃ ❯ ${usedPrefix}waifu
┃ ❯ ${usedPrefix}neko
╰━━━━━━━━━━━━━━━━━━╯

╭━━[ ${m.t('commands.menu.categories.group')} ]━━╮
┃ ❯ ${usedPrefix}add
┃ ❯ ${usedPrefix}kick
┃ ❯ ${usedPrefix}promote
┃ ❯ ${usedPrefix}demote
╰━━━━━━━━━━━━━━━━━━╯

╭━━[ ${m.t('commands.menu.categories.download')} ]━━╮
┃ ❯ ${usedPrefix}play
┃ ❯ ${usedPrefix}ytmp3
┃ ❯ ${usedPrefix}ytmp4
┃ ❯ ${usedPrefix}tiktok
╰━━━━━━━━━━━━━━━━━━╯

╭━━[ ${m.t('commands.menu.categories.fun')} ]━━╮
┃ ❯ ${usedPrefix}truth
┃ ❯ ${usedPrefix}dare
┃ ❯ ${usedPrefix}roll
╰━━━━━━━━━━━━━━━━━━╯

${global.dev}
`.trim()

    await conn.sendFile(m.chat, img, 'menu.jpg', txt, m, false, { 
      contextInfo: { 
        externalAdReply: { 
          title: global.botname,
          body: m.t('description'),
          thumbnail: img,
          sourceUrl: global.channel,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
    
    await m.react('✅')
  } catch (error) {
    await m.react('✖️')
    console.error(error)
    await m.reply(m.t('errors.error'))
  }
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'ayuda']

export default handler