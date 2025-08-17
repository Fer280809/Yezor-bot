let handler = async (m, { conn, usedPrefix }) => {
    // Emojis para cancelar divorcio
    const corazonEmoji = '💕';
    const anilloEmoji = '💍';
    const florEmoji = '🌹';
    const celebracionEmoji = '🎉';
    const tristezaEmoji = '😢';
    const liberacionEmoji = '🕊️';
    const solEmoji = '☀️';
    const nuevoComienzo = '🌅';
    const alivioCEmoji = '😌';
    const abrazoEmoji = '🤗';
    const corazonRotoEmoji = '💔';
    const reparacionEmoji = '🔧';
    const cancelarEmoji = '❌';
    const checkEmoji = '✅';
    const arcoirisEmoji = '🌈';
    
    let user = m.sender;
    
    // Verificar si hay solicitud de divorcio pendiente
    if (!global.db.data.divorceRequests || !global.db.data.divorceRequests[user]) {
        return m.reply(`${tristezaEmoji} *¡NO HAY SOLICITUD DE DIVORCIO PARA CANCELAR!* ${tristezaEmoji}\n\n${anilloEmoji} No tienes ninguna solicitud de divorcio pendiente.\n\n${corazonEmoji} *¡Eso es buena señal! Significa que tu matrimonio está estable* ${solEmoji}`);
    }

    // Obtener información de la solicitud
    let divorceRequest = global.db.data.divorceRequests[user];
    let spouse = divorceRequest.spouse;
    let marriageKey = divorceRequest.marriageKey;
    
    // Verificar que el matrimonio aún exista
    if (!global.db.data.marriages[marriageKey]) {
        delete global.db.data.divorceRequests[user];
        return m.reply(`${tristezaEmoji} *¡ERROR EN EL SISTEMA!* ${tristezaEmoji}\n\n${anilloEmoji} El matrimonio ya no existe en los registros.\n\n${solEmoji} *Pero tu intención de cancelar el divorcio cuenta* ${corazonEmoji}`);
    }

    // Obtener información del matrimonio
    let marriage = global.db.data.marriages[marriageKey];
    let marriageDate = marriage.marriageDate;
    
    // CANCELAR LA SOLICITUD DE DIVORCIO
    delete global.db.data.divorceRequests[user];

    let userName = user.split('@')[0];
    let spouseName = spouse.split('@')[0];

    let mensaje = `${checkEmoji} *¡DIVORCIO CANCELADO EXITOSAMENTE!* ${checkEmoji}\n\n`;
    mensaje += `${reparacionEmoji} **RECONCILIACIÓN OFICIAL** ${reparacionEmoji}\n`;
    mensaje += `${arcoirisEmoji}━━━━━━━━━━━━━━━━━━━━━━━${arcoirisEmoji}\n\n`;
    mensaje += `${corazonEmoji} **El amor triunfa una vez más:**\n`;
    mensaje += `${florEmoji} @${userName} ha decidido darle otra oportunidad al matrimonio ${florEmoji}\n\n`;
    mensaje += `${anilloEmoji} **Estado actual del matrimonio:**\n`;
    mensaje += `${celebracionEmoji} @${userName} ${corazonEmoji} @${spouseName} - **SIGUEN CASADOS**\n`;
    mensaje += `${solEmoji} Casados desde: ${marriageDate}\n`;
    mensaje += `${nuevoComienzo} Reconciliación: ${new Date().toLocaleDateString('es-ES')}\n\n`;
    
    // Mensaje motivacional aleatorio
    let mensajesMotivacionales = [
        `${abrazoEmoji} *"El amor verdadero no se rinde al primer obstáculo"* ${abrazoEmoji}`,
        `${liberacionEmoji} *"Decidiste luchar por tu matrimonio, ¡eso es admirable!"* ${liberacionEmoji}`,
        `${florEmoji} *"Las mejores relaciones son aquellas que superan las tormentas"* ${florEmoji}`,
        `${solEmoji} *"Después de la tormenta, siempre sale el sol"* ${arcoirisEmoji}`,
        `${corazonEmoji} *"El amor que perdona es el amor que prevalece"* ${corazonEmoji}`,
        `${nuevoComienzo} *"Cada día es una nueva oportunidad para amar mejor"* ${nuevoComienzo}`
    ];
    
    let mensajeAleatorio = mensajesMotivacionales[Math.floor(Math.random() * mensajesMotivacionales.length)];
    mensaje += mensajeAleatorio + '\n\n';
    
    mensaje += `${reparacionEmoji} **CERTIFICADO DE RECONCILIACIÓN:**\n`;
    mensaje += `${checkEmoji} Solicitud de divorcio oficialmente cancelada\n`;
    mensaje += `${anilloEmoji} Vínculo matrimonial restaurado y fortalecido\n`;
    mensaje += `${corazonEmoji} Ambos cónyuges confirmados como pareja estable\n\n`;
    
    mensaje += `${celebracionEmoji} *¡Que viva el amor que no se rinde!* ${celebracionEmoji}\n`;
    mensaje += `${florEmoji} *Esperamos que este sea el comienzo de una nueva etapa* ${solEmoji}\n\n`;
    mensaje += `${alivioCEmoji} *"A veces necesitamos llegar al borde para valorar lo que tenemos"* ${abrazoEmoji}`;

    await conn.reply(m.chat, mensaje, m, { mentions: [user, spouse] });
};

handler.help = ['cancelardivorcio'];
handler.tags = ['fun', 'social'];
handler.command = ['cancelardivorcio', 'cancelar', 'nodivorcio', 'quedarsecasado'];
handler.group = true;
handler.register = true;

export default handler;
