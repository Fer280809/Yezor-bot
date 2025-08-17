import moment from 'moment-timezone';
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    let userId;
    if (m.quoted && m.quoted.sender) {
        userId = m.quoted.sender;
    } else {
        userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    }

    let user = global.db.data.users[userId];

    let name = conn.getName(userId);
    let cumpleanos = user.birth || 'No especificado';
    let genero = user.genre || 'No especificado';
    let description = user.description || 'Sin Descripción';
    let exp = user.exp || 0;
    let nivel = user.level || 0;
    let role = user.role || 'Sin Rango';
    let coins = user.coin || 0;
    let bankCoins = user.bank || 0;
    
    // Verificar estado de matrimonio desde la base de datos de matrimonios
    let marriageInfo = null;
    let partnerName = 'Nadie';
    let marriageDate = null;
    
    if (global.db.data.marriages) {
        marriageInfo = Object.values(global.db.data.marriages).find(marriage => 
            marriage.spouse1 === userId || marriage.spouse2 === userId
        );
        
        if (marriageInfo) {
            let partnerId = marriageInfo.spouse1 === userId ? marriageInfo.spouse2 : marriageInfo.spouse1;
            partnerName = conn.getName(partnerId);
            marriageDate = marriageInfo.marriageDate;
        }
    }
    
    // Obtener la fecha actual
    const now = moment();
    const registerDate = user.regTime ? moment(user.regTime) : now;
    const timeDiff = now.diff(registerDate, 'days');
    
    // Actividad reciente
    const lastSeen = user.lastSeen ? moment(user.lastSeen).fromNow() : 'Desconocido';

    // Obtener foto de perfil del usuario
    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg');

    // Emojis según género
    let genderEmoji = '⚪';
    if (genero.toLowerCase().includes('hombre') || genero.toLowerCase().includes('masculino')) {
        genderEmoji = '♂️';
    } else if (genero.toLowerCase().includes('mujer') || genero.toLowerCase().includes('femenino')) {
        genderEmoji = '♀️';
    }
    
    // Estado premium con bling
    let premiumStatus = user.premium ? '✨ PREMIUM ✨' : '❌ FREE';
    
    // Emojis para rangos
    let roleEmoji = '👤';
    if (role.toLowerCase().includes('admin')) roleEmoji = '👑';
    else if (role.toLowerCase().includes('mod')) roleEmoji = '🛡️';
    else if (role.toLowerCase().includes('vip')) roleEmoji = '💎';

    // Estado civil mejorado - FORMATO CORREGIDO PARA CELULAR
    let maritalStatus;
    if (marriageInfo) {
        maritalStatus = `💍 Casado/a con ${partnerName}`;
        if (marriageDate) {
            maritalStatus += `\n┃ 💕 Desde: ${marriageDate}`;
        }
    } else {
        maritalStatus = '💔 Soltero/a';
    }

    // TEXTO OPTIMIZADO PARA CELULAR
    let profileText = `╭━━━━━━━━━━━━━━━━━━━━━╮
┃    🌟 PERFIL USUARIO 🌟    
╰━━━━━━━━━━━━━━━━━━━━━╯

👤 @${userId.split('@')[0]}
🏷️ ${name}
📝 ${description}

╭━━━━━━━━━━━━━━━━━━━━━╮
┃        ℹ️ PERSONAL ℹ️        
╰━━━━━━━━━━━━━━━━━━━━━╯

🎂 Edad: ${user.age || 'Desconocida'}
🎊 Cumpleaños: ${cumpleanos}
${genderEmoji} Género: ${genero}
💘 Estado: ${maritalStatus}
⏱️ Registrado: ${timeDiff} días
⌚ Actividad: ${lastSeen}

╭━━━━━━━━━━━━━━━━━━━━━╮
┃       🏆 STATS 🏆       
╰━━━━━━━━━━━━━━━━━━━━━╯

✨ EXP: ${exp.toLocaleString()}
🔥 Nivel: ${nivel}
${roleEmoji} Rango: ${role}

╭━━━━━━━━━━━━━━━━━━━━━╮
┃      💰 ECONOMÍA 💰      
╰━━━━━━━━━━━━━━━━━━━━━╯

👛 Cartera: ${coins.toLocaleString()} ${global.moneda || '🪙'}
🏦 Banco: ${bankCoins.toLocaleString()} ${global.moneda || '🪙'}
💼 Total: ${(coins + bankCoins).toLocaleString()} ${global.moneda || '🪙'}

╭━━━━━━━━━━━━━━━━━━━━━╮
┃       🌈 ESTADOS 🌈       
╰━━━━━━━━━━━━━━━━━━━━━╯

👑 Premium: ${premiumStatus}
🧩 VIP: ${user.vip ? '✅ Activado' : '❌ Desactivado'}
🛡️ Reputación: ${user.reputation || 0} ⭐

🔮 /editar para personalizar
💫 Gana EXP interactuando
${marriageInfo ? '' : '💘 /marry para encontrar amor'}`;

    try {
        // MÉTODO CORREGIDO - Enviar imagen con caption
        await conn.sendMessage(m.chat, { 
            image: { url: perfil }, // Usar la foto de perfil del usuario
            caption: profileText,
            mentions: [userId]
        }, { quoted: m });
        
    } catch (error) {
        console.log('Error enviando imagen, enviando con imagen por defecto...');
        // Si falla, usar imagen por defecto
        await conn.sendMessage(m.chat, { 
            image: { url: 'https://files.catbox.moe/i2f15r.jpg' },
            caption: profileText,
            mentions: [userId]
        }, { quoted: m });
    }
};

handler.help = ['profile', 'perfil'];
handler.tags = ['rg'];
handler.command = ['profile', 'perfil'];

export default handler;
