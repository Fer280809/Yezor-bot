let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
let users = global.db.data.users
let senderId = m.sender
let senderName = conn.getName(senderId)

// Inicializar inventarios si no existen
if (!users[senderId].fish) users[senderId].fish = {}
if (!users[senderId].treasures) users[senderId].treasures = {}
if (!users[senderId].junk) users[senderId].junk = {}

let tiempo = 4 * 60 // 4 minutos
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
  let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
  m.reply(`🎣 *¡CAÑA EN DESCANSO!* 🎣
🕒 Espera *${tiempo2}* para pescar de nuevo
🌊 Los peces están asustados 🐟`)
  return
}

cooldowns[m.sender] = Date.now()

// PECES
let fishes = [
  { name: "Sardina", emoji: "🐟", chance: 0.25, rarity: "Común", type: "fish" },
  { name: "Trucha", emoji: "🐠", chance: 0.20, rarity: "Común", type: "fish" },
  { name: "Salmón", emoji: "🍣", chance: 0.15, rarity: "Poco Común", type: "fish" },
  { name: "Atún", emoji: "🐟", chance: 0.12, rarity: "Poco Común", type: "fish" },
  { name: "Pez Espada", emoji: "🗡️", chance: 0.08, rarity: "Raro", type: "fish" },
  { name: "Pez Dorado", emoji: "🟨", chance: 0.06, rarity: "Raro", type: "fish" },
  { name: "Tiburón", emoji: "🦈", chance: 0.04, rarity: "Épico", type: "fish" },
  { name: "Pez Dragón", emoji: "🐲", chance: 0.025, rarity: "Épico", type: "fish" },
  { name: "Pulpo Gigante", emoji: "🐙", chance: 0.015, rarity: "Legendario", type: "fish" },
  { name: "Ballena", emoji: "🐋", chance: 0.008, rarity: "Mítico", type: "fish" },
  { name: "Kraken", emoji: "🦑", chance: 0.003, rarity: "Mítico", type: "fish" }
]

// BASURA/OBJETOS COMUNES
let junkItems = [
  { name: "Bota Vieja", emoji: "👢", chance: 0.08, rarity: "Basura", type: "junk" },
  { name: "Lata Oxidada", emoji: "🥫", chance: 0.07, rarity: "Basura", type: "junk" },
  { name: "Botella Rota", emoji: "🍾", chance: 0.06, rarity: "Basura", type: "junk" },
  { name: "Neumático", emoji: "🛞", chance: 0.05, rarity: "Basura", type: "junk" },
  { name: "Calcetín Perdido", emoji: "🧦", chance: 0.04, rarity: "Basura", type: "junk" },
  { name: "Periódico Mojado", emoji: "📰", chance: 0.03, rarity: "Basura", type: "junk" }
]

// TESOROS Y OBJETOS ESPECIALES
let treasures = [
  { name: "Concha Marina", emoji: "🐚", chance: 0.025, rarity: "Común", type: "treasure" },
  { name: "Perla", emoji: "🤍", chance: 0.02, rarity: "Poco Común", type: "treasure" },
  { name: "Collar de Algas", emoji: "📿", chance: 0.018, rarity: "Poco Común", type: "treasure" },
  { name: "Moneda Antigua", emoji: "🪙", chance: 0.015, rarity: "Raro", type: "treasure" },
  { name: "Anillo Dorado", emoji: "💍", chance: 0.012, rarity: "Raro", type: "treasure" },
  { name: "Brújula Mágica", emoji: "🧭", chance: 0.01, rarity: "Épico", type: "treasure" },
  { name: "Espada del Mar", emoji: "⚔️", chance: 0.008, rarity: "Épico", type: "treasure" },
  { name: "Corona de Tritón", emoji: "👑", chance: 0.005, rarity: "Legendario", type: "treasure" },
  { name: "Cofre del Tesoro", emoji: "📦", chance: 0.003, rarity: "Legendario", type: "treasure" },
  { name: "Tridente de Poseidón", emoji: "🔱", chance: 0.002, rarity: "Mítico", type: "treasure" },
  { name: "Cofre Mítico", emoji: "⚱️", chance: 0.001, rarity: "Mítico", type: "treasure" }
]

// Combinar todos los elementos
let allItems = [...fishes, ...junkItems, ...treasures]

let totalChance = 0
let randomValue = Math.random()
let caughtItem = null

// Probabilidad de no pescar nada (15%)
if (randomValue <= 0.15) {
  let failMessages = [
    "🎣 El pez se escapó en el último momento...",
    "🌊 Solo pescaste agua salada...",
    "🐟 Los peces están muy listos hoy...",
    "⚓ Tu anzuelo se enganchó en una roca...",
    "🌪️ Una ola movió tu caña...",
    "🦀 Un cangrejo cortó tu línea...",
    "🪸 Te enredaste en un coral..."
  ]
  let randomFail = failMessages[Math.floor(Math.random() * failMessages.length)]
  conn.reply(m.chat, `🎣 *PESCA FALLIDA* 😞

${randomFail}
🍀 ¡Mejor suerte la próxima vez!`, m)
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

if (!caughtItem) caughtItem = fishes[0] // Fallback

// Cantidad pescada (1-2 para peces, 1 para tesoros/basura)
let quantity = caughtItem.type === 'fish' ? Math.floor(Math.random() * 2) + 1 : 1

// Determinar inventario según tipo
let inventory = caughtItem.type === 'fish' ? 'fish' : 
               caughtItem.type === 'junk' ? 'junk' : 'treasures'

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
  "fish": "🐟 Pescaste",
  "junk": "🗑️ Encontraste",
  "treasure": "✨ ¡Descubriste"
}

let message = `🎣 *¡PESCA EXITOSA!* ${caughtItem.emoji}

${typeMessage[caughtItem.type]}: *${quantity}x ${caughtItem.name}*
${rarityEmoji[caughtItem.rarity]} Rareza: *${caughtItem.rarity}*
📦 Total en inventario: *${users[senderId][inventory][caughtItem.name]}*`

// Mensaje especial para cofres
if (caughtItem.name.includes("Cofre")) {
  message += `\n\n🗝️ *¡Puedes abrir este cofre con ${usedPrefix}abrir!*`
}

message += `\n\n💡 Usa *${usedPrefix}inventario* para ver todo lo que tienes`

conn.reply(m.chat, message, m)

// Efecto especial para objetos míticos
if (caughtItem.rarity === "Mítico") {
  setTimeout(() => {
    conn.reply(m.chat, `🌟 *¡PESCASTE ALGO MÍTICO!* 🌟
✨ ¡Toda la sala se llena de una luz dorada! ✨
🎉 ¡Eres increíblemente afortunado!`, m)
  }, 2000)
}

global.db.write()
}

handler.tags = ['economy']
handler.help = ['pescar']
handler.command = ['pescar', 'fish', 'pesca']
handler.register = true

export default handler

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600)
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}
