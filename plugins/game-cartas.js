let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Emojis para hacer el juego más llamativo
    const cartaEmoji = '🃏';
    const dineroEmoji = '💰';
    const coronaEmoji = '👑';
    const fuegoEmoji = '🔥';
    const explosionEmoji = '💥';
    const celebracionEmoji = '🎉';
    const tristezaEmoji = '😢';
    const monedaEmoji = '🪙';
    const rayoEmoji = '⚡';
    const diamanteEmoji = '💎';
    
    // Verificar que sea un chat privado
    if (m.isGroup) {
        return m.reply(`${cartaEmoji} *¡JUEGO PRIVADO!* ${cartaEmoji}\n\n${rayoEmoji} Este juego solo se puede jugar en *CHAT PRIVADO*.\n${diamanteEmoji} Escríbeme por privado para jugar Blackjack.`);
    }
    
    // Inicializar datos del juego si no existen
    if (!global.db.data.users[m.sender].blackjack) {
        global.db.data.users[m.sender].blackjack = {
            enJuego: false,
            cartas: [],
            cartasDealer: [],
            apuesta: 0,
            turnoJugador: true
        };
    }
    
    let user = global.db.data.users[m.sender];
    let juego = user.blackjack;
    
    // Definir el mazo de cartas
    const palos = ['♠️', '♥️', '♦️', '♣️'];
    const valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    // Función para crear un mazo completo
    function crearMazo() {
        let mazo = [];
        for (let palo of palos) {
            for (let valor of valores) {
                mazo.push({ valor, palo, puntos: obtenerPuntos(valor) });
            }
        }
        return barajarMazo(mazo);
    }
    
    // Función para barajar el mazo
    function barajarMazo(mazo) {
        for (let i = mazo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
        }
        return mazo;
    }
    
    // Función para obtener puntos de una carta
    function obtenerPuntos(valor) {
        if (valor === 'A') return 11;
        if (['J', 'Q', 'K'].includes(valor)) return 10;
        return parseInt(valor);
    }
    
    // Función para calcular la puntuación total
    function calcularPuntuacion(cartas) {
        let puntuacion = 0;
        let ases = 0;
        
        for (let carta of cartas) {
            if (carta.valor === 'A') {
                ases++;
            }
            puntuacion += carta.puntos;
        }
        
        // Ajustar valor de los ases si es necesario
        while (puntuacion > 21 && ases > 0) {
            puntuacion -= 10;
            ases--;
        }
        
        return puntuacion;
    }
    
    // Función para mostrar cartas
    function mostrarCartas(cartas, ocultarPrimera = false) {
        if (cartas.length === 0) return '';
        
        let texto = '';
        for (let i = 0; i < cartas.length; i++) {
            if (i === 0 && ocultarPrimera) {
                texto += '🎴 [OCULTA] ';
            } else {
                texto += `${cartas[i].palo}${cartas[i].valor} `;
            }
        }
        
        return texto.trim();
    }
    
    // Mostrar ayuda si no hay texto
    if (!text) {
        if (juego.enJuego) {
            let puntuacionJugador = calcularPuntuacion(juego.cartas);
            let cartasJugador = mostrarCartas(juego.cartas);
            let cartasDealer = mostrarCartas(juego.cartasDealer, !juego.turnoJugador);
            let puntuacionDealer = juego.turnoJugador ? '?' : calcularPuntuacion(juego.cartasDealer);
            
            let mensaje = `${cartaEmoji} *BLACKJACK EN CURSO* ${cartaEmoji}\n\n`;
            mensaje += `${dineroEmoji} *Apuesta:* ${juego.apuesta} monedas\n\n`;
            mensaje += `${coronaEmoji} *TUS CARTAS:*\n${cartasJugador}\n${fuegoEmoji} *Puntuación:* ${puntuacionJugador}\n\n`;
            mensaje += `${rayoEmoji} *CARTAS DEL DEALER:*\n${cartasDealer}\n${diamanteEmoji} *Puntuación:* ${puntuacionDealer}\n\n`;
            
            if (juego.turnoJugador) {
                mensaje += `${explosionEmoji} *¿QUÉ QUIERES HACER?*\n`;
                mensaje += `• *${usedPrefix + command} hit* - Pedir otra carta\n`;
                mensaje += `• *${usedPrefix + command} stand* - Plantarse\n`;
                
                if (puntuacionJugador === 21) {
                    mensaje += `\n${celebracionEmoji} ¡BLACKJACK! ¡21 PUNTOS!`;
                } else if (puntuacionJugador > 21) {
                    mensaje += `\n${tristezaEmoji} ¡TE PASASTE! Más de 21 puntos.`;
                }
            }
            
            return m.reply(mensaje);
        } else {
            return m.reply(`${cartaEmoji} *¡BLACKJACK PRIVADO!* ${cartaEmoji}\n
${fuegoEmoji} *¡El juego de cartas más emocionante!*
${rayoEmoji} *Objetivo:* Llegar lo más cerca posible a 21 sin pasarse
${diamanteEmoji} *Reglas:*
• A = 1 o 11 puntos (automático)
• J, Q, K = 10 puntos cada una
• Números = Su valor facial
${dineroEmoji} *¡Gana el doble de tu apuesta!*
${monedaEmoji} *Cómo jugar:*
• *${usedPrefix + command} [cantidad]* - Empezar nueva partida
• *${usedPrefix + command} hit* - Pedir carta
• *${usedPrefix + command} stand* - Plantarse
${celebracionEmoji} *Ejemplo:* *${usedPrefix + command} 100*
${coronaEmoji} ¡Demuestra que eres el rey de las cartas! ${coronaEmoji}`);
        }
    }
    
    let comando = text.toLowerCase().trim();
    
    // Iniciar nueva partida
    if (!isNaN(parseInt(comando))) {
        if (juego.enJuego) {
            return m.reply(`${explosionEmoji} *¡YA TIENES UNA PARTIDA EN CURSO!* ${explosionEmoji}\n\n${cartaEmoji} Termina la partida actual primero.\n${rayoEmoji} Usa *${usedPrefix + command} stand* para plantarte.`);
        }
        
        let apuesta = parseInt(comando);
        
        if (apuesta <= 0) {
            return m.reply(`${tristezaEmoji} *¡APUESTA NO VÁLIDA!* ${tristezaEmoji}\n\n${dineroEmoji} Debes apostar una cantidad positiva.\n${monedaEmoji} Ejemplo: *${usedPrefix + command} 50*`);
        }
        
        if (user.coin < apuesta) {
            return m.reply(`${tristezaEmoji} *¡FONDOS INSUFICIENTES!* ${tristezaEmoji}\n\n${monedaEmoji} No tienes suficientes monedas.\n${dineroEmoji} Balance actual: *${user.coin}* monedas\n${fuegoEmoji} Apuesta solicitada: *${apuesta}* monedas`);
        }
        
        // Crear nuevo mazo y repartir cartas
        let mazo = crearMazo();
        
        // Repartir 2 cartas al jugador y 2 al dealer
        juego.cartas = [mazo.pop(), mazo.pop()];
        juego.cartasDealer = [mazo.pop(), mazo.pop()];
        juego.apuesta = apuesta;
        juego.enJuego = true;
        juego.turnoJugador = true;
        juego.mazo = mazo;
        
        // Descontar la apuesta
        user.coin -= apuesta;
        
        let puntuacionJugador = calcularPuntuacion(juego.cartas);
        let cartasJugador = mostrarCartas(juego.cartas);
        let cartasDealer = mostrarCartas(juego.cartasDealer, true);
        
        let mensaje = `${cartaEmoji} *¡NUEVA PARTIDA DE BLACKJACK!* ${cartaEmoji}\n\n`;
        mensaje += `${dineroEmoji} *Apuesta:* ${apuesta} monedas\n`;
        mensaje += `${monedaEmoji} *Balance restante:* ${user.coin} monedas\n\n`;
        mensaje += `${coronaEmoji} *TUS CARTAS:*\n${cartasJugador}\n${fuegoEmoji} *Puntuación:* ${puntuacionJugador}\n\n`;
        mensaje += `${rayoEmoji} *CARTAS DEL DEALER:*\n${cartasDealer}\n${diamanteEmoji} *Puntuación:* ?\n\n`;
        
        // Verificar Blackjack natural
        if (puntuacionJugador === 21) {
            mensaje += `${celebracionEmoji} *¡BLACKJACK NATURAL!* ${celebracionEmoji}\n`;
            mensaje += `${explosionEmoji} ¡Has sacado 21 con las primeras 2 cartas!`;
        } else {
            mensaje += `${explosionEmoji} *¿QUÉ QUIERES HACER?*\n`;
            mensaje += `• *${usedPrefix + command} hit* - Pedir otra carta\n`;
            mensaje += `• *${usedPrefix + command} stand* - Plantarse`;
        }
        
        return m.reply(mensaje);
    }
    
    // Comandos durante la partida
    if (!juego.enJuego) {
        return m.reply(`${tristezaEmoji} *¡NO TIENES PARTIDA ACTIVA!* ${tristezaEmoji}\n\n${cartaEmoji} Inicia una nueva partida apostando una cantidad.\n${dineroEmoji} Ejemplo: *${usedPrefix + command} 50*`);
    }
    
    // Pedir carta (HIT)
    if (comando === 'hit' || comando === 'carta' || comando === 'pedir') {
        if (!juego.turnoJugador) {
            return m.reply(`${explosionEmoji} *¡NO ES TU TURNO!* ${explosionEmoji}\n\n${rayoEmoji} La partida ya terminó o no puedes pedir más cartas.`);
        }
        
        let puntuacionJugador = calcularPuntuacion(juego.cartas);
        
        if (puntuacionJugador >= 21) {
            return m.reply(`${tristezaEmoji} *¡NO PUEDES PEDIR MÁS CARTAS!* ${tristezaEmoji}\n\n${fuegoEmoji} Ya tienes ${puntuacionJugador} puntos.`);
        }
        
        // Dar nueva carta
        let nuevaCarta = juego.mazo.pop();
        juego.cartas.push(nuevaCarta);
        
        puntuacionJugador = calcularPuntuacion(juego.cartas);
        let cartasJugador = mostrarCartas(juego.cartas);
        let cartasDealer = mostrarCartas(juego.cartasDealer, true);
        
        let mensaje = `${cartaEmoji} *¡NUEVA CARTA!* ${cartaEmoji}\n\n`;
        mensaje += `${rayoEmoji} *Carta recibida:* ${nuevaCarta.palo}${nuevaCarta.valor}\n\n`;
        mensaje += `${coronaEmoji} *TUS CARTAS:*\n${cartasJugador}\n${fuegoEmoji} *Puntuación:* ${puntuacionJugador}\n\n`;
        mensaje += `${diamanteEmoji} *CARTAS DEL DEALER:*\n${cartasDealer}\n${explosionEmoji} *Puntuación:* ?\n\n`;
        
        if (puntuacionJugador > 21) {
            // Jugador se pasó
            juego.enJuego = false;
            mensaje += `${tristezaEmoji} *¡TE PASASTE!* ${tristezaEmoji}\n`;
            mensaje += `${explosionEmoji} Tienes ${puntuacionJugador} puntos (más de 21)\n`;
            mensaje += `${dineroEmoji} Has perdido ${juego.apuesta} monedas\n`;
            mensaje += `${monedaEmoji} Balance actual: ${user.coin} monedas`;
        } else if (puntuacionJugador === 21) {
            mensaje += `${celebracionEmoji} *¡PERFECTO! ¡21 PUNTOS!* ${celebracionEmoji}\n`;
            mensaje += `${coronaEmoji} Ahora es turno del dealer...`;
        } else {
            mensaje += `${explosionEmoji} *¿QUÉ QUIERES HACER?*\n`;
            mensaje += `• *${usedPrefix + command} hit* - Pedir otra carta\n`;
            mensaje += `• *${usedPrefix + command} stand* - Plantarse`;
        }
        
        return m.reply(mensaje);
    }
    
    // Plantarse (STAND)
    if (comando === 'stand' || comando === 'plantar' || comando === 'parar') {
        let puntuacionJugador = calcularPuntuacion(juego.cartas);
        
        if (puntuacionJugador > 21) {
            juego.enJuego = false;
            return m.reply(`${tristezaEmoji} *¡YA PERDISTE!* ${tristezaEmoji}\n\n${explosionEmoji} Te pasaste de 21 puntos.`);
        }
        
        juego.turnoJugador = false;
        
        // Turno del dealer
        let puntuacionDealer = calcularPuntuacion(juego.cartasDealer);
        
        // El dealer debe pedir cartas hasta llegar a 17 o más
        while (puntuacionDealer < 17) {
            let nuevaCarta = juego.mazo.pop();
            juego.cartasDealer.push(nuevaCarta);
            puntuacionDealer = calcularPuntuacion(juego.cartasDealer);
        }
        
        let cartasJugador = mostrarCartas(juego.cartas);
        let cartasDealer = mostrarCartas(juego.cartasDealer);
        
        let mensaje = `${cartaEmoji} *¡RESULTADO FINAL!* ${cartaEmoji}\n\n`;
        mensaje += `${coronaEmoji} *TUS CARTAS:*\n${cartasJugador}\n${fuegoEmoji} *Puntuación:* ${puntuacionJugador}\n\n`;
        mensaje += `${rayoEmoji} *CARTAS DEL DEALER:*\n${cartasDealer}\n${diamanteEmoji} *Puntuación:* ${puntuacionDealer}\n\n`;
        
        // Determinar ganador
        let ganancia = 0;
        
        if (puntuacionDealer > 21) {
            // Dealer se pasó
            ganancia = juego.apuesta * 2;
            user.coin += ganancia;
            mensaje += `${celebracionEmoji} *¡GANASTE!* ${celebracionEmoji}\n`;
            mensaje += `${explosionEmoji} El dealer se pasó de 21\n`;
            mensaje += `${dineroEmoji} Ganancia: +${ganancia} monedas\n`;
            mensaje += `${monedaEmoji} Nuevo balance: ${user.coin} monedas`;
        } else if (puntuacionJugador > puntuacionDealer) {
            // Jugador gana
            ganancia = juego.apuesta * 2;
            user.coin += ganancia;
            mensaje += `${celebracionEmoji} *¡GANASTE!* ${celebracionEmoji}\n`;
            mensaje += `${coronaEmoji} Tu puntuación fue mayor\n`;
            mensaje += `${dineroEmoji} Ganancia: +${ganancia} monedas\n`;
            mensaje += `${monedaEmoji} Nuevo balance: ${user.coin} monedas`;
        } else if (puntuacionJugador === puntuacionDealer) {
            // Empate
            user.coin += juego.apuesta;
            mensaje += `${rayoEmoji} *¡EMPATE!* ${rayoEmoji}\n`;
            mensaje += `${diamanteEmoji} Ambos tienen la misma puntuación\n`;
            mensaje += `${dineroEmoji} Se devuelve tu apuesta: +${juego.apuesta} monedas\n`;
            mensaje += `${monedaEmoji} Balance: ${user.coin} monedas`;
        } else {
            // Dealer gana
            mensaje += `${tristezaEmoji} *¡PERDISTE!* ${tristezaEmoji}\n`;
            mensaje += `${explosionEmoji} El dealer tuvo mejor puntuación\n`;
            mensaje += `${dineroEmoji} Pérdida: -${juego.apuesta} monedas\n`;
            mensaje += `${monedaEmoji} Balance actual: ${user.coin} monedas`;
        }
        
        mensaje += `\n\n${fuegoEmoji} ¿Otra partida? Usa *${usedPrefix + command} [cantidad]*`;
        
        juego.enJuego = false;
        return m.reply(mensaje);
    }
    
    // Comando no reconocido
    return m.reply(`${explosionEmoji} *¡COMANDO NO RECONOCIDO!* ${explosionEmoji}\n\n${cartaEmoji} Comandos disponibles:\n• *${usedPrefix + command} hit* - Pedir carta\n• *${usedPrefix + command} stand* - Plantarse\n• *${usedPrefix + command} [cantidad]* - Nueva partida`);
};

handler.help = ['blackjack', 'bj'];
handler.tags = ['economy', 'games', 'fun'];
handler.command = ['blackjack', 'bj', '21', 'cartas'];
handler.register = true;
handler.private = false; // Solo funciona en chats privados

export default handler;
