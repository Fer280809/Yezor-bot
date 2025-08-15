import db from '../lib/database.js'

let handler = async (m, { args }) => {
  let user = global.db.data.users[m.sender]
  const moneda = 'monedas' // Puedes cambiar el nombre de la moneda si usas otro
  const emoji = '💰'
  const emoji2 = '🚫'
  
  if (!args[0]) return m.reply(`❓ ${emoji} *¿Cuánto quieres depositar?*\n\nEscribe la cantidad de *${moneda}* que deseas enviar a tu banco.\n\nEjemplo:\n> *#d 5000*\n> *#d all*`)
  
  if ((args[0]) < 1) return m.reply(`⚠️ ${emoji} *¡Cantidad inválida!*\n\nDebes ingresar una cantidad positiva de *${moneda}* para depositar.`)
  
  if (args[0] == 'all') {
    let count = parseInt(user.coin)
    if (!user.coin || user.coin < 1) return m.reply(`😅 ${emoji2} *¡No tienes monedas suficientes en tu cartera para depositar!*`)
    user.coin -= count * 1
    user.bank += count * 1
    await m.reply(
      `🏦✨ *¡DEPÓSITO EXITOSO!* ✨🏦\n\nHas depositado *${count} ${moneda}* en tu banco 💸🔒\n\n¡Ahora nadie podrá robártelo! 😎🔥\n\n📈 ¡Sigue ahorrando y conviértete en el más rico del grupo! 🤑👑`
    )
    return !0
  }
  
  if (!Number(args[0])) return m.reply(
    `🚫 ${emoji2} *Cantidad inválida*\n\nEscribe un número válido o usa "all" para depositar todo.\n\nEjemplo:\n> *#d 25000*\n> *#d all*`
  )
  
  let count = parseInt(args[0])
  
  if (!user.coin || user.coin < 1) return m.reply(`😅 ${emoji2} *¡No tienes monedas suficientes en tu cartera para depositar!*`)
  
  if (user.coin < count) return m.reply(
    `🤔 ${emoji2} *¡No tienes suficientes monedas!*\n\nSolo tienes *${user.coin} ${moneda}* en tu cartera.`
  )
  
  user.coin -= count * 1
  user.bank += count * 1
  await m.reply(
    `🏦✨ *¡DEPÓSITO EXITOSO!* ✨🏦\n\nHas depositado *${count} ${moneda}* en tu banco 💸🔒\n\n¡Ahora nadie podrá robártelo! 😎🔥\n\n📈 ¡Sigue ahorrando y conviértete en el más rico del grupo! 🤑👑`
  )
}

handler.help = ['depositar']
handler.tags = ['rpg']
handler.command = ['deposit', 'depositar', 'd', 'aguardar']
handler.group = true
handler.register = true

export default handler
