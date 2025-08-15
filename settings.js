import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
//recuerda que e el numero se pone un 1 despues del codigo de pais ejemplo: 52+1+4181450063
global.owner = [
  ['5214181450063', ' 𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔 desarrolador', true], //un ejemplo si quieres puedes quitarlo o si quieres dejarlo para asi poderte ayudar si ocupas ayuda con el bot
  ['pon aqui tu numero ',  'pon aqui tu usuario', true]
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['524181450063'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '2.2.0'
global.nameqr = 'Yezor-bot' //cambia por el nombre del bot
global.namebot = 'Yezor-bot' //cambia por el nombre del bot
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.yezorJadibts = true

global.packname = 'Yezor-bot' //cambia por el nombre del bot
global.botname = 'Yezor-bot' //cambia por el nombre del bot
global.wm = 'Yezor-bot' //cambia por el nombre del bot
global.author = '𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔'
global.dev = '𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔' //cambia por tu nombre
global.textbot = 'Yezor-bot • Powered By 𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔' //cambia por tu nombre y el nombre del bot
global.etiqueta = '𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔' //cambia por tu nombre

global.moneda = '¥enes' //cambia el nombre de la moneda
global.welcom1 = '❍ Edita Con El Comando setwelcome' //cambia el mensaje que sale abajo del welcome
global.welcom2 = '❍ Edita Con El Comando setbye' //cambia el mensaje que sale abajo del bye
global.banner = 'https://files.catbox.moe/zp7gba.png' //cambia el logo del bot
global.avatar = 'https://files.catbox.moe/zp7gba.png' //cambia el logo del bot

global.gp1 = 'https://chat.whatsapp.com/BWwvJ4h5lzuLhIuXsBK0Wh' //pon el link de tu grupo 
global.comunidad1 = 'https://chat.whatsapp.com/JONU3lLJhCf0JgCuL13gwk' //pon el link de tu comunidad
global.channel = 'https://whatsapp.com/channel/0029VbAoYE99hXF1wm3zmQ21' //pon el link de tu canal
global.channel2 = 'https://whatsapp.com/channel/0029VbAoYE99hXF1wm3zmQ21' //pon el link de tu segundo canal si no tienes dos pon el mismo
global.md = 'https://github.com/Fer280809/Yezor-bot' //este dejalo asi
global.correo = 'fer280809fl@gmail.com' //pon tu correo aqui 
global.cn ='https://whatsapp.com/channel/0029VbAoYE99hXF1wm3zmQ21'; //pon el link de tu canal aqui 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');   
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363416409380841@newsletter', //pon el lid de tu canal aqui se puede dejar asi si quieres
}
global.multiplier = 70

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
