// Bloqueador simple para el mensaje "Ejecutando..."
// Nombre del archivo: no-executing.js

// Interceptar TODOS los mensajes salientes del bot
const originalSend = global.conn?.sendMessage
if (originalSend && !global.executingBlocked) {
    global.executingBlocked = true
    
    global.conn.sendMessage = async function(jid, content, options = {}) {
        try {
            // Verificar diferentes tipos de contenido
            let textToCheck = ''
            
            if (typeof content === 'string') {
                textToCheck = content
            } else if (content && content.text) {
                textToCheck = content.text
            } else if (content && content.caption) {
                textToCheck = content.caption
            }
            
            // Lista de textos a bloquear
            const blockedTexts = [
                'Ejecutando...',
                '𓂀 Ejecutando...',
                '⏳ Ejecutando...',
                '🔄 Ejecutando...',
                '/bin/sh:',
                'command not found',
                'syntax error near unexpected token',
                'line 1:',
                'line 2:',
                'line 3:'
            ]
            
            // Verificar si el texto contiene algún texto bloqueado
            for (let blockedText of blockedTexts) {
                if (textToCheck.includes(blockedText)) {
                    console.log('🚫 Mensaje bloqueado:', textToCheck.substring(0, 50) + '...')
                    return Promise.resolve({ status: 'blocked' })
                }
            }
            
            // Si no contiene texto bloqueado, enviar normalmente
            return originalSend.call(this, jid, content, options)
            
        } catch (error) {
            console.log('Error en bloqueador:', error)
            return originalSend.call(this, jid, content, options)
        }
    }
}

// Handler vacío para que se reconozca como plugin
let handler = async (m) => {
    return m.reply('✅ Bloqueador de "Ejecutando..." activado')
}

handler.help = ['noblocker']
handler.tags = ['system'] 
handler.command = /^(noblocker|activarbloqueador)$/i

export default handler