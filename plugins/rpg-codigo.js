let handler = async (m, { conn, text }) => {
    let args = text.trim().split(' ');
    let amount = parseInt(args[0]);
    let maxUses = parseInt(args[1]) || 50; // Por defecto 50 usos si no se especifica

    if (isNaN(amount) || amount <= 0) {
        return conn.reply(m.chat, `${emoji} Por favor, ingrese una cantidad válida de ${moneda}.\n\n*Uso correcto:*\n• #codigo <cantidad> \n• #codigo <cantidad> <máximo de personas>\n\n*Ejemplos:*\n• #codigo 1000\n• #codigo 500 10`, m);
    }

    if (maxUses <= 0 || maxUses > 100) {
        return conn.reply(m.chat, `${emoji} El número máximo de personas debe ser entre 1 y 100.`, m);
    }

    let code = Math.random().toString(36).substring(2, 10).toUpperCase();

    if (!global.db.data.codes) global.db.data.codes = {};
    global.db.data.codes[code] = { coin: amount, claimedBy: [], maxUses: maxUses };

    let message = `*꧁𝗡𝘂𝗲𝘃𝗼 𝗖𝗼́𝗱𝗶𝗴𝗼 𝗗𝗶𝘀𝗽𝗼𝗻𝗶𝗯𝗹𝗲꧂*

¡𝐻𝑜𝑙𝑎 𝑞𝑢𝑒𝑟𝑖𝑑𝑎 𝑐𝑜𝑚𝑢𝑛𝑖𝑑𝑎𝑑! 𝐻𝑒 𝑔𝑒𝑛𝑒𝑟𝑎𝑑𝑜 𝑢𝑛 𝑛𝑢𝑒𝑣𝑜 𝑐𝑜́𝑑𝑖𝑔𝑜 𝑒𝑠𝑝𝑒𝑐𝑖𝑎𝑙 𝑝𝑎𝑟𝑎 𝑡𝑜𝑑𝑜𝑠 𝑢𝑠𝑡𝑒𝑑𝑒𝑠. 𝐸𝑠𝑡𝑒 𝑒𝑠 𝑢𝑛 𝑟𝑒𝑔𝑎𝑙𝑜 𝑝𝑜𝑟 𝑠𝑢 𝑎𝑝𝑜𝑦𝑜 𝑦 𝑝𝑎𝑟𝑡𝑖𝑐𝑖𝑝𝑎𝑐𝑖𝑜́𝑛 𝑒𝑛 𝑒𝑙 𝑏𝑜𝑡.

꧁𓊈𒆜𝗗𝗲𝘁𝗮𝗹𝗹𝗲𝘀 𝗱𝗲𝗹 𝗖𝗼́𝗱𝗶𝗴𝗼𒆜𓊉꧂
🎁 *𝐶𝑜́𝑑𝑖𝑔𝑜:* \`${code}\`
💰 *𝑃𝑟𝑒𝑚𝑖𝑜:* ${amount} ${moneda}
👥 *𝑈𝑠𝑜𝑠 𝑑𝑖𝑠𝑝𝑜𝑛𝑖𝑏𝑙𝑒𝑠:* ${maxUses} personas
⏰ *𝐸𝑠𝑡𝑎𝑑𝑜:* Activo y listo para usar

꧁𓊈𒆜¿𝗖𝗼́𝗺𝗼 𝗰𝗮𝗻𝗷𝗲𝗮𝗿 𝘁𝘂 𝗽𝗿𝗲𝗺𝗶𝗼?𒆜𓊉꧂
𝑉𝑒 𝑎𝑙 𝑏𝑜𝑡 𝑑𝑒 𝐴𝐻𝑇𝐴-𝐵𝑂𝑇 𝑒𝑛 𝑐𝑢𝑎𝑙𝑞𝑢𝑖𝑒𝑟 𝑐ℎ𝑎𝑡 𝑦 𝑢𝑠𝑎 𝑒𝑙 𝑠𝑖𝑔𝑢𝑖𝑒𝑛𝑡𝑒 𝑐𝑜𝑚𝑎𝑛𝑑𝑜:
★ #canjear ${code}

𝑅𝑒𝑐𝑢𝑒𝑟𝑑𝑎 𝑞𝑢𝑢 𝑒𝑠𝑡𝑒 𝑐𝑜́𝑑𝑖𝑔𝑜 𝑒𝑠 𝑝𝑜𝑟 𝑡𝑖𝑒𝑚𝑝𝑜 𝑙𝑖𝑚𝑖𝑡𝑎𝑑𝑜 𝑦 𝑠𝑜́𝑙𝑜 𝑝𝑢𝑒𝑑𝑒 𝑠𝑒𝑟 𝑢𝑠𝑎𝑑𝑜 𝑝𝑜𝑟 50 𝑝𝑒𝑟𝑠𝑜𝑛𝑎𝑠, 𝑎𝑠𝑖́ 𝑞𝑢𝑒 ¡𝑑𝑎𝑡𝑒 𝑝𝑟𝑖𝑠𝑎 𝑦 𝑛𝑜 𝑡𝑒 𝑞𝑢𝑒𝑑𝑒𝑠 𝑠𝑖𝑛 𝑡𝑢 𝑝𝑟𝑒𝑚𝑖𝑜!

꧁𓊈𒆜𝗜𝗺𝗽𝗼𝗿𝘁𝗮𝗻𝘁𝗲𒆜𓊉꧂
• 𝐶𝑎𝑑𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎 𝑝𝑢𝑒𝑑𝑒 𝑢𝑠𝑎𝑟 𝑒𝑙 𝑐𝑜́𝑑𝑖𝑔𝑜 𝑢𝑛𝑎 𝑠𝑜𝑙𝑎 𝑣𝑒𝑧
• 𝐸𝑙 𝑐𝑜́𝑑𝑖𝑔𝑜 𝑒𝑠 𝑣𝑎́𝑙𝑖𝑑𝑜 ℎ𝑎𝑠𝑡𝑎 𝑞𝑢𝑒 𝑠𝑒 𝑎𝑔𝑜𝑡𝑒𝑛 𝑙𝑜𝑠 ${maxUses} 𝑢𝑠𝑜𝑠
• 𝑆𝑖 𝑡𝑖𝑒𝑛𝑒𝑠 𝑝𝑟𝑜𝑏𝑙𝑒𝑚𝑎𝑠 𝑝𝑎𝑟𝑎 𝑐𝑎𝑛𝑗𝑒𝑎𝑟, 𝑐𝑜𝑛𝑡𝑎𝑐𝑡𝑎 𝑎 wa.me/524181450063

*¡GRACIAS POR ESTAR APOYANDO AL BOT Y FORMAR PARTE DE ESTA INCREÍBLE COMUNIDAD! 😊💫*
*『𝕬𝖘𝖙𝖆-𝕭𝖔𝖙』*`;

    conn.reply(m.chat, message, m);
}

handler.help = ['codigo <cantidad de coins> [máximo de personas]'];
handler.tags = ['owner'];
handler.command = ['codigo']
handler.rowner = true;

export default handler;
