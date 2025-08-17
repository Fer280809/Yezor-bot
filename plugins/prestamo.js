import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
    const moneda = '🪙';
    const emojis = {
        loan: '🏦',
        money: '💰',
        warning: '⚠️',
        success: '✅',
        error: '❌',
        time: '⏰',
        percent: '📈',
        info: '📊',
        user: '👤',
        calculator: '🧮',
        bank: '🏛️',
        contract: '📋'
    };

    let user = global.db.data.users[m.sender];
    if (!user) return m.reply(`${emojis.error} *No estás registrado en la base de datos*`);

    // Inicializar datos de préstamo si no existen
    if (!user.loan) {
        user.loan = {
            amount: 0,
            interest: 0,
            deadline: 0,
            totalDebt: 0,
            active: false
        };
    }

    const subCommand = args[0]?.toLowerCase();

    // Función para formatear números
    const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Función para parsear tiempo
    const parseTime = (timeStr) => {
        if (!timeStr) return 0;
        const match = timeStr.match(/^(\d+)([hmdys])$/i);
        if (!match) return 0;
        
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        
        const multipliers = {
            's': 1000,           // segundos
            'm': 60 * 1000,      // minutos
            'h': 60 * 60 * 1000, // horas
            'd': 24 * 60 * 60 * 1000, // días
            'y': 365 * 24 * 60 * 60 * 1000 // años
        };
        
        return value * (multipliers[unit] || 0);
    };

    // Función para formatear tiempo
    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    };

    // Calcular interés basado en tiempo
    const calculateInterest = (time) => {
        const hours = time / (60 * 60 * 1000);
        if (hours <= 1) return 5;      // 1 hora o menos: 5%
        if (hours <= 24) return 10;    // Hasta 1 día: 10%
        if (hours <= 168) return 25;   // Hasta 1 semana: 25%
        if (hours <= 720) return 50;   // Hasta 1 mes: 50%
        return 100;                    // Más de 1 mes: 100%
    };

    switch (subCommand) {
        case 'pedir':
        case 'solicitar':
        case 'request': {
            if (user.loan.active) {
                return m.reply(`${emojis.warning} *Ya tienes un préstamo activo*\n\n${emojis.info} *Deuda actual:* ${formatNumber(user.loan.totalDebt)} ${moneda}\n${emojis.time} *Vence en:* ${formatTime(user.loan.deadline - Date.now())}\n\n*Usa* \`${usedPrefix}prestamo pagar\` *para pagar tu deuda*`);
            }

            const amount = parseInt(args[1]);
            const timeStr = args[2];

            if (!amount || !timeStr) {
                return m.reply(`${emojis.info} *Uso correcto:*\n\`${usedPrefix}prestamo pedir <cantidad> <tiempo>\`\n\n${emojis.calculator} *Ejemplos:*\n• \`${usedPrefix}prestamo pedir 5000 24h\`\n• \`${usedPrefix}prestamo pedir 1000 5m\`\n• \`${usedPrefix}prestamo pedir 2000 7d\`\n\n${emojis.time} *Formatos de tiempo:*\n• s = segundos\n• m = minutos\n• h = horas\n• d = días\n• y = años`);
            }

            const bankBalance = user.bank || 0;
            const maxLoan = bankBalance * 3; // Máximo 3 veces lo que tiene en el banco

            if (amount > maxLoan) {
                return m.reply(`${emojis.error} *Préstamo denegado*\n\n${emojis.bank} *Tu saldo bancario:* ${formatNumber(bankBalance)} ${moneda}\n${emojis.money} *Préstamo máximo:* ${formatNumber(maxLoan)} ${moneda}\n\n*Deposita más dinero en el banco para aumentar tu límite de crédito*`);
            }

            if (amount < 100) {
                return m.reply(`${emojis.warning} *El préstamo mínimo es de 100* ${moneda}`);
            }

            const loanTime = parseTime(timeStr);
            if (loanTime === 0) {
                return m.reply(`${emojis.error} *Formato de tiempo inválido*\n\n${emojis.time} *Formatos válidos:*\n• 5s (5 segundos)\n• 30m (30 minutos)\n• 24h (24 horas)\n• 7d (7 días)\n• 1y (1 año)`);
            }

            const interestRate = calculateInterest(loanTime);
            const interestAmount = Math.floor(amount * (interestRate / 100));
            const totalDebt = amount + interestAmount;
            const deadline = Date.now() + loanTime;

            // Otorgar préstamo
            user.coin = (user.coin || 0) + amount;
            user.loan = {
                amount: amount,
                interest: interestAmount,
                deadline: deadline,
                totalDebt: totalDebt,
                active: true
            };

            const border = '┏━━━━━━━━━━━━━━┓';
            const borderEnd = '┗━━━━━━━━━━━━━━┛';
            const divider = '┣━━━━━━━━━━━━━━┫';

            const loanText = `
${emojis.bank} *PRÉSTAMO APROBADO* ${emojis.success}
${border}
${emojis.money} *Cantidad:* ${formatNumber(amount)} ${moneda}
${emojis.percent} *Interés (${interestRate}%):* ${formatNumber(interestAmount)} ${moneda}
${emojis.calculator} *Total a pagar:* ${formatNumber(totalDebt)} ${moneda}
${divider}
${emojis.time} *Plazo:* ${formatTime(loanTime)}
${emojis.contract} *Vencimiento:* ${new Date(deadline).toLocaleString()}
${divider}
${emojis.warning} *RECUERDA PAGAR A TIEMPO*
*O se aplicarán penalizaciones*
${borderEnd}`;

            await conn.sendMessage(m.chat, {
                text: loanText,
                contextInfo: {
                    externalAdReply: {
                        title: `${emojis.bank} PRÉSTAMO BANCARIO`,
                        body: `Préstamo: ${formatNumber(amount)} ${moneda}`,
                        thumbnail: await (await fetch('https://i.ibb.co/BsJs1r8/bank.png')).buffer(),
                        sourceUrl: 'https://github.com/'
                    }
                }
            }, { quoted: m });

            await m.react('💰');
            break;
        }

        case 'pagar':
        case 'pay': {
            if (!user.loan.active) {
                return m.reply(`${emojis.info} *No tienes préstamos activos*`);
            }

            const currentTime = Date.now();
            let debt = user.loan.totalDebt;

            // Verificar si está vencido
            if (currentTime > user.loan.deadline) {
                const overdueDays = Math.floor((currentTime - user.loan.deadline) / (24 * 60 * 60 * 1000));
                const penalty = Math.floor(user.loan.amount * 0.1 * overdueDays); // 10% por día de retraso
                debt += penalty;
                
                await m.reply(`${emojis.warning} *¡PRÉSTAMO VENCIDO!*\n\n${emojis.time} *Días de retraso:* ${overdueDays}\n${emojis.percent} *Penalización:* ${formatNumber(penalty)} ${moneda}\n${emojis.calculator} *Nueva deuda:* ${formatNumber(debt)} ${moneda}`);
            }

            const userMoney = (user.coin || 0) + (user.bank || 0);
            
            if (userMoney < debt) {
                return m.reply(`${emojis.error} *No tienes suficiente dinero*\n\n${emojis.calculator} *Deuda total:* ${formatNumber(debt)} ${moneda}\n${emojis.money} *Tu dinero total:* ${formatNumber(userMoney)} ${moneda}\n${emojis.warning} *Te faltan:* ${formatNumber(debt - userMoney)} ${moneda}`);
            }

            // Pagar deuda
            let remaining = debt;
            
            // Primero usar efectivo
            if (user.coin >= remaining) {
                user.coin -= remaining;
                remaining = 0;
            } else {
                remaining -= user.coin;
                user.coin = 0;
            }
            
            // Luego usar banco
            if (remaining > 0) {
                user.bank -= remaining;
            }

            // Limpiar préstamo
            user.loan = {
                amount: 0,
                interest: 0,
                deadline: 0,
                totalDebt: 0,
                active: false
            };

            await m.reply(`${emojis.success} *¡PRÉSTAMO PAGADO!*\n\n${emojis.money} *Cantidad pagada:* ${formatNumber(debt)} ${moneda}\n${emojis.bank} *Tu historial crediticio ha mejorado*\n\n*¡Ahora puedes solicitar préstamos más grandes!*`);
            await m.react('✅');
            break;
        }

        case 'estado':
        case 'status': {
            if (!user.loan.active) {
                const bankBalance = user.bank || 0;
                const maxLoan = bankBalance * 3;
                
                return m.reply(`${emojis.info} *No tienes préstamos activos*\n\n${emojis.bank} *Tu límite de crédito:* ${formatNumber(maxLoan)} ${moneda}\n${emojis.money} *Basado en tu saldo bancario:* ${formatNumber(bankBalance)} ${moneda}\n\n*Usa* \`${usedPrefix}prestamo pedir <cantidad> <tiempo>\` *para solicitar un préstamo*`);
            }

            const timeLeft = user.loan.deadline - Date.now();
            const isOverdue = timeLeft <= 0;
            
            let debt = user.loan.totalDebt;
            
            if (isOverdue) {
                const overdueDays = Math.floor(Math.abs(timeLeft) / (24 * 60 * 60 * 1000));
                const penalty = Math.floor(user.loan.amount * 0.1 * overdueDays);
                debt += penalty;
            }

            const border = '┏━━━━━━━━━━━━━━┓';
            const borderEnd = '┗━━━━━━━━━━━━━━┛';
            const divider = '┣━━━━━━━━━━━━━━┫';

            const statusText = `
${emojis.contract} *ESTADO DEL PRÉSTAMO* ${emojis.info}
${border}
${emojis.money} *Préstamo original:* ${formatNumber(user.loan.amount)} ${moneda}
${emojis.percent} *Interés:* ${formatNumber(user.loan.interest)} ${moneda}
${emojis.calculator} *Deuda actual:* ${formatNumber(debt)} ${moneda}
${divider}
${emojis.time} *Estado:* ${isOverdue ? '🔴 VENCIDO' : '🟢 VIGENTE'}
${isOverdue ? 
    `${emojis.warning} *Retraso:* ${formatTime(Math.abs(timeLeft))}` :
    `${emojis.time} *Tiempo restante:* ${formatTime(timeLeft)}`
}
${emojis.contract} *Vencimiento:* ${new Date(user.loan.deadline).toLocaleString()}
${borderEnd}

*Usa* \`${usedPrefix}prestamo pagar\` *para liquidar tu deuda*`;

            await m.reply(statusText);
            await m.react(isOverdue ? '🔴' : '🟢');
            break;
        }

        case 'calculadora':
        case 'calc': {
            const amount = parseInt(args[1]);
            const timeStr = args[2];

            if (!amount || !timeStr) {
                return m.reply(`${emojis.calculator} *Calculadora de préstamos*\n\n*Uso:* \`${usedPrefix}prestamo calc <cantidad> <tiempo>\`\n\n*Ejemplo:* \`${usedPrefix}prestamo calc 5000 24h\``);
            }

            const loanTime = parseTime(timeStr);
            if (loanTime === 0) {
                return m.reply(`${emojis.error} *Formato de tiempo inválido*`);
            }

            const bankBalance = user.bank || 0;
            const maxLoan = bankBalance * 3;
            
            if (amount > maxLoan) {
                return m.reply(`${emojis.warning} *Cantidad excede tu límite de crédito*\n\n${emojis.money} *Límite máximo:* ${formatNumber(maxLoan)} ${moneda}`);
            }

            const interestRate = calculateInterest(loanTime);
            const interestAmount = Math.floor(amount * (interestRate / 100));
            const totalDebt = amount + interestAmount;

            const calcText = `
${emojis.calculator} *SIMULACIÓN DE PRÉSTAMO* ${emojis.bank}
┏━━━━━━━━━━━━━━┓
${emojis.money} *Préstamo:* ${formatNumber(amount)} ${moneda}
${emojis.time} *Plazo:* ${formatTime(loanTime)}
${emojis.percent} *Tasa de interés:* ${interestRate}%
┣━━━━━━━━━━━━━━┫
${emojis.calculator} *Interés:* ${formatNumber(interestAmount)} ${moneda}
${emojis.bank} *Total a pagar:* ${formatNumber(totalDebt)} ${moneda}
┗━━━━━━━━━━━━━━┛

*¿Quieres solicitar este préstamo?*
\`${usedPrefix}prestamo pedir ${amount} ${timeStr}\``;

            await m.reply(calcText);
            break;
        }

        default: {
            const helpText = `
${emojis.bank} *SISTEMA DE PRÉSTAMOS* ${emojis.money}
┏━━━━━━━━━━━━━━━━┓
${emojis.contract} *COMANDOS DISPONIBLES:*
┣━━━━━━━━━━━━━━━━┫
${emojis.money} \`${usedPrefix}prestamo pedir <cantidad> <tiempo>\`
*Solicitar un préstamo*

${emojis.calculator} \`${usedPrefix}prestamo calc <cantidad> <tiempo>\`
*Calcular intereses*

${emojis.info} \`${usedPrefix}prestamo estado\`
*Ver estado de tu préstamo*

${emojis.success} \`${usedPrefix}prestamo pagar\`
*Pagar tu préstamo*
┣━━━━━━━━━━━━━━━━┫
${emojis.time} *FORMATOS DE TIEMPO:*
• 5s, 30m, 24h, 7d, 1y

${emojis.percent} *TASAS DE INTERÉS:*
• ≤1h: 5% | ≤24h: 10%
• ≤7d: 25% | ≤30d: 50%
• >30d: 100%
┣━━━━━━━━━━━━━━━━┫
${emojis.warning} *LÍMITE DE CRÉDITO:*
*3x tu saldo bancario*
┗━━━━━━━━━━━━━━━━┛`;

            await m.reply(helpText);
            break;
        }
    }
}

handler.help = ['prestamo', 'loan']
handler.tags = ['rpg']
handler.command = ['prestamo', 'prestamos', 'loan', 'credito']
handler.register = true
handler.group = true

export default handler
