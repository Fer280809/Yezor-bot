let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
let users = global.db.data.users
let senderId = m.sender
let senderName = conn.getName(senderId)

let tiempo = 5 * 60
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
m.reply(`🕐 Debes esperar *${tiempo2}* para usar *#slut* de nuevo. ¡Descansa un poco! 😴`)
return
}
cooldowns[m.sender] = Date.now()

let senderCoin = users[senderId].coin || 0
let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
while (randomUserId === senderId) {
randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
}
let randomUserCoin = users[randomUserId].coin || 0
let minAmount = 15
let maxAmount = 50
let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount

// Mensajes de éxito (ganas dinero)
let successMessages = [
    `🍆💦 ¡Se la chupaste a @${randomUserId.split("@")[0]} por *${amountTaken} ${moneda}*! Lo dejaste bien seco 🥵\n\n💰 Se suman *+${amountTaken} ${moneda}* a ${senderName}`,
    `🔥 Le diste unos sentones épicos a @${randomUserId.split("@")[0]} y te pagaron *${amountTaken} ${moneda}* 🍑💥\n\n💸 ¡Dinero fácil! *+${amountTaken} ${moneda}* para ${senderName}`,
    `😈 Hiciste que @${randomUserId.split("@")[0]} gritara tu nombre y te dio *${amountTaken} ${moneda}* de propina 🤤\n\n🤑 Se suman *+${amountTaken} ${moneda}* a ${senderName}`,
    `🔞 Le diste el mejor momento de su vida a @${randomUserId.split("@")[0]} por *${amountTaken} ${moneda}* 💋\n\n💰 ¡Eres todo un profesional! *+${amountTaken} ${moneda}*`,
    `🍑 Moviste las caderas como un profesional y @${randomUserId.split("@")[0]} te pagó *${amountTaken} ${moneda}* 💃\n\n🤑 ¡Bien merecido! Se suman *+${amountTaken} ${moneda}* a ${senderName}`,
    `🥵 @${randomUserId.split("@")[0]} quedó tan satisfecho que te dio *${amountTaken} ${moneda}* extra de propina 💦\n\n💸 ¡Increíble trabajo! *+${amountTaken} ${moneda}* para ti`,
    `😏 Le diste una experiencia VIP a @${randomUserId.split("@")[0]} y te compensó con *${amountTaken} ${moneda}* 👑\n\n💰 ¡Eres el mejor del negocio! *+${amountTaken} ${moneda}*`
]

// Mensajes de fracaso (pierdes dinero)
let failMessages = [
    `😬 No fuiste cuidadoso y le rompiste la verga a tu cliente 🍆💔\n\n💸 Se te restaron *-${amountTaken} ${moneda}* de compensación a ${senderName}`,
    `🤕 Te caíste en pleno acto y arruinaste el momento 🤸‍♂️\n\n💔 Perdiste *-${amountTaken} ${moneda}* en daños y refund`,
    `😱 Tu cliente se fue corriendo gritando que eras muy intenso 🏃‍♂️💨\n\n📉 Se te descontaron *-${amountTaken} ${moneda}* por daños a la reputación`,
    `🦷 Le mordiste sin querer y ahora te está demandando 😬\n\n⚖️ Pagaste *-${amountTaken} ${moneda}* en gastos legales`,
    `🤮 Tu cliente vomitó por tu mal aliento y pidió reembolso 🤢\n\n💸 Perdiste *-${amountTaken} ${moneda}* más tu dignidad`,
    `😴 Te quedaste dormido en el trabajo y tu cliente se fue molesto 💤\n\n📉 Se te descontaron *-${amountTaken} ${moneda}* por mal servicio`,
    `🚔 Llegó la policía y tuviste que salir corriendo sin cobrar 🏃‍♂️\n\n💔 Perdiste *-${amountTaken} ${moneda}* en la huida`
]

// Determinar el resultado (60% éxito, 40% fracaso)
let randomOption = Math.random()

if (randomOption < 0.6) {
    // Éxito - el usuario gana dinero
    users[senderId].coin += amountTaken
    if (users[randomUserId].coin >= amountTaken) {
        users[randomUserId].coin -= amountTaken
    }
    let randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)]
    conn.sendMessage(m.chat, {
        text: randomMessage,
        contextInfo: { 
            mentionedJid: [randomUserId],
        }
    }, { quoted: m })
} else {
    // Fracaso - el usuario pierde dinero
    let amountToLose = Math.min(amountTaken, senderCoin)
    if (amountToLose > 0) {
        users[senderId].coin -= amountToLose
    }
    let randomMessage = failMessages[Math.floor(Math.random() * failMessages.length)]
    // Reemplazar {amountTaken} con la cantidad real perdida
    randomMessage = randomMessage.replace(`-${amountTaken}`, `-${amountToLose}`)
    conn.reply(m.chat, randomMessage, m)
}

global.db.write()
}

handler.tags = ['rpg']
handler.help = ['slut']
handler.command = ['slut', 'protituirse']
handler.register = true
handler.group = true

export default handler

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}

