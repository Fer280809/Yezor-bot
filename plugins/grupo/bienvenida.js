// ============================================
// BIENVENIDA - Activar/desactivar mensajes de bienvenida
// ============================================

module.exports = {
  cmd: ['bienvenida', 'welcome'],
  type: 'grupo',
  description: 'Activar o desactivar mensajes de bienvenida en el grupo',
  
  async exec(m, sock, args, { db, settings }) {
    // Verificar si es grupo
    if (!m.key.remoteJid.endsWith('@g.us')) {
      return m.reply('❌ Este comando solo funciona en grupos');
    }

    // Obtener metadata del grupo
    const groupMetadata = await sock.groupMetadata(m.key.remoteJid);
    
    // Verificar si es admin
    const isAdmin = groupMetadata.participants.find(
      p => p.id === m.sender && (p.admin === 'admin' || p.admin === 'superadmin')
    );

    if (!isAdmin) {
      return m.reply('❌ Este comando es solo para administradores del grupo');
    }

    const grupo = db.getGrupo(m.key.remoteJid);
    const action = args[0]?.toLowerCase();

    if (!action) {
      return m.reply(`👋 *CONFIGURACIÓN DE BIENVENIDA*

Estado actual: ${grupo.configuracion.bienvenida ? '✅ Activado' : '❌ Desactivado'}

*Uso:*
• /bienvenida on - Activar
• /bienvenida off - Desactivar`);
    }

    if (action === 'on') {
      grupo.configuracion.bienvenida = true;
      db.grupos.set(m.key.remoteJid, grupo);
      await db.guardar();
      
      await m.reply('✅ *BIENVENIDA ACTIVADA*\n\nSe enviará un mensaje cuando alguien se una al grupo.');
    } else if (action === 'off') {
      grupo.configuracion.bienvenida = false;
      db.grupos.set(m.key.remoteJid, grupo);
      await db.guardar();
      
      await m.reply('❌ *BIENVENIDA DESACTIVADA*\n\nNo se enviarán mensajes de bienvenida.');
    } else {
      await m.reply('❌ Usa: on u off');
    }
  }
};