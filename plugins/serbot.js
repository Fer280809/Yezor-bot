// ============================================
// SERBOT - Comando para convertirse en sub-bot
// ============================================

module.exports = {
  cmd: ['serbot', 'subbot', 'code'],
  type: 'general',
  description: 'Convierte tu WhatsApp en un sub-bot',
  
  async exec(m, sock, args, { db, settings, jadibot }) {
    if (!jadibot) {
      return m.reply('❌ Sistema JadiBot no disponible');
    }

    // Verificar si JadiBot está habilitado
    if (!jadibot.isEnabled()) {
      return m.reply(`❌ *JADIBOT DESHABILITADO*

El sistema de sub-bots está actualmente deshabilitado.
Contacta al owner para más información.`);
    }

    const action = args[0]?.toLowerCase();

    if (!action) {
      return m.reply(`🤖 *SISTEMA JADIBOT*

*Comandos disponibles:*
• /serbot code - Obtener código QR
• /serbot stop - Detener tu bot
• /serbot status - Ver estado

*¿Qué es un SubBot?*
Un SubBot te permite usar el bot de forma independiente en tu propio WhatsApp.`);
    }

    switch (action) {
      case 'code':
      case 'qr':
        try {
          // Verificar si ya tiene un bot
          const existingBot = jadibot.getBot(m.sender);
          if (existingBot) {
            return m.reply('⚠️ Ya tienes un bot activo. Usa /serbot stop para detenerlo primero.');
          }

          await m.reply('🔄 Generando código QR...\n\n_Espera un momento..._');

          // Crear nuevo bot
          await jadibot.createBot(m.sender, sock);

        } catch (error) {
          console.error('Error creando bot:', error);
          await m.reply(`❌ Error al crear bot: ${error.message}`);
        }
        break;

      case 'stop':
      case 'delete':
        try {
          await jadibot.stopBot(m.sender);
          await m.reply('✅ *BOT DETENIDO*\n\nTu sub-bot ha sido desconectado y eliminado.');
        } catch (error) {
          await m.reply(`❌ Error: ${error.message}`);
        }
        break;

      case 'status':
        const bot = jadibot.getBot(m.sender);
        
        if (!bot) {
          return m.reply('❌ No tienes un bot activo.\n\nUsa /serbot code para crear uno.');
        }

        await m.reply(`🤖 *ESTADO DE TU BOT*

✅ Estado: ${bot.connected ? 'Conectado' : 'Desconectado'}
⏱️ Inicio: ${bot.startTime.toLocaleString()}
⏰ Uptime: ${jadibot.calculateUptime(bot.startTime)}`);
        break;

      default:
        await m.reply('❌ Acción inválida. Usa: code, stop, status');
    }
  }
};