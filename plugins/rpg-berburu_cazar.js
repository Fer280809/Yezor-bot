let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
let users = global.db.data.users
let senderId = m.sender
let senderName = conn.getName(senderId)

// Inicializar inventarios si no existen
if (!users[senderId].animals) users[senderId].animals = {}
if (!users[senderId].trophies) users[senderId].trophies = {}
if (!users[senderId].huntJunk) users[senderId].huntJunk = {}

let tiempo = 3 * 60 // 3 minutos (reducido para más fluidez)
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
  let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
  m.reply(`🏹 *¡DESCANSANDO DE LA CAZA!* 🏹
🕒 Espera *${tiempo2}* para cazar de nuevo
🌲 Los animales están alerta 🦌`)
  return
}

cooldowns[m.sender] = Date.now()

// ANIMALES
let animals = [
  { name: "Conejo", emoji: "🐰", chance: 0.25, rarity: "Común", type: "animal" },
  { name: "Ardilla", emoji: "🐿️", chance: 0.20, rarity: "Común", type: "animal" },
  { name: "Pato", emoji: "🦆", chance: 0.18, rarity: "Común", type: "animal" },
  { name: "Ciervo", emoji: "🦌", chance: 0.15, rarity: "Poco Común", type: "animal" },
  { name: "Jabalí", emoji: "🐗", chance: 0.12, rarity: "Poco Común", type: "animal" },
  { name: "Lobo", emoji: "🐺", chance: 0.08, rarity: "Raro", type: "animal" },
  { name: "Oso", emoji: "🐻", chance: 0.06, rarity: "Raro", type: "animal" },
  { name: "Águila", emoji: "🦅", chance: 0.04, rarity: "Épico", type: "animal" },
  { name: "León", emoji: "🦁", chance: 0.025, rarity: "Épico", type: "animal" },
  { name: "Tigre", emoji: "🐅", chance: 0.015, rarity: "Legendario", type: "animal" },
  { name: "Dragón", emoji: "🐲", chance: 0.008, rarity: "Mítico", type: "animal" },
  { name: "Fénix", emoji: "🔥", chance: 0.003, rarity: "Mítico", type: "animal" }
]

// BASURA/OBJETOS INÚTILES
let junkItems = [
  { name: "Rama Rota", emoji: "🪵", chance: 0.08, rarity: "Basura", type: "junk" },
  { name: "Piedra Común", emoji: "🪨", chance: 0.07, rarity: "Basura", type: "junk" },
  { name: "Hoja Seca", emoji: "🍂", chance: 0.06, rarity: "Basura", type: "junk" },
  { name: "Barro", emoji: "🟤", chance: 0.05, rarity: "Basura", type: "junk" },
  { name: "Espinas", emoji: "🌿", chance: 0.04, rarity: "Basura", type: "junk" },
  { name: "Musgo", emoji: "🌱", chance: 0.03, rarity: "Basura", type: "junk" }
]

// TROFEOS Y OBJETOS ESPECIALES
let trophies = [
  { name: "Pluma Rara", emoji: "🪶", chance: 0.025, rarity: "Común", type: "trophy" },
  { name: "Cuerno Pequeño", emoji: "🦴", chance: 0.02, rarity: "Poco Común", type: "trophy" },
  { name: "Piel de Calidad", emoji: "🟫", chance: 0.018, rarity: "Poco Común", type: "trophy" },
  { name: "Colmillo Afilado", emoji: "🦷", chance: 0.015, rarity: "Raro", type: "trophy" },
  { name: "Garra Poderosa", emoji: "🪝", chance: 0.012, rarity: "Raro", type: "trophy" },
  { name: "Cuerno Dorado", emoji: "🎺", chance: 0.01, rarity: "Épico", type: "trophy" },
  { name: "Piel Legendaria", emoji: "🥇", chance: 0.008, rarity: "Épico", type: "trophy" },
  { name: "Corona de Bestia", emoji: "👑", chance: 0.005, rarity: "Legendario", type: "trophy" },
  { name: "Cofre de Cazador", emoji: "📦", chance: 0.003, rarity: "Legendario", type: "trophy" },
  { name: "Reliquia Ancestral", emoji: "⚱️", chance: 0.002, rarity: "Mítico", type: "trophy" },
  { name: "Cofre Mítico", emoji: "🗝️", chance: 0.001, rarity: "Mítico", type: "trophy" }
]

// Combinar todos los elementos
let allItems = [...animals, ...junkItems, ...trophies]

