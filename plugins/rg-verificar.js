import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  // Emojis y símbolos temáticos
  const emojis = {
    verified: '✅',
    star: '⭐',
    key: '🔑',
    id: '🪪',
    age: '🗓️',
    coin: '🪙',
    exp: '✨',
    token: '🎫',
    warning: '⚠️',
    lock: '🔒',
    unlock: '🔓',
    gift: '🎁',
    success: '✓',
    error: '❌',
    user: '👤',
    crown: '👑',
    sparkle: '✦',
    diamond: '💎',
    fire: '🔥',
    tada: '🎉',
    confetti: '🎊',
    medal: '🏅',
    trophy: '🏆',
    gem: '💠',
    scroll: '📜',
    certificate: '📝',
    shield: '🛡️',
    magic: '✨',
    vip: '🌟'
  };

  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  // Mensaje si ya está registrado
  if (user.registered === true) {
    return m.reply(`${emojis.warning} *¡Ya estás registrado!* ${emojis.warning}\n\n¿Quieres registrarte nuevamente?\nUsa: *${usedPrefix}unreg* para eliminar tu registro actual.`)
  }
  
  // Verificación de formato
  if (!Reg.test(text)) {
    return m.reply(`${emojis.error} *Formato incorrecto* ${emojis.error}\n\n${emojis.key} *Uso correcto:* ${usedPrefix + command} nombre.edad\n${emojis.user} *Ejemplo:* ${usedPrefix + command} ${name2}.18`)
  }
  
  let [_, name, splitter, age] = text.match(Reg)
  
  // Validaciones
  if (!name) return m.reply(`${emojis.error} *El nombre no puede estar vacío.*`)
  if (!age) return m.reply(`${emojis.error} *La edad no puede estar vacía.*`)
  if (name.length >= 100) return m.reply(`${emojis.error} *El nombre es demasiado largo.*`)
  
  age = parseInt(age)
  if (age > 1000) return m.reply(`${emojis.error} *¡Vaya! ¿El abuelo quiere jugar al bot?*`)
  if (age < 5) return m.reply(`${emojis.error} *¿Un bebé usando WhatsApp? ¡Increíble!*`)
  
  // Registro del usuario
  user.name = name + emojis.success
  user.age = age
  user.regTime = + new Date      
  user.registered = true
  
  // Recompensas
  const rewards = {
    coin: 40,
    exp: 300,
    joincount: 20
  };
  
  global.db.data.users[m.sender].coin += rewards.coin
  global.db.data.users[m.sender].exp += rewards.exp
  global.db.data.users[m.sender].joincount += rewards.joincount
  
  // Generar código único de registro
  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
  
  // Crear elementos decorativos para un diseño llamativo
  const stars = '✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧';
  const headerBorder = '╔═══ *⊹ ⊱ ✅ ⊰ ⊹* ═══╗';
  const headerBorderEnd = '╚═══ *⊹ ⊱ ✅ ⊰ ⊹* ═══╝';
  const rewardHeader = '╭────✩✮✩────╮\n   *RECOMPENSAS*\n╰────✩✮✩────╯';
  const profileBox = '╭──────────────────╮\n│ ⚚ *PERFIL DE USUARIO* ⚚ │\n│                    │';
  
  // Mensaje de verificación con diseño super atractivo
  let regbot = `
╔═══ *⊹ ⊱ ✅ ⊰ ⊹* ═══╗
┃ ⌬ *VERIFICADO* ⌬ ┃
╚═══ *⊹ ⊱ ✅ ⊰ ⊹* ═══╝

╭──────────────────╮
│ ⚚ *PERFIL DE USUARIO* ⚚ │
│                    │
│ 👤 *Nombre:* ${name} │
│ 🗓️ *Edad:* ${age} años │
│ 🆔 *ID:* ${sn.substring(0, 10)}... │
╰──────────────────╯

✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧

╭────✩✮✩────╮
   *RECOMPENSAS*
╰────✩✮✩────╯

${emojis.diamond} +${rewards.coin} ${emojis.coin} Monedas
${emojis.diamond} +${rewards.exp} ${emojis.exp} Experiencia
${emojis.diamond} +${rewards.joincount} ${emojis.token} Tokens

✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧

📝 *Código de Seguridad*
\`\`\`${sn}\`\`\`
_Guárdalo para recuperar cuenta_

✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧`;
  
  // Reaccionar con una secuencia de emojis para mayor impacto
  const reactionSequence = [emojis.verified, emojis.medal, emojis.tada, emojis.vip];
  for (const emoji of reactionSequence) {
    await m.react(emoji);
    await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña pausa entre reacciones
  }

  // Enviar mensaje con thumbnail ultra llamativo
  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: `${emojis.trophy} ⚜️ USUARIO VIP VERIFICADO ⚜️ ${emojis.trophy}`,
        body: `✨ ¡Bienvenido ${name}! Has desbloqueado recompensas especiales ✨`,
        thumbnailUrl: pp,
        sourceUrl: global.channel || 'https://whatsapp.com',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
}; 

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler
