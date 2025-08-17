import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

// Emojis y mensajes constantes
const emojiJuego = '🎮';
const emojiPelicula = '🎬';
const emojiPersonaje = '👤';
const emojiPregunta = '❓';
const emojiCorrecto = '✅';
const emojiIncorrecto = '❌';
const emojiEspera = '⏳';
const emojiBusqueda = '🔍';
const emojiRendirse = '🏳️';
const emojiVictoria = '🏆';

// Mensajes estilizados
const wait = '*⏳ Preparando tu desafío de adivinanzas...*';
const dev = '*¡Gracias por jugar! Desarrollado con ❤️*';

// Función para obtener emojis representativos
function obtenerEmojis(elemento, categoria) {
  // Base de datos de emojis para personajes y películas
  const emojisPeliculas = {
    'El Padrino': '🤵🔫🇮🇹',
    'Titanic': '🚢❄️💔',
    'Avatar': '👽🌳🔵',
    'Star Wars': '⚔️🚀🌌',
    'El Señor de los Anillos': '💍🧙‍♂️🏔️',
    'Jurassic Park': '🦖🦕🏝️',
    'Forrest Gump': '🏃‍♂️🍫🪶',
    'Matrix': '💊👨‍💻🕶️',
    'El Rey León': '🦁👑🌅',
    'Toy Story': '🤠🚀🧸',
    'Coco': '💀🎸👦',
    'Interestelar': '🚀⏱️🌌',
    'La La Land': '🎹🎭🌃',
    'Pulp Fiction': '🔫💼💉',
    'Parásitos': '🏠👨‍👩‍👧‍👦💰',
    'Avengers: Endgame': '🦸‍♂️⚡🧤',
    'El Laberinto del Fauno': '👧🧚‍♀️👹',
    'Inception': '💤🔄🌀',
  };
  
  const emojisPersonajes = {
    'Harry Potter': '⚡👓🧙‍♂️',
    'Darth Vader': '🖤⚔️🌌',
    'Batman': '🦇🌃🦸‍♂️',
    'Hermione Granger': '📚🧙‍♀️✨',
    'Iron Man': '❤️🤖💰',
    'Wonder Woman': '👸⚔️🛡️',
    'Frodo Bolsón': '💍👣🏔️',
    'Sherlock Holmes': '🔍🧠🕵️‍♂️',
    'Spider-Man': '🕸️🕷️👨',
    'Elsa': '❄️👑👸',
    'Mario Bros': '🍄👨🏻‍🔧🦖',
    'Katniss Everdeen': '🏹🔥👧',
    'Jack Sparrow': '☠️🏴‍☠️🍾',
    'Gandalf': '🧙‍♂️⚔️🧠',
    'Superman': '💪👨🦸‍♂️',
    'Princesa Leia': '👑👸🚀',
  };
  
  const db = categoria === 'personaje' ? emojisPersonajes : emojisPeliculas;
  return db[elemento] || (categoria === 'personaje' ? '👤✨🎭' : '🎬🌟🎭');
}

// Función para generar pistas visuales basadas en la respuesta
function generarPistasVisuales(respuesta, categoria, intentosRestantes) {
  // Crear representación visual del progreso
  let pista = '';
  
  // Mostrar primera letra y última letra
  if (intentosRestantes <= 8) {
    const palabras = respuesta.split(' ');
    pista = palabras.map(palabra => {
      if (palabra.length <= 2) return palabra[0] + '⬛';
      return palabra[0] + '⬛'.repeat(palabra.length - 2) + palabra[palabra.length - 1];
    }).join(' ');
  } else {
    pista = '⬛'.repeat(respuesta.length);
  }
  
  // Revelar más letras con menos intentos
  if (intentosRestantes <= 5) {
    const palabras = respuesta.split(' ');
    pista = palabras.map(palabra => {
      if (palabra.length <= 3) return palabra;
      const letrasAMostrar = Math.floor(palabra.length / 3);
      let nuevaPalabra = palabra[0];
      for (let i = 1; i < palabra.length - 1; i++) {
        if (i % 3 === 0 && letrasAMostrar > 0) {
          nuevaPalabra += palabra[i];
        } else {
          nuevaPalabra += '⬛';
        }
      }
      nuevaPalabra += palabra[palabra.length - 1];
      return nuevaPalabra;
    }).join(' ');
  }
  
  return pista;
}

