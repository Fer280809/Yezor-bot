// ============================================
// JADIBOT.JS - Sistema de Sub-Bots
// ============================================

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const P = require('pino');
const fs = require('fs').promises;
const path = require('path');
const qrcode = require('qrcode');

class JadiBotManager {
  constructor() {
    this.bots = new Map();
    this.jadibotEnabled = false;
    this.dataFile = './jadibot_config.json';
    this.botsDir = './jadibot_sessions';
  }

  // ============================================
  // INICIALIZAR
  // ============================================
  async init() {
    try {
      // Crear directorio para sesiones
      await fs.mkdir(this.botsDir, { recursive: true });
      
      // Cargar configuración
      try {
        const data = await fs.readFile(this.dataFile, 'utf8');
        const config = JSON.parse(data);
        this.jadibotEnabled = config.enabled || false;
      } catch {
        await this.saveConfig();
      }
    } catch (error) {
      console.error('Error inicializando JadiBotManager:', error);
    }
  }

  // ============================================
  // GUARDAR CONFIGURACIÓN
  // ============================================
  async saveConfig() {
    const config = {
      enabled: this.jadibotEnabled,
      bots: Array.from(this.bots.keys()),
      lastUpdate: new Date().toISOString()
    };
    
    await fs.writeFile(this.dataFile, JSON.stringify(config, null, 2));
  }

  // ============================================
  // ACTIVAR/DESACTIVAR JADIBOT
  // ============================================
  async toggleJadiBot(enabled) {
    this.jadibotEnabled = enabled;
    await this.saveConfig();
    
    if (!enabled) {
      // Desconectar todos los sub-bots
      for (const [userId, bot] of this.bots) {
        await this.stopBot(userId);
      }
    }
    
    return this.jadibotEnabled;
  }

  // ============================================
  // VERIFICAR SI ESTÁ HABILITADO
  // ============================================
  isEnabled() {
    return this.jadibotEnabled;
  }

  // ============================================
  // CREAR SUB-BOT
  // ============================================
  async createBot(userId, mainSock) {
    if (!this.jadibotEnabled) {
      throw new Error('JadiBot está deshabilitado');
    }

    if (this.bots.has(userId)) {
      throw new Error('Ya tienes un bot activo');
    }

    const sessionPath = path.join(this.botsDir, `session_${userId}`);
    await fs.mkdir(sessionPath, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: P({ level: 'silent' }),
      browser: ['SubBot', 'Chrome', '3.0'],
      version
    });

    // Objeto del bot
    const botInfo = {
      sock: sock,
      userId: userId,
      qr: null,
      connected: false,
      startTime: new Date(),
      saveCreds: saveCreds
    };

    // Event: Actualizar credenciales
    sock.ev.on('creds.update', saveCreds);

    // Event: Conexión
    sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        // Generar QR en base64
        botInfo.qr = await qrcode.toDataURL(qr);
        
        // Enviar QR al usuario
        await mainSock.sendMessage(userId, {
          image: Buffer.from(botInfo.qr.split(',')[1], 'base64'),
          caption: `🤖 *ESCANEA ESTE QR PARA CONVERTIRTE EN SUB-BOT*\n\n⏱️ El QR expira en 45 segundos\n\n_Escanea con WhatsApp > Dispositivos vinculados_`
        });
      }

      if (connection === 'open') {
        botInfo.connected = true;
        this.bots.set(userId, botInfo);
        await this.saveConfig();

        await mainSock.sendMessage(userId, {
          text: `✅ *SUB-BOT CONECTADO EXITOSAMENTE*\n\n🤖 Tu bot está activo\n⏱️ Conectado: ${new Date().toLocaleString()}\n\n_Ahora puedes usar el bot de forma independiente_`
        });

        // Reenviar mensajes del sub-bot al bot principal
        sock.ev.on('messages.upsert', async ({ messages }) => {
          const m = messages[0];
          if (!m.key.fromMe && m.message) {
            // Aquí se pueden procesar los mensajes del sub-bot
            console.log(`SubBot ${userId}: Mensaje recibido`);
          }
        });
      }

      if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        
        if (shouldReconnect) {
          console.log(`SubBot ${userId}: Reconectando...`);
          await this.createBot(userId, mainSock);
        } else {
          this.bots.delete(userId);
          await this.saveConfig();
          
          await mainSock.sendMessage(userId, {
            text: `❌ *SUB-BOT DESCONECTADO*\n\n_Tu bot ha sido desconectado. Usa /serbot para crear uno nuevo._`
          });
        }
      }
    });

    return botInfo;
  }

  // ============================================
  // DETENER SUB-BOT
  // ============================================
  async stopBot(userId) {
    const bot = this.bots.get(userId);
    
    if (!bot) {
      throw new Error('No tienes un bot activo');
    }

    try {
      await bot.sock.logout();
    } catch (error) {
      console.error('Error cerrando bot:', error);
    }

    this.bots.delete(userId);
    
    // Eliminar sesión
    const sessionPath = path.join(this.botsDir, `session_${userId}`);
    try {
      await fs.rm(sessionPath, { recursive: true, force: true });
    } catch (error) {
      console.error('Error eliminando sesión:', error);
    }

    await this.saveConfig();
  }

  // ============================================
  // OBTENER BOT
  // ============================================
  getBot(userId) {
    return this.bots.get(userId);
  }

  // ============================================
  // LISTAR BOTS ACTIVOS
  // ============================================
  listBots() {
    return Array.from(this.bots.entries()).map(([userId, bot]) => ({
      userId: userId,
      connected: bot.connected,
      startTime: bot.startTime,
      uptime: this.calculateUptime(bot.startTime)
    }));
  }

  // ============================================
  // CALCULAR UPTIME
  // ============================================
  calculateUptime(startTime) {
    const now = new Date();
    const diff = now - startTime;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }

  // ============================================
  // OBTENER ESTADÍSTICAS
  // ============================================
  getStats() {
    return {
      enabled: this.jadibotEnabled,
      totalBots: this.bots.size,
      connectedBots: Array.from(this.bots.values()).filter(b => b.connected).length,
      bots: this.listBots()
    };
  }

  // ============================================
  // LIMPIAR SESIONES INACTIVAS
  // ============================================
  async cleanInactiveSessions() {
    try {
      const sessions = await fs.readdir(this.botsDir);
      
      for (const session of sessions) {
        const sessionPath = path.join(this.botsDir, session);
        const userId = session.replace('session_', '');
        
        if (!this.bots.has(userId)) {
          await fs.rm(sessionPath, { recursive: true, force: true });
          console.log(`Sesión inactiva eliminada: ${userId}`);
        }
      }
    } catch (error) {
      console.error('Error limpiando sesiones:', error);
    }
  }
}

module.exports = JadiBotManager;