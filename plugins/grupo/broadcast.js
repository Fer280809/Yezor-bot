// ============================================
// BROADCAST - Enviar mensaje a todos los usuarios/grupos
// ============================================

module.exports = {
  cmd: ['broadcast', 'bc'],
  type: 'owner',
  description: 'Enviar mensaje masivo a usuarios o grupos',
  
  async exec(m, sock, args, { db, settings }) {
    if (args.length === 0) {
      return m.reply(`📢 *BROADCAST*

*Uso:*
• /bc users [mensaje] - Enviar a todos los usuarios
• /bc grupos [mensaje] - Enviar a todos los grupos
• /bc all [mensaje] - Enviar a todos

*Ejemplo:*
/bc users ¡Hola a todos!`);
    }

    const target = args[0].toLowerCase();
    const mensaje = args.slice(1).join(' ');

    if (!mensaje) {
      return m.reply('❌ Debes escribir un mensaje');
    }

    let enviados = 0;
    let errores = 0;

    await m.reply('📢 Enviando broadcast...');

    try {
      switch (target) {
        case 'users':
        case 'usuarios':
          for (const [jid, usuario] of db.usuarios) {
            try {
              await sock.sendMessage(jid, {
                text: `📢 *MENSAJE DEL BOT*\n\n${mensaje}\n\n_Este es un mensaje masivo_`
              });
              enviados++;
              await new Promise(resolve => setTimeout(resolve, 1000)); // Delay
            } catch (error) {
              errores++;
            }
          }
          break;

        case 'grupos':
        case 'groups':
          for (const [jid, grupo] of db.grupos) {
            try {
              await sock.sendMessage(jid, {
                text: `📢 *MENSAJE DEL BOT*\n\n${mensaje}\n\n_Este es un mensaje masivo_`
              });
              enviados++;
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
              errores++;
            }
          }
          break;

        case 'all':
        case 'todos':
          // Enviar a usuarios
          for (const [jid] of db.usuarios) {
            try {
              await sock.sendMessage(jid, {
                text: `📢 *MENSAJE DEL BOT*\n\n${mensaje}\n\n_Este es un mensaje masivo_`
              });
              enviados++;
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
              errores++;
            }
          }
          
          // Enviar a grupos
          for (const [jid] of db.grupos) {
            try {
              await sock.sendMessage(jid, {
                text: `📢 *MENSAJE DEL BOT*\n\n${mensaje}\n\n_Este es un mensaje masivo_`
              });
              enviados++;
              await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
              errores++;
            }
          }
          break;

        default:
          return m.reply('❌ Objetivo inválido. Usa: users, grupos, all');
      }

      await m.reply(`✅ *BROADCAST COMPLETADO*

📤 Enviados: ${enviados}
❌ Errores: ${errores}
📊 Total: ${enviados + errores}`);

    } catch (error) {
      await m.reply(`❌ Error en broadcast: ${error.message}`);
    }
  }
};