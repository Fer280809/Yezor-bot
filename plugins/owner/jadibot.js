// ============================================
// JADIBOT - Comando para gestionar sub-bots
// ============================================

module.exports = {
  cmd: ['jadibot', 'jadibotmode'],
  type: 'owner',
  description: 'Activar/desactivar sistema de sub-bots',
  
  async exec(m, sock, args, { db, settings, jadibot }) {
    if (!jadibot) {
      return m.reply('❌ Sistema JadiBot no disponible');
    }

    const action = args[0]?.toLowerCase();

    if (!action) {
      const status = jadibot.isEnabled();
      return m.reply(`🤖 *ESTADO DE JADIBOT*

📊 Estado: ${status ? '✅ ACTIVADO' : '❌ DESACTIVADO'}
🤖 Bots activos: ${jadibot.bots.size}

*Uso:*
• /jadibot on - Activar
• /jadibot off - Desactivar
• /jadibot list - Listar bots
• /jadibot stats - Estadísticas`);
    }

    switch (action) {
      case 'on':
        await jadibot.toggleJadiBot(true);
        await m.reply(`✅ *JADIBOT ACTIVADO*

🤖 Los usuarios ahora pueden crear sub-bots
📱 Comando: /serbot`);
        break;

      case 'off':
        await jadibot.toggleJadiBot(false);
        await m.reply(`❌ *JADIBOT DESACTIVADO*

🤖 Sistema de sub-bots deshabilitado
🔌 Todos los bots activos han sido desconectados`);
        break;

      case 'list':
        const bots = jadibot.listBots();
        
        if (bots.length === 0) {
          return m.reply('📋 No hay sub-bots activos');
        }

        let list = '*🤖 SUB-BOTS ACTIVOS*\n\n';
        bots.forEach((bot, i) => {
          list += `${i + 1}. ${bot.userId.split('@')[0]}\n`;
          list += `   Estado: ${bot.connected ? '✅ Conectado' : '❌ Desconectado'}\n`;
          list += `   Uptime: ${bot.uptime}\n\n`;
        });

        await m.reply(list);
        break;

      case 'stats':
        const stats = jadibot.getStats();
        await m.reply(`📊 *ESTADÍSTICAS JADIBOT*

✅ Estado: ${stats.enabled ? 'Activado' : 'Desactivado'}
🤖 Total de bots: ${stats.totalBots}
🟢 Conectados: ${stats.connectedBots}
🔴 Desconectados: ${stats.totalBots - stats.connectedBots}`);
        break;

      default:
        await m.reply('❌ Acción inválida. Usa: on, off, list, stats');
    }
  }
};