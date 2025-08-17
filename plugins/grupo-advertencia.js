const handler = async (m, { conn, text, command, usedPrefix }) => {
  // Evita advertir al propio bot
  if (m.mentionedJid && m.mentionedJid.includes(conn.user.jid)) return m.reply('❌ No puedes advertir al bot.');
  let who;
  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : '';
  } else {
    who = m.chat;
  }
  if (!who || !(who in global.db.data.users)) {
    let warntext = `⚠️ Etiqueta a un usuario o responde un mensaje para advertir.\nEjemplo: *${usedPrefix + command} @usuario*`;
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  // Evita advertir a los dueños (owners)
  for (let i = 0; i < global.owner.length; i++) {
    let ownerNumber = global.owner[i][0];
    if (who.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
      return m.reply('❌ No puedes advertir a un owner.');
    }
  }

  const user = global.db.data.users[who];
  const motivo = text ? text.replace(/@\d+-?\d*/g, '').trim() : 'Sin motivo';
  user.warn = (user.warn || 0) + 1;

  await m.reply(`⚠️ *@${who.split`@`[0]}* ha recibido una advertencia.\nMotivo: ${motivo}\n*Advertencias: ${user.warn}/3*`, null, { mentions: [who] });

  if (user.warn >= 3) {
    user.warn = 0;
    await m.reply(`🚫 *@${who.split`@`[0]}* superó las 3 advertencias y será eliminado.`, null, { mentions: [who] });
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }
};

handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
