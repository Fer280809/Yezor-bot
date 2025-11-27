// ============================================
// IA.JS - Asistente de Inteligencia Artificial
// ============================================

const fetch = require('node-fetch');

class IAAsistente {
  constructor() {
    this.modelo = 'claude-sonnet-4-20250514';
    this.maxTokens = 2000;
  }

  // ============================================
  // TRADUCIR TEXTO
  // ============================================
  async traducir(texto, idiomaDestino) {
    try {
      const prompt = `Traduce el siguiente texto al ${idiomaDestino}.
Responde SOLO con la traducción, sin explicaciones ni comentarios:

${texto}`;

      const respuesta = await this.llamarClaudeAPI(prompt);
      return respuesta.trim();
    } catch (error) {
      console.error('Error en traducción:', error);
      return texto;
    }
  }

  // ============================================
  // RESPONDER PREGUNTAS
  // ============================================
  async responder(pregunta, idioma, jid, db) {
    try {
      // Obtener contexto de conversación
      const conversacion = db.getConversacion(jid);
      const contexto = conversacion.length > 0 
        ? `Conversación previa:\n${conversacion.map(m => `${m.role}: ${m.content}`).join('\n')}\n\n`
        : '';

      const prompt = `${contexto}Eres Yezor, un asistente útil y amigable de WhatsApp.
Responde en ${idioma} de forma natural, concisa y amigable.

Usuario: ${pregunta}`;

      const respuesta = await this.llamarClaudeAPI(prompt);

      // Guardar en conversación
      db.agregarMensajeConversacion(jid, 'user', pregunta);
      db.agregarMensajeConversacion(jid, 'assistant', respuesta);

      return respuesta.trim();
    } catch (error) {
      console.error('Error respondiendo:', error);
      return idioma === 'español'
        ? 'Lo siento, tuve un problema procesando tu pregunta.'
        : 'Sorry, I had trouble processing your question.';
    }
  }

  // ============================================
  // ANALIZAR Y MEJORAR
  // ============================================
  async analizarYMejorar(db) {
    try {
      const stats = db.obtenerEstadisticas();
      
      const prompt = `Analiza estas estadísticas de uso de un bot de WhatsApp:

${JSON.stringify(stats, null, 2)}

Sugiere UNA mejora específica y práctica que beneficie a los usuarios.
Responde en una sola oración concisa.`;

      const mejora = await this.llamarClaudeAPI(prompt);
      
      if (mejora && mejora.length > 10) {
        db.agregarMejora(mejora.trim());
        return mejora.trim();
      }
      
      return null;
    } catch (error) {
      console.error('Error en auto-mejora:', error);
      return null;
    }
  }

  // ============================================
  // GENERAR NUEVA FUNCIÓN
  // ============================================
  async generarNuevaFuncion(db) {
    try {
      const comandosMasUsados = db.getComandosMasUsados(5);
      
      const prompt = `Comandos más usados del bot: ${JSON.stringify(comandosMasUsados)}

Sugiere UNA nueva función útil para el bot de WhatsApp.
Formato:
NOMBRE: /comando
DESCRIPCIÓN: [breve descripción]
BENEFICIO: [por qué es útil]

Sé creativo pero práctico.`;

      const respuesta = await this.llamarClaudeAPI(prompt);
      return respuesta.trim();
    } catch (error) {
      console.error('Error generando función:', error);
      return null;
    }
  }

  // ============================================
  // LLAMAR A LA API DE CLAUDE
  // ============================================
  async llamarClaudeAPI(mensaje) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelo,
          max_tokens: this.maxTokens,
          messages: [
            {
              role: 'user',
              content: mensaje
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extraer texto de la respuesta
      if (data.content && data.content.length > 0) {
        return data.content[0].text;
      }

      throw new Error('Respuesta vacía de la API');
    } catch (error) {
      console.error('Error llamando a Claude API:', error);
      throw error;
    }
  }

  // ============================================
  // GENERAR RESUMEN
  // ============================================
  async generarResumen(textos, idioma) {
    try {
      const prompt = `Resume los siguientes textos en ${idioma} de forma concisa:

${textos.join('\n\n')}

Resume en máximo 3 oraciones.`;

      const resumen = await this.llamarClaudeAPI(prompt);
      return resumen.trim();
    } catch (error) {
      console.error('Error generando resumen:', error);
      return idioma === 'español'
        ? 'No pude generar el resumen.'
        : 'Could not generate summary.';
    }
  }

  // ============================================
  // DETECTAR IDIOMA
  // ============================================
  async detectarIdioma(texto) {
    try {
      const prompt = `Detecta el idioma de este texto. Responde SOLO con el nombre del idioma en español:

${texto}`;

      const idioma = await this.llamarClaudeAPI(prompt);
      return idioma.trim().toLowerCase();
    } catch (error) {
      return 'desconocido';
    }
  }
}

module.exports = IAAsistente;