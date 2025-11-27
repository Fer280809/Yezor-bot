// ============================================
// YEZOR BOT - Archivo Principal con JadiBot
// ============================================

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, delay, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const moment = require('moment-timezone');

// Cargar módulos
const settings = require('./settings.json');
const Database = require('./database');
const { serialize } = require('./lib/simple');
const JadiBotManager = require('./lib/jadibot');
const PluginLoader = require('./lib/pluginLoader');

// Variables globales
const db = new Database();
const jadibot = new JadiBotManager();
const plugins = new PluginLoader();
let sock = null;

// ============================================
// BANNER DE INICIO
// ============================================
function mostrarBanner() {
  console.clear();
  console.log(chalk.cyan(`
╔══════════════════════════════════════╗
║                                      ║
║  ██╗   ██╗███████╗███████╗ ██████╗ ██████╗  
║  ╚██╗ ██╔╝██╔════╝╚══███╔╝██╔═══██╗██╔══██╗ 
║   ╚████╔╝ █████╗    ███╔╝ ██║   ██║██████╔╝ 
║    ╚██╔╝  ██╔══╝   ███╔╝  ██║   ██║██╔══██╗ 
║     ██║   ███████╗███████╗╚██████╔╝██║  ██║ 
║     ╚═╝   ╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ 
║                                      ║
║     Bot de WhatsApp con IA v2.0     ║
║        + Sistema JadiBot             ║
║                                      ║
╚══════════════════════════════════════╝
  `));
  console.log(chalk.yellow(`⏰ ${moment().tz(settings.timezone).format('DD/MM/YYYY HH:mm:ss')}`));
  console.log(chalk.green(`🤖 Bot: ${settings.botName}`));
  console.log(chalk.blue(`🌐 Idiomas: ${settings.idiomas.join(', ')}\n`));
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
async function iniciarBot() {
  mostrarBanner();
  
  // Cargar base de datos
  await db.cargar();
  console.log(chalk.green('✅ Base de datos cargada'));

  // Inicializar JadiBot
  await jadibot.init();
  console.log(chalk.green(`✅ JadiBot: ${jadibot.isEnabled() ? 'Activado' : 'Desactivado'}`));

  // Cargar plugins
  await plugins.loadAll();

  // Obtener última versión de Baileys
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(chalk.cyan(`📦 Baileys v${version.join('.')} ${isLatest ? '(latest)' : ''}`));

  // Configurar autenticación
  const { state, saveCreds } = await useMultiFileAuthState('./auth_yezor');
  
  // Crear socket de WhatsApp
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: P({ level: 'silent' }),
    browser: ['Yezor Bot', 'Chrome', '3.0'],
    version
  });

  // ============================================
  // EVENT: Actualizar credenciales
  // ============================================
  sock.ev.on('creds.update', saveCreds);

  // ============================================
  // EVENT: Actualización de conexión
  // ============================================
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log('');
      console.log(chalk.yellow('📱 Escanea este código QR con WhatsApp:'));
      console.log('');
      qrcode.generate(qr, { small: true });
      console.log('');
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      
      if (shouldReconnect) {
        console.log(chalk.yellow('⚠️  Conexión cerrada. Reconectando en 5s...'));
        await delay(5000);
        iniciarBot();
      } else {
        console.log(chalk.red('❌ Bot desconectado. Elimina la carpeta auth_yezor para reconectar.'));
      }
    } else if (connection === 'open') {
      console.log('');
      console.log(chalk.green('═══════════════════════════════════'));
      console.log(chalk.green('✅ BOT CONECTADO EXITOSAMENTE'));
      console.log(chalk.green('═══════════════════════════════════'));
      console.log(chalk.cyan(`📊 Usuarios registrados: ${db.usuarios.size}`));
      console.log(chalk.cyan(`📨 Mensajes procesados: ${db.estadisticas.mensajes}`));
      console.log(chalk.cyan(`🔌 Plugins cargados: ${plugins.getStats().total}`));
      console.log(chalk.cyan(`🤖 JadiBot: ${jadibot.isEnabled() ? chalk.green('✅ ON') : chalk.red('❌ OFF')}`));
      console.log(chalk.magenta('🚀 Yezor Bot está listo!'));
      console.log('');

      // Auto-guardar base de datos
      if (settings.database.autoSave) {
        setInterval(() => {
          db.guardar();
        }, settings.database.saveInterval);
      }

      // Limpiar sesiones inactivas de JadiBot cada hora
      setInterval(() => {
        jadibot.cleanInactiveSessions();
      }, 3600000);
    }
  });

  // ============================================
  // EVENT: Nuevos mensajes
  // ============================================
  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const m = messages[0];
      
      // Ignorar mensajes propios y sin contenido
      if (m.key.fromMe || !m.message) return;

      // Serializar mensaje
      const msg = serialize(m, sock);

      // Log del mensaje
      const logText = msg.text.length > 50 ? msg.text.substring(0, 50) + '...' : msg.text;
      console.log(chalk.gray(`📨 ${msg.sender.split('@')[0]}: ${logText}`));

      // Incrementar contador
      db.incrementarMensajes(msg.sender);

      // Si es un comando
      if (msg.text.startsWith(settings.prefix)) {
        const [comando, ...args] = msg.text.slice(settings.prefix.length).trim().split(/\s+/);
        const cmd = comando.toLowerCase();

        // Registrar comando
        db.registrarComando(cmd);

        console.log(chalk.blue(`⚡ Comando: /${cmd}`));

        // Ejecutar plugin
        const executed = await plugins.executeCommand(msg, cmd, args, sock, db, {
          ...settings,
          jadibot
        });

        if (!executed) {
          await msg.reply('❌ Comando no encontrado. Usa /menu para ver comandos disponibles.');
        }
      }
      // Conversación normal (puedes agregar IA aquí)
      else if (msg.text.toLowerCase().includes('yezor') || msg.text.toLowerCase().includes('bot')) {
        // Aquí puedes agregar respuesta con IA si lo deseas
        // const respuesta = await ia.responder(msg.text, idioma, msg.sender, db);
        // await msg.reply(respuesta);
      }

    } catch (error) {
      console.error(chalk.red('❌ Error procesando mensaje:'), error);
      db.registrarError();
    }
  });

  // ============================================
  // EVENT: Actualización de participantes de grupo
  // ============================================
  sock.ev.on('group-participants.update', async (update) => {
    try {
      const { id, participants, action } = update;
      
      const grupo = db.getGrupo(id);
      
      // Verificar si bienvenida está activada
      if (!grupo.configuracion.bienvenida) return;

      const groupMetadata = await sock.groupMetadata(id);

      for (const participant of participants) {
        if (action === 'add') {
          const welcome = `👋 *BIENVENIDO/A*

Hola @${participant.split('@')[0]}!

Bienvenido/a al grupo *${groupMetadata.subject}*

🤖 Soy ${settings.botName}, usa /menu para ver mis comandos`;

          await sock.sendMessage(id, {
            text: welcome,
            mentions: [participant]
          });

          console.log(chalk.green(`👋 Bienvenida enviada en ${groupMetadata.subject}`));
        } 
        else if (action === 'remove') {
          const goodbye = `👋 *ADIÓS*

@${participant.split('@')[0]} ha salido del grupo.

¡Hasta pronto!`;

          await sock.sendMessage(id, {
            text: goodbye,
            mentions: [participant]
          });

          console.log(chalk.yellow(`👋 Despedida enviada en ${groupMetadata.subject}`));
        }
      }
    } catch (error) {
      console.error(chalk.red('Error en event de grupo:'), error);
    }
  });

  // ============================================
  // EVENT: Actualización de grupos (nombre, foto, etc)
  // ============================================
  sock.ev.on('groups.update', async (updates) => {
    for (const update of updates) {
      console.log(chalk.blue(`🔄 Grupo actualizado: ${update.id}`));
      
      // Actualizar info del grupo en DB
      const grupo = db.getGrupo(update.id);
      if (update.subject) {
        grupo.nombre = update.subject;
        db.grupos.set(update.id, grupo);
      }
    }
  });
}

