import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fsPromises } from "fs";
const fs = { ...fsPromises, existsSync };
import path, { join } from 'path' 
import ws from 'ws';

let handler = async (m, { conn: _envio, command, usedPrefix, args, text, isOwner}) => {
const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command)  
const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command)  
const isCommand3 = /^(bots|sockets|socket)$/i.test(command)   

// Número del Bot principal (Reemplaza con el número real)
const mainBotNumber = process.env.NUMBER_BOT || "527461177130";
const mainBotTag = `🤖 *BOT PRINCIPAL:* wa.me/${mainBotNumber}`;

async function reportError(e) {
await m.reply(`${msm} Ocurrió un error.`)
console.log(e)
}

switch (true) {       
case isCommand1:
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
const path = `./${jadi}/${uniqid}`

if (!await fs.existsSync(path)) {
await conn.sendMessage(m.chat, { text: `
╭━━━━━━━━━━━━━
┃ ${mainBotTag}
┃━━━━━━━━━━━━━
┃ ${emoji} No tienes sesión activa
┃ 
┃ • Crear: ${usedPrefix + command}
┃ • Con ID: ${usedPrefix + command} (ID)
╰━━━━━━━━━━━━━` }, { quoted: m })
return
}

if (global.conn.user.jid !== conn.user.jid) return conn.sendMessage(m.chat, {text: `
╭━━━━━━━━━━━━━
┃ ${mainBotTag}
┃━━━━━━━━━━━━━
┃ ${emoji2} Usa este comando en 
┃ el Bot principal:
┃ wa.me/${global.conn.user.jid.split`@`[0]}
┃ Envía: ${usedPrefix + command}
╰━━━━━━━━━━━━━` }, { quoted: m }) 
else {
await conn.sendMessage(m.chat, { text: `
╭━━━━━━━━━━━━━━
┃ ${mainBotTag}
┃━━━━━━━━━━━━━━
┃ ${emoji} Sesión *Sub-Bot* eliminada
╰━━━━━━━━━━━━━━` }, { quoted: m })}
try {
fs.rmdir(`./${jadi}/` + uniqid, { recursive: true, force: true })
await conn.sendMessage(m.chat, { text : `
╭━━━━━━━━━━━━━━
┃ ${mainBotTag}
┃━━━━━━━━━━━━━━
┃ ${emoji3} Sesión cerrada y borrada
╰━━━━━━━━━━━━━━` } , { quoted: m })
} catch (e) {
reportError(e)
}  
break

case isCommand2:
if (global.conn.user.jid == conn.user.jid) conn.reply(m.chat, `
╭━━━━━━━━━━━━━
┃ ${mainBotTag}
┃━━━━━━━━━━━━━
┃ ${emoji} Este es el Bot principal
┃ No eres un Sub-Bot
╰━━━━━━━━━━━━━`, m)
else {
await conn.reply(m.chat, `
╭━━━━━━━━━━━━━
┃ ${mainBotTag}
┃━━━━━━━━━━━━━
┃ ${emoji} ${botname} desactivado
╰━━━━━━━━━━━━━`, m)
conn.ws.close()}  
break

case isCommand3:
//if (global.db.data.settings[conn.user.jid].jadibotmd) return m.reply(`${emoji} Este comando está desactivado por mi creador.`)
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días !== 0) {
resultado += días + "d ";
}
if (horas !== 0) {
resultado += horas + "h ";
}
if (minutos !== 0) {
resultado += minutos + "m ";
}
if (segundos !== 0) {
resultado += segundos + "s";
}
return resultado;
}

const totalUsers = users.length;
let messageHeader = `
╭━━━━━━━━━━━━━
┃ ${mainBotTag}
┃━━━━━━━━━━━━━━
┃ 📊 *SUB-BOTS ACTIVOS*
┃ Total: ${totalUsers || '0'} conectados
┃━━━━━━━━━━━━━
`;

if (users.length === 0) {
  messageHeader += `┃ No hay Sub-Bots disponibles
╰━━━━━━━━━━━━━`;
  await _envio.sendMessage(m.chat, {text: messageHeader}, {quoted: m});
  return;
}

let subBotList = '';
users.forEach((v, index) => {
  subBotList += `┃ ${index + 1}. wa.me/${v.user.jid.replace(/[^0-9]/g, '')}
┃ • Nombre: ${v.user.name || 'Sub-Bot'}
┃ • Tiempo: ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}
┃${index === users.length - 1 ? '╰' : '┣'}━━━━━━━━━━━━━\n`;
});

const disclaimer = `
*Nota:* Cada Sub-Bot usa sus funciones como quiera. El Bot principal no se hace responsable del mal uso.`;

const responseMessage = messageHeader + subBotList + disclaimer;
await _envio.sendMessage(m.chat, {text: responseMessage, mentions: _envio.parseMention(responseMessage)}, {quoted: m});
break   
}}

handler.tags = ['serbot']
handler.help = ['sockets', 'deletesesion', 'pausarai']
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesession', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket']

export default handler
