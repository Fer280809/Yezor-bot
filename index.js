// --- Inicio del código del bot ---
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './settings.js'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, rmSync, watch } from 'fs'
import yargs from 'yargs'
import { spawn, execSync } from 'child_process'
import lodash from 'lodash'
import { yezorJadiBot } from './plugins/jadibot-serbot.js'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import boxen from 'boxen'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import path, { join, dirname } from 'path'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'
import store from './lib/store.js'
const { proto } = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, Browsers } = await import('@whiskeysockets/baileys')
import readline, { createInterface } from 'readline'
import NodeCache from 'node-cache'
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

let { say } = cfonts

// Variables globales necesarias
global.sessions = global.sessions || 'sessions'
global.jadi = global.jadi || 'jadibts'

// Banner inicial mejorado con estilo elegante
console.clear()
console.log(boxen(chalk.bold.hex('#00d9ff')('⚡ INICIANDO YEZOR BOT ⚡'), {
    padding: 2,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    backgroundColor: '#001122'
}))

say('YEZOR', {
    font: 'chrome',
    align: 'center',
    gradient: ['#00d9ff', '#0099cc', '#006699']
})

say('BOT', {
    font: 'slick',
    align: 'center',
    gradient: ['#ff6b35', '#f7931e', '#ffd23f']
})

console.log(boxen(chalk.bold.hex('#ff6b35')('✨ Bot desarrollado con dedicación ✨'), {
    padding: 1,
    margin: 1,
    borderStyle: 'single',
    borderColor: 'yellow',
    backgroundColor: '#001122'
}))

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
return path.dirname(global.__filename(pathURL, true))
}; global.__require = function require(dir = import.meta.url) {
return createRequire(dir)
}

global.timestamp = {start: new Date}
const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#!./]')

// Función cloudDBAdapter faltante
class cloudDBAdapter {
    constructor(url) {
        this.url = url
        this.data = null
    }
    
    async read() {
        try {
            const response = await fetch(this.url)
            this.data = await response.json()
            return this.data
        } catch (error) {
            console.error('Error reading from cloud DB:', error)
            this.data = {}
            return this.data
        }
    }
    
    async write() {
        // Implementar escritura si es necesario
        console.log('Cloud DB write not implemented')
    }
}

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('database.json'))
global.DATABASE = global.db; 
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!global.db.READ) {
clearInterval(this);
resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
}}, 1 * 1000))
}
if (global.db.data !== null) return
global.db.READ = true
await global.db.read().catch(console.error)
global.db.READ = null
global.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
...(global.db.data || {}),
}
global.db.chain = chain(global.db.data)
}
loadDatabase()

// Cache para LIDs
const lidCache = new NodeCache({ stdTTL: 300, checkperiod: 60 })

const {state, saveState, saveCreds} = await useMultiFileAuthState(global.sessions)
const msgRetryCounterMap = new Map()
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const { version } = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumber
const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const colors = chalk.bold.hex('#00d9ff')
const qrOption = chalk.bold.hex('#32cd32')
const textOption = chalk.bold.hex('#ff6b35')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))
let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${global.sessions}/creds.json`)) {
do {
console.log(boxen(colors("🔧 CONFIGURACIÓN DE CONEXIÓN YEZOR 🔧"), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'cyan'
}))
opcion = await question(colors("Seleccione una opción:\n") + qrOption("1. 📱 Conectar con código QR\n") + textOption("2. 💬 Conectar con código de 8 dígitos\n") + chalk.bold.hex('#ffd23f')("➤ "))
if (!/^[1-2]$/.test(opcion)) {
console.log(boxen(chalk.bold.red(`❌ YEZOR: Solo números 1 o 2 son válidos`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'red'
}))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${global.sessions}/creds.json`))
} 

const filterStrings = [
"Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
"Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
"RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
"U2Vzc2lvbiBlcnJvcg==", // "Session error"
"RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC" 
"RGVjcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message" 
]

console.info = () => { }
console.debug = () => { }
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings))

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: opcion == '1' ? Browsers.macOS("Desktop") : methodCodeQR ? Browsers.macOS("Desktop") : Browsers.macOS("Chrome"), 
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: false, 
generateHighQualityLinkPreview: true, 
syncFullHistory: false,
getMessage: async (key) => {
try {
let jid = jidNormalizedUser(key.remoteJid);
let msg = await store.loadMessage(jid, key.id)
return msg?.message || ""
} catch (error) {
return ""
}},
msgRetryCounterCache: msgRetryCounterCache || new Map(),
userDevicesCache: userDevicesCache || new Map(),
defaultQueryTimeoutMs: undefined,
cachedGroupMetadata: (jid) => globalThis.conn.chats[jid] ?? {},
version: version, 
keepAliveIntervalMs: 55000, 
maxIdleTimeMs: 60000, 
}