// Listas de elementos para adivinar - Simular la lectura del archivo
const personajes = [
  'Harry Potter', 'Darth Vader', 'Batman', 'Hermione Granger', 
  'Iron Man', 'Wonder Woman', 'Frodo Bolsón', 'Sherlock Holmes', 
  'Spider-Man', 'Elsa', 'Mario Bros', 'Katniss Everdeen',
  'Jack Sparrow', 'Gandalf', 'Superman', 'Princesa Leia'
];

const peliculas = [
  'El Padrino', 'Titanic', 'Avatar', 'Star Wars', 'El Señor de los Anillos',
  'Jurassic Park', 'Forrest Gump', 'Matrix', 'El Rey León', 'Toy Story',
  'Coco', 'Interestelar', 'La La Land', 'Pulp Fiction', 'Parásitos',
  'Avengers: Endgame', 'El Laberinto del Fauno', 'Inception'
];

// Almacenamiento de juegos activos
const juegosActivos = {};

/**
 * Handler principal para el comando de adivinar
 */
let handler = async (m, { args, usedPrefix, command, conn }) => {
  // ID único para cada chat/usuario
  const chatId = m.chat;
  
  // Si ya hay un juego activo y no es un intento de respuesta
  if (juegosActivos[chatId] && !m.text.startsWith(usedPrefix + command)) {
    // Procesar la respuesta del usuario
    return procesarRespuesta(m, conn);
  }
  
  // Si no hay argumentos, muestra instrucciones
  if (!args[0]) {
    return conn.reply(m.chat, `${emojiJuego} *ADIVINA EL PERSONAJE O PELÍCULA* ${emojiJuego}
    
${emojiPelicula} *Uso:* ${usedPrefix}${command} <categoria>
${emojiPregunta} *Categorías:* personaje, pelicula

${emojiBusqueda} _10 intentos para descubrir la respuesta_
${emojiPregunta} _Haz preguntas o intenta adivinar directamente_
${emojiRendirse} _Escribe "me rindo" para ver la solución_

✨ _¡Demuestra tu conocimiento y diviértete!_ ✨`, m);
  }
  
  // Verificar categoría
  const categoria = args[0].toLowerCase();
  if (categoria !== 'personaje' && categoria !== 'pelicula') {
    return conn.reply(m.chat, `${emojiIncorrecto} La categoría *${categoria}* no existe. Usa "personaje" o "pelicula"`, m).then(_ => m.react(emojiIncorrecto));
  }
  
  await m.react(emojiEspera);
  conn.reply(m.chat, wait, m);
  
  try {
    // Iniciar un nuevo juego
    const lista = categoria === 'personaje' ? personajes : peliculas;
    const respuestaSecreta = lista[Math.floor(Math.random() * lista.length)];
    
    // Guardar el juego activo
    juegosActivos[chatId] = {
      respuesta: respuestaSecreta,
      categoria: categoria,
      intentos: 10,
      historial: [],
      iniciado: Date.now()
    };
    
    // Emojis asociados
    const emojisAsociados = obtenerEmojis(respuestaSecreta, categoria);
    const catEmoji = categoria === 'personaje' ? emojiPersonaje : emojiPelicula;
    
    // Preparar mensaje de inicio de juego
    let img = categoria === 'personaje' ? 'https://i.ibb.co/qWB9j50/character.png' : 'https://i.ibb.co/kXLPNpC/movie.png';
    let txt = `*━━━━『 🎮 ADIVINA 🎮 』━━━━*\n\n`;
    txt += `${catEmoji} *Categoría:* ${categoria === 'personaje' ? 'Personaje' : 'Película'}\n`;
    txt += `${emojisAsociados} *Pista:* ${emojisAsociados}\n`;
    txt += `${emojiPregunta} *Intentos:* 10 restantes\n\n`;
    txt += `*⭐ Pista visual:*\n`;
    txt += `\`\`\`${generarPistasVisuales(respuestaSecreta, categoria, 10)}\`\`\`\n\n`;
    txt += `▸ _¡Haz preguntas de sí/no o intenta adivinar!_\n`;
    txt += `▸ _Escribe "me rindo" para ver la solución_\n\n`;
    txt += `${dev}`;
    
    await conn.sendFile(m.chat, img, 'game.jpg', txt, m);
    await m.react(emojiCorrecto);
    
  } catch (e) {
    console.error(e);
    await m.react(emojiIncorrecto);
    return conn.reply(m.chat, `${emojiIncorrecto} Ocurrió un error al iniciar el juego.`, m);
  }
}

