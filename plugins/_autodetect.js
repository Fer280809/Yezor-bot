let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}  
let chat = global.db.data.chats[m.chat]
let usuario = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'
let nombre, foto, edit, newlink, status, admingp, noadmingp

nombre = `╭─⬣「 🏷️ *NOMBRE ACTUALIZADO* 」⬣
│
├❯ 👤 *Usuario:* ${usuario}
├❯ 📝 *Nuevo nombre:* 
│  ${m.messageStubParameters[0]}
│
╰─⬣ ✨ *Cambio realizado exitosamente*`

foto = `╭─⬣「 🖼️ *IMAGEN ACTUALIZADA* 」⬣
│
├❯ 👤 *Modificado por:* ${usuario}
├❯ 📸 *Nueva imagen del grupo establecida*
│
╰─⬣ ✨ *Cambio aplicado correctamente*`

edit = `╭─⬣「 ⚙️ *CONFIGURACIÓN CAMBIADA* 」⬣
│
├❯ 👤 *Administrador:* ${usuario}
├❯ 🔧 *Nuevo permiso:* 
│  ${m.messageStubParameters[0] == 'on' ? '🔒 Solo administradores' : '🔓 Todos los miembros'}
│  pueden configurar el grupo
│
╰─⬣ ✨ *Configuración actualizada*`

newlink = `╭─⬣「 🔗 *ENLACE RENOVADO* 」⬣
│
├❯ 👤 *Acción realizada por:* ${usuario}
├❯ 🔄 *El enlace del grupo ha sido*
│  completamente restablecido
│
╰─⬣ ⚠️ *Enlace anterior ya no es válido*`

status = `╭─⬣「 ${m.messageStubParameters[0] == 'on' ? '🔒 *GRUPO CERRADO*' : '🔓 *GRUPO ABIERTO*'} 」⬣
│
├❯ 👤 *Modificado por:* ${usuario}
├❯ 💬 *Estado actual:* 
│  ${m.messageStubParameters[0] == 'on' ? '🔒 Solo administradores' : '🔓 Todos los miembros'}
│  pueden enviar mensajes
│
╰─⬣ ✨ *Cambio de estado aplicado*`

admingp = `╭─⬣「 ⭐ *NUEVO ADMINISTRADOR* 」⬣
│
├❯ 🎉 *Nuevo admin:* @${m.messageStubParameters[0].split`@`[0]}
├❯ 👤 *Promovido por:* ${usuario}
├❯ 🛡️ *Ahora tiene permisos de*
│  administración del grupo
│
╰─⬣ ✨ *¡Felicidades por tu ascenso!*`

noadmingp = `╭─⬣「 📉 *ADMINISTRADOR REMOVIDO* 」⬣
│
├❯ 👤 *Ex-admin:* @${m.messageStubParameters[0].split`@`[0]}
├❯ 🔄 *Acción realizada por:* ${usuario}
├❯ 📝 *Ya no tiene permisos de*
│  administración del grupo
│
╰─⬣ ✨ *Cambio de rol aplicado*`
  
if (chat.detect && m.messageStubType == 21) {
await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })   
} else if (chat.detect && m.messageStubType == 22) {
await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 23) {
await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })    
} else if (chat.detect && m.messageStubType == 25) {
await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 26) {
await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 29) {
await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })  
} if (chat.detect && m.messageStubType == 30) {
await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
} else {
if (m.messageStubType == 2) return
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})
}}
export default handler
