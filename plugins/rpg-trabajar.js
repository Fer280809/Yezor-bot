let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
  let user = global.db.data.users[m.sender]
  // Reducido el tiempo de espera a 3 minutos
  let tiempo = 3 * 60
  
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `⏳ *¡TIEMPO DE DESCANSO!* ⏳\n\n${emoji3} Debes esperar *${tiempo2}* para usar *#w* de nuevo.`, m)
    return
  }
  
  // Aumentada la recompensa máxima
  let rsl = Math.floor(Math.random() * 1500)
  
  // Bonus para usuarios premium
  if (isPrems) {
    rsl = Math.floor(rsl * 1.5); // 50% extra para usuarios premium
  }
  
  cooldowns[m.sender] = Date.now()
  
  // Mensaje mejorado con emojis y formato
  await conn.reply(m.chat, `💼 *¡TRABAJO COMPLETADO!* 💼\n\n${emoji} ${pickRandom(trabajo)} *${toNum(rsl)}* ( *${rsl}* ) ${moneda} 💸${isPrems ? '\n\n👑 *¡BONUS PREMIUM APLICADO!* 👑' : ''}`, m)
  user.coin += rsl
}

handler.help = ['trabajar']
handler.tags = ['economy']
handler.command = ['w','work','chambear','chamba', 'trabajar']
handler.group = true;
handler.register = true;

export default handler

function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number <= -1000 && number > -1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number <= -1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return number.toString()}}

function segundosAHMS(segundos) {
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

// Lista de trabajos ampliada con emojis
const trabajo = [
  "🍪 Trabajas como cortador de galletas y ganas",
  "🪖 Trabaja para una empresa militar privada, ganando",
  "🍷 Organizas un evento de cata de vinos y obtienes",
  "🧹 Limpias la chimenea y encuentras",
  "🎮 Desarrollas juegos para ganarte la vida y ganas",
  "💼 Trabajaste en la oficina horas extras por",
  "💍 Trabajas como planificador de bodas y ganas",
  "🎭 Alguien vino y representó una obra de teatro. Por mirar te dieron",
  "📊 Compraste y vendiste artículos y ganaste",
  "👨‍🍳 Trabajas en el restaurante de la abuela como cocinero y ganas",
  "🍕 Trabajas 10 minutos en un Pizza Hut local. Ganaste",
  "🥠 Trabajas como escritor(a) de galletas de la fortuna y ganas",
  "👜 Revisas tu bolso y decides vender algunos artículos inútiles. Ganas",
  "💻 Trabajas como programador freelance y ganas",
  "🏢 Trabajas todo el día en la empresa por",
  "🎨 Diseñaste un logo para una empresa por",
  "🖨️ ¡Trabajó lo mejor que pudo en una imprenta y ganó su bien merecido!",
  "✂️ Trabajas como podador de arbustos y ganas",
  "🎤 Trabajas como actor de voz para Bob Esponja y ganas",
  "🌱 Estabas cultivando plantas exóticas y ganaste",
  "🏝️ Trabajas como constructor de castillos de arena y ganas",
  "🎸 Trabajas como artista callejero y ganas",
  "🤝 ¡Hiciste trabajo social por una buena causa! Recibiste",
  "🛠️ Reparaste un tanque T-60 averiado en Afganistán. Te pagaron",
  "🐟 Trabajas como ecologista marino y ganas",
  "🐼 Trabajas en Disneyland como un panda disfrazado y ganas",
  "🕹️ Reparas las máquinas recreativas y recibes",
  "🏙️ Hiciste algunos trabajos ocasionales en la ciudad y ganaste",
  "🧪 Limpias un poco de moho tóxico de la ventilación y ganas",
  "🔍 Resolviste el misterio del brote de cólera y el gobierno te recompensó con",
  "🦒 Trabajas como zoólogo y ganas",
  "🥪 Vendiste sándwiches gourmet y obtuviste",
  "🔧 Reparaste electrodomésticos de lujo y recibes",
  "💉 Trabajaste como enfermero en el hospital local y ganaste",
  "📱 Vendiste accesorios para celulares y obtuviste",
  "🚚 Hiciste entregas rápidas por toda la ciudad y ganaste",
  "🧁 Horneaste cupcakes para una fiesta de cumpleaños y te pagaron",
  "👔 Trabajas como asesor de imagen y ganas",
  "📸 Hiciste una sesión fotográfica para una revista y te pagaron",
  "🏋️ Trabajas como entrenador personal y ganas",
  "🎬 Fuiste extra en una película de acción y recibiste",
  "💋 Trabajas probando nuevos productos de belleza y ganas",
  "🐕 Paseaste perros de famosos y ganaste",
  "🌟 Trabajaste como asesor de estrellas y recibiste",
  "🔮 Leíste la fortuna en la feria local y ganaste",
  "💰 Encontraste un maletín abandonado con",
  "🧠 Participaste en un experimento científico y te pagaron",
  "🎪 Ayudaste a montar el circo en la ciudad y ganaste",
  "🚗 Trabajaste como conductor de Uber por unas horas y ganaste",
  "⚽ Arbitraste un partido de fútbol local y te pagaron",
  "🎯 Ganaste un torneo de dardos con premio de",
  "🧩 Resolviste un enigma en una sala de escape y ganaste",
  "🏆 Ganaste un concurso de talentos local con premio de",
  "🥗 Trabajaste como chef de ensaladas y ganaste",
  "🎨 Vendiste una pintura en una galería de arte y recibiste",
  "🔋 Reparaste baterías de autos eléctricos y ganaste",
  "💻 Configuraste el WiFi de un anciano y te dio",
  "🍦 Trabajaste en una heladería en un día caluroso y ganaste",
  "🎭 Actuaste en un teatro callejero y recibiste",
  "🎧 Fuiste DJ en una fiesta privada y ganaste",
  "🌮 Vendiste tacos en un food truck y ganaste",
  "📚 Ayudaste a un estudiante con su tesis y recibiste",
  "🧪 Creaste una poción mágica para un mago y te pagó",
  "🔮 Adivinaste el futuro de un empresario y te recompensó con"
]
