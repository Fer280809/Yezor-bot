// plugins/_welcome.js
import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  try {
    // Solo en grupos y solo para eventos tipo "stub"
    if (!m?.isGroup || !m?.messageStubType) return true

    // Respeta el switch de bienvenidas
    const chat = global.db?.data?.chats?.[m.chat] || {}
    if (!chat.welcome) return true

    const jid = m.messageStubParameters?.[0]
    if (!jid) return true

    // Tamaño del grupo "post-evento"
    let groupSize = Array.isArray(participants) ? participants.length : 0
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) groupSize++
    if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
    ) groupSize = Math.max(0, groupSize - 1)

    const subject = groupMetadata?.subject || 'este grupo'

    // Foto de perfil del miembro (fallback remoto si falla)
    let ppUrl
    try {
      ppUrl = await conn.profilePictureUrl(jid, 'image')
    } catch {
      ppUrl = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
    }

    let imgBuffer = null
    try {
      imgBuffer = await (await fetch(ppUrl)).buffer()
    } catch { /* ignora, usaremos url */ }

    const at = `@${jid.split('@')[0]}`
    // Soporta tanto global.welcome2 como el viejo global.welcom2
    const footer = (global.welcome2 || global.welcom2 || '').toString()

    // ———— MENSAJE DE BIENVENIDA ————
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      const caption = `
┏━━━━━━━━━━━━━━━━┓
┃   ⟡  A S T A - B O T  ⟡
┗━━━━━━━━━━━━━━━━┛
◜  Bienvenido/a  ◞

• Grupo: ${subject}
• Miembro: ${at}
• Ahora somos: ${groupSize}

Lee las reglas de la descripción.
${footer}`.trim()

      await conn.sendMessage(
        m.chat,
        { image: imgBuffer || { url: ppUrl }, caption, mentions: [jid] },
        { quoted: m }
      )
    }

    // ———— MENSAJE DE DESPEDIDA ————
    if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
    ) {
      const caption = `
┏━━━━━━━━━━━━━━━━┓
┃   ⟡  A S T A - B O T  ⟡
┗━━━━━━━━━━━━━━━━┛
◜  Despedida  ◞

• Grupo: ${subject}
• Miembro: ${at}
• Ahora somos: ${groupSize}

${footer}`.trim()

      await conn.sendMessage(
        m.chat,
        { image: imgBuffer || { url: ppUrl }, caption, mentions: [jid] },
        { quoted: m }
      )
    }
  } catch (err) {
    console.error('welcome plugin error:', err)
  }
  return true
}
