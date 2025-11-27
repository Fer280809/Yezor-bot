// ============================================
// YEZOR BOT - Archivo Principal
// ============================================

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, delay, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const moment = require('moment-timezone');

// Cargar módulos
const settings = require('./settings.json');
const Database = require('./database');
const Comandos = require('./plugins/comandos');
const IAAsistente = require('./plugins/ia');

// Variables globales
const db = new Database();
const ia = new IAAsistente();
let sock = null;
let comandos = null;

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

  // Inicializar comandos
  comandos = new Comandos(sock, db, ia, settings);

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
      console.log(chalk.magenta('🚀 Yezor Bot está listo!'));
      console.log('');

      // Iniciar auto-mejora si está habilitada
      if (settings.ai.autoImprove) {
        setInterval(() => {
          ia.analizarYMejorar(db);
          console.log(chalk.blue('🔄 Sistema de auto-mejora ejecutado'));
        }, settings.ai.improvementInterval);
      }

      // Auto-guardar base de datos
      if (settings.database.autoSave) {
        setInterval(() => {
          db.guardar();
        }, settings.database.saveInterval);
      }
    }
  });

  // ============================================
  // EVENT: Nuevos mensajes
  // ============================================
  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const msg = messages[0];
      
      // Ignorar mensajes propios y sin contenido
      if (msg.key.fromMe || !msg.message) return;

      // Log del mensaje
      console.log(chalk.gray(`📨 Mensaje de: ${msg.key.remoteJid}`));

      // Procesar mensaje
      await comandos.procesar(msg);

    } catch (error) {
      console.error(chalk.red('❌ Error procesando mensaje:'), error);
      db.estadisticas.errores++;
    }
  });

  // ============================================
  // EVENT: Actualización de grupos
  // ============================================
  sock.ev.on('group-participants.update', async (update) => {
    console.log(chalk.blue('👥 Actualización de grupo:'), update);
    // Aquí puedes agregar lógica para bienvenidas/despedidas
  });
}

// ============================================
// MANEJO DE ERRORES GLOBALES
// ============================================
process.on('uncaughtException', (err) => {
  console.error(chalk.red('❌ Error no capturado:'), err);
});

process.on('unhandledRejection', (err) => {
  console.error(chalk.red('❌ Promesa rechazada:'), err);
});

// Manejo de cierre
process.on('SIGINT', async () => {
  console.log(chalk.yellow('\n⚠️  Cerrando bot...'));
  await db.guardar();
  console.log(chalk.green('✅ Datos guardados'));
  process.exit(0);
});

// ============================================
// INICIAR BOT
// ============================================
iniciarBot().catch(err => {
  console.error(chalk.red('❌ Error fatal:'), err);
  process.exit(1);
});