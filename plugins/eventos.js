const handler = async (m, { conn, args, text, usedPrefix, command, isOwner, isAdmin }) => {
  // Emojis para respuestas
  const emoji3 = '⚠️';
  const emoji4 = '❌';
  
  // Verificar permisos: solo propietarios o admins pueden crear eventos
  if (!(isOwner || isAdmin)) {
    return m.reply(`${emoji4} Solo el propietario del bot o administradores pueden crear eventos.`);
  }

  // Verificar que el usuario esté registrado
  if (!global.db.data.users[m.sender]) {
    throw `${emoji4} Usuario no encontrado. Regístrate primero usando ${usedPrefix}register`;
  }

  // Sintaxis del comando
  const usage = `
╭━━━━━━━━━━━━━━━━━━━━━
┃ 📅 *CREAR EVENTO* 
┃━━━━━━━━━━━━━━━━━━━━━
┃ Uso correcto del comando:
┃ ${usedPrefix + command} titulo | descripción | fecha
┃
┃ Ejemplos:
┃ ${usedPrefix + command} Torneo RPG | Gran torneo de batalla con premios | 24/05/2025 18:00
┃ ${usedPrefix + command} Reunión Semanal | Actualización de misiones | 21/05/2025 15:30
╰━━━━━━━━━━━━━━━━━━━━━`;

  // Si no hay texto, mostrar instrucciones de uso
  if (!text) return m.reply(usage);

  // Dividir los argumentos usando el separador |
  const eventData = text.split('|').map(item => item.trim());
  
  // Verificar que se proporcionen todos los datos necesarios
  if (eventData.length < 3) {
    return m.reply(`${emoji3} Faltan datos para crear el evento.\n\n${usage}`);
  }

  // Extraer los datos del evento
  const [titulo, descripcion, fechaTexto] = eventData;
  
  // Mejorar la validación de fechas para soportar múltiples formatos
  let fechaEvento;
  
  try {
    // Intentar varios formatos comunes de fecha
    fechaEvento = parseFecha(fechaTexto);
    
    if (!fechaEvento || isNaN(fechaEvento.getTime())) {
      return m.reply(`${emoji4} La fecha proporcionada no es válida. 
Formatos aceptados:
- DD/MM/AAAA HH:MM
- DD-MM-AAAA HH:MM
- AAAA-MM-DD HH:MM
- DD/MM/AAAA a las HH:MM

Ejemplo: 24/05/2025 18:00`);
    }
  } catch (error) {
    console.error(`Error al parsear fecha: ${error}`);
    return m.reply(`${emoji4} No se pudo procesar la fecha. Por favor usa alguno de estos formatos:
- DD/MM/AAAA HH:MM
- DD-MM-AAAA HH:MM 
- AAAA-MM-DD HH:MM`);
  }

  // Verificar que la fecha sea futura
  if (fechaEvento < new Date()) {
    return m.reply(`${emoji4} No puedes crear eventos en el pasado. Proporciona una fecha futura.`);
  }

  // Crear identificador único para el evento
  const eventId = `event_${Date.now()}`;
  
  // Guardar el evento en la base de datos
  if (!global.db.data.eventos) {
    global.db.data.eventos = {};
  }
  
  global.db.data.eventos[eventId] = {
    id: eventId,
    titulo: titulo,
    descripcion: descripcion,
    fecha: fechaEvento.getTime(),
    creador: m.sender,
    creado: Date.now(),
    participantes: [],
    notificado: false
  };

  // Preparar mensaje para notificación
  const eventImg = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/event-banner.jpeg'; // URL de imagen predeterminada
  
  const notifMsg = `
╭━━━━━━━━━━━━━━━━━━━━━
┃ 🎉 *NUEVO EVENTO* 🎉
┃━━━━━━━━━━━━━━━━━━━━━
┃ 
┃ 📌 *${titulo}*
┃ 
┃ 📝 ${descripcion}
┃ 
┃ 📅 Fecha: ${formatFecha(fechaEvento)}
┃ ⏰ Hora: ${formatHora(fechaEvento)}
┃ 
┃ Para participar:
┃ *${usedPrefix}evento participar ${eventId}*
┃ 
╰━━━━━━━━━━━━━━━━━━━━━`;

  try {
    // Enviar confirmación al creador
    await conn.sendFile(m.chat, eventImg, 'evento.jpg', `${notifMsg}\n\n✅ *Evento creado exitosamente.*`, m);
    
    // Obtener todos los grupos donde está el bot y sus subbots
    await enviarNotificacionGlobal(conn, eventImg, notifMsg, eventId);
    
    // Registrar en la consola
    console.log(`[EVENTO] Nuevo evento creado: ${titulo}`);
    
  } catch (error) {
    console.error(`Error al crear evento: ${error}`);
    throw `${emoji4} Ocurrió un error al crear el evento.`;
  }
};

