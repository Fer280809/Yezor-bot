let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
  let user = global.db.data.users[m.sender]
  // Tiempo de espera igual que trabajar: 3 minutos
  let tiempo = 3 * 60

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `⏳ *¡YA HAS RECIBIDO TU SORPRESA!* ⏳\n\nDebes esperar *${tiempo2}* para volver a usar *#sorpresa*.\n¡La fortuna tarda en repetirse!`, m)
    return
  }

  // Recompensa aleatoria, igual que trabajar, bonus si es premium
  let rsl = Math.floor(Math.random() * 1500)
  if (isPrems) {
    rsl = Math.floor(rsl * 1.5); // 50% extra para premium
  }
  cooldowns[m.sender] = Date.now()

  // Lista de mensajes sorpresa, amplia, mágica y divertida
  const mensajes = [
    "🌈 ¡Un duende te encontró y te regaló",
    "🐲 Encontraste una moneda dorada en la cueva de un dragón, ganaste",
    "✨ Un mago misterioso apareció y te obsequió",
    "💫 Una estrella fugaz cruzó el cielo y cayó justo para darte",
    "🎁 Abriste un cofre antiguo y contenía",
    "🦋 Una mariposa dorada dejó caer",
    "🍀 Hoy la suerte está de tu lado, recibiste",
    "🧙‍♂️ Un hechicero te premió con",
    "🌟 Recibiste un regalo inesperado de las estrellas:",
    "🦄 Un unicornio mágico te entregó",
    "🧚‍♀️ Un hada te dejó",
    "🎲 La diosa fortuna giró su rueda y te tocó",
    "🪄 Un portal mágico se abrió y apareció",
    "🐾 Siguiendo las huellas de un animal mágico encontraste",
    "🌻 Un girasol dorado te dio",
    "🎡 Ganaste la tómbola mágica y recibiste",
    "📦 Recogiste tu paquete sorpresa y tenía",
    "🦜 Un loro parlante te trajo",
    "✉️ Recibiste una carta misteriosa con",
    "⏳ El tiempo se detuvo por ti y recibiste",
    "🏆 ¡Premio especial del día! Ganaste",
    "🥚 Salió un huevo dorado y dentro había",
    "🦦 Una nutria simpática te regaló",
    "🪙 Una moneda reluciente apareció a tus pies: obtienes",
    "🏹 Una flecha de la suerte te trajo",
    "🏖️ En la playa encontraste una botella con",
    "🕊️ La paloma de la paz trajo contigo",
    "🍫 Una tableta de chocolate dorada tenía escondido",
    "🦉 Un búho sabio dejó caer para ti",
    "🌌 El universo conspiró y te regaló",
    "🎨 Pintaste una obra maestra y sin querer ganaste",
    "🕹️ Jugando un videojuego secreto desbloqueaste",
    "🎈 Un globo sorpresa explotó y apareció",
    "🎤 Cantaste bajo la ducha y mágicamente recibiste",
    "🎷 El saxofón sonó y de su interior salió",
    "🦔 Un erizo simpático rodó hacia ti y dejó",
    "🧸 Un peluche encantado te regaló",
    "🍦 Tu helado tenía premio y era",
    "🎟️ Encontraste un boleto ganador y obtuviste",
    "🪅 Rompiste la piñata y cayó",
    "🎹 Tocaste la nota mágica y apareció",
    "🛸 Un alienígena amistoso te obsequió",
    "🦦 Una nutria simpática te regaló",
    "🌲 Un árbol del bosque te dejó caer",
    "🐚 Una caracola mágica te trajo",
    "🌠 Un deseo se cumplió y recibiste",
    "🧩 Completaste el rompecabezas y tu premio fue",
    "🧃 Bebiste una poción misteriosa y apareció",
    "🍉 Una sandía gigante se abrió y dentro estaba",
    "🦙 Una llama traviesa te escupió... ¡pero con",
    "🎀 Un regalo sorpresa apareció en tu mochila:",
    "🦦 Una nutria simpática te regaló",
    "🐼 Un panda te abrazó y al soltarte te dio",
    "🍭 Un caramelo gigante se convirtió en",
    "🦄 Un unicornio arcoíris te regaló",
    "🍕 Encontraste una pizza mágica con monedas de",
    "🎩 Sacaste de un sombrero mágico",
    "🧲 Fuiste atraído por la suerte y recibiste",
    "🍀 Encontraste un trébol de cuatro hojas y junto a él",
    "🌻 Un girasol dorado te dio",
    "🍩 Una dona mágica tenía dentro",
    "🧧 El sobre rojo chino tenía",
    "🛷 Bajando la colina hallaste",
    "🐧 Un pingüino elegante te entregó",
    "🦢 Un cisne blanco trajo contigo",
    "🦄 Un unicornio arcoíris te regaló",
    "🧚‍♀️ Un hada madrina apareció y te dejó",
    "🌵 Un cactus dorado floreció y apareció",
    "🍿 Una caja de palomitas sorpresa tenía dentro",
    "🎃 En una calabaza mágica encontraste",
    "🎠 El carrusel giró y te dio",
    "🎲 La suerte giró y te tocó",
    "🧁 Un cupcake encantado te dejó",
    "🎯 Lanzaste un dardo y acertaste el premio de",
    "🏮 Una linterna flotante contenía",
    "🛳️ En el fondo del mar hallaste"
  ]

  // Selecciona mensaje al azar
  let mensaje = pickRandom(mensajes);

  await conn.reply(
    m.chat,
    `${mensaje} *${toNum(rsl)}* ( *${rsl}* ) 💸${isPrems ? '\n\n👑 *¡BONUS PREMIUM APLICADO!* 👑' : ''}\n\n✨ Usa *#balance* o *#dinero* para ver tus coins.`,
    m
  )
  user.coin = (user.coin || 0) + rsl
}

handler.help = ['sorpresa']
handler.tags = ['economy']
handler.command = ['sorpresa']
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
    return number.toString()
  }
}

function segundosAHMS(segundos) {
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
