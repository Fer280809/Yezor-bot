import db from '../lib/database.js'

/**
 * Comando: botc
 * Información sobre cómo convertirse en supbot
 */
let handler = async (m, { conn, usedPrefix, command }) => {
    // Definir emojis
    const emojis = {
        bot: '🤖',
        crown: '👑',
        star: '⭐',
        check: '✅',
        warning: '⚠️',
        channel: '📢',
        vip: '💠',
        lock: '🔒',
        key: '🔑',
        medal: '🏅',
        info: 'ℹ️',
        code: '📝',
        qr: '📱'
    };
    
    // Crear bordes y divisores
    const border = '┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓';
    const borderEnd = '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛';
    const divider = '┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫';
    
    // Mensaje principal que se mostrará en el grupo
    const grupoText = `
${emojis.crown} *INFORMACIÓN SUPBOT* ${emojis.crown}

${emojis.info} *Este comando contiene información confidencial sobre cómo convertirte en SUPBOT.*

${emojis.lock} *Por seguridad, te he enviado los detalles por mensaje privado.*

${emojis.check} *Revisa tu chat privado con el bot para ver las instrucciones completas.*`;

    // Mensaje privado con información detallada
    const privateText = `
${emojis.crown} *CONVIÉRTETE EN SUPBOT* ${emojis.crown}
${border}
${emojis.vip} *PROGRAMA OFICIAL SUPBOT* ${emojis.vip}
${divider}
${emojis.check} *BENEFICIOS:*

${emojis.star} Acceso a comandos premium
${emojis.star} Prioridad en soporte técnico
${emojis.star} Bypass de límites y cooldowns
${emojis.star} Insignia exclusiva de SuperBot
${emojis.star} Funciones experimentales anticipadas
${divider}
${emojis.channel} *PASOS PARA SER SUPBOT:*

1️⃣ Únete a nuestro canal oficial:
   https://t.me/canaloficialbot

2️⃣ Usa uno de estos comandos en el privado:
   *${usedPrefix}code* - Genera tu código personal
   *${usedPrefix}qr* - Genera tu QR de activación
${divider}
${emojis.lock} *NOTA DE SEGURIDAD:*
Los códigos son personales y expiran en 1 minuto.
No compartas tu código con nadie.
${borderEnd}`;

    // Si es grupo, enviar notificación y mensaje privado
    if (m.isGroup) {
        await conn.sendMessage(m.chat, { text: grupoText }, { quoted: m });
        await conn.sendMessage(m.sender, {
            text: privateText,
            contextInfo: {
                externalAdReply: {
                    title: `${emojis.crown} PROGRAMA OFICIAL SUPBOT`,
                    body: `Acceso exclusivo a funciones premium`,
                    thumbnail: await (await fetch('https://i.ibb.co/BsJs1r8/bank.png')).buffer(),
                    sourceUrl: 'https://t.me/canaloficialbot'
                }
            }
        });
    } else {
        // Si es chat privado, enviar directamente el mensaje detallado
        await conn.sendMessage(m.sender, {
            text: privateText,
            contextInfo: {
                externalAdReply: {
                    title: `${emojis.crown} PROGRAMA OFICIAL SUPBOT`,
                    body: `Acceso exclusivo a funciones premium`,
                    thumbnail: await (await fetch('https://i.ibb.co/BsJs1r8/bank.png')).buffer(),
                    sourceUrl: 'https://t.me/canaloficialbot'
                }
            }
        });
    }
    
    // Reaccionar al mensaje
    await m.react('👑');
}

handler.help = ['botc']
handler.tags = ['info']
handler.command = ['botc', 'supbot', 'vipbot', 'botpremium'] 
handler.register = true 

export default handler