import { exec } from 'child_process';

let handler = async (m, { conn }) => {
  m.reply('🔄 **Actualizando el bot...** 🤖✨');

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `❌ **Error:** No se pudo realizar la actualización. 😔\n🔍 **Razón:** \`${err.message}\``, m);
      return;
    }

    if (stderr) {
      console.warn('Advertencia durante la actualización:', stderr);
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, '✅ **El bot ya está actualizado.** 🎉\n🔧 Todo funcionando perfectamente! 💪', m);
    } else {
      conn.reply(m.chat, `🚀 **Actualización realizada con éxito!** ✨\n\n📋 **Detalles:**\n\`\`\`\n${stdout}\`\`\`\n\n🎊 Bot actualizado y listo para usar! 🤖💖`, m);
    }
  });
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update'];
handler.rowner = true;

export default handler;
