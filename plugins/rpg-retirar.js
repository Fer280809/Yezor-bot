import db from '../lib/database.js'

let handler = async (m, { args }) => {
let user = global.db.data.users[m.sender]
if (!args[0]) return m.reply(`🏦💰 *¡INGRESA LA CANTIDAD!* 💰🏦\n\n💎 Escribe cuánto *${moneda}* quieres retirar\n\n📱 *Ejemplos:*\n• \`#retirar 25000\`\n• \`#retirar all\`\n\n🔥 ¡Retira y úsalo YA! 🔥`)

if (args[0] == 'all') {
let count = parseInt(user.bank)
user.bank -= count * 1
user.coin += count * 1
await m.reply(`🎉💸 *¡RETIRO EXITOSO!* 💸🎉\n\n💰 Retiraste: *${count} ${moneda}*\n🏦➡️💳 Del banco a tu bolsillo\n\n⚠️ *¡CUIDADO!* Ahora pueden robarte\n🔓 Dinero en mano = RIESGO\n\n✅ ¡Listo para usar! ✅`)
return !0
}

if (!Number(args[0])) return m.reply(`❌🚫 *¡CANTIDAD INVÁLIDA!* 🚫❌\n\n💡 *Usa números válidos:*\n🔸 \`#retirar 25000\`\n🔸 \`#retirar all\`\n\n📱 ¡Inténtalo de nuevo! 📱`)

let count = parseInt(args[0])
if (!user.bank) return m.reply(`💔🏦 *¡BANCO VACÍO!* 🏦💔\n\n😢 No tienes *${moneda}* guardadas\n💰 Ve a depositar primero\n\n🎯 ¡Gana más monedas! 🎯`)

if (user.bank < count) return m.reply(`⚠️💸 *¡FONDOS INSUFICIENTES!* 💸⚠️\n\n🏦 Solo tienes: *${user.bank} ${moneda}*\n❌ Quieres retirar: *${count} ${moneda}*\n\n💡 Retira menos o usa \`all\` 💡`)

user.bank -= count * 1
user.coin += count * 1
await m.reply(`🎊💰 *¡RETIRO COMPLETADO!* 💰🎊\n\n💸 Retiraste: *${count} ${moneda}*\n🏦➡️💳 Ya está en tu inventario\n\n⚠️ *¡ALERTA!* Ahora es robable\n🛡️ Úsalo rápido o guárdalo\n\n✨ ¡Disfruta tus monedas! ✨`)
}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'with']
handler.group = true
handler.register = true

export default handler