/**
 * Procesa las respuestas durante el juego
 */
async function procesarRespuesta(m, conn) {
  const chatId = m.chat;
  const juego = juegosActivos[chatId];
  
  if (!juego) return;
  
  const respuestaUsuario = m.text.trim().toLowerCase();
  
  // Verificar si el usuario se rinde
  if (respuestaUsuario === 'me rindo') {
    const emojisAsociados = obtenerEmojis(juego.respuesta, juego.categoria);
    const catEmoji = juego.categoria === 'personaje' ? emojiPersonaje : emojiPelicula;
    
    let txt = `*━━━『 ${emojiRendirse} TE HAS RENDIDO ${emojiRendirse} 』━━━*\n\n`;
    txt += `${catEmoji} *${juego.categoria === 'personaje' ? 'El personaje' : 'La película'} era:*\n`;
    txt += `▸ *${juego.respuesta}* ${emojisAsociados}\n\n`;
    txt += `${emojiPregunta} *Preguntas realizadas:* ${10 - juego.intentos}\n`;
    txt += `${emojiEspera} *Tiempo jugado:* ${Math.floor((Date.now() - juego.iniciado) / 1000)} segundos\n\n`;
    txt += `▸ _¡Mejor suerte la próxima vez!_ 🍀\n\n`;
    txt += `${dev}`;
    
    await conn.reply(m.chat, txt, m);
    await m.react(emojiRendirse);
    delete juegosActivos[chatId];
    return;
  }
  
  // Verificar si el usuario ha adivinado
  if (respuestaUsuario === juego.respuesta.toLowerCase()) {
    const emojisAsociados = obtenerEmojis(juego.respuesta, juego.categoria);
    const catEmoji = juego.categoria === 'personaje' ? emojiPersonaje : emojiPelicula;
    
    let txt = `*━━━『 ${emojiVictoria} ¡CORRECTO! ${emojiVictoria} 』━━━*\n\n`;
    txt += `${catEmoji} *¡Has adivinado correctamente!*\n`;
    txt += `▸ *${juego.respuesta}* ${emojisAsociados}\n\n`;
    txt += `${emojiPregunta} *Preguntas realizadas:* ${10 - juego.intentos}\n`;
    txt += `${emojiEspera} *Tiempo empleado:* ${Math.floor((Date.now() - juego.iniciado) / 1000)} segundos\n\n`;
    txt += `▸ _¡Excelente trabajo, campeón!_ 🎉\n\n`;
    txt += `${dev}`;
    
    await conn.reply(m.chat, txt, m);
    await m.react(emojiVictoria);
    delete juegosActivos[chatId];
    return;
  }
  
  // Procesar como pregunta y dar pistas
  juego.intentos--;
  juego.historial.push(respuestaUsuario);
  
  // Generar respuesta basada en la pregunta
  let respuesta = generarRespuestaAleatoria(respuestaUsuario, juego.respuesta, juego.categoria);
  
  if (juego.intentos <= 0) {
    // Se acabaron los intentos
    const emojisAsociados = obtenerEmojis(juego.respuesta, juego.categoria);
    const catEmoji = juego.categoria === 'personaje' ? emojiPersonaje : emojiPelicula;
    
    let txt = `*━━━『 ${emojiIncorrecto} FIN DEL JUEGO ${emojiIncorrecto} 』━━━*\n\n`;
    txt += `${catEmoji} *${juego.categoria === 'personaje' ? 'El personaje' : 'La película'} era:*\n`;
    txt += `▸ *${juego.respuesta}* ${emojisAsociados}\n\n`;
    txt += `${emojiPregunta} *Preguntas realizadas:* 10\n`;
    txt += `${emojiEspera} *Tiempo jugado:* ${Math.floor((Date.now() - juego.iniciado) / 1000)} segundos\n\n`;
    txt += `▸ _¡Has agotado tus intentos! ¡Inténtalo de nuevo!_ 🔄\n\n`;
    txt += `${dev}`;
    
    await conn.reply(m.chat, txt, m);
    await m.react(emojiIncorrecto);
    delete juegosActivos[chatId];
    return;
  }
  
  // Continuar el juego
  const emojisAsociados = obtenerEmojis(juego.respuesta, juego.categoria);
  const catEmoji = juego.categoria === 'personaje' ? emojiPersonaje : emojiPelicula;
  
  let txt = `*━━━『 ${emojiPregunta} PISTA ${emojiPregunta} 』━━━*\n\n`;
  txt += `${emojiPregunta} *Tu pregunta:* ${respuestaUsuario}\n`;
  txt += `${respuesta.correcto ? emojiCorrecto : emojiIncorrecto} *Respuesta:* ${respuesta.texto}\n\n`;
  txt += `${catEmoji} *Categoría:* ${juego.categoria === 'personaje' ? 'Personaje' : 'Película'}\n`;
  txt += `${emojisAsociados} *Pista:* ${emojisAsociados}\n`;
  txt += `${emojiPregunta} *Intentos:* ${juego.intentos} restantes\n\n`;
  txt += `*⭐ Pista visual:*\n`;
  txt += `\`\`\`${generarPistasVisuales(juego.respuesta, juego.categoria, juego.intentos)}\`\`\`\n\n`;
  txt += `▸ _Sigue intentando o escribe "me rindo"_ 💭\n\n`;
  txt += `${dev}`;
  
  await conn.reply(m.chat, txt, m);
  await m.react(respuesta.correcto ? emojiCorrecto : emojiIncorrecto);
}

