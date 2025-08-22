import moment from 'moment-timezone'

let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    // URL de la imagen del menú
    let menuImage = 'https://files.catbox.moe/lajq7h.jpg'
    
    let txt = `🌟⭐ *${botname}* ⭐🌟
   
╭─━━━━━━━━━━━━━━━─╮
│ 🎭 ¡Hola @${userId.split('@')[0]}! 💖
╰─━━━━━━━━━━━━━━━─╯

╭─═⊰ 📡 𝐄𝐒𝐓𝐀𝐃𝐎 𝐀𝐂𝐓𝐈𝐕𝐎
│ 🤖 Estado:${(conn.user.jid == global.conn.user.jid ? '🟢 PREMIUM ' : '🔗 prem-ʙᴏᴛ')}
│ ⚡ Activo:『${uptime}』
│ 👥 Users:『${totalreg}』🔥
│ 🛠️ Comandos:『${totalCommands}』⚙️
│ 📅 Fecha: ${moment().tz('America/Mexico_City').format('DD/MM/YYYY')}
│ 🕐 Hora: ${moment().tz('America/Mexico_City').format('HH:mm:ss')}
│ 🌍 Servidor: México 🇲🇽
│ 📡 Ping: Online ✅
│ 💾 Memoria: Estable 📊
│ 🔒 Modo: ${(conn.user.jid == global.conn.user.jid ? '🔐 PRIVADO' : ' 🔓 PUBLICO')} 
╰───────────────╯                                                                                                                                                                                                                                                                                                                                  


*🤖 PON #code O #qr PARA ASETE SUPBOT DEL BOT ASTA 📡*    



                       

╭━━━━━━━━━━━━━━━━━
│ 📑 *MENÚS DISPONIBLES* 📑
│ 
│ 🌸 *gachamenu o waifumenu*
│    ➟ Ver el menú de gacha/waifus
│
│ 🔞 *menu+ o menu18* 
│    ➟ Ver el menú de contenido +18
│ 
│ 🎨 *menulogos* 
│    ➟ Ver el menú de logos y efectos
│ 
│  📑 Compra tu bot o pide informacion
│  ➟ *#allbot*
│
│ 🎮 *games* 
│    ➟ Ver el menú de games
│ 
╰━━━━━━━━━━━━━━━━━

┏━━━━━━━━━━━━┓
*📊 INFO-BOT*  
┗━━━━━━━━━━━━┛

╰┈➤ 📋 #help / #menu — Lista de comandos  
╰┈➤ 🤖 #setprimary — pon un bot principal en tu grupo
╰┈➤ ⏰ #uptime / #runtime — Tiempo activo  
╰┈➤ 📝 #sc / #script — Repositorio oficial  
╰┈➤ 👥 #staff / #colaboradores — Desarrolladores  
╰┈➤ 🤖 #serbot / #serbot code — Crear Sub-Bot  
╰┈➤ 🔌 #bots / #sockets — Sub-Bots activos  
╰┈➤ 👤 #creador — Información del creador  
╰┈➤ 📈 #status / #estado — Estado actual  
╰┈➤ 🔗 #links / #grupos — Enlaces oficiales  
╰┈➤ ℹ️ #infobot — Información completa  
╰┈➤ 🏓 #p / #ping — Velocidad de respuesta  
╰┈➤ 💻 #sistema / #system — Estado del sistema  
╰┈➤ ⚡ #speed / #speedtest — Estadísticas de velocidad  
╰┈➤ 👁️ #views / #usuarios — Usuarios registrados  
╰┈➤ ⚙️ #funciones / #totalfunciones — Todas las funciones  
╰┈➤ 🗑️ #ds / #fixmsgesper — Eliminar archivos de sesión  
╰┈➤ ✏️ #editautoresponder — Configurar Prompt personalizado  

┏━━━━━━━━━━━━━┓
*🔍 BUSCADORES*  
┗━━━━━━━━━━━━━┛
╰┈➤ 🎵 #tiktoksearch / #tiktoks — Buscador de TikTok  
╰┈➤ 🐦 #tweetposts — Buscador de Twitter/X  
╰┈➤ 📺 #ytsearch / #yts — Búsquedas de YouTube  
╰┈➤ 💻 #githubsearch — Buscador de GitHub  
╰┈➤ 🎬 #cuevana / #cuevanasearch — Buscador de películas/series  
╰┈➤ 🌐 #google — Búsquedas por Google  
╰┈➤ 📌 #pin / #pinterest — Buscador de Pinterest  
╰┈➤ 🖼️ #imagen / #image — Buscador de imágenes  
╰┈➤ 🎌 #animesearch / #animess — Buscador de animes  
╰┈➤ 📖 #animei / #animeinfo — Buscador de capítulos  
╰┈➤ 📚 #infoanime — Buscador de información anime/manga  
╰┈➤ 🔞 #hentaisearch / #searchhentai — Buscador de hentai  
╰┈➤ 🎥 #xnxxsearch / #xnxxs — Buscador de Xnxx  
╰┈➤ 🎬 #xvsearch / #xvideossearch — Buscador de Xvideos  
╰┈➤ 🌟 #pornhubsearch / #phsearch — Buscador de Pornhub  
╰┈➤ 📦 #npmjs — Buscador de npmjs  

┏━━━━━━━━━━━━┓
*📥 DESCARGAS*  
┗━━━━━━━━━━━━┛ 
╰┈➤ 🎵 #tiktok / #tt — Descargar TikTok  
╰┈➤ 🗂️ #mediafire / #mf — Descargar MediaFire  
╰┈➤ 📹 #pinvid / #pinvideo — Descargar Pinterest  
╰┈➤ 💾 #mega / #mg — Descargar MEGA  
╰┈➤ 🎧 #play / #play2 — Descargar música/video YouTube  
╰┈➤ 🎶 #ytmp3 / #ytmp4 — Descargar YouTube por URL  
╰┈➤ 📘 #fb / #facebook — Descargar Facebook  
╰┈➤ 🐦 #twitter / #x — Descargar Twitter/X  
╰┈➤ 📸 #ig / #instagram — Descargar Instagram  
╰┈➤ 🔍 #tts / #tiktoks — Buscar videos TikTok  
╰┈➤ 📦 #terabox / #tb — Descargar Terabox  
╰┈➤ ☁️ #gdrive / #drive — Descargar Google Drive  
╰┈➤ 🖼️ #ttimg / #ttmp3 — Descargar fotos/audios TikTok  
╰┈➤ 💻 #gitclone — Descargar repositorio GitHub  
╰┈➤ 🔞 #xvideosdl — Descargar Xvideos  
╰┈➤ 🎥 #xnxxdl — Descargar Xnxx  
╰┈➤ 📱 #apk / #modapk — Descargar APK  
╰┈➤ 🎲 #tiktokreandom / #ttrandom — TikTok aleatorio  
╰┈➤ 📦 #npmdl / #npmdownloader — Descargar NPM  
╰┈➤ 🔗 #animelinks / #animedl — Links de descarga disponibles

┏━━━━━━━━━━┓
*💰 ECONOMÍA Y RPG*  
┗━━━━━━━━━━┛ 
╰┈➤ 💼 #w / #work / #trabajar — Trabajar para ganar ${moneda}  
╰┈➤ ✅ #prestamo pagar - Paga tu prestamo 
╰┈➤ 📊 #prestamo estado - Ver el estado de tu prestamo 
╰┈➤ 🧮 #prestamo calc <cantidad> <tiempo> - Calcular cuanto iva te costara
╰┈➤ 💰#prestamo pedir <cantidad> <tiempo> - Pedir un prestamo al banco
╰┈➤ 📈 #prestamo - Ve el menu de prestamo
╰┈➤ 🔞 #slut / #prostituirse — Trabajar como prostituta y gana ${moneda}  
╰┈➤ 🪙 #cf / #suerte — Apuesta tus ${moneda} a cara o cruz  
╰┈➤ 🦹 #crime / #crimen — Trabajar como ladrón para ganar ${moneda}  
╰┈➤ 🎯 #ruleta / #roulette / #rt — Apuesta ${moneda} al color rojo o negro  
╰┈➤ 🎰 #casino / #apostar — Apuesta tus ${moneda} en el casino  
╰┈➤ 🎲 #slot — Apuesta tus ${moneda} en la ruleta y prueba tu suerte  
╰┈➤ 👛 #cartera / #wallet — Ver tus ${moneda} en la cartera  
╰┈➤ 🏦 #banco / #bank — Ver tus ${moneda} en el banco  
╰┈➤ 📥 #deposit / #depositar / #d — Deposita tus ${moneda} al banco  
╰┈➤ 📤 #with / #retirar / #withdraw — Retira tus ${moneda} del banco  
╰┈➤ 💸 #transfer / #pay — Transfere ${moneda} o XP a otros usuarios  
╰┈➤ ⛏️ #miming / #minar / #mine — Trabajar como minero y recolecta recursos  
╰┈➤ 🛒 #buyall / #buy — Compra ${moneda} con tu XP  
╰┈➤ 🌅 #daily / #diario — Reclama tu recompensa diaria  
╰┈➤ ☕ #cofre — Reclama un cofre diario lleno de recursos  
╰┈➤ 📅 #weekly / #semanal — Reclama tu regalo semanal  
╰┈➤ 🗓️ #monthly / #mensual — Reclama tu recompensa mensual  
╰┈➤ 🔓 #steal / #robar / #rob — Intenta robarle ${moneda} a alguien  
╰┈➤ 🎯 #robarxp / #robxp — Intenta robar XP a un usuario  
╰┈➤ 🏆 #eboard / #baltop — Ver el ranking de usuarios con mas ${moneda}  
╰┈➤ 🗺️ #aventura / #adventure — Aventúrate en un nuevo reino y recolecta recursos  
╰┈➤ 💊 #curar / #heal — Cura tu salud para volverte aventurar  
╰┈➤ 🏹 #cazar / #hunt / #berburu — Aventúrate en una caza de animales  
╰┈➤ 🎒 #inv / #inventario — Ver tu inventario con todos tus items  
╰┈➤ 🌊 #mazmorra / #explorar — Explorar mazmorras para ganar ${moneda}  
╰┈➤ 🎃 #halloween — Reclama tu dulce o truco (Solo en Halloween)  
╰┈➤ 🎄 #christmas / #navidad — Reclama tu regalo navideño (Solo en Navidad)

┏━━━━━━━━━┓
🎨 STICKERS
┗━━━━━━━━━┛
╰┈➤ 🏷️ #sticker / #s — Crear stickers de (imagen/video)
╰┈➤ 📦 #setmeta — Establece un pack y autor para los stickers
╰┈➤ 🗑️ #delmeta — Elimina tu pack de stickers
╰┈➤ 🖼️ #pfp / #getpic — Obtén la foto de perfil de un usuario
╰┈➤ 📱 #qc — Crear stickers con texto o de un usuario
╰┈➤ 🔄 #toimg / #img — Convierte stickers en imagen
╰┈➤ 📝 #brat / #ttp / #attp — Crear stickers con texto
╰┈➤ 🤝 #emojimix — Fuciona 2 emojis para crear un sticker
╰┈➤ 📌 #wm — Cambia el nombre de los stickers

┏━━━━━━━┓
🛠️ HERRAMIENTAS
┗━━━━━━━┛
╰┈➤ 🧮 #calcular / #calcular / #cal — Calcular todo tipo de ecuaciones
╰┈➤ 🌦️ #tiempo / #clima — Ver el clima de un pais
╰┈➤ 🕐 #horario — Ver el horario global de los países
╰┈➤ 💬 #fake / #fakereply — Crea un mensaje falso de un usuario
╰┈➤ ✨ #enhance / #remini / #hd — Mejora la calidad de una imagen
╰┈➤ 🔤 #letra — Cambia la fuente de las letras
╰┈➤ 👁️ #read / #readviewonce / #ver — Ver imágenes de una sola vista
╰┈➤ 🎵 #whatmusic / #shazam — Descubre el nombre de canciones o vídeos
╰┈➤ 📨 #spamwa / #spam — Envia spam aun usuario
╰┈➤ 📸 #ss / #ssweb — Ver el estado de una página web
╰┈➤ 📏 #length / #tamaño — Cambia el tamaño de imágenes y vídeos
╰┈➤ 🗣️ #say / #decir + [texto] — Repetir un mensaje
╰┈➤ 📄 #todoc / #toducument — Crea documentos de (audio, imágenes y vídeos)
╰┈➤ 🌐 #translate / #traducir / #trad — Traduce palabras en otros idiomas

┏━━━━━━┓
👤 PERFIL
┗━━━━━━┛
╰┈➤ 📝 #reg / #verificar / #register — Registra tu nombre y edad en el bot
╰┈➤ 🗑️ #unreg — Elimina tu registro del bot
╰┈➤ 👤 #profile — Muestra tu perfil de usuario
╰┈➤ 💍 #marry [mención/etiquetar] — Propon matrimonio a otro usuario
╰┈➤ 💔 #divorce — Divorciarte de tu pareja
╰┈➤ ⚧️ #setgenre / #setgenero — Establece tu género en el perfil del bot
╰┈➤ 🚫 #delgenre / #delgenero — Elimina tu género del perfil del bot
╰┈➤ 🎂 #setbirth / #setnacimiento — Establece tu fecha de nacimiento en el perfil del bot
╰┈➤ 🗓️ #delbirth / #delnacimiento — Elimina tu fecha de nacimiento del perfil del bot
╰┈➤ 📄 #setdescription / #setdesc — Establece una descripción en tu perfil del bot
╰┈➤ 🗂️ #deldescription / #deldesc — Elimina la descripción de tu perfil del bot
╰┈➤ 🏆 #lb / #lboard + [Página] — Top de usuarios con más experiencia y nivel
╰┈➤ 📊 #level / #lvl + [@Mención] — Ver tu nivel y experiencia actual
╰┈➤ 💎 #comprarpremium / #premium — Compra un pase premium para usar el bot sin límites
╰┈➤ 💭 #confesiones / #confesar — Confiesa tus sentimientos a alguien de manera anónima

┏━━━━━━━━┓
👥 GRUPOS
┗━━━━━━━━┛
╰┈➤ ⚙️ #config / #on — Ver opciones de configuración de grupos
╰┈➤ 🏷️ #hidetag — Envía un mensaje mencionando a todos los usuarios
╰┈➤ ℹ️ #gp / #infogrupo — Ver la información del grupo
╰┈➤ 🟢 #linea / #listonline — Ver la lista de los usuarios en línea
╰┈➤ 👋 #setwelcome — Establecer un mensaje de bienvenida personalizado
╰┈➤ 👋 #setbye — Establecer un mensaje de despedida personalizado
╰┈➤ 🔗 #link — El bot envía el link del grupo
╰┈➤ 🛡️ #admins / #admin — Mencionar a los admins para solicitar ayuda
╰┈➤ 🔄 #restablecer / #revoke — Restablecer el enlace del grupo
╰┈➤ 🔓 #grupo / #group [open/abrir] — Cambiar ajustes del grupo para que todos los usuarios envíen mensaje
╰┈➤ 🔒 #grupo / #group [close/cerrar] — Cambiar ajustes del grupo para que solo los administradores envíen mensaje
╰┈➤ 🚫 #kick [número/mención] — Elimina un usuario de un grupo
╰┈➤ ➕ #add / #añadir / #agregar [número] — Invita a un usuario a tu grupo
╰┈➤ ⬆️ #promote [mención/etiquetar] — El bot dará administrador al usuario mencionado
╰┈➤ ⬇️ #demote [mención/etiquetar] — El bot quitará administrador al usuario mencionado
╰┈➤ 🖼️ #gpbanner / #groupimg — Cambiar la imagen del grupo
╰┈➤ 📝 #gpname / #groupname — Cambiar el nombre del grupo
╰┈➤ 📄 #gpdesc / #groupdesc — Cambiar la descripción del grupo
╰┈➤ ⚠️ #advertir / #warn / #warning — Darle una advertencia a un usuario
╰┈➤ ✅ #unwarn / #delwarn — Quitar advertencias
╰┈➤ 📋 #advlist / #listaadv — Ver lista de usuarios advertidos
╰┈➤ 🔇 #banchat — Banear el bot en un chat o grupo
╰┈➤ 🔊 #unbanchat — Desbanear el bot del chat o grupo
╰┈➤ 🤐 #mute [mención/etiquetar] — El bot elimina los mensajes del usuario
╰┈➤ 🗣️ #unmute [mención/etiquetar] — El bot deja de eliminar los mensajes del usuario
╰┈➤ 📊 #encuesta / #poll — Crea una encuesta
╰┈➤ 🗑️ #delete / #del — Elimina mensaje de otros usuarios
╰┈➤ 👻 #fantasmas — Ver lista de inactivos del grupo
╰┈➤ 🚮 #kickfantasmas — Elimina a los inactivos del grupo
╰┈➤ 📢 #invocar / #tagall / #todos — Invoca a todos los usuarios de un grupo
╰┈➤ 😊 #setemoji / #setemo — Cambia el emoji que se usa en la invitación de usuarios
╰┈➤ 🌍 #listnum / #kicknum — Elimina a usuario por el prefijo de país

┏━━━━━━━━━┓
🎭 ANIME
┗━━━━━━━━━┛
╰┈➤ 😠 #angry • #enojado + <mención> — Estar enojado
╰┈➤ 🦷 #bite + <mención> — Muerde a alguien
╰┈➤ 😛 #bleh + <mención> — Sacar la lengua
╰┈➤ 😳 #blush + <mención> — Sonrojarte
╰┈➤ 😴 #bored • #aburrido + <mención> — Estar aburrido
╰┈➤ 😭 #cry + <mención> — Llorar por algo o alguien
╰┈➤ 🤗 #cuddle + <mención> — Acurrucarse
╰┈➤ 💃 #dance + <mención> — Sacate los pasitos prohibidos
╰┈➤ 🍻 #drunk + <mención> — Estar borracho
╰┈➤ 🍽️ #eat • #comer + <mención> — Comer algo delicioso
╰┈➤ 🤦 #facepalm + <mención> — Darte una palmada en la cara
╰┈➤ 😊 #happy • #feliz + <mención> — Salta de felicidad
╰┈➤ 🫂 #hug + <mención> — Dar un abrazo
╰┈➤ 🤰 #impregnate • #preg + <mención> — Embarazar a alguien
╰┈➤ 💀 #kill + <mención> — Toma tu arma y mata a alguien
╰┈➤ 💋 #kiss • #besar • #kiss2 + <mención> — Dar un beso
╰┈➤ 😂 #laugh + <mención> — Reírte de algo o alguien
╰┈➤ 👅 #lick + <mención> — Lamer a alguien
╰┈➤ 💕 #love • #amor + <mención> — Sentirse enamorado
╰┈➤ 🤲 #pat + <mención> — Acaricia a alguien
╰┈➤ 👉 #poke + <mención> — Picar a alguien
╰┈➤ 😤 #pout + <mención> — Hacer pucheros
╰┈➤ 👊 #punch + <mención> — Dar un puñetazo
╰┈➤ 🏃 #run + <mención> — Correr
╰┈➤ 😢 #sad • #triste + <mención> — Expresar tristeza
╰┈➤ 😨 #scared + <mención> — Estar asustado
╰┈➤ 😏 #seduce + <mención> — Seducir a alguien
╰┈➤ 😳 #shy • #timido + <mención> — Sentir timidez
╰┈➤ 👋 #slap + <mención> — Dar una bofetada
╰┈➤ 🌅 #dias • #days — Darle los buenos días a alguien
╰┈➤ 🌙 #noches • #nights — Darle las buenas noches a alguien
╰┈➤ 😴 #sleep + <mención> — Tumbarte a dormir
╰┈➤ 🚬 #smoke + <mención> — Fumar
╰┈➤ 🤔 #think + <mención> — Pensar en algo

┏━━━━━━━━━━━━┓
🆕 COMANDOS NUEVOS
┗━━━━━━━━━━━━┛
🤖 GENERAL
╰┈➤ 🤖 #asta + <texto> — Habla con el o pide que te resuelva algo
╰┈➤ 🔢 #guessnumber #adivinanumero — Adivina el numero que estoy pensando
╰┈➤ 🌐 #web • #pagina • #website — Ve la página oficial del bot
╰┈➤ 🎫 #vertoken — Ver tu token
╰┈➤ 🔞 #menu+ — Ve el menu +18
🎣 PESCA
╰┈➤ 🎣 #pesca #pescar — Pesca peces
╰┈➤ 💰 #comprar <tipo> — Comprar una caña
╰┈➤ 💸 #vender <tipo> <cantidad> — Vender peces
╰┈➤ 🎒 #inventario — Ver tu inventario de pesca
╰┈➤ 🎣 #vercaña — Ve tu caña
╰┈➤ ℹ️ #ayudapesca — Ver el menu de ayuda de pesca
🏹 CAZA
╰┈➤ 🏹 #cazar #caza — Caza animales
╰┈➤ 🦌 #venderanimal <tipo> <cantidad> — Vender los animales que cazaste
╰┈➤ 🎒 #inventarioanimal — Ve el inventario de animales cazados
╰┈➤ 🔫 #comprararma <objeto> — Compra tu arma
╰┈➤ 🔫 #verarma — Ve tu arma
╰┈➤ ℹ️ #ayudacaza — Ve el menu de caza
🎨 CREATIVIDAD
╰┈➤ 📝 #logo <texto> — Crea un logo simple
╰┈➤ 🎨 #crearlogo <estilo> <texto> — Crea un logo simple
╰┈➤ 📦 #mods <texto> — Descargar algún mod`

    try {
        await conn.sendMessage(m.chat, {
            image: { url: menuImage },
            caption: txt,
            mentions: [userId]
        })
    } catch (error) {
        console.error('Error al enviar la imagen:', error)
        await conn.sendMessage(m.chat, { 
            text: txt,
            mentions: [userId]
        })
    }
}

handler.help = ['menu', 'menú', 'help']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
handler.register = true

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
}
