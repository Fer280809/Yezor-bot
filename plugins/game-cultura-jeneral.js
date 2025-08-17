let quizzes = [
  {
    pregunta: "¿Cuál es el planeta más grande del sistema solar?",
    respuesta: "jupiter"
  },
  {
    pregunta: "¿En qué año llegó el hombre a la luna?",
    respuesta: "1969"
  },
  {
    pregunta: "¿Quién escribió 'Cien años de soledad'?",
    respuesta: "gabriel garcia marquez"
  },
  {
    pregunta: "¿Cuál es el elemento químico con símbolo 'O'?",
    respuesta: "oxigeno"
  },
  {
    pregunta: "¿Cómo se llama el protagonista de Naruto?",
    respuesta: "naruto uzumaki"
  },
  {
    pregunta: "¿Cuál es la capital de Argentina?",
    respuesta: "buenos aires"
  },
  {
    pregunta: "¿Cuánto es 7 x 8?",
    respuesta: "56"
  },
  {
    pregunta: "¿Qué animal es el rey de la selva?",
    respuesta: "leon"
  },
  {
    pregunta: "¿Cuál es el océano más grande?",
    respuesta: "pacifico"
  }
]

let partidas = {} // { chatId: {pregunta, respuesta, ganador, puntos: {jid: puntos}} }

function getRandomQuiz() {
  return quizzes[Math.floor(Math.random() * quizzes.length)]
}

let handler = async (m, {conn, command, args, usedPrefix, participants}) => {
  let sala = m.isGroup ? m.chat : m.sender
  partidas[sala] = partidas[sala] || { puntos: {} }

  if (command === 'quiz') {
    if (partidas[sala].esperando) return m.reply('❗Ya hay una pregunta activa. Usa ' + usedPrefix + 'terminarquiz para finalizarla.')
    let quiz = getRandomQuiz()
    partidas[sala].pregunta = quiz.pregunta
    partidas[sala].respuesta = quiz.respuesta
    partidas[sala].esperando = true
    return m.reply(`🎲 *QUIZ EXPRESS*\n\nPregunta:\n*${quiz.pregunta}*\n\nResponde correctamente para ganar 1 punto.\nUsa *${usedPrefix}rankingquiz* para ver el ranking.`)
  }

  if (command === 'terminarquiz') {
    if (!partidas[sala].esperando) return m.reply('No hay una pregunta activa.')
    partidas[sala].esperando = false
    return m.reply('🛑 Pregunta finalizada.')
  }

  if (command === 'rankingquiz') {
    let puntos = partidas[sala].puntos
    let lista = Object.entries(puntos).sort((a, b) => b[1] - a[1])
    if (!lista.length) return m.reply('Nadie tiene puntos todavía.')
    let msg = '🏅 *RANKING QUIZ EXPRESS*\n\n'
    lista.forEach(([jid, puntos], i) => {
      msg += `${i + 1}. @${jid.split('@')[0]}: ${puntos} punto(s)\n`
    })
    return m.reply(msg, null, {mentions: lista.map(([jid]) => jid)})
  }

  // Procesar respuesta
  if (partidas[sala].esperando && m.text) {
    let resp = partidas[sala].respuesta.toLowerCase().trim()
    let userResp = m.text.toLowerCase().trim()
    if (userResp === resp) {
      partidas[sala].puntos[m.sender] = (partidas[sala].puntos[m.sender] || 0) + 1
      partidas[sala].esperando = false
      return m.reply(`🎉 ¡Correcto! @${m.sender.split('@')[0]} gana 1 punto.\n\nEscribe *${usedPrefix}quiz* para otra pregunta o *${usedPrefix}rankingquiz* para ver el ranking.`, null, {mentions: [m.sender]})
    }
  }
}

handler.command = ['quiz', 'terminarquiz', 'rankingquiz']
handler.group = true
handler.tags = ['game']
handler.help = ['quiz', 'terminarquiz', 'rankingquiz']

export default handler