// Nueva función para interpretar diferentes formatos de fecha
function parseFecha(fechaStr) {
  // Eliminar espacios extras
  fechaStr = fechaStr.trim();
  
  // Convertir formatos comunes en español a un formato estándar
  // Primero, manejo de textos como "a las" o "alas" o similar
  fechaStr = fechaStr.replace(/\s+a\s+las\s+|\s+alas\s+|\s+hrs\.?|\s+horas/i, " ");
  
  // Intentar varios formatos
  let fecha;
  
  // Lista de formatos a probar
  const intentos = [
    // Probar formato DD/MM/YYYY HH:MM
    () => {
      const match = fechaStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\s+(\d{1,2}):(\d{1,2})$/);
      if (match) {
        const [_, dia, mes, anio, hora, minuto] = match;
        return new Date(parseInt(anio), parseInt(mes)-1, parseInt(dia), parseInt(hora), parseInt(minuto));
      }
      return null;
    },
    
    // Probar formato YYYY-MM-DD HH:MM
    () => {
      const match = fechaStr.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\s+(\d{1,2}):(\d{1,2})$/);
      if (match) {
        const [_, anio, mes, dia, hora, minuto] = match;
        return new Date(parseInt(anio), parseInt(mes)-1, parseInt(dia), parseInt(hora), parseInt(minuto));
      }
      return null;
    },
    
    // Probar Date.parse como último recurso (menos confiable)
    () => {
      const parsed = Date.parse(fechaStr);
      return isNaN(parsed) ? null : new Date(parsed);
    }
  ];
  
  // Intentar cada formato hasta que uno funcione
  for (const intento of intentos) {
    fecha = intento();
    if (fecha && !isNaN(fecha.getTime())) {
      return fecha;
    }
  }
  
  // Si llegamos aquí, ningún formato funcionó
  return null;
}

// Función para enviar notificación a todos los grupos
async function enviarNotificacionGlobal(conn, imagen, mensaje, eventId) {
  // Verificar si existe el registro de grupos
  if (!global.db.data.grupos) {
    global.db.data.grupos = {};
    return; // No hay grupos registrados aún
  }

  try {
    // Obtener IDs de todos los grupos del bot principal
    const grupos = Object.keys(await conn.groupFetchAllParticipating());
    
    // Contador de envíos exitosos
    let enviados = 0;
    let fallidos = 0;
    
    // Enviar notificación a cada grupo
    for (const groupId of grupos) {
      try {
        // Comprobar si el grupo tiene notificaciones de eventos desactivadas
        if (global.db.data.grupos[groupId]?.eventosDesactivados) {
          continue; // Saltar este grupo
        }
        
        // Añadir a la lista de notificaciones pendientes (para reintento si falla)
        if (!global.db.data.eventosPendientes) {
          global.db.data.eventosPendientes = [];
        }
        
        global.db.data.eventosPendientes.push({
          groupId,
          eventId,
          intentos: 0,
          ultimoIntento: Date.now()
        });
        
        // Enviar la notificación
        await conn.sendFile(groupId, imagen, 'evento.jpg', mensaje);
        enviados++;
        
        // Esperar un poco para evitar spam
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error al enviar notificación a grupo ${groupId}: ${error}`);
        fallidos++;
      }
    }
    
    // Notificar también a los subbots si existe la configuración
    if (global.conns) {
      for (const [id, subBot] of Object.entries(global.conns)) {
        if (subBot?.user && subBot.user?.jid) {
          try {
            // Obtener grupos del subbot
            const subGrupos = Object.keys(await subBot.groupFetchAllParticipating());
            
            for (const groupId of subGrupos) {
              try {
                // Comprobar configuración específica del subbot
                if (global.db.data.grupos[groupId]?.eventosDesactivados) {
                  continue;
                }
                
                await subBot.sendFile(groupId, imagen, 'evento.jpg', mensaje);
                enviados++;
                
                // Esperar un poco para evitar spam
                await new Promise(resolve => setTimeout(resolve, 1000));
              } catch (error) {
                console.error(`Error al enviar notificación del subbot a grupo ${groupId}: ${error}`);
                fallidos++;
              }
            }
          } catch (error) {
            console.error(`Error con subbot ${id}: ${error}`);
          }
        }
      }
    }
    
    console.log(`[EVENTO] Notificación enviada a ${enviados} grupos, fallidos: ${fallidos}`);
  } catch (error) {
    console.error(`Error en envío global: ${error}`);
  }
}

// Subcomandos del evento
handler.participar = async function (m, conn, args, usedPrefix) {
  const emoji3 = '⚠️';
  const emoji4 = '❌';
  
  if (!args[0]) return m.reply(`${emoji4} Debes proporcionar el ID del evento para participar.`);
  
  const eventId = args[0];
  
  // Verificar que el evento existe
  if (!global.db.data.eventos || !global.db.data.eventos[eventId]) {
    return m.reply(`${emoji4} El evento especificado no existe o ya ha finalizado.`);
  }
  
  const evento = global.db.data.eventos[eventId];
  
  // Verificar si el usuario ya está participando
  if (evento.participantes.includes(m.sender)) {
    return m.reply(`${emoji3} Ya estás participando en este evento.`);
  }
  
  // Añadir al usuario como participante
  evento.participantes.push(m.sender);
  
  // Enviar confirmación
  return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━━
┃ ✅ *PARTICIPACIÓN CONFIRMADA* 
┃━━━━━━━━━━━━━━━━━━━━━
┃ 
┃ 📌 *${evento.titulo}*
┃ 📅 ${formatFecha(new Date(evento.fecha))}
┃ ⏰ ${formatHora(new Date(evento.fecha))}
┃ 👥 Participantes: ${evento.participantes.length}
┃ 
╰━━━━━━━━━━━━━━━━━━━━━

Recibirás una notificación cuando el evento esté por comenzar.`);
};

handler.lista = async function (m, conn, args, usedPrefix) {
  const emoji4 = '❌';
  
  // Verificar si hay eventos registrados
  if (!global.db.data.eventos || Object.keys(global.db.data.eventos).length === 0) {
    return m.reply(`${emoji4} No hay eventos programados actualmente.`);
  }
  
  // Filtrar eventos futuros
  const ahora = Date.now();
  const eventosFuturos = Object.values(global.db.data.eventos)
    .filter(ev => ev.fecha > ahora)
    .sort((a, b) => a.fecha - b.fecha);
  
  if (eventosFuturos.length === 0) {
    return m.reply(`${emoji4} No hay eventos futuros programados.`);
  }
  
  // Crear lista de eventos
  let mensaje = `
╭━━━━━━━━━━━━━━━━━━━━━
┃ 📅 *EVENTOS PROGRAMADOS* 
┃━━━━━━━━━━━━━━━━━━━━━\n`;

  for (const evento of eventosFuturos) {
    const fechaEvento = new Date(evento.fecha);
    mensaje += `┃ 
┃ 📌 *${evento.titulo}*
┃ 📅 ${formatFecha(fechaEvento)}
┃ ⏰ ${formatHora(fechaEvento)}
┃ 👥 Participantes: ${evento.participantes.length}
┃ 🆔 ${evento.id}
┃\n`;
  }
  
  mensaje += `╰━━━━━━━━━━━━━━━━━━━━━\n\nPara participar usa: *${usedPrefix}evento participar [ID]*`;
  
  return m.reply(mensaje);
};

handler.cancelar = async function (m, conn, args, isOwner, isAdmin) {
  const emoji4 = '❌';
  
  // Verificar permisos
  if (!(isOwner || isAdmin)) {
    return m.reply(`${emoji4} Solo el propietario del bot o administradores pueden cancelar eventos.`);
  }
  
  if (!args[0]) return m.reply(`${emoji4} Debes proporcionar el ID del evento a cancelar.`);
  
  const eventId = args[0];
  
  // Verificar que el evento existe
  if (!global.db.data.eventos || !global.db.data.eventos[eventId]) {
    return m.reply(`${emoji4} El evento especificado no existe.`);
  }
  
  const evento = global.db.data.eventos[eventId];
  
  // Eliminar el evento
  delete global.db.data.eventos[eventId];
  
  // Enviar confirmación
  return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━━
┃ ❌ *EVENTO CANCELADO* 
┃━━━━━━━━━━━━━━━━━━━━━
┃ 
┃ 📌 *${evento.titulo}*
┃ 📅 ${formatFecha(new Date(evento.fecha))}
┃ 👥 Participantes: ${evento.participantes.length}
┃ 
╰━━━━━━━━━━━━━━━━━━━━━

Se ha enviado notificación a todos los participantes.`);
};

// Función para formatear fecha
function formatFecha(date) {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const año = date.getFullYear();
  
  return `${dia}/${mes}/${año}`;
}

// Función para formatear hora
function formatHora(date) {
  const hora = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');
  
  return `${hora}:${minutos}`;
}

// Configuración del comando
handler.help = ['evento <crear/participar/lista/cancelar>'];
handler.tags = ['owner'];
handler.command = ['evento', 'event'];
handler.group = true;
handler.register = true;
handler.rowner = true;

// Subcomandos
handler.case = {
  'participar': handler.participar,
  'lista': handler.lista,
  'cancelar': handler.cancelar
};

export default handler;