/**
 * Genera respuestas basadas en la pregunta
 */
function generarRespuestaAleatoria(pregunta, respuestaSecreta, categoria) {
  pregunta = pregunta.toLowerCase();
  respuestaSecreta = respuestaSecreta.toLowerCase();
  
  // Características específicas para películas
  const caracteristicasPeliculas = {
    'acción': ['star wars', 'avatar', 'jurassic park', 'matrix', 'avengers: endgame'],
    'aventura': ['el señor de los anillos', 'jurassic park', 'star wars', 'avatar'],
    'animación': ['el rey león', 'toy story', 'coco'],
    'drama': ['el padrino', 'titanic', 'forrest gump', 'la la land'],
    'ciencia ficción': ['star wars', 'avatar', 'matrix', 'interestelar', 'inception'],
    'comedia': ['forrest gump', 'toy story'],
    'musical': ['la la land', 'coco'],
    'terror': ['el laberinto del fauno'],
    'romance': ['titanic', 'la la land'],
    'fantasía': ['el señor de los anillos', 'el laberinto del fauno', 'avatar']
  };
  
  // Características específicas para personajes
  const caracteristicasPersonajes = {
    'hombre': ['harry potter', 'darth vader', 'batman', 'iron man', 'frodo bolsón', 'sherlock holmes', 'spider-man', 'mario bros', 'jack sparrow', 'gandalf', 'superman'],
    'mujer': ['hermione granger', 'wonder woman', 'elsa', 'katniss everdeen', 'princesa leia'],
    'superhéroe': ['batman', 'iron man', 'wonder woman', 'spider-man', 'superman'],
    'villano': ['darth vader'],
    'mago': ['harry potter', 'hermione granger', 'gandalf'],
    'disney': ['elsa'],
    'marvel': ['iron man', 'spider-man'],
    'dc': ['batman', 'wonder woman', 'superman'],
    'videojuegos': ['mario bros'],
    'star wars': ['darth vader', 'princesa leia'],
    'harry potter': ['harry potter', 'hermione granger'],
    'señor de los anillos': ['frodo bolsón', 'gandalf']
  };
  
  // Verificar si la pregunta contiene palabras clave sobre características
  let esRespuestaPositiva = false;
  let tipoRespuesta = '';
  
  // Verificar palabras o nombres en la respuesta
  if (respuestaSecreta.includes(pregunta) || pregunta.includes(respuestaSecreta)) {
    esRespuestaPositiva = true;
    tipoRespuesta = "nombre";
  }
  
  // Verificar características específicas
  const caracteristicas = categoria === 'personaje' ? caracteristicasPersonajes : caracteristicasPeliculas;
  
  for (const [caracteristica, elementos] of Object.entries(caracteristicas)) {
    if (pregunta.includes(caracteristica) && elementos.includes(respuestaSecreta)) {
      esRespuestaPositiva = true;
      tipoRespuesta = caracteristica;
      break;
    }
  }
  
  // Generar una respuesta basada en el tipo y si es positiva o negativa
  let respuestas = {
    positivas: [
      `¡Sí! ${categoria === 'personaje' ? 'Este personaje' : 'Esta película'} tiene relación con ${tipoRespuesta}.`,
      `¡Correcto! ${tipoRespuesta} es una característica importante.`,
      `¡Buena pregunta! Sí, ${tipoRespuesta} es relevante.`,
      `¡Vas por buen camino! ${tipoRespuesta} está relacionado.`,
      `¡Exacto! ${tipoRespuesta} es parte importante de ${categoria === 'personaje' ? 'este personaje' : 'esta película'}.`
    ],
    negativas: [
      `No, ${categoria === 'personaje' ? 'este personaje' : 'esta película'} no está relacionado con eso.`,
      `Mmm, no. Esa característica no aplica aquí.`,
      `Buen intento, pero no es correcto.`,
      `No, busca en otra dirección.`,
      `No tiene relación con eso, sigue intentando.`
    ],
    aleatorias: [
      `Interesante pregunta... pero no puedo confirmar ni negar.`,
      `Esa pregunta es difícil de responder con un simple sí o no.`,
      `Mmm, parcialmente cierto, pero no del todo.`,
      `No exactamente, pero vas por buen camino.`,
      `Es complicado... ni sí ni no.`
    ]
  };
  
  let textoRespuesta;
  
  if (tipoRespuesta !== '') {
    textoRespuesta = esRespuestaPositiva ? 
      respuestas.positivas[Math.floor(Math.random() * respuestas.positivas.length)] :
      respuestas.negativas[Math.floor(Math.random() * respuestas.negativas.length)];
  } else {
    textoRespuesta = respuestas.aleatorias[Math.floor(Math.random() * respuestas.aleatorias.length)];
    esRespuestaPositiva = Math.random() > 0.7; // Aleatoriamente puede ser útil
  }
  
  return {
    texto: textoRespuesta,
    correcto: esRespuestaPositiva
  };
}

handler.help = ['adivinar *<personaje|pelicula>*'];
handler.tags = ['juegos', 'entretenimiento'];
handler.command = ['adivinar'];
handler.group = true;  // Solo funciona en grupos
handler.register = true;  // Requiere registro
handler.coin = 2;  // Costo en monedas para jugar

export default handler;