global.conn = makeWASocket(connectionOptions)
if (!fs.existsSync(`./${global.sessions}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(boxen(chalk.bold.hex('#32cd32')(`📱 YEZOR - Ingrese su número de WhatsApp:`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'green'
}) + '\n' + chalk.bold.hex('#ff6b35')('➤ '))
phoneNumber = phoneNumber.replace(/\D/g,'')
if (!phoneNumber.startsWith('+')) {
phoneNumber = `+${phoneNumber}`
}} while (!await isValidPhoneNumber(phoneNumber))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(boxen(chalk.bold.hex('#00d9ff')(`🔐 CÓDIGO YEZOR: ${codeBot}`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'cyan',
    backgroundColor: '#001122'
}))
}, 3000)
}}}}

conn.isInit = false
conn.well = false

console.log(boxen(chalk.bold.hex('#32cd32')('✅ YEZOR BOT INICIADO CORRECTAMENTE ✅'), {
    padding: 2,
    margin: 1,
    borderStyle: 'single',
    borderColor: 'green',
    backgroundColor: '#001122'
}))

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', `${global.jadi}`], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
}, 30 * 1000)
}

async function resolveLidToRealJid(lidJid, groupJid, maxRetries = 3, retryDelay = 1000) {
if (!lidJid?.endsWith("@lid") || !groupJid?.endsWith("@g.us")) return lidJid?.includes("@") ? lidJid : `${lidJid}@s.whatsapp.net`
const cached = lidCache.get(lidJid);
if (cached) return cached;
const lidToFind = lidJid.split("@")[0];
let attempts = 0
while (attempts < maxRetries) {
try {
const metadata = await conn.groupMetadata(groupJid)
if (!metadata?.participants) throw new Error("No se obtuvieron participantes")
for (const participant of metadata.participants) {
try {
if (!participant?.jid) continue
const contactDetails = await conn.onWhatsApp(participant.jid)
if (!contactDetails?.[0]?.lid) continue
const possibleLid = contactDetails[0].lid.split("@")[0]
if (possibleLid === lidToFind) {
lidCache.set(lidJid, participant.jid)
return participant.jid
}} catch (e) {
continue
}}
lidCache.set(lidJid, lidJid)
return lidJid
} catch (e) {
attempts++
if (attempts >= maxRetries) {
lidCache.set(lidJid, lidJid)
return lidJid
}
await new Promise(resolve => setTimeout(resolve, retryDelay))
}}
return lidJid
}

async function extractAndProcessLids(text, groupJid) {
if (!text) return text
const lidMatches = text.match(/\d+@lid/g) || []
let processedText = text
for (const lid of lidMatches) {
try {
const realJid = await resolveLidToRealJid(lid, groupJid);
processedText = processedText.replace(new RegExp(lid, 'g'), realJid)
} catch (e) {
console.error(`Error procesando LID ${lid}:`, e)
}}
return processedText
}

async function processLidsInMessage(message, groupJid) {
if (!message || !message.key) return message
try {
const messageCopy = {
key: {...message.key},
message: message.message ? {...message.message} : undefined,
...(message.quoted && {quoted: {...message.quoted}}),
...(message.mentionedJid && {mentionedJid: [...message.mentionedJid]})
}
const remoteJid = messageCopy.key.remoteJid || groupJid
if (messageCopy.key?.participant?.endsWith('@lid')) { messageCopy.key.participant = await resolveLidToRealJid(messageCopy.key.participant, remoteJid) }
if (messageCopy.message?.extendedTextMessage?.contextInfo?.participant?.endsWith('@lid')) { messageCopy.message.extendedTextMessage.contextInfo.participant = await resolveLidToRealJid( messageCopy.message.extendedTextMessage.contextInfo.participant, remoteJid ) }
if (messageCopy.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
const mentionedJid = messageCopy.message.extendedTextMessage.contextInfo.mentionedJid
if (Array.isArray(mentionedJid)) {
for (let i = 0; i < mentionedJid.length; i++) {
if (mentionedJid[i]?.endsWith('@lid')) {
mentionedJid[i] = await resolveLidToRealJid(mentionedJid[i], remoteJid)
}}}}
if (messageCopy.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.contextInfo?.mentionedJid) {
const quotedMentionedJid = messageCopy.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.contextInfo.mentionedJid;
if (Array.isArray(quotedMentionedJid)) {
for (let i = 0; i < quotedMentionedJid.length; i++) {
if (quotedMentionedJid[i]?.endsWith('@lid')) {
quotedMentionedJid[i] = await resolveLidToRealJid(quotedMentionedJid[i], remoteJid)
}}}}
if (messageCopy.message?.conversation) { messageCopy.message.conversation = await extractAndProcessLids(messageCopy.message.conversation, remoteJid) }
if (messageCopy.message?.extendedTextMessage?.text) { messageCopy.message.extendedTextMessage.text = await extractAndProcessLids(messageCopy.message.extendedTextMessage.text, remoteJid) }
if (messageCopy.message?.extendedTextMessage?.contextInfo?.participant && !messageCopy.quoted) {
const quotedSender = await resolveLidToRealJid( messageCopy.message.extendedTextMessage.contextInfo.participant, remoteJid );
messageCopy.quoted = { sender: quotedSender, message: messageCopy.message.extendedTextMessage.contextInfo.quotedMessage }
}
return messageCopy
} catch (e) {
console.error('Error en processLidsInMessage:', e)
return message
}}

async function connectionUpdate(update) {
const {connection, lastDisconnect, isNewLogin} = update
global.stopped = connection
if (isNewLogin) conn.isInit = true
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
await global.reloadHandler(true).catch(console.error);
global.timestamp.connect = new Date
}
if (global.db.data == null) loadDatabase()
if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
if (opcion == '1' || methodCodeQR) {
console.log(boxen(chalk.bold.hex('#ffd23f')('📱 YEZOR - ESCANEA EL CÓDIGO QR 📱'), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'yellow'
}))}
}
if (connection === "open") {
const userJid = jidNormalizedUser(conn.user.id)
const userName = conn.user.name || conn.user.verifiedName || "YEZOR BOT"
console.log(boxen(chalk.bold.hex('#32cd32')(`🌟 YEZOR CONECTADO COMO: ${userName} 🌟`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'green',
    backgroundColor: '#001122'
}))
}
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
if (reason === DisconnectReason.badSession) {
console.log(boxen(chalk.bold.hex('#ff5555')(`⚠️ YEZOR: Sesión dañada, eliminar carpeta de sesión`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'red'
}))
} else if (reason === DisconnectReason.connectionClosed) {
console.log(boxen(chalk.bold.hex('#9370db')(`♻️ YEZOR: Reconectando...`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'magenta'
}))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionLost) {
console.log(boxen(chalk.bold.hex('#00d9ff')(`⚠️ YEZOR: Conexión perdida, reintentando...`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'cyan'
}))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(boxen(chalk.bold.hex('#ffd23f')(`🔄 YEZOR: Conexión reemplazada por otra sesión`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'yellow'
}))
} else if (reason === DisconnectReason.loggedOut) {
console.log(boxen(chalk.bold.hex('#ff5555')(`⚠️ YEZOR: Sesión cerrada, eliminar carpeta de sesión`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'red'
}))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.restartRequired) {
console.log(boxen(chalk.bold.hex('#00d9ff')(`♻️ YEZOR: Conectando con el servidor...`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'cyan'
}))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.timedOut) {
console.log(boxen(chalk.bold.hex('#ffd23f')(`♻️ YEZOR: Tiempo agotado, reconectando...`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'yellow'
}))
await global.reloadHandler(true).catch(console.error)
} else {
console.log(boxen(chalk.bold.hex('#ff5555')(`⚠️ YEZOR: Conexión cerrada, reinicie el bot`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'red'
}))
}}}
process.on('uncaughtException', console.error)
let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = global.conn.chats
try {
global.conn.ws.close()
} catch { }
conn.ev.removeAllListeners()
global.conn = makeWASocket(connectionOptions, {chats: oldChats})
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
conn.handler = handler.handler.bind(global.conn)
conn.connectionUpdate = connectionUpdate.bind(global.conn)
conn.credsUpdate = saveCreds.bind(global.conn, true)
const currentDateTime = new Date()
const messageDateTime = new Date(conn.ev)
if (currentDateTime >= messageDateTime) {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])
} else {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])
}
conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}
setInterval(() => {
console.log(boxen(chalk.bold.hex('#9370db')('🔄 YEZOR: Reiniciando sistema automáticamente...'), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'magenta'
}));
process.exit(0)
}, 10800000)

let rtU = join(__dirname, `./${global.jadi}`)
if (!existsSync(rtU)) {
mkdirSync(rtU, { recursive: true }) 
}

global.rutaJadiBot = join(__dirname, `./${global.jadi}`)
if (global.yezorJadibts) {
if (!existsSync(global.rutaJadiBot)) {
mkdirSync(global.rutaJadiBot, { recursive: true }) 
console.log(boxen(chalk.bold.hex('#32cd32')(`📁 YEZOR: Carpeta ${global.jadi} creada`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'green'
}))
} else {
console.log(boxen(chalk.bold.hex('#00d9ff')(`📁 YEZOR: Carpeta ${global.jadi} disponible`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'cyan'
})) 
}
const readRutaJadiBot = readdirSync(global.rutaJadiBot)
if (readRutaJadiBot.length > 0) {
const creds = 'creds.json'
for (const gjbts of readRutaJadiBot) {
const botPath = join(global.rutaJadiBot, gjbts)
const readBotPath = readdirSync(botPath)
if (readBotPath.includes(creds)) {
yezorJadiBot({pathyezorJadiBot: botPath, m: null, conn, args: '', usedPrefix: '/', command: 'serbot'})
}}}}

// Sistema reparado de carga de plugins desde múltiples carpetas
const pluginFolders = [
    join(__dirname, './plugins'),
    join(__dirname, './plugins1'),
    join(__dirname, './plugins2'),
    join(__dirname, './plugins3'),
    join(__dirname, './plugins4'),
    join(__dirname, './plugins5')
]

const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}

async function filesInit() {
    let totalPlugins = 0
    console.log(boxen(chalk.bold.hex('#9370db')('🔌 YEZOR: Cargando plugins del sistema...'), {
        padding: 1,
        borderStyle: 'single',
        borderColor: 'magenta'
    }))

    for (const pluginFolder of pluginFolders) {
        if (!existsSync(pluginFolder)) {
            console.log(chalk.bold.hex('#ff6b35')(`⚠️  YEZOR: Carpeta ${path.basename(pluginFolder)} no encontrada`))
            continue
        }
        
        const folderName = path.basename(pluginFolder)
        let folderPluginCount = 0
        
        try {
            const files = readdirSync(pluginFolder).filter(pluginFilter)
            
            for (const filename of files) {
                try {
                    const file = pathToFileURL(join(pluginFolder, filename)).href
                    const module = await import(file + `?update=${Date.now()}`)
                    const pluginKey = `${folderName}_${filename}`
                    global.plugins[pluginKey] = module.default || module
                    folderPluginCount++
                    totalPlugins++
                } catch (e) {
                    console.log(chalk.bold.hex('#ff5555')(`❌ YEZOR: Error en ${filename} (${folderName}): ${e.message}`))
                    const pluginKey = `${folderName}_${filename}`
                    delete global.plugins[pluginKey]
                }
            }
            
            if (folderPluginCount > 0) {
                console.log(boxen(chalk.bold.hex('#32cd32')(`✅ ${folderName}: ${folderPluginCount} plugins`), {
                    padding: 0,
                    borderStyle: 'single',
                    borderColor: 'green'
                }))
            }
        } catch (error) {
            console.log(chalk.bold.hex('#ff5555')(`❌ YEZOR: Error en carpeta ${folderName}: ${error.message}`))
        }
    }

    console.log(boxen(chalk.bold.hex('#ffd23f')(`🎉 YEZOR: ${totalPlugins} plugins cargados correctamente`), {
        padding: 1,
        borderStyle: 'single',
        borderColor: 'yellow',
        backgroundColor: '#001122'
    }))
}

filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

// Sistema mejorado de recarga de plugins
global.reload = async (_ev, filename) => {
    if (pluginFilter(filename)) {
        // Buscar en qué carpeta está el archivo
        let foundFolder = null
        let foundPath = null
        
        for (const pluginFolder of pluginFolders) {
            const possiblePath = join(pluginFolder, filename)
            if (existsSync(possiblePath)) {
                foundFolder = path.basename(pluginFolder)
                foundPath = possiblePath
                break
            }
        }
        
        if (!foundPath) {
            console.log(chalk.bold.hex('#ff5555')(`❌ YEZOR: ${filename} no encontrado`))
            return
        }
        
        const pluginKey = `${foundFolder}_${filename}`
        
        if (pluginKey in global.plugins) {
            if (existsSync(foundPath)) {
                console.log(boxen(chalk.bold.hex('#00d9ff')(`🔄 YEZOR: ${filename} actualizado`), {
                    padding: 0,
                    borderStyle: 'single',
                    borderColor: 'cyan'
                }))
            } else {
                console.log(boxen(chalk.bold.hex('#ff5555')(`🗑️  YEZOR: ${filename} eliminado`), {
                    padding: 0,
                    borderStyle: 'single',
                    borderColor: 'red'
                }))
                return delete global.plugins[pluginKey]
            }
        } else {
            console.log(boxen(chalk.bold.hex('#32cd32')(`✨ YEZOR: Nuevo plugin ${filename}`), {
                padding: 0,
                borderStyle: 'single',
                borderColor: 'green'
            }))
        }
        
        const err = syntaxerror(readFileSync(foundPath), filename, {
            sourceType: 'module',
            allowAwaitOutsideFunction: true,
        });
        
        if (err) {
            console.log(boxen(chalk.bold.hex('#ff5555')(`❌ YEZOR: Error de sintaxis en ${filename}: ${format(err)}`), {
                padding: 1,
                borderStyle: 'single',
                borderColor: 'red'
            }))
        } else {
            try {
                const fileUrl = pathToFileURL(foundPath).href
                const module = (await import(`${fileUrl}?update=${Date.now()}`));
                global.plugins[pluginKey] = module.default || module;
            } catch (e) {
                console.log(boxen(chalk.bold.hex('#ff5555')(`❌ YEZOR: Error cargando ${filename}: ${format(e)}`), {
                    padding: 1,
                    borderStyle: 'single',
                    borderColor: 'red'
                }))
            } finally {
                global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
            }
        }
    }
}

Object.freeze(global.reload)

// Vigilar todas las carpetas de plugins
for (const pluginFolder of pluginFolders) {
    if (existsSync(pluginFolder)) {
        watch(pluginFolder, global.reload)
        console.log(chalk.bold.hex('#9370db')(`👁️  YEZOR: Vigilando ${path.basename(pluginFolder)}`))
    }
}

await global.reloadHandler()

async function _quickTest() {
console.log(boxen(chalk.bold.hex('#ff6b35')('🔧 YEZOR: Verificando dependencias del sistema...'), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'yellow'
}))

const test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version']),
].map((p) => {
return Promise.race([
new Promise((resolve) => {
p.on('close', (code) => {
resolve(code !== 127);
});
}),
new Promise((resolve) => {
p.on('error', (_) => resolve(false))
})])
}))

const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};

// Mostrar estado de dependencias con diseño mejorado
const dependencies = [
    { name: 'FFmpeg', status: ffmpeg, icon: '🎬' },
    { name: 'FFprobe', status: ffprobe, icon: '🔍' },
    { name: 'FFmpeg WebP', status: ffmpegWebp, icon: '🖼️' },
    { name: 'ImageMagick Convert', status: convert, icon: '🎨' },
    { name: 'ImageMagick', status: magick, icon: '✨' },
    { name: 'GraphicsMagick', status: gm, icon: '🎭' },
    { name: 'Find', status: find, icon: '🔎' }
]

dependencies.forEach(dep => {
    const statusText = dep.status ? chalk.bold.green('✅ DISPONIBLE') : chalk.bold.red('❌ NO DISPONIBLE')
    console.log(`${dep.icon} YEZOR ${chalk.bold.white(dep.name)}: ${statusText}`)
})

Object.freeze(global.support);
}

function clearTmp() {
const tmpDir = join(__dirname, 'tmp')
if (existsSync(tmpDir)) {
    const filenames = readdirSync(tmpDir)
    filenames.forEach(file => {
        const filePath = join(tmpDir, file)
        unlinkSync(filePath)
    })
}
}

function purgeSession() {
let prekey = []
let directorio = readdirSync(`./${global.sessions}`)
let filesFolderPreKeys = directorio.filter(file => {
return file.startsWith('pre-key-')
})
prekey = [...prekey, ...filesFolderPreKeys]
filesFolderPreKeys.forEach(files => {
unlinkSync(`./${global.sessions}/${files}`)
})
} 

function purgeSessionSB() {
try {
const listaDirectorios = readdirSync(`./${global.jadi}/`);
let SBprekey = [];
listaDirectorios.forEach(directorio => {
if (statSync(`./${global.jadi}/${directorio}`).isDirectory()) {
const DSBPreKeys = readdirSync(`./${global.jadi}/${directorio}`).filter(fileInDir => {
return fileInDir.startsWith('pre-key-')
})
SBprekey = [...SBprekey, ...DSBPreKeys];
DSBPreKeys.forEach(fileInDir => {
if (fileInDir !== 'creds.json') {
unlinkSync(`./${global.jadi}/${directorio}/${fileInDir}`)
}})
}})
if (SBprekey.length === 0) {
console.log(boxen(chalk.bold.hex('#32cd32')(`✅ YEZOR: No hay archivos en ${global.jadi} para limpiar`), {
    padding: 0,
    borderStyle: 'single',
    borderColor: 'green'
}))
} else {
console.log(boxen(chalk.bold.hex('#00d9ff')(`🗑️  YEZOR: Archivos de ${global.jadi} limpiados`), {
    padding: 0,
    borderStyle: 'single',
    borderColor: 'cyan'
}))
}} catch (err) {
console.log(boxen(chalk.bold.hex('#ff5555')(`❌ YEZOR: Error limpiando ${global.jadi}: ${err}`), {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'red'
}))
}}

function purgeOldFiles() {
const directories = [`./${global.sessions}/`, `./${global.jadi}/`]
directories.forEach(dir => {
if (existsSync(dir)) {
    readdirSync(dir, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            if (file !== 'creds.json') {
                const filePath = path.join(dir, file);
                unlinkSync(filePath, err => {
                    if (err) {
                        console.log(boxen(chalk.bold.hex('#ff5555')(`❌ YEZOR: No se pudo borrar ${file}: ${err}`), {
                            padding: 0,
                            borderStyle: 'single',
                            borderColor: 'red'
                        }))
                    } else {
                        console.log(boxen(chalk.bold.hex('#32cd32')(`✅ YEZOR: ${file} eliminado`), {
                            padding: 0,
                            borderStyle: 'single',
                            borderColor: 'green'
                        }))
                    }
                })
            }
        })
    })
}})
}

function redefineConsoleMethod(methodName, filterStrings) {
const originalConsoleMethod = console[methodName]
console[methodName] = function() {
const message = arguments[0]
if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
arguments[0] = ""
}
originalConsoleMethod.apply(console, arguments)
}}

// Intervalos de limpieza con mensajes mejorados
setInterval(async () => {
if (global.stopped === 'close' || !conn || !conn.user) return
await clearTmp()
console.log(boxen(chalk.bold.hex('#00d9ff')('🧹 YEZOR: Archivos temporales limpiados'), {
    padding: 0,
    borderStyle: 'single',
    borderColor: 'cyan'
}))
}, 1000 * 60 * 4)

setInterval(async () => {
if (global.stopped === 'close' || !conn || !conn.user) return
await purgeSession()
console.log(boxen(chalk.bold.hex('#00d9ff')(`🧹 YEZOR: Sesión ${global.sessions} optimizada`), {
    padding: 0,
    borderStyle: 'single',
    borderColor: 'cyan'
}))
}, 1000 * 60 * 10)

setInterval(async () => {
if (global.stopped === 'close' || !conn || !conn.user) return
await purgeSessionSB()
}, 1000 * 60 * 10) 

setInterval(async () => {
if (global.stopped === 'close' || !conn || !conn.user) return
await purgeOldFiles()
console.log(boxen(chalk.bold.hex('#00d9ff')('🧹 YEZOR: Sistema optimizado'), {
    padding: 0,
    borderStyle: 'single',
    borderColor: 'cyan'
}))
}, 1000 * 60 * 10)

_quickTest().catch(console.error)

async function isValidPhoneNumber(number) {
try {
number = number.replace(/\s+/g, '')
if (number.startsWith('+521')) {
number = number.replace('+521', '+52');
} else if (number.startsWith('+52') && number[4] === '1') {
number = number.replace('+52 1', '+52');
}
const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
return phoneUtil.isValidNumber(parsedNumber)
} catch (error) {
return false
}}
// --- Fin del código del bot ---