// ============================================
// MANEJO DE ERRORES GLOBALES
// ============================================
process.on('uncaughtException', (err) => {
  console.error(chalk.red('❌ Error no capturado:'), err);
  db.registrarError();
});

process.on('unhandledRejection', (err) => {
  console.error(chalk.red('❌ Promesa rechazada:'), err);
  db.registrarError();
});

// Manejo de cierre
process.on('SIGINT', async () => {
  console.log(chalk.yellow('\n⚠️  Cerrando bot...'));
  
  // Guardar datos
  await db.guardar();
  console.log(chalk.green('✅ Datos guardados'));
  
  // Desconectar todos los sub-bots
  if (jadibot.bots.size > 0) {
    console.log(chalk.yellow('🔌 Desconectando sub-bots...'));
    for (const [userId] of jadibot.bots) {
      try {
        await jadibot.stopBot(userId);
      } catch (error) {
        console.error(`Error cerrando bot ${userId}:`, error);
      }
    }
  }
  
  console.log(chalk.green('👋 Bot cerrado correctamente'));
  process.exit(0);
});

// ============================================
// INICIAR BOT
// ============================================
console.log(chalk.cyan('🚀 Iniciando Yezor Bot...\n'));

iniciarBot().catch(err => {
  console.error(chalk.red('❌ Error fatal al iniciar:'), err);
  process.exit(1);
});