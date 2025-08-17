let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Emojis para hacer el sistema más llamativo
    const corazonEmoji = '💕';
    const anilloEmoji = '💍';
    const florEmoji = '🌹';
    const celebracionEmoji = '🎉';
    const tristezaEmoji = '😢';
    const coronaEmoji = '👑';
    const fuegosEmoji = '🎆';
    const cupidoEmoji = '💘';
    const besosEmoji = '💋';
    
    // Verificar que se mencione a alguien
    if (!m.mentionedJid || m.mentionedJid.length === 0) {
        return m.reply(`${anilloEmoji} *¡PROPUESTA DE MATRIMONIO!* ${anilloEmoji}\n\n${florEmoji} Para proponer matrimonio, menciona a la persona especial:\n\n${cupidoEmoji} Ejemplo: *${usedPrefix + command} @usuario*\n\n${corazonEmoji} *¡Encuentra el amor verdadero!* ${corazonEmoji}`);
    }

    let proposer = m.sender; // Quien propone
    let target = m.mentionedJid[0]; // A quien le proponen
    
    // Verificar que no se case consigo mismo
    if (proposer === target) {
        return m.reply(`${tristezaEmoji} *¡NO PUEDES CASARTE CONTIGO MISMO!* ${tristezaEmoji}\n\n${florEmoji} El amor propio está bien, pero busca a alguien más para compartir tu vida ${corazonEmoji}`);
    }

    // Inicializar base de datos de matrimonios si no existe
    if (!global.db.data.marriages) {
        global.db.data.marriages = {};
    }
    if (!global.db.data.proposals) {
        global.db.data.proposals = {};
    }

    // Verificar si alguno ya está casado
    let proposerMarried = Object.values(global.db.data.marriages).find(marriage => 
        marriage.spouse1 === proposer || marriage.spouse2 === proposer
    );
    
    let targetMarried = Object.values(global.db.data.marriages).find(marriage => 
        marriage.spouse1 === target || marriage.spouse2 === target
    );

    if (proposerMarried) {
        return m.reply(`${anilloEmoji} *¡YA ESTÁS CASADO/A!* ${anilloEmoji}\n\n${corazonEmoji} Ya tienes una pareja especial. Si quieres casarte con alguien más, primero tendrás que divorciarte ${tristezaEmoji}`);
    }

    if (targetMarried) {
        return m.reply(`${anilloEmoji} *¡ESA PERSONA YA ESTÁ CASADA!* ${anilloEmoji}\n\n${florEmoji} Tu amor platónico ya tiene pareja. Busca a alguien más para compartir tu corazón ${corazonEmoji}`);
    }

    // Verificar si ya hay una propuesta pendiente
    let proposalKey = `${proposer}_${target}`;
    let reverseProposalKey = `${target}_${proposer}`;
    
    if (global.db.data.proposals[proposalKey]) {
        return m.reply(`${cupidoEmoji} *¡YA TIENES UNA PROPUESTA PENDIENTE!* ${cupidoEmoji}\n\n${florEmoji} Ya le propusiste matrimonio a esta persona. Ten paciencia mientras decide ${corazonEmoji}`);
    }

    // Verificar si la otra persona ya le propuso (amor mutuo)
    if (global.db.data.proposals[reverseProposalKey]) {
        // ¡Amor mutuo! Se casan automáticamente
        delete global.db.data.proposals[reverseProposalKey];
        
        // Crear el matrimonio
        let marriageId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        global.db.data.marriages[marriageId] = {
            spouse1: proposer,
            spouse2: target,
            marriageDate: new Date().toLocaleDateString('es-ES'),
            marriageTime: new Date().toLocaleTimeString('es-ES')
        };

        let mensaje = `${fuegosEmoji} *¡AMOR MUTUO DETECTADO!* ${fuegosEmoji}\n\n`;
        mensaje += `${anilloEmoji} @${proposer.split('@')[0]} y @${target.split('@')[0]} ${anilloEmoji}\n\n`;
        mensaje += `${celebracionEmoji} *¡SE HAN CASADO AUTOMÁTICAMENTE!* ${celebracionEmoji}\n\n`;
        mensaje += `${corazonEmoji} Ambos se propusieron matrimonio mutuamente\n`;
        mensaje += `${florEmoji} Fecha de matrimonio: ${global.db.data.marriages[marriageId].marriageDate}\n`;
        mensaje += `${cupidoEmoji} Hora: ${global.db.data.marriages[marriageId].marriageTime}\n\n`;
        mensaje += `${coronaEmoji} *¡Que vivan los novios!* ${coronaEmoji} ${besosEmoji}`;

        return conn.reply(m.chat, mensaje, m, { mentions: [proposer, target] });
    }

    // Crear nueva propuesta
    global.db.data.proposals[proposalKey] = {
        proposer: proposer,
        target: target,
        proposalDate: new Date().toLocaleDateString('es-ES'),
        proposalTime: new Date().toLocaleTimeString('es-ES'),
        chatId: m.chat
    };

    let mensaje = `${anilloEmoji} *¡PROPUESTA DE MATRIMONIO!* ${anilloEmoji}\n\n`;
    mensaje += `${florEmoji} @${proposer.split('@')[0]} le ha propuesto matrimonio a @${target.split('@')[0]} ${florEmoji}\n\n`;
    mensaje += `${cupidoEmoji} *"¿Quieres casarte conmigo?"* ${cupidoEmoji}\n\n`;
    mensaje += `${corazonEmoji} Para aceptar: *${usedPrefix}aceptar @${proposer.split('@')[0]}*\n`;
    mensaje += `${tristezaEmoji} Para rechazar: *${usedPrefix}rechazar @${proposer.split('@')[0]}*\n\n`;
    mensaje += `${celebracionEmoji} *¡El amor está en el aire!* ${celebracionEmoji}`;

    await conn.reply(m.chat, mensaje, m, { mentions: [proposer, target] });
};

handler.help = ['marry'];
handler.tags = ['fun', 'social'];
handler.command = ['marry', 'casarse', 'proponer'];
handler.group = true;
handler.register = true;

export default handler;


