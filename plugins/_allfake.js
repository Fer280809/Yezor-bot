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