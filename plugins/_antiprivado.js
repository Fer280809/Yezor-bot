export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
    if (m.isBaileys && m.fromMe) return !0;
    if (m.isGroup) return !1;
    if (!m.message) return !0;
    if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};
  if (m.chat === '120363399175402285@newsletter') return !0
    if (bot.antiPrivate && !isOwner && !isROwner) {
      await m.reply(`
  ╭━━━━━━━━━━━━━━━━━
  │ 🚫 ¡𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎! 🚫
  ╰━━━━━━━━━━━━━━━━━
  
  🔒 ¡Hola @${m.sender.split`@`[0]}!
  
  ⚠️ Los comandos privados están
     desactivados por seguridad
  
  🚨 Serás bloqueado para 
     proteger el sistema
  
  ┌─────────────────
  │ 🌟 ¿𝐐𝐔𝐄 𝐇𝐀𝐂𝐄𝐑?
  ├─────────────────
  │ ✅ Únete al grupo oficial
  │    y usa TODOS los comandos
  │
  │ 🎮 Tendrás acceso a:
  │  • Juegos y diversión
  │  • Sistema de economía  
  │  • ¡Y mucho más!
  │
  │ 🔗 Link del grupo:
  │   ${gp1}
  └─────────────────
  
  💡 Esta restricción mantiene
     el bot seguro y sin spam
  
  > ⏰ Bloqueo en 10 segundos...
      `, false, {mentions: [m.sender]});
      
      // Esperar 10 segundos antes del bloqueo
      setTimeout(async () => {
        await this.updateBlockStatus(m.chat, 'block');
      }, 10000);
    }
    return !1;
  }
