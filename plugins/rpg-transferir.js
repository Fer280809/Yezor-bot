async function handler(m, { conn, args, usedPrefix, command }) {
  const user = global.db.data.users[m.sender];
  const type = 'coin';
  const bankType = 'bank';

  if (!args[0] || !args[1]) {
    const helpMessage = `💰 *¿Quieres hacer una transferencia?*\n\n` +
      `✨ Menciona al usuario y la cantidad que deseas enviar\n` +
      `📝 *Ejemplo:* ${usedPrefix + command} 500 @usuario\n` +
      `🏦 *Nota:* El dinero se transfiere desde tu banco`;
    return conn.sendMessage(m.chat, {text: helpMessage, mentions: [m.sender]}, {quoted: m});
  }

  // Sin límites, solo validar que sea un número positivo
  const count = isNumber(args[0]) ? Math.abs(parseInt(args[0])) : 0;
  
  if (count <= 0) {
    return conn.sendMessage(m.chat, {
      text: `❌ *Cantidad inválida*\n\n` +
            `💡 Debes especificar una cantidad válida mayor a 0\n` +
            `📝 *Ejemplo:* ${usedPrefix + command} 100 @usuario`, 
      mentions: [m.sender]
    }, {quoted: m});
  }
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[1] ? (args[1].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
  
  if (!who) {
    return conn.sendMessage(m.chat, {
      text: `❌ *¡Oops!* No encontré al usuario\n\n` +
            `🎯 Debes mencionar a alguien para transferir\n` +
            `📝 *Ejemplo:* ${usedPrefix + command} 500 @usuario`, 
      mentions: [m.sender]
    }, {quoted: m});
  }

  if (!(who in global.db.data.users)) {
    return conn.sendMessage(m.chat, {
      text: `🚫 *Usuario no encontrado*\n\n` +
            `😅 El usuario que mencionaste no está registrado en el sistema\n` +
            `💡 Pídele que use algún comando primero`, 
      mentions: [m.sender]
    }, {quoted: m});
  }

  if (user[bankType] * 1 < count) {
    const currentBank = user[bankType] || 0;
    return conn.sendMessage(m.chat, {
      text: `💸 *¡Fondos insuficientes en el banco!*\n\n` +
            `🏦 *Tu saldo en banco:* ${currentBank} ${moneda}\n` +
            `📊 *Cantidad solicitada:* ${count} ${moneda}\n` +
            `💡 Necesitas ${count - currentBank} ${moneda} más en tu banco`, 
      mentions: [m.sender]
    }, {quoted: m});
  }
  
  // Realizar la transferencia: del banco del remitente a las monedas del destinatario
  user[bankType] -= count;
  global.db.data.users[who][bankType] += count;

  const mentionText = `@${who.split('@')[0]}`;
  const totalInBank = user[bankType];

  // Mensaje de confirmación mejorado
  const successMessage = `✅ *¡Transferencia exitosa!*\n\n` +
    `💸 *Transferiste:* ${count} ${moneda}\n` +
    `👤 *Destinatario:* ${mentionText}\n` +
    `🏦 *Tu saldo bancario restante:* ${totalInBank} ${moneda}\n\n` +
    `🎉 ¡El dinero llegó al banco del destinatario!`;

  conn.sendMessage(m.chat, {
    text: successMessage, 
    mentions: [who, m.sender]
  }, {quoted: m});
}

handler.help = ['pay', 'transfer'];
handler.tags = ['rpg'];
handler.command = ['pay', 'transfer', 'transferir'];
handler.group = true;
handler.register = true;

export default handler;

function isNumber(x) {
  return !isNaN(x);
}
