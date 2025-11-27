// ============================================
// DATABASE.JS - Gestión de Base de Datos
// ============================================

const fs = require('fs').promises;

class Database {
  constructor() {
    this.archivo = './datos_yezor.json';
    this.usuarios = new Map();
    this.grupos = new Map();
    this.estadisticas = {
      mensajes: 0,
      traducciones: 0,
      errores: 0,
      comandos: {},
      inicioBot: new Date().toISOString()
    };
    this.mejoras = [];
    this.conversaciones = new Map();
  }

  // ============================================
  // CARGAR DATOS
  // ============================================
  async cargar() {
    try {
      const datos = await fs.readFile(this.archivo, 'utf8');
      const parsed = JSON.parse(datos);
      
      this.usuarios = new Map(parsed.usuarios || []);
      this.grupos = new Map(parsed.grupos || []);
      this.estadisticas = parsed.estadisticas || this.estadisticas;
      this.mejoras = parsed.mejoras || [];
      this.conversaciones = new Map(parsed.conversaciones || []);
      
      console.log(`📊 ${this.usuarios.size} usuarios cargados`);
    } catch (error) {
      console.log('📝 Creando nueva base de datos...');
    }
  }

  // ============================================
  // GUARDAR DATOS
  // ============================================
  async guardar() {
    try {
      const datos = {
        usuarios: Array.from(this.usuarios.entries()),
        grupos: Array.from(this.grupos.entries()),
        estadisticas: this.estadisticas,
        mejoras: this.mejoras,
        conversaciones: Array.from(this.conversaciones.entries()),
        ultimaActualizacion: new Date().toISOString()
      };
      await fs.writeFile(this.archivo, JSON.stringify(datos, null, 2));
    } catch (error) {
      console.error('❌ Error guardando datos:', error);
    }
  }

  // ============================================
  // GESTIÓN DE USUARIOS
  // ============================================
  getUsuario(jid) {
    if (!this.usuarios.has(jid)) {
      this.usuarios.set(jid, {
        id: jid,
        idioma: 'español',
        mensajes: 0,
        fechaRegistro: new Date().toISOString(),
        premium: false,
        warnings: 0,
        lastInteraction: new Date().toISOString()
      });
    }
    return this.usuarios.get(jid);
  }

  setIdioma(jid, idioma) {
    const usuario = this.getUsuario(jid);
    usuario.idioma = idioma;
    this.usuarios.set(jid, usuario);
    this.guardar();
  }

  incrementarMensajes(jid) {
    const usuario = this.getUsuario(jid);
    usuario.mensajes++;
    usuario.lastInteraction = new Date().toISOString();
    this.usuarios.set(jid, usuario);
  }

  // ============================================
  // GESTIÓN DE GRUPOS
  // ============================================
  getGrupo(jid) {
    if (!this.grupos.has(jid)) {
      this.grupos.set(jid, {
        id: jid,
        nombre: '',
        miembros: 0,
        activo: true,
        fechaRegistro: new Date().toISOString(),
        configuracion: {
          bienvenida: true,
          antiSpam: true,
          comandos: true
        }
      });
    }
    return this.grupos.get(jid);
  }

  // ============================================
  // ESTADÍSTICAS
  // ============================================
  registrarComando(comando) {
    this.estadisticas.mensajes++;
    this.estadisticas.comandos[comando] = (this.estadisticas.comandos[comando] || 0) + 1;
  }

  registrarTraduccion() {
    this.estadisticas.traducciones++;
  }

  registrarError() {
    this.estadisticas.errores++;
  }

  // ============================================
  // CONVERSACIONES (contexto para IA)
  // ============================================
  getConversacion(jid) {
    if (!this.conversaciones.has(jid)) {
      this.conversaciones.set(jid, []);
    }
    return this.conversaciones.get(jid);
  }

  agregarMensajeConversacion(jid, role, content) {
    const conv = this.getConversacion(jid);
    conv.push({
      role: role,
      content: content,
      timestamp: new Date().toISOString()
    });

    // Mantener solo los últimos 10 mensajes
    if (conv.length > 10) {
      conv.shift();
    }

    this.conversaciones.set(jid, conv);
  }

  limpiarConversacion(jid) {
    this.conversaciones.set(jid, []);
  }

  // ============================================
  // MEJORAS
  // ============================================
  agregarMejora(descripcion) {
    this.mejoras.push({
      fecha: new Date().toISOString(),
      descripcion: descripcion,
      estado: 'pendiente',
      prioridad: 'media'
    });
    this.guardar();
  }

  getMejoras(limite = 5) {
    return this.mejoras.slice(-limite).reverse();
  }

  // ============================================
  // UTILIDADES
  // ============================================
  obtenerEstadisticas() {
    return {
      usuarios: this.usuarios.size,
      grupos: this.grupos.size,
      mensajes: this.estadisticas.mensajes,
      traducciones: this.estadisticas.traducciones,
      errores: this.estadisticas.errores,
      comandosMasUsados: this.getComandosMasUsados(5),
      uptime: this.calcularUptime()
    };
  }

  getComandosMasUsados(limite = 5) {
    return Object.entries(this.estadisticas.comandos)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limite);
  }

  calcularUptime() {
    const inicio = new Date(this.estadisticas.inicioBot);
    const ahora = new Date();
    const diff = ahora - inicio;
    
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${dias}d ${horas}h ${minutos}m`;
  }
}

module.exports = Database;