let totalChance = 0
let randomValue = Math.random()
let caughtItem = null

// Probabilidad de no cazar nada (15% - reducido para ser más generoso)
if (randomValue <= 0.15) {
  let failMessages = [
    "🏹 El animal escapó entre los arbustos...",
    "🌲 Solo encontraste huellas viejas...",
    "🦌 Los animales detectaron tu presencia...",
    "🍃 El viento cambió y te delató...",
    "🌪️ Una rama se rompió y los asustó...",
    "🦅 Un pájaro alertó a toda la zona...",
    "🐾 Solo viste sombras entre los árboles..."
  ]
  let randomFail = failMessages[Math.floor(Math.random() * failMessages.length)]
  conn.reply(m.chat, `🏹 *CACERÍA FALLIDA* 😞

${randomFail}
🍀 ¡Mejor suerte la próxima vez!
💡 Usa *${usedPrefix}vendercaza* para vender lo que tienes`, m)
  return
}

// Ajustar el random para los elementos (sin contar el 15% de fallo)
randomValue = (randomValue - 0.15) / 0.85

for (let item of allItems) {
  totalChance += item.chance
  if (randomValue <= totalChance) {
    caughtItem = item
    break
  }
}

if (!caughtItem) caughtItem = animals[0] // Fallback

// Cantidad cazada (1-3 para animales comunes, 1-2 para raros, 1 para trofeos/basura)
let quantity = 1
if (caughtItem.type === 'animal') {
  if (caughtItem.rarity === 'Común') {
    quantity = Math.floor(Math.random() * 3) + 1 // 1-3
  } else if (caughtItem.rarity === 'Poco Común') {
    quantity = Math.floor(Math.random() * 2) + 1 // 1-2
  } else {
    quantity = 1 // Animales raros: solo 1
  }
}

// Determinar inventario según tipo
let inventory = caughtItem.type === 'animal' ? 'animals' : 
               caughtItem.type === 'junk' ? 'huntJunk' : 'trophies'

// Agregar al inventario correspondiente
if (!users[senderId][inventory][caughtItem.name]) {
  users[senderId][inventory][caughtItem.name] = 0
}
users[senderId][inventory][caughtItem.name] += quantity

// Mensajes según rareza
let rarityEmoji = {
  "Basura": "⚫",
  "Común": "⚪",
  "Poco Común": "🟢", 
  "Raro": "🔵",
  "Épico": "🟣",
  "Legendario": "🟡",
  "Mítico": "🔴"
}

// Mensajes especiales según tipo
let typeMessage = {
  "animal": "🦌 ¡Cazaste",
  "junk": "🗑️ Encontraste",
  "trophy": "🏆 ¡Obtuviste"
}

let message = `🏹 *¡CACERÍA EXITOSA!* ${caughtItem.emoji}

${typeMessage[caughtItem.type]}: *${quantity}x ${caughtItem.name}*
${rarityEmoji[caughtItem.rarity]} Rareza: *${caughtItem.rarity}*
📦 Total en inventario: *${users[senderId][inventory][caughtItem.name]}*`

// Mensaje especial para cofres
if (caughtItem.name.includes("Cofre")) {
  message += `\n\n🗝️ *¡Puedes abrir este cofre con ${usedPrefix}abrir!*`
}

message += `\n\n💰 Usa *${usedPrefix}vendercaza* para vender tus capturas
📊 Usa *${usedPrefix}valorarcaza* para ver el valor de tu inventario`

conn.reply(m.chat, message, m)

// Efecto especial para objetos míticos
if (caughtItem.rarity === "Mítico") {
  setTimeout(() => {
    conn.reply(m.chat, `🌟 *¡CAZASTE ALGO MÍTICO!* 🌟
✨ ¡El bosque se ilumina con una luz mística! ✨
🎉 ¡Eres un cazador legendario!
👑 ¡Este objeto vale una fortuna!`, m)
  }, 2000)
}

// Mensaje motivacional para animales legendarios
if (caughtItem.rarity === "Legendario") {
  setTimeout(() => {
    conn.reply(m.chat, `⭐ *¡CAPTURA LEGENDARIA!* ⭐
🏆 ¡Has cazado algo muy valioso!
💰 ¡Esto te dará muchas monedas!`, m)
  }, 1500)
}

global.db.write()
}

handler.tags = ['economy']
handler.help = ['cazar']
handler.command = ['cazar', 'hunt', 'caceria']
handler.register = true

export default handler

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}




