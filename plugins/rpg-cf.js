let users = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Emojis para hacer el juego más llamativo
    const monedaEmoji = '🪙';
    const caraEmoji = '😎';
    const cruzEmoji = '❌';
    const suerteEmoji = '🍀';
    const celebracionEmoji = '🎉';
    const tristezaEmoji = '😢';
    const dineroEmoji = '💰';
    const fuegoEmoji = '🔥';
    const explosionEmoji = '💥';
    
    // Separar la elección y la cantidad
    let [eleccion, cantidad] = text.split(' ');
    
    // Verificar si se proporcionaron ambos parámetros
    if (!eleccion || !cantidad) {
        return m.reply(`${monedaEmoji} *¡CARA O CRUZ!* ${monedaEmoji}\n\n${suerteEmoji} Por favor, elige *cara* o *cruz* y una cantidad para apostar.\n\n${dineroEmoji} Ejemplo: *${usedPrefix + command} cara 50*\n\n¡Prueba tu suerte y multiplica tus monedas! ${fuegoEmoji}`);
    }

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);
    
    // Verificar si la elección es válida
    if (eleccion !== 'cara' && eleccion !== 'cruz') {
        return m.reply(`${explosionEmoji} *¡ELECCIÓN NO VÁLIDA!* ${explosionEmoji}\n\n${monedaEmoji} Por favor, elige *cara* ${caraEmoji} o *cruz* ${cruzEmoji}\n\n${dineroEmoji} Ejemplo: *${usedPrefix + command} cara 50*`);
    }

    // Verificar si la cantidad es válida
    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`${explosionEmoji} *¡CANTIDAD NO VÁLIDA!* ${explosionEmoji}\n\n${dineroEmoji} Por favor, elige una cantidad válida para apostar.\n\n${monedaEmoji} Ejemplo: *${usedPrefix + command} cara 50*`);
    }

    // Obtener o inicializar usuario
    let userId = m.sender;
    if (!users[userId]) users[userId] = { coin: 100 };
    let user = global.db.data.users[m.sender];
    
    // Verificar si el usuario tiene suficientes monedas
    if (user.coin < cantidad) {
        return m.reply(`${tristezaEmoji} *¡FONDOS INSUFICIENTES!* ${tristezaEmoji}\n\n${monedaEmoji} No tienes suficientes monedas para apostar.\n${dineroEmoji} Tu balance actual: *${user.coin}* monedas.`);
    }

    // Animación de lanzamiento (mensaje temporal)
    await conn.reply(m.chat, `${explosionEmoji} *LANZANDO MONEDA* ${explosionEmoji}\n\n${monedaEmoji} La moneda está girando en el aire...`, m);
    
    // Esperar un momento para simular el lanzamiento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Determinar el resultado
    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
    let resultadoEmoji = resultado === 'cara' ? caraEmoji : cruzEmoji;
    
    // Preparar el mensaje de resultado
    let mensaje = `${explosionEmoji} *¡RESULTADO!* ${explosionEmoji}\n\n`;
    mensaje += `${monedaEmoji} La moneda ha caído en: *${resultado.toUpperCase()}* ${resultadoEmoji}\n`;
    mensaje += `${dineroEmoji} Tu apuesta fue: *${eleccion.toUpperCase()}* por *${cantidad}* monedas\n\n`;
    
    // Actualizar balance según resultado
    if (resultado === eleccion) {
        user.coin += cantidad;
        mensaje += `${celebracionEmoji} *¡FELICIDADES! ¡HAS GANADO!* ${celebracionEmoji}\n`;
        mensaje += `${dineroEmoji} Ganancia: *+${cantidad}* monedas\n`;
        mensaje += `${monedaEmoji} Nuevo balance: *${user.coin}* monedas\n\n`;
        mensaje += `${fuegoEmoji} *¡Estás en racha! ¿Otra ronda?* ${fuegoEmoji}`;
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

handler.help = ['cf'];
handler.tags = ['economy', 'games', 'fun'];
handler.command = ['cf', 'suerte', 'caracruz', 'moneda'];
handler.group = true;
handler.register = true;

export default handler;
