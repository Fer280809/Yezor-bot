// ============================================
// UTILS.JS - Utilidades y Funciones Helper
// ============================================

/**
 * Extraer texto de un mensaje de WhatsApp
 */
function extraerTexto(msg) {
  return (
    msg.message?.conversation ||
    msg.message?.extendedTextMessage?.text ||
    msg.message?.imageMessage?.caption ||
    msg.message?.videoMessage?.caption ||
    ''
  );
}

/**
 * Verificar si un JID es de un grupo
 */
function esGrupo(jid) {
  return jid.endsWith('@g.us');
}

/**
 * Limpiar JID (quitar sufijos)
 */
function limpiarJID(jid) {
  return jid.replace(/@s\.whatsapp\.net|@g\.us/g, '');
}

/**
 * Obtener número de teléfono de JID
 */
function obtenerNumero(jid) {
  return jid.split('@')[0];
}

/**
 * Formatear fecha
 */
function formatearFecha(fecha) {
  const d = new Date(fecha);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const año = d.getFullYear();
  const hora = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  
  return `${dia}/${mes}/${año} ${hora}:${min}`;
}

/**
 * Calcular diferencia de tiempo
 */
function tiempoDesde(fecha) {
  const ahora = new Date();
  const entonces = new Date(fecha);
  const diff = ahora - entonces;
  
  const segundos = Math.floor(diff / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  
  if (dias > 0) return `${dias}d`;
  if (horas > 0) return `${horas}h`;
  if (minutos > 0) return `${minutos}m`;
  return `${segundos}s`;
}

/**
 * Pausar ejecución
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validar número de WhatsApp
 */
function esNumeroValido(numero) {
  return /^\d{10,15}$/.test(numero.replace(/[^\d]/g, ''));
}

/**
 * Obtener extensión de archivo
 */
function obtenerExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

/**
 * Formatear bytes a tamaño legible
 */
function formatearBytes(bytes, decimales = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimales < 0 ? 0 : decimales;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Generar ID único
 */
function generarID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Truncar texto
 */
function truncar(texto, maxLength = 100) {
  if (texto.length <= maxLength) return texto;
  return texto.substr(0, maxLength) + '...';
}

/**
 * Capitalizar primera letra
 */
function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Limpiar texto (remover caracteres especiales)
 */
function limpiarTexto(texto) {
  return texto
    .replace(/[*_~`]/g, '')
    .trim();
}

/**
 * Parsear menciones de un mensaje
 */
function parsearMenciones(msg) {
  const menciones = [];
  const texto = extraerTexto(msg);
  
  // Buscar @numero
  const matches = texto.match(/@(\d+)/g);
  if (matches) {
    matches.forEach(match => {
      const numero = match.substring(1);
      menciones.push(numero + '@s.whatsapp.net');
    });
  }
  
  // Menciones del mensaje
  if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
    menciones.push(...msg.message.extendedTextMessage.contextInfo.mentionedJid);
  }
  
  return [...new Set(menciones)];
}

/**
 * Verificar si es administrador del bot
 */
function esAdmin(jid, ownerNumber) {
  const numero = obtenerNumero(jid);
  return numero === ownerNumber.replace(/[^\d]/g, '');
}

/**
 * Generar barra de progreso
 */
function barraProgreso(porcentaje, longitud = 10) {
  const lleno = Math.round((porcentaje / 100) * longitud);
  const vacio = longitud - lleno;
  return '█'.repeat(lleno) + '░'.repeat(vacio) + ` ${porcentaje}%`;
}

/**
 * Formatear número con separadores
 */
function formatearNumero(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Obtener saludo según hora
 */
function obtenerSaludo() {
  const hora = new Date().getHours();
  
  if (hora >= 5 && hora < 12) return 'Buenos días';
  if (hora >= 12 && hora < 18) return 'Buenas tardes';
  return 'Buenas noches';
}

/**
 * Validar URL
 */
function esURLValida(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parsear comando y argumentos
 */
function parsearComando(texto, prefix = '/') {
  if (!texto.startsWith(prefix)) return null;
  
  const [comando, ...args] = texto.slice(prefix.length).trim().split(/\s+/);
  
  return {
    comando: comando.toLowerCase(),
    args: args,
    textoArgs: args.join(' ')
  };
}

/**
 * Crear objeto de respuesta para citas
 */
function crearCita(msg) {
  return {
    key: {
      remoteJid: msg.key.remoteJid,
      fromMe: false,
      id: msg.key.id,
      participant: msg.key.participant
    },
    message: msg.message
  };
}

/**
 * Escapar caracteres especiales de Markdown
 */
function escaparMarkdown(texto) {
  return texto.replace(/([*_~`])/g, '\\$1');
}

/**
 * Generar tabla simple
 */
function generarTabla(datos, columnas) {
  let tabla = '';
  
  // Encabezados
  tabla += columnas.join(' | ') + '\n';
  tabla += columnas.map(() => '---').join('|') + '\n';
  
  // Filas
  datos.forEach(fila => {
    tabla += columnas.map(col => fila[col] || '-').join(' | ') + '\n';
  });
  
  return tabla;
}

/**
 * Shuffle array
 */
function mezclarArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Obtener elemento aleatorio de array
 */
function elementoAleatorio(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Validar email
 */
function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Calcular porcentaje
 */
function calcularPorcentaje(parte, total) {
  if (total === 0) return 0;
  return Math.round((parte / total) * 100);
}

module.exports = {
  extraerTexto,
  esGrupo,
  limpiarJID,
  obtenerNumero,
  formatearFecha,
  tiempoDesde,
  sleep,
  esNumeroValido,
  obtenerExtension,
  formatearBytes,
  generarID,
  truncar,
  capitalizar,
  limpiarTexto,
  parsearMenciones,
  esAdmin,
  barraProgreso,
  formatearNumero,
  obtenerSaludo,
  esURLValida,
  parsearComando,
  crearCita,
  escaparMarkdown,
  generarTabla,
  mezclarArray,
  elementoAleatorio,
  esEmailValido,
  calcularPorcentaje
};