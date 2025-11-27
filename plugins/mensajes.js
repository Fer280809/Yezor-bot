// ============================================
// MENSAJES.JS - Plantillas de Mensajes
// ============================================

class Mensajes {
  
  // ============================================
  // MENÚ PRINCIPAL
  // ============================================
  menu(idioma, settings) {
    const mensajes = {
      español: `╔═══════════════════════════╗
║  🤖 *YEZOR BOT* v${settings.version || '2.0.0'}  ║
╚═══════════════════════════╝

${settings.logo ? '📷 Logo: ' + settings.logo : ''}

*🌟 COMANDOS DISPONIBLES:*

*📋 General*
• ${settings.prefix}menu - Ver este menú
• ${settings.prefix}info - Información del bot
• ${settings.prefix}ping - Verificar latencia

*🌐 Idioma*
• ${settings.prefix}idioma - Cambiar idioma

*🔤 Traducción*
• ${settings.prefix}traducir [texto] - Traducir

*💬 Inteligencia Artificial*
• ${settings.prefix}preguntar [pregunta] - Preguntar a la IA
• ${settings.prefix}limpiar - Limpiar historial de chat

*📊 Estadísticas*
• ${settings.prefix}stats - Ver estadísticas

*🚀 Mejoras*
• ${settings.prefix}mejoras - Ver mejoras sugeridas
• ${settings.prefix}nuevafuncion - Generar nueva función

━━━━━━━━━━━━━━━━━━━━
💡 *Tip:* También puedes hablar conmigo normalmente sin comandos!
━━━━━━━━━━━━━━━━━━━━`,

      inglés: `╔═══════════════════════════╗
║  🤖 *YEZOR BOT* v${settings.version || '2.0.0'}  ║
╚═══════════════════════════╝

${settings.logo ? '📷 Logo: ' + settings.logo : ''}

*🌟 AVAILABLE COMMANDS:*

*📋 General*
• ${settings.prefix}menu - Show this menu
• ${settings.prefix}info - Bot information
• ${settings.prefix}ping - Check latency

*🌐 Language*
• ${settings.prefix}idioma - Change language

*🔤 Translation*
• ${settings.prefix}traducir [text] - Translate

*💬 Artificial Intelligence*
• ${settings.prefix}preguntar [question] - Ask the AI
• ${settings.prefix}limpiar - Clear chat history

*📊 Statistics*
• ${settings.prefix}stats - View statistics

*🚀 Improvements*
• ${settings.prefix}mejoras - View suggested improvements
• ${settings.prefix}nuevafuncion - Generate new feature

━━━━━━━━━━━━━━━━━━━━
💡 *Tip:* You can also talk to me normally without commands!
━━━━━━━━━━━━━━━━━━━━`
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // SELECCIÓN DE IDIOMA
  // ============================================
  seleccionIdioma(idioma) {
    const mensajes = {
      español: `🌐 *SELECCIONA TU IDIOMA*

Responde con:
1️⃣ Español 🇪🇸
2️⃣ English 🇺🇸`,

      inglés: `🌐 *SELECT YOUR LANGUAGE*

Reply with:
1️⃣ Español 🇪🇸
2️⃣ English 🇺🇸`
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // CONFIRMACIÓN CAMBIO DE IDIOMA
  // ============================================
  idiomaCambiado(nuevoIdioma) {
    const mensajes = {
      español: `✅ Idioma cambiado a: *Español* 🇪🇸`,
      inglés: `✅ Language changed to: *English* 🇺🇸`
    };

    return mensajes[nuevoIdioma] || mensajes.español;
  }

  // ============================================
  // USO DE TRADUCIR
  // ============================================
  usoTraducir(idioma) {
    const mensajes = {
      español: `⚠️ *Uso incorrecto*

Formato: /traducir [texto a traducir]

*Ejemplo:*
/traducir Hello, how are you?`,

      inglés: `⚠️ *Incorrect usage*

Format: /traducir [text to translate]

*Example:*
/traducir Hola, ¿cómo estás?`
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // TRADUCIENDO
  // ============================================
  traduciendo(idioma) {
    const mensajes = {
      español: '🔄 Traduciendo...',
      inglés: '🔄 Translating...'
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // RESULTADO TRADUCCIÓN
  // ============================================
  resultadoTraduccion(traduccion, idiomaDestino) {
    return `🌐 *Traducción (${idiomaDestino}):*\n\n${traduccion}`;
  }

  // ============================================
  // USO DE PREGUNTAR
  // ============================================
  usoPreguntar(idioma) {
    const mensajes = {
      español: `⚠️ *Uso incorrecto*

Formato: /preguntar [tu pregunta]

*Ejemplo:*
/preguntar ¿Qué es la inteligencia artificial?`,

      inglés: `⚠️ *Incorrect usage*

Format: /preguntar [your question]

*Example:*
/preguntar What is artificial intelligence?`
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // PENSANDO
  // ============================================
  pensando(idioma) {
    const mensajes = {
      español: '🤔 Pensando...',
      inglés: '🤔 Thinking...'
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // ESTADÍSTICAS
  // ============================================
  estadisticas(stats, idioma) {
    const mensajes = {
      español: `📊 *ESTADÍSTICAS DE YEZOR*

👥 Usuarios: ${stats.usuarios}
👥 Grupos: ${stats.grupos}
📨 Mensajes: ${stats.mensajes}
🌐 Traducciones: ${stats.traducciones}
⚠️ Errores: ${stats.errores}
⏱️ Tiempo activo: ${stats.uptime}

*📈 Comandos más usados:*
${stats.comandosMasUsados.map((c, i) => `${i + 1}. /${c[0]} - ${c[1]} veces`).join('\n')}`,

      inglés: `📊 *YEZOR STATISTICS*

👥 Users: ${stats.usuarios}
👥 Groups: ${stats.grupos}
📨 Messages: ${stats.mensajes}
🌐 Translations: ${stats.traducciones}
⚠️ Errors: ${stats.errores}
⏱️ Uptime: ${stats.uptime}

*📈 Most used commands:*
${stats.comandosMasUsados.map((c, i) => `${i + 1}. /${c[0]} - ${c[1]} times`).join('\n')}`
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // GENERANDO MEJORAS
  // ============================================
  generandoMejoras(idioma) {
    const mensajes = {
      español: '🔄 La IA está analizando y generando mejoras...',
      inglés: '🔄 AI is analyzing and generating improvements...'
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // LISTA DE MEJORAS
  // ============================================
  listaMejoras(mejoras, idioma) {
    const titulo = idioma === 'español' 
      ? '🚀 *MEJORAS SUGERIDAS POR LA IA*\n\n'
      : '🚀 *AI-SUGGESTED IMPROVEMENTS*\n\n';

    const listado = mejoras.map((m, i) => 
      `${i + 1}. ${m.descripcion}\n📅 ${new Date(m.fecha).toLocaleDateString()}\n`
    ).join('\n');

    return titulo + listado;
  }

  // ============================================
  // GENERANDO FUNCIÓN
  // ============================================
  generandoFuncion(idioma) {
    const mensajes = {
      español: '🔮 La IA está creando una nueva función...',
      inglés: '🔮 AI is creating a new feature...'
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // NUEVA FUNCIÓN
  // ============================================
  nuevaFuncion(funcion, idioma) {
    const titulo = idioma === 'español'
      ? '✨ *NUEVA FUNCIÓN SUGERIDA*\n\n'
      : '✨ *NEW SUGGESTED FEATURE*\n\n';

    return titulo + funcion;
  }

  // ============================================
  // ERROR GENERANDO FUNCIÓN
  // ============================================
  errorGenerandoFuncion(idioma) {
    const mensajes = {
      español: '❌ Hubo un error al generar la función. Intenta de nuevo.',
      inglés: '❌ There was an error generating the feature. Try again.'
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // INFORMACIÓN DEL BOT
  // ============================================
  info(settings, idioma) {
    const mensajes = {
      español: `ℹ️ *INFORMACIÓN DEL BOT*

🤖 *Nombre:* ${settings.botName}
📦 *Versión:* 2.0.0
🌐 *Idiomas:* ${settings.idiomas.join(', ')}
⚡ *Powered by:* Baileys + Claude AI

*Características:*
✅ Multilenguaje con IA
✅ Traducción automática
✅ Conversación inteligente
✅ Auto-mejora continua
✅ Base de datos persistente

📱 *GitHub:* github.com/tu-usuario/yezor-bot`,

      inglés: `ℹ️ *BOT INFORMATION*

🤖 *Name:* ${settings.botName}
📦 *Version:* 2.0.0
🌐 *Languages:* ${settings.idiomas.join(', ')}
⚡ *Powered by:* Baileys + Claude AI

*Features:*
✅ Multilanguage with AI
✅ Automatic translation
✅ Smart conversation
✅ Continuous self-improvement
✅ Persistent database

📱 *GitHub:* github.com/your-user/yezor-bot`
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // CHAT LIMPIADO
  // ============================================
  chatLimpiado(idioma) {
    const mensajes = {
      español: '🗑️ Historial de conversación limpiado.',
      inglés: '🗑️ Conversation history cleared.'
    };

    return mensajes[idioma] || mensajes.español;
  }

  // ============================================
  // COMANDO NO ENCONTRADO
  // ============================================
  comandoNoEncontrado(idioma) {
    const mensajes = {
      español: '❓ Comando no reconocido. Usa /menu para ver los comandos disponibles.',
      inglés: '❓ Command not recognized. Use /menu to see available commands.'
    };

    return mensajes[idioma] || mensajes.español;
  }
}

module.exports = Mensajes;