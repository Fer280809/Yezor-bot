// ============================================
// COMANDOS.JS - Manejador de Comandos
// ============================================

const Mensajes = require('./mensajes');
const { extraerTexto, esGrupo, limpiarJID } = require('./utils');

class Comandos {
  constructor(sock, db, ia, settings) {
    this.sock = sock;
    this.db = db;
    this.ia = ia;
    this.settings = settings;
    this.mensajes = new Mensajes();
    this.antiSpam = new Map();
  }

  // ============================================
  // PROCESAR MENSAJE
  // ============================================
  async procesar(msg) {
    const jid = msg.key.remoteJid;
    const texto = extraerTexto(msg);
    const esDeGrupo = esGrupo(jid);

    // Verificar anti-spam
    if (this.esSpam(jid)) {
      return;
    }

    // Obtener usuario y su idioma
    const usuario = this.db.getUsuario(jid);
    const idioma = usuario.idioma;
    
    // Incrementar contador de mensajes
    this.db.incrementarMensajes(jid);

    // Si es un comando
    if (texto.startsWith(this.settings.prefix)) {
      await this.manejarComando(msg, texto, jid, idioma);
    } 
    // Si no es comando, conversación con IA
    else if (texto.length > 3) {
      await this.conversacionIA(jid, texto, idioma);
    }
  }

  // ============================================
  // MANEJAR COMANDO
  // ============================================
  async manejarComando(msg, texto, jid, idioma) {
    const [comando, ...args] = texto.slice(this.settings.prefix.length).split(' ');
    const cmd = comando.toLowerCase();

    // Registrar uso del comando
    this.db.registrarComando(cmd);

    // Comandos disponibles
    switch (cmd) {
      case 'menu':
      case 'help':
      case 'ayuda':
        await this.cmdMenu(jid, idioma);
        break;

      case 'idioma':
      case 'language':
      case 'lang':
        await this.cmdIdioma(jid, idioma);
        break;

      case 'traducir':
      case 'translate':
        await this.cmdTraducir(jid, args, idioma);
        break;

      case 'preguntar':
      case 'ask':
      case 'pregunta':
        await this.cmdPreguntar(jid, args, idioma);
        break;

      case 'stats':
      case 'estadisticas':
        await this.cmdEstadisticas(jid, idioma);
        break;

      case 'mejoras':
      case 'improvements':
        await this.cmdMejoras(jid, idioma);
        break;

      case 'nuevafuncion':
      case 'newfeature':
        await this.cmdNuevaFuncion(jid, idioma);
        break;

      case 'ping':
        await this.cmdPing(jid);
        break;

      case 'info':
      case 'about':
        await this.cmdInfo(jid, idioma);
        break;

      case 'limpiar':
      case 'clear':
        await this.cmdLimpiarChat(jid, idioma);
        break;

      default:
        await this.enviar(jid, this.mensajes.comandoNoEncontrado(idioma));
    }
  }

  // ============================================
  // COMANDO: MENU
  // ============================================
  async cmdMenu(jid, idioma) {
    await this.enviar(jid, this.mensajes.menu(idioma, this.settings));
  }

  // ============================================
  // COMANDO: IDIOMA
  // ============================================
  async cmdIdioma(jid, idioma) {
    await this.enviar(jid, this.mensajes.seleccionIdioma(idioma));
  }

  // ============================================
  // COMANDO: TRADUCIR
  // ============================================
  async cmdTraducir(jid, args, idioma) {
    if (args.length === 0) {
      await this.enviar(jid, this.mensajes.usoTraducir(idioma));
      return;
    }

    const textoTraducir = args.join(' ');
    const idiomaDestino = idioma === 'español' ? 'inglés' : 'español';

    await this.enviar(jid, this.mensajes.traduciendo(idioma));
    
    const traduccion = await this.ia.traducir(textoTraducir, idiomaDestino);
    this.db.registrarTraduccion();
    
    await this.enviar(jid, this.mensajes.resultadoTraduccion(traduccion, idiomaDestino));
  }

