// ============================================
// YEZOR BOT - Archivo Principal con JadiBot
// Soporta QR Code y Pairing Code
// ============================================

const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, delay, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const moment = require('moment-timezone');
const readline = require('readline');
const fs = require('fs');

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
let usePairingCode = false;
let phoneNumber = '';

// ============================================
// INTERFAZ DE READLINE
// ============================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

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
// SELECTOR DE MÉTODO DE CONEXIÓN
// ============================================
async function seleccionarMetodoConexion() {
  console.log(chalk.cyan('╔════════════════════════════════════════╗'));
  console.log(chalk.cyan('║  📱 MÉTODOS DE CONEXIÓN DISPONIBLES   ║'));
  console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));
  console.log(chalk.white('  1️⃣  📱 Código QR'));
  console.log(chalk.gray('      └─ Escanea con la cámara de WhatsApp\n'));
  console.log(chalk.white('  2️⃣  🔢 Código de Vinculación (8 dígitos)'));
  console.log(chalk.gray('      └─ Ingresa código manualmente en WhatsApp\n'));
  
  const opcion = await question(chalk.yellow('👉 Selecciona una opción (1 o 2): '));
  
  if (opcion.trim() === '2') {
    usePairingCode = true;
    console.log('');
    console.log(chalk.cyan('═══════════════════════════════════════'));
    console.log(chalk.cyan('  CONFIGURACIÓN DE CÓDIGO DE PAIRING'));
    console.log(chalk.cyan('═══════════════════════════════════════\n'));
    
    phoneNumber = await question(chalk.yellow('📱 Ingresa tu número completo:\n   (Ejemplo: 5212345678901)\n   → '));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    
    if (phoneNumber.length < 10) {
      console.log(chalk.red('\n❌ Número inválido'));
      console.log(chalk.yellow('💡 Formato correcto: [código país][número]'));
      console.log(chalk.yellow('   Ejemplo México: 5212345678901'));
      console.log(chalk.yellow('   Ejemplo USA: 11234567890\n'));
      process.exit(1);
    }
    
    console.log(chalk.green(`\n✅ Modo: Código de Vinculación`));
    console.log(chalk.cyan(`📞 Número configurado: +${phoneNumber}\n`));
    console.log(chalk.gray('💡 Asegúrate de que WhatsApp esté instalado en ese número\n'));
  } else {
    usePairingCode = false;
    console.log(chalk.green('\n✅ Modo: Código QR seleccionado\n'));
  }
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================
async function iniciarBot() {
  // Cargar base de datos
  await db.cargar();
  console.log(chalk.green('✅ Base de datos cargada'));

  // Inicializar JadiBot
  await jadibot.init();
  console.log(chalk.green(`✅ JadiBot: ${jadibot.isEnabled() ? 'Activado' : 'Desactivado'}`));

  // Cargar plugins
  await plugins.loadAll();
  console.log(chalk.green(`✅ Plugins cargados: ${plugins.getStats().total}`));

  // Obtener última versión de Baileys
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(chalk.cyan(`📦 Baileys v${version.join('.')} ${isLatest ? '(latest)' : ''}\n`));

  // Configurar autenticación
  const { state, saveCreds } = await useMultiFileAuthState('./auth_yezor');
  
  // Crear socket de WhatsApp
  sock = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' }))
    },
    printQRInTerminal: false, // SIEMPRE false - manejamos QR manualmente
    logger: P({ level: 'silent' }),
    browser: ['Yezor Bot', 'Chrome', '3.0'],
    version,
    defaultQueryTimeoutMs: undefined,
    getMessage: async (key) => {
      return { conversation: '' };
    }
  });

  // ============================================
  // PAIRING CODE: Solicitar INMEDIATAMENTE después de crear socket
  // ============================================
  if (usePairingCode && !sock.authState.creds.registered) {
    console.log(chalk.yellow('⏳ Solicitando código de vinculación...\n'));
    
    // Esperar solo un poco para que el socket se inicialice
    await delay(1500);
    
    try {
      const code = await sock.requestPairingCode(phoneNumber);
      const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;
      
      console.log(chalk.cyan('╔════════════════════════════════════════╗'));
      console.log(chalk.cyan('║      🔢 CÓDIGO DE VINCULACIÓN         ║'));
      console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));
      console.log(chalk.yellow.bold(`           ${formattedCode}           \n`));
      console.log(chalk.white('📱 PASOS PARA VINCULAR:\n'));
      console.log(chalk.white('1. Abre WhatsApp en tu teléfono'));
      console.log(chalk.white('2. Toca los 3 puntos (⋮) > Dispositivos vinculados'));
      console.log(chalk.white('3. Toca "Vincular un dispositivo"'));
      console.log(chalk.white('4. Toca "Vincular con número de teléfono"'));
      console.log(chalk.yellow(`5. Ingresa este código: ${formattedCode}`));
      console.log(chalk.gray('\n⚠️  El código expira en 60 segundos'));
      console.log(chalk.gray('⏳ Esperando vinculación...\n'));
    } catch (error) {
      console.error(chalk.red('❌ Error al generar código:'), error.message);
      console.log(chalk.yellow('\n💡 Intenta con código QR en su lugar'));
      console.log(chalk.yellow('   Ejecuta de nuevo y selecciona opción 1\n'));
    }
  }

  // ============================================
  // EVENT: Actualizar credenciales
  // ============================================
  sock.ev.on('creds.update', saveCreds);

  // ============================================
  // EVENT: Actualización de conexión
  // ============================================
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr, isNewLogin } = update;
    
    // Manejar QR Code
    if (qr && !usePairingCode) {
      console.log(chalk.cyan('╔════════════════════════════════════════╗'));
      console.log(chalk.cyan('║         📱 CÓDIGO QR GENERADO         ║'));
      console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));
      qrcode.generate(qr, { small: true });
      console.log('');
      console.log(chalk.white('📱 PASOS PARA VINCULAR:\n'));
      console.log(chalk.white('1. Abre WhatsApp en tu teléfono'));
      console.log(chalk.white('2. Toca los 3 puntos (⋮) > Dispositivos vinculados'));
      console.log(chalk.white('3. Toca "Vincular un dispositivo"'));
      console.log(chalk.white('4. Apunta tu cámara al código QR de arriba\n'));
      console.log(chalk.gray('⏳ Esperando escaneo...\n'));
    }

    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      
      if (shouldReconnect) {
        console.log(chalk.yellow('⚠️  Conexión cerrada. Reconectando en 5s...'));
        await delay(5000);
        iniciarBot();
      } else {
        console.log(chalk.red('\n❌ Sesión cerrada por WhatsApp'));
        console.log(chalk.yellow('💡 Para reconectar, elimina la carpeta: auth_yezor\n'));
        rl.close();
        process.exit(0);
      }
    } else if (connection === 'open') {
      console.log(chalk.cyan('╔════════════════════════════════════════╗'));
      console.log(chalk.green('║     ✅ BOT CONECTADO EXITOSAMENTE     ║'));
      console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));
      console.log(chalk.cyan(`📊 Usuarios: ${db.usuarios.size}`));
      console.log(chalk.cyan(`📨 Mensajes: ${db.estadisticas.mensajes}`));
      console.log(chalk.cyan(`🔌 Plugins: ${plugins.getStats().total}`));
      console.log(chalk.cyan(`🤖 JadiBot: ${jadibot.isEnabled() ? chalk.green('ON') : chalk.red('OFF')}`));
      console.log(chalk.magenta('\n🚀 Yezor Bot está listo!\n'));

      // Cerrar readline
      rl.close();

      // Auto-guardar base de datos
      if (settings.database.autoSave) {
        setInterval(() => {
          db.guardar();
        }, settings.database.saveInterval);
      }

      // Limpiar sesiones inactivas de JadiBot
      setInterval(() => {
        jadibot.cleanInactiveSessions();
      }, 3600000);
    }
  });

  // ============================================
  // PAIRING CODE: Solicitar después de crear socket
  // ============================================
  if (usePairingCode && !sock.authState.creds.registered) {
    console.log(chalk.yellow('⏳ Generando código de vinculación...\n'));
    
    // Esperar un momento para que el socket se inicialice
    await delay(3000);
    
    try {
      const code = await sock.requestPairingCode(phoneNumber);
      const formattedCode = code.match(/.{1,4}/g)?.join('-') || code;
      
      console.log(chalk.cyan('╔════════════════════════════════════════╗'));
      console.log(chalk.cyan('║      🔢 CÓDIGO DE VINCULACIÓN         ║'));
      console.log(chalk.cyan('╚════════════════════════════════════════╝\n'));
      console.log(chalk.yellow.bold(`        ${formattedCode}        \n`));
      console.log(chalk.white('1. Abre WhatsApp en tu teléfono'));
      console.log(chalk.white('2. Ve a Ajustes > Dispositivos vinculados'));
      console.log(chalk.white('3. Toca "Vincular un dispositivo"'));
      console.log(chalk.white('4. Selecciona "Vincular con número de teléfono"'));
      console.log(chalk.white(`5. Ingresa el código: ${chalk.yellow.bold(formattedCode)}\n`));
      console.log(chalk.gray('⏳ Esperando vinculación...\n'));
    } catch (error) {
      console.error(chalk.red('❌ Error al generar código:'), error.message);
    }
  }

  // ============================================
  // EVENT: Nuevos mensajes
  // ============================================
  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const m = messages[0];
      
      if (m.key.fromMe || !m.message) return;

      const msg = serialize(m, sock);

      const logText = msg.text.length > 50 ? msg.text.substring(0, 50) + '...' : msg.text;
      console.log(chalk.gray(`📨 ${msg.sender.split('@')[0]}: ${logText}`));

      db.incrementarMensajes(msg.sender);

      if (msg.text.startsWith(settings.prefix)) {
        const [comando, ...args] = msg.text.slice(settings.prefix.length).trim().split(/\s+/);
        const cmd = comando.toLowerCase();

        db.registrarComando(cmd);
        console.log(chalk.blue(`⚡ Comando: /${cmd}`));

        const executed = await plugins.executeCommand(msg, cmd, args, sock, db, {
          ...settings,
          jadibot
        });

        if (!executed) {
          await msg.reply('❌ Comando no encontrado. Usa /menu para ver comandos disponibles.');
        }
      }
      else if (msg.text.toLowerCase().includes('yezor') || msg.text.toLowerCase().includes('bot')) {
        // Respuesta con IA (implementar si lo deseas)
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
  // EVENT: Actualización de grupos
  // ============================================
  sock.ev.on('groups.update', async (updates) => {
    for (const update of updates) {
      console.log(chalk.blue(`🔄 Grupo actualizado: ${update.id}`));
      
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

process.on('SIGINT', async () => {
  console.log(chalk.yellow('\n⚠️  Cerrando bot...'));
  
  rl.close();
  
  await db.guardar();
  console.log(chalk.green('✅ Datos guardados'));
  
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
(async () => {
  try {
    mostrarBanner();
    
    console.log(chalk.cyan('🔍 Verificando sesión existente...\n'));
    
    const existeSesion = fs.existsSync('./auth_yezor/creds.json');
    
    if (!existeSesion) {
      // Primera conexión - preguntar método
      await seleccionarMetodoConexion();
    } else {
      console.log(chalk.green('✅ Sesión existente encontrada'));
      console.log(chalk.cyan('🔄 Reconectando automáticamente...\n'));
    }
    
    await iniciarBot();
    
  } catch (err) {
    console.error(chalk.red('❌ Error fatal:'), err);
    rl.close();
    process.exit(1);
  }
})();
