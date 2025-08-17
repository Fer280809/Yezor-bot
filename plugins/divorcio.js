let handler = async (m, { conn, usedPrefix, command }) => {
    // Emojis para el divorcio
    const corazonRotoEmoji = '💔';
    const llorandoEmoji = '😭';
    const anilloEmoji = '💍';
    const tristezaEmoji = '😢';
    const liberacionEmoji = '🕊️';
    const documentoEmoji = '📄';
    const funeralEmoji = '⚰️';
    const lluviaEmoji = '🌧️';
    const solEmoji = '☀️';
    const nuevoComienzo = '🌅';
    
    let user = m.sender;
    
    // Inicializar base de datos si no existe
    if (!global.db.data.marriages) {
        global.db.data.marriages = {};
    }

    // Buscar si el usuario está casado
    let userMarriage = null;
    let marriageKey = null;
    
    for (let [key, marriage] of Object.entries(global.db.data.marriages)) {
        if (marriage.spouse1 === user || marriage.spouse2 === user) {
            userMarriage = marriage;
            marriageKey = key;
            break;
        }
    }

    // Verificar si está casado
    if (!userMarriage) {
        return m.reply(`${tristezaEmoji} *¡NO ESTÁS CASADO/A!* ${tristezaEmoji}\n\n${anilloEmoji} No puedes divorciarte si no estás casado/a.\n\n${nuevoComienzo} *¿Quizás es hora de buscar el amor?* ${nuevoComienzo}`);
    }

    // Determinar quién es la pareja
    let spouse = userMarriage.spouse1 === user ? userMarriage.spouse2 : userMarriage.spouse1;
    let userName = user.split('@')[0];
    let spouseName = spouse.split('@')[0];

    // Mensaje de confirmación dramático
    let confirmationMsg = `${corazonRotoEmoji} *¡SOLICITUD DE DIVORCIO!* ${corazonRotoEmoji}\n\n`;
    confirmationMsg += `${llorandoEmoji} @${userName} quiere divorciarse de @${spouseName} ${llorandoEmoji}\n\n`;
    confirmationMsg += `${documentoEmoji} *Detalles del matrimonio:*\n`;
    confirmationMsg += `${anilloEmoji} Casados el: ${userMarriage.marriageDate}\n`;
    confirmationMsg += `${lluviaEmoji} Duración: Desde ${userMarriage.marriageDate}\n\n`;
    confirmationMsg += `${funeralEmoji} *"Lo que el amor unió, la decisión lo separa"* ${funeralEmoji}\n\n`;
    confirmationMsg += `⚠️ **CONFIRMAR DIVORCIO:**\n`;
    confirmationMsg += `${tristezaEmoji} Para confirmar: *${usedPrefix}confirmardivorcio*\n`;
    confirmationMsg += `${anilloEmoji} Para cancelar: *${usedPrefix}cancelardivorcio*\n\n`;
    confirmationMsg += `${lluviaEmoji} *Piénsalo bien... ¿realmente quieres terminar esto?* ${lluviaEmoji}`;

    // Guardar solicitud de divorcio temporal
    if (!global.db.data.divorceRequests) {
        global.db.data.divorceRequests = {};
    }
    
    global.db.data.divorceRequests[user] = {
        marriageKey: marriageKey,
        spouse: spouse,
        requestTime: Date.now()
    };

    await conn.reply(m.chat, confirmationMsg, m, { mentions: [user, spouse] });
};

handler.help = ['divorcio'];
handler.tags = ['fun', 'social'];
handler.command = ['divorcio', 'divorce', 'separarse'];
handler.group = true;
handler.register = true;

export default handler;