  // ============================================
  // COMANDO: PREGUNTAR
  // ============================================
  async cmdPreguntar(jid, args, idioma) {
    if (args.length === 0) {
      await this.enviar(jid, this.mensajes.usoPreguntar(idioma));
      return;
    }

    const pregunta = args.join(' ');
    await this.enviar(jid, this.mensajes.pensando(idioma));

    const respuesta = await this.ia.responder(pregunta, idioma, jid, this.db);
    await this.enviar(jid, `💡 ${respuesta}`);
  }

  // ============================================
  // COMANDO: ESTADÍSTICAS
  // ============================================
  async cmdEstadisticas(jid, idioma) {
    const stats = this.db.obtenerEstadisticas();
    await this.enviar(jid, this.mensajes.estadisticas(stats, idioma));
  }

  // ============================================
  // COMANDO: MEJORAS
  // ============================================
  async cmdMejoras(jid, idioma) {
    const mejoras = this.db.getMejoras();
    
    if (mejoras.length === 0) {
      await this.enviar(jid, this.mensajes.generandoMejoras(idioma));
      await this.ia.analizarYMejorar(this.db);
      const nuevasMejoras = this.db.getMejoras();
      await this.enviar(jid, this.mensajes.listaMejoras(nuevasMejoras, idioma));
    } else {
      await this.enviar(jid, this.mensajes.listaMejoras(mejoras, idioma));
    }
  }

  // ============================================
  // COMANDO: NUEVA FUNCIÓN
  // ============================================
  async cmdNuevaFuncion(jid, idioma) {
    await this.enviar(jid, this.mensajes.generandoFuncion(idioma));
    const nuevaFunc = await this.ia.generarNuevaFuncion(this.db);
    
    if (nuevaFunc) {
      await this.enviar(jid, this.mensajes.nuevaFuncion(nuevaFunc, idioma));
    } else {
      await this.enviar(jid, this.mensajes.errorGenerandoFuncion(idioma));
    }
  }

  // ============================================
  // COMANDO: PING
  // ============================================
  async cmdPing(jid) {
    const inicio = Date.now();
    await this.enviar(jid, '🏓 Pong!');
    const latencia = Date.now() - inicio;
    await this.enviar(jid, `⚡ Latencia: ${latencia}ms`);
  }

  // ============================================
  // COMANDO: INFO
  // ============================================
  async cmdInfo(jid, idioma) {
    await this.enviar(jid, this.mensajes.info(this.settings, idioma));
  }

  // ============================================
  // COMANDO: LIMPIAR CHAT
  // ============================================
  async cmdLimpiarChat(jid, idioma) {
    this.db.limpiarConversacion(jid);
    await this.enviar(jid, this.mensajes.chatLimpiado(idioma));
  }

  // ============================================
  // CONVERSACIÓN CON IA
  // ============================================
  async conversacionIA(jid, texto, idioma) {
    // Si el texto es muy corto, ignorar
    if (texto.length < 5) return;

    // Responder con IA
    const respuesta = await this.ia.responder(texto, idioma, jid, this.db);
    await this.enviar(jid, respuesta);
  }

  // ============================================
  // ANTI-SPAM
  // ============================================
  esSpam(jid) {
    if (!this.settings.antiSpam.enabled) return false;

    const ahora = Date.now();
    const userSpam = this.antiSpam.get(jid) || { count: 0, timestamp: ahora };

    // Resetear si pasó el tiempo
    if (ahora - userSpam.timestamp > this.settings.antiSpam.timeWindow) {
      this.antiSpam.set(jid, { count: 1, timestamp: ahora });
      return false;
    }

    // Incrementar contador
    userSpam.count++;
    this.antiSpam.set(jid, userSpam);

    // Verificar si es spam
    return userSpam.count > this.settings.antiSpam.maxMessages;
  }

  // ============================================
  // ENVIAR MENSAJE
  // ============================================
  async enviar(jid, texto) {
    try {
      await this.sock.sendMessage(jid, { text: texto });
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      this.db.registrarError();
    }
  }
}

module.exports = Comandos;