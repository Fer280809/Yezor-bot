import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'

const MAX_SIZE_MB = 150
const TIMEOUT = 15000 // 15 segundos de timeout

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🎵 *Ingresa el nombre de la música o video que deseas descargar*\n\n📝 *Ejemplos:*\n• ${usedPrefix}dl bad bunny tití me preguntó\n• ${usedPrefix}dv ozuna baila baila\n• ${usedPrefix}da rosalía despechá`, m)
  }

  let loadingMsg
  try {
    // Mensaje de carga
    loadingMsg = await conn.reply(m.chat, '🔍 *Buscando...* Por favor espera un momento', m)

    const search = await yts(text)
    if (!search.all || search.all.length === 0) {
      return conn.reply(m.chat, '❌ *No se encontraron resultados*\n\nIntenta con otro término de búsqueda', m)
    }

    const videoInfo = search.all[0]
    const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo

    if (!title || !url) {
      return conn.reply(m.chat, '❌ *Error al obtener información del video*', m)
    }

    const vistas = formatViews(views)
    const canal = author?.name || 'Desconocido'
    
    // URL del canal
    const channelUrl = author?.url || `https://www.youtube.com/@${canal.replace(/\s+/g, '')}`
    
    // Mensaje de información mejorado
    const infoMessage = `╭─⬣「 🎵 *YOUTUBE DOWNLOADER* 」⬣
│
├🎬 *Título:* ${title}
├👤 *Canal:* ${canal}
├🔗 *Canal URL:* ${channelUrl}
├👀 *Vistas:* ${vistas}
├⏱️ *Duración:* ${timestamp}
├📅 *Publicado:* ${ago}
├🌐 *Video URL:* ${url}
│
╰─⬣ *Descargando...* ⏳`

    // Obtener thumbnail
    let thumb
    try {
      thumb = (await conn.getFile(thumbnail))?.data
    } catch (e) {
      thumb = null
    }

    const contextInfo = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `🎵 ${canal} • ${vistas} vistas`,
          mediaType: 1,
          previewType: 0,
          mediaUrl: channelUrl,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }

    // Actualizar mensaje de carga con información
    await conn.reply(m.chat, infoMessage, m, contextInfo)

    // Determinar tipo de descarga
    const isAudio = ['dl', 'da', 'sx'].includes(command)
    const isVideo = ['dv', 'vx'].includes(command)

    if (isAudio) {
      await downloadAudio(conn, m, url, title, thumb)
    } else if (isVideo) {
      await downloadVideo(conn, m, url, title, thumb)
    } else {
      return conn.reply(m.chat, '❌ *Comando no reconocido*', m)
    }

  } catch (error) {
    console.error('Error en handler:', error)
    return conn.reply(m.chat, `❌ *Error inesperado:* ${error.message}\n\n💡 *Intenta nuevamente en unos momentos*`, m)
  }
}

// Función para descargar audio
const downloadAudio = async (conn, m, url, title, thumb) => {
  const audioAPIs = [
    // API 1
    async () => {
      const response = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.result?.download?.url,
        title: data.result?.title || title
      }
    },
    // API 2
    async () => {
      const response = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.data?.dl || data.url,
        title: title
      }
    },
    // API 3
    async () => {
      const response = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.result?.download?.url || data.downloadUrl,
        title: title
      }
    },
    // API 4
    async () => {
      const response = await fetch(`https://axeel.my.id/api/download/audio?url=${encodeURIComponent(url)}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.downloads?.url || data.download?.url,
        title: title
      }
    },
    // API 5
    async () => {
      const response = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.data?.dl || data.result?.download?.url,
        title: title
      }
    }
  ]

  let success = false
  for (let i = 0; i < audioAPIs.length; i++) {
    try {
      const result = await audioAPIs[i]()
      if (result.url) {
        // Verificar tamaño del archivo
        const fileSize = await getFileSize(result.url)
        
        if (fileSize > MAX_SIZE_MB) {
          await conn.sendMessage(m.chat, {
            document: { url: result.url },
            fileName: `${result.title}.mp3`,
            mimetype: 'audio/mpeg',
            caption: `🎵 *Audio descargado como documento*\n📁 *Tamaño:* ${fileSize.toFixed(2)} MB`
          }, { quoted: m })
        } else {
          await conn.sendMessage(m.chat, {
            audio: { url: result.url },
            fileName: `${result.title}.mp3`,
            mimetype: 'audio/mpeg'
          }, { quoted: m })
        }
        
        success = true
        break
      }
    } catch (error) {
      console.error(`Error en API de audio ${i + 1}:`, error.message)
      continue
    }
  }

  if (!success) {
    return conn.reply(m.chat, '❌ *No se pudo descargar el audio*\n\n💡 *Todas las APIs están temporalmente no disponibles. Intenta más tarde.*', m)
  }
}

// Función para descargar video
const downloadVideo = async (conn, m, url, title, thumb) => {
  const videoAPIs = [
    // API 1
    async () => {
      const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.result?.download?.url,
        title: data.result?.title || title
      }
    },
    // API 2
    async () => {
      const response = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.data?.dl || data.url,
        title: title
      }
    },
    // API 3
    async () => {
      const response = await fetch(`https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.result?.download?.url || data.downloadUrl,
        title: title
      }
    },
    // API 4
    async () => {
      const response = await fetch(`https://axeel.my.id/api/download/video?url=${encodeURIComponent(url)}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.downloads?.url || data.download?.url,
        title: title
      }
    },
    // API 5
    async () => {
      const response = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`, { timeout: TIMEOUT })
      const data = await response.json()
      return {
        url: data.data?.dl || data.result?.download?.url,
        title: title
      }
    }
  ]

  let success = false
  for (let i = 0; i < videoAPIs.length; i++) {
    try {
      const result = await videoAPIs[i]()
      if (result.url) {
        // Verificar tamaño del archivo
        const fileSize = await getFileSize(result.url)
        
        if (fileSize > MAX_SIZE_MB) {
          await conn.sendMessage(m.chat, {
            document: { url: result.url },
            fileName: `${result.title}.mp4`,
            mimetype: 'video/mp4',
            caption: `🎬 *Video descargado como documento*\n📁 *Tamaño:* ${fileSize.toFixed(2)} MB`
          }, { quoted: m })
        } else {
          await conn.sendMessage(m.chat, {
            video: { url: result.url },
            fileName: `${result.title}.mp4`,
            mimetype: 'video/mp4',
            caption: `🎬 *${result.title}*`,
            thumbnail: thumb
          }, { quoted: m })
        }
        
        success = true
        break
      }
    } catch (error) {
      console.error(`Error en API de video ${i + 1}:`, error.message)
      continue
    }
  }

  if (!success) {
    return conn.reply(m.chat, '❌ *No se pudo descargar el video*\n\n💡 *Todas las APIs están temporalmente no disponibles. Intenta más tarde.*', m)
  }
}

// Función para obtener el tamaño del archivo
const getFileSize = async (url) => {
  try {
    const response = await axios.head(url, { timeout: 5000 })
    const sizeInBytes = response.headers['content-length'] || 0
    return parseFloat((sizeInBytes / (1024 * 1024)).toFixed(2))
  } catch (error) {
    return 0 // Si no se puede obtener el tamaño, asumimos que es pequeño
  }
}

// Función para formatear vistas
function formatViews(views) {
  if (views === undefined || views === null) return "No disponible"
  
  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B`
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`
  }
  return views.toString()
}

// Configuración del handler
handler.command = handler.help = ['dl', 'da', 'sx', 'dv', 'vx']
handler.tags = ['downloader']
handler.group = true
handler.register = true

export default handler
