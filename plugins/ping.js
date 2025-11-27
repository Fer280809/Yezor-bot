// ============================================
// PING - Verificar latencia del bot
// ============================================

module.exports = {
  cmd: ['ping', 'speed', 'velocity'],
  type: 'general',
  description: 'Verificar velocidad y latencia del bot',
  
  async exec(m, sock, args, { db, settings }) {
    const start = Date.now();
    
    const message = await m.reply('🏓 Pong!');
    
    const latency = Date.now() - start;
    
    const responseText = `⚡ *VELOCIDAD DEL BOT*

📊 Latencia: ${latency}ms
🤖 Bot: ${settings.botName}
📈 Estado: ${latency < 500 ? '✅ Excelente' : latency < 1000 ? '⚠️ Normal' : '❌ Lento'}

_Tiempo de respuesta medido_`;

    await sock.sendMessage(m.sender, {
      text: responseText,
      edit: message.key
    });
  }
};