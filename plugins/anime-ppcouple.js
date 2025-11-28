// ═══════════════════════════════════════════════════════
// plugins/anime-ppcouple.js - Ejemplo de comando bilingüe
// ═══════════════════════════════════════════════════════

import fetch from "node-fetch"

let handler = async (m, { conn, usedPrefix }) => {
  try {
    await m.react('🕒')
    
    let data = await (await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json')).json()
    let cita = data[Math.floor(Math.random() * data.length)]
    
    let cowi = await (await fetch(cita.cowo)).buffer()
    await conn.sendFile(m.chat, cowi, '', global.t('commands.ppcouple.male'), m)
    
    let ciwi = await (await fetch(cita.cewe)).buffer()
    await conn.sendFile(m.chat, ciwi, '', global.t('commands.ppcouple.female'), m)
    
    await m.react('✔️')
  } catch (error) {
    await m.react('✖️')
    await conn.reply(m.chat, `${global.t('commands.ppcouple.error')}\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
  }
}

handler.help = ['ppcouple']
handler.tags = ['anime']
handler.command = ['ppcp', 'ppcouple']
handler.group = true

export default handler
