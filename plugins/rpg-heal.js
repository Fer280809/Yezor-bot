let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        return conn.reply(m.chat, `🚫❌ *¡ERROR CRÍTICO!* ❌🚫\n\n💾 Usuario NO encontrado en BD\n🔍 Regístrate primero\n\n⚡ ¡Vuelve a intentar! ⚡`, m);
    }
    if (user.coin < 50) {
        return conn.reply(m.chat, `💔💸 *¡FONDOS INSUFICIENTES!* 💸💔\n\n🏥 Costo de curación: *50 ${moneda}*\n💰 Tu saldo actual: *${user.coin} ${moneda}*\n❌ Te faltan: *${50 - user.coin} ${moneda}*\n\n🎯 ¡Ve a ganar más monedas! 🎯\n💪 ¡Tu salud te necesita! 💪`, m);
    }
    let healAmount = 50; 
    user.health += healAmount;
    user.coin -= 50; 
    if (user.health > 100) {
        user.health = 100; 
    }
    user.lastHeal = new Date();
    
    let info = `🏥✨ *¡CURACIÓN EXITOSA!* ✨🏥\n\n💉 Salud recuperada: *+${healAmount} HP*\n❤️ Salud actual: *${user.health}/100 HP*\n💸 Costo: *-50 ${moneda}*\n💰 Saldo restante: *${user.coin} ${moneda}*\n\n🎊 ¡Te sientes renovado! 🎊\n⚡ ¡Listo para la batalla! ⚡`;
    
    await conn.sendMessage(m.chat, { text: info }, { quoted: m });
};

handler.help = ['heal'];
handler.tags = ['rpg'];
handler.command = ['heal', 'curar']
handler.group = true;
handler.register = true;

export default handler;
