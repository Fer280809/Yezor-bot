// ═══════════════════════════════════════════════════════
// plugins/anime-ppcouple.js - Perfil de Pareja (Bilingüe)
// ═══════════════════════════════════════════════════════

import fetch from "node-fetch"

let handler = async (m, { conn, usedPrefix }) => {
  try {
    await m.react('🕒')
    await m.reply(m.t('commands.ppcouple.loading'))
    
    let data = await (await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json')).json()
    let cita = data[Math.floor(Math.random() * data.length)]
    
    let cowi = await (await fetch(cita.cowo)).buffer()
    await conn.sendFile(m.chat, cowi, '', m.t('commands.ppcouple.male'), m)
    
    let ciwi = await (await fetch(cita.cewe)).buffer()
    await conn.sendFile(m.chat, ciwi, '', m.t('commands.ppcouple.female'), m)
    
    await m.react('✔️')
  } catch (error) {
    await m.react('✖️')
    await conn.reply(m.chat, `${m.t('commands.ppcouple.error')}\n> ${m.t('errors.error')}: ${error.message}`, m)
  }
}

handler.help = ['ppcouple']
handler.tags = ['anime']
handler.command = ['ppcp', 'ppcouple']
handler.group = true

export default handler