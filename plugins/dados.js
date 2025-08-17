let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Emojis para hacer el juego más llamativo
    const dadoEmoji = '🎲';
    const monedaEmoji = '🪙';
    const suerteEmoji = '🍀';
    const celebracionEmoji = '🎉';
    const tristezaEmoji = '😢';
    const dineroEmoji = '💰';
    const fuegoEmoji = '🔥';
    const explosionEmoji = '💥';
    const coronaEmoji = '👑';
    
    // Mostrar ayuda si no hay texto
    if (!text) {
        return m.reply(`${dadoEmoji} *¡JUEGO DE DADOS!* ${dadoEmoji}\n
${suerteEmoji} *Modos de juego:*
1️⃣ *Número exacto:* Apuesta a un número del 1 al 6
2️⃣ *Par/Impar:* Apuesta si saldrá par o impar
3️⃣ *Alto/Bajo:* Apuesta si saldrá 1-3 (bajo) o 4-6 (alto)

${dineroEmoji} *Multiplicadores:*
• Número exacto: x5
• Par/Impar: x1.8
• Alto/Bajo: x1.8

${monedaEmoji} *Ejemplos:*
• *${usedPrefix + command} 6 50* - Apuestas 50 monedas al número 6
• *${usedPrefix + command} par 50* - Apuestas 50 monedas a que saldrá par
• *${usedPrefix + command} alto 50* - Apuestas 50 monedas a que saldrá 4, 5 o 6

¡Prueba tu suerte y multiplica tus monedas! ${fuegoEmoji}`);
    }

    // Separar la elección y la cantidad
    let [eleccion, cantidad] = text.split(' ');
    
    if (!eleccion || !cantidad) {
        return m.reply(`${explosionEmoji} *¡PARÁMETROS INCOMPLETOS!* ${explosionEmoji}\n\n${dadoEmoji} Por favor, especifica tu apuesta y la cantidad.\n\n${monedaEmoji} Ejemplo: *${usedPrefix + command} 6 50*`);
    }

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);
    
    // Verificar si la cantidad es válida
    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`${explosionEmoji} *¡CANTIDAD NO VÁLIDA!* ${explosionEmoji}\n\n${dineroEmoji} Por favor, elige una cantidad válida para apostar.\n\n${monedaEmoji} Ejemplo: *${usedPrefix + command} 6 50*`);
    }

    // Verificar si la elección es válida y determinar multiplicador
    let multiplicador;
    let esValido = false;
    
    // Para número exacto
    if (['1', '2', '3', '4', '5', '6'].includes(eleccion)) {
        multiplicador = 5;
        esValido = true;
    } 
    // Para par/impar
    else if (['par', 'impar'].includes(eleccion)) {
        multiplicador = 1.8;
        esValido = true;
    } 
    // Para alto/bajo
    else if (['alto', 'bajo'].includes(eleccion)) {
        multiplicador = 1.8;
        esValido = true;
    }
    
    if (!esValido) {
        return m.reply(`${explosionEmoji} *¡APUESTA NO VÁLIDA!* ${explosionEmoji}\n\n${dadoEmoji} Puedes apostar a:\n• Un número del 1 al 6\n• Par o Impar\n• Alto (4-6) o Bajo (1-3)\n\n${monedaEmoji} Ejemplo: *${usedPrefix + command} 6 50*`);
    }
    
    // Obtener usuario
    let user = global.db.data.users[m.sender];
    
    // Verificar si el usuario tiene suficientes monedas
    if (user.coin < cantidad) {
        return m.reply(`${tristezaEmoji} *¡FONDOS INSUFICIENTES!* ${tristezaEmoji}\n\n${monedaEmoji} No tienes suficientes monedas para apostar.\n${dineroEmoji} Tu balance actual: *${user.coin}* monedas.`);
    }

    // Mensaje de lanzamiento del dado
    await conn.reply(m.chat, `${explosionEmoji} *LANZANDO DADO* ${explosionEmoji}\n\n${dadoEmoji} El dado está girando...`, m);
    
    // Esperar un momento para simular el lanzamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Tirar el dado
    const resultado = Math.floor(Math.random() * 6) + 1;
    
    // Determinar si la apuesta ganó
    let gano = false;
    
    // Para número exacto
    if (['1', '2', '3', '4', '5', '6'].includes(eleccion)) {
        gano = parseInt(eleccion) === resultado;
    } 
    // Para par/impar
    else if (eleccion === 'par') {
        gano = resultado % 2 === 0;
    } 
    else if (eleccion === 'impar') {
        gano = resultado % 2 !== 0;
    } 
    // Para alto/bajo
    else if (eleccion === 'alto') {
        gano = resultado >= 4;
    } 
    else if (eleccion === 'bajo') {
        gano = resultado <= 3;
    }
    
    // Preparar el mensaje de resultado
    let mensaje = `${explosionEmoji} *¡RESULTADO!* ${explosionEmoji}\n\n`;
    mensaje += `${dadoEmoji} El dado muestra: *${resultado}*\n`;
    
    // Detallar la apuesta
    if (['1', '2', '3', '4', '5', '6'].includes(eleccion)) {
        mensaje += `${dineroEmoji} Tu apuesta: *Número ${eleccion}* por *${cantidad}* monedas\n\n`;
    } else if (['par', 'impar'].includes(eleccion)) {
        mensaje += `${dineroEmoji} Tu apuesta: *${eleccion.toUpperCase()}* por *${cantidad}* monedas\n\n`;
    } else {
        mensaje += `${dineroEmoji} Tu apuesta: *${eleccion.toUpperCase()} (${eleccion === 'alto' ? '4-6' : '1-3'})* por *${cantidad}* monedas\n\n`;
    }
    
    // Actualizar balance según resultado
    if (gano) {
        let ganancia = Math.floor(cantidad * multiplicador);
        user.coin += ganancia;
        
        mensaje += `${celebracionEmoji} *¡FELICIDADES! ¡HAS GANADO!* ${celebracionEmoji}\n`;
        mensaje += `${dineroEmoji} Ganancia: *+${ganancia}* monedas (x${multiplicador})\n`;
        mensaje += `${monedaEmoji} Nuevo balance: *${user.coin}* monedas\n\n`;
        mensaje += `${fuegoEmoji} *¡Estás en racha! ¿Otro lanzamiento?* ${fuegoEmoji}`;
    } else {
        user.coin -= cantidad;
        
        mensaje += `${tristezaEmoji} *¡HAS PERDIDO!* ${tristezaEmoji}\n`;
        mensaje += `${dineroEmoji} Pérdida: *-${cantidad}* monedas\n`;
        mensaje += `${monedaEmoji} Nuevo balance: *${user.coin}* monedas\n\n`;
        mensaje += `${suerteEmoji} *¡La suerte cambiará en el próximo intento!* ${suerteEmoji}`;
    }

    // Enviar mensaje final
    await conn.reply(m.chat, mensaje, m);
};

handler.help = ['dados'];
handler.tags = ['economy', 'games', 'fun'];
handler.command = ['dados', 'dado', 'dice', 'bet'];
handler.group = true;
handler.register = true;

export default handler;
