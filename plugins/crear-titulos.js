import fetch from 'node-fetch';

const emoji = '✨'; // Puedes cambiar este emoji por el que uses en tu bot

var handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} Por favor, ingresa el texto que quieres estilizar.\n\n*Ejemplo:* ${usedPrefix + command} Hola mundo\n\n*Comandos disponibles:*\n• ${usedPrefix}texto - Genera todos los estilos\n• ${usedPrefix}simbolos - Solo símbolos decorativos\n• ${usedPrefix}letras - Solo estilos de letras`, m);
    }

    const texto = args.join(' ');
    
    if (texto.length > 100) {
        return conn.reply(m.chat, `${emoji} El texto es demasiado largo. Máximo 100 caracteres.`, m);
    }

    try {
        await conn.reply(m.chat, `${emoji} Generando estilos de texto...`, m);

        let estilos = [];
        
        if (command === 'simbolos') {
            estilos = await generarSimbolos(texto);
        } else if (command === 'letras') {
            estilos = await generarLetras(texto);
        } else {
            estilos = await generarTodosLosEstilos(texto);
        }

        if (!estilos || estilos.length === 0) {
            return conn.reply(m.chat, "Error: No se pudieron generar los estilos de texto.", m);
        }

        let mensaje = `${emoji} *Texto estilizado:*\n\n`;
        mensaje += `📝 *Original:* ${texto}\n\n`;
        
        estilos.forEach((estilo, index) => {
            mensaje += `${index + 1}. ${estilo}\n\n`;
        });

        // Si el mensaje es muy largo, dividirlo en partes
        if (mensaje.length > 4000) {
            const partes = dividirMensaje(mensaje);
            for (let i = 0; i < partes.length; i++) {
                await conn.reply(m.chat, partes[i], m);
                if (i < partes.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Pausa de 1 segundo
                }
            }
        } else {
            await conn.reply(m.chat, mensaje, m);
        }

    } catch (error) {
        console.error('Error en comando de texto:', error);
        return conn.reply(m.chat, `Error: ${error.message}`, m);
    }
};

handler.help = ['texto', 'estilo', 'simbolos', 'letras'].map((v) => v + ' *<texto>*');
handler.tags = ['herramientas'];
handler.command = ['texto', 'estilo', 'letras', 'fuente', 'simbolos', 'weirdmaker'];
handler.group = true;
handler.register = true;
handler.coin = 1;
handler.limit = false;

export default handler;

function dividirMensaje(mensaje) {
    const partes = [];
    let parte = "";
    const lineas = mensaje.split('\n');
    
    for (const linea of lineas) {
        if ((parte + linea + '\n').length > 4000) {
            if (parte) partes.push(parte);
            parte = linea + '\n';
        } else {
            parte += linea + '\n';
        }
    }
    if (parte) partes.push(parte);
    return partes;
}

async function generarTodosLosEstilos(texto) {
    const letras = await generarLetras(texto);
    const simbolos = await generarSimbolos(texto);
    return [...letras, ...simbolos];
}

async function generarLetras(texto) {
    const estilos = [];
    
    // Estilo 1: Mathematical Bold
    const negrita = texto.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D400);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D41A);
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x1D7CE);
        return char;
    }).join('');
    estilos.push(`𝐍𝐞𝐠𝐫𝐢𝐭𝐚: ${negrita}`);

    // Estilo 2: Mathematical Italic
    const cursiva = texto.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D434);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D44E);
        return char;
    }).join('');
    estilos.push(`𝐶𝑢𝑟𝑠𝑖𝑣𝑎: ${cursiva}`);

    // Estilo 3: Mathematical Bold Italic
    const negriteursiva = texto.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D468);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D482);
        return char;
    }).join('');
    estilos.push(`𝑵𝒆𝒈𝒓𝒊𝒕𝒂 𝑪𝒖𝒓𝒔𝒊𝒗𝒂: ${negriteursiva}`);

    // Estilo 4: Mathematical Sans-Serif
    const sansSerif = texto.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D5A0);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D5BA);
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x1D7E2);
        return char;
    }).join('');
    estilos.push(`𝖲𝖺𝗇𝗌-𝖲𝖾𝗋𝗂𝖿: ${sansSerif}`);

    // Estilo 5: Mathematical Monospace
    const monospace = texto.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x1D670);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x1D68A);
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x1D7F6);
        return char;
    }).join('');
    estilos.push(`𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎: ${monospace}`);

    // Estilo 6: Fullwidth
    const fullwidth = texto.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 33 && code <= 126) return String.fromCharCode(code - 33 + 0xFF01);
        if (code === 32) return String.fromCharCode(0x3000);
        return char;
    }).join('');
    estilos.push(`Ｆｕｌｌｗｉｄｔｈ： ${fullwidth}`);

    // Estilo 7: Pequeñas Mayúsculas
    const pequeñasMayusculas = texto.split('').map(char => {
        const small_caps = {
            'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ',
            'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ',
            'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ',
            'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
        };
        return small_caps[char.toLowerCase()] || char;
    }).join('');
    estilos.push(`ᴘᴇǫᴜᴇñᴀs ᴍᴀʏᴜsᴄᴜʟᴀs: ${pequeñasMayusculas}`);

    // Estilo 8: Texto invertido
    const caracteresMapa = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
        'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
        'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
        'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', ' ': ' '
    };
    const invertido = texto.toLowerCase().split('').reverse().map(char => 
        caracteresMapa[char] || char
    ).join('');
    estilos.push(`Iuʌǝɹʇᴉpo: ${invertido}`);

    return estilos;
}

async function generarSimbolos(texto) {
    const estilos = [];

    // Estilo 1: Texto tachado
    const tachado = texto.split('').map(char => char + '\u0336').join('');
    estilos.push(`T̶a̶c̶h̶a̶d̶o̶: ${tachado}`);

    // Estilo 2: Texto subrayado
    const subrayado = texto.split('').map(char => char + '\u0332').join('');
    estilos.push(`S̲u̲b̲r̲a̲y̲a̲d̲o̲: ${subrayado}`);

    // Estilo 3: Texto con línea superior
    const lineaSuperior = texto.split('').map(char => char + '\u0305').join('');
    estilos.push(`L̅í̅n̅e̅a̅ ̅s̅u̅p̅e̅r̅i̅o̅r̅: ${lineaSuperior}`);

    // Estilo 4: Texto con círculos
    const circulado = texto.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCharCode(code - 65 + 0x24B6);
        if (code >= 97 && code <= 122) return String.fromCharCode(code - 97 + 0x24D0);
        if (code >= 48 && code <= 57) return String.fromCharCode(code - 48 + 0x2460);
        return char;
    }).join('');
    estilos.push(`Ⓒⓘⓡⓒⓤⓛⓐⓓⓞ: ${circulado}`);

    // Estilo 5: Texto con cuadrados
    const cuadrado = texto.split('').map(char => {
        const squares = {
            'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄶',
            'H': '🄷', 'I': '🄸', 'J': '🄹', 'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽',
            'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃', 'U': '🅄',
            'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉'
        };
        return squares[char.toUpperCase()] || char;
    }).join('');
    estilos.push(`Cuadrado: ${cuadrado}`);

    // Estilo 6: Texto con decoración de estrellas
    const estrellas = `✦✧･ﾟ: *✧･ﾟ:* ${texto} *:･ﾟ✧*:･ﾟ✧✦`;
    estilos.push(`Estrellas: ${estrellas}`);

    // Estilo 7: Texto con burbujas
    const burbujas = `◦•●◉✿ ${texto} ✿◉●•◦`;
    estilos.push(`Burbujas: ${burbujas}`);

    // Estilo 8: Texto con corazones
    const corazones = `♡✧⁎⁺˳✧༚ ${texto} ༚✧˳⁺⁎✧♡`;
    estilos.push(`Corazones: ${corazones}`);

    // Estilo 9: Texto con flores
    const flores = `❀✿❀✿ ${texto} ✿❀✿❀`;
    estilos.push(`Flores: ${flores}`);

    // Estilo 10: Texto con ondas
    const ondas = `～(￣▽￣～) ${texto} (～￣▽￣)～`;
    estilos.push(`Ondas: ${ondas}`);

    // Estilo 11: Texto espaciado
    const espaciado = texto.split('').join(' ');
    estilos.push(`E s p a c i a d o: ${espaciado}`);

    // Estilo 12: Texto alternado
    const alternado = texto.split('').map((char, index) => 
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('');
    estilos.push(`aLtErNaDo: ${alternado}`);

    // Estilo 13: Texto con símbolos kawaii
    const kawaii = `(´∩｡• ᵕ •｡∩\`) ♡ ${texto} ♡ (´∩｡• ᵕ •｡∩\`)`;
    estilos.push(`Kawaii: ${kawaii}`);

    // Estilo 14: Texto con rayos
    const rayos = `⚡━━━━━━━━ ${texto} ━━━━━━━━⚡`;
    estilos.push(`Rayos: ${rayos}`);

    // Estilo 15: Texto con diamantes
    const diamantes = `◊♦◊♦◊ ${texto} ◊♦◊♦◊`;
    estilos.push(`Diamantes: ${diamantes}`);

    // Estilo 16: Texto con llamas
    const llamas = `🔥🔥🔥 ${texto} 🔥🔥🔥`;
    estilos.push(`Llamas: ${llamas}`);

    // Estilo 17: Texto con símbolos musicales
    const musica = `♪♫♪ ${texto} ♪♫♪`;
    estilos.push(`Música: ${musica}`);

    // Estilo 18: Texto retro
    const retro = `▬▬ι═══════ﺤ ${texto} ﺤ═══════ι▬▬`;
    estilos.push(`Retro: ${retro}`);

    return estilos;
}
