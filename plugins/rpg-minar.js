let cooldowns = {}

let handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender];
if (!user) return;

let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
let emerald = pickRandom([1, 5, 7, 8]);
let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
let gold = pickRandom([20, 5, 7, 8, 88, 40, 50]);
let coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64]);
let stone = pickRandom([200, 500, 700, 800, 900, 4000, 300]);

let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557957843.jpeg';
let time = user.lastmiming + 600000;

if (new Date() - user.lastmiming < 600000) {
return conn.reply(m.chat, `${emoji3} Debes esperar ${msToTime(time - new Date())} para volver a minar.`, m);
}

let hasil = Math.floor(Math.random() * 1000);
let info = `⛏️ *¡AVENTURA DE MINERÍA!* 🏔️\n\n` +
    `*Te has aventurado en lo profundo de las cavernas místicas* 🧙‍♂️✨\n\n` +
    `🎁 *RECURSOS OBTENIDOS:* 🎁\n` +
    `┏━━━━━━━━━━━━━┓\n` +
    `┃ ✨ *Exp*: ${hasil}\n` +
    `┃ 💸 *${moneda}*: ${coin}\n` +
    `┃ 💎 *Esmeralda*: ${emerald}\n` +
    `┃ 🔩 *Hierro*: ${iron}\n` +
    `┃ 🥇 *Oro*: ${gold}\n` +
    `┃ ⚫ *Carbón*: ${coal}\n` +
    `┃ 🪨 *Piedra*: ${stone}\n` +
    `┗━━━━━━━━━━━━━┛\n\n` +
    `❗ *Durabilidad del pico* -30\n` +
    `❤️ *Salud* -50\n\n` +
    `🔄 Puedes minar nuevamente en 10 minutos`;

await conn.sendFile(m.chat, img, 'yuki.jpg', info, fkontak);
await m.react('⛏️');

user.health -= 50;
user.pickaxedurability -= 30;
user.coin += coin;
user.iron += iron;
user.gold += gold;
user.emerald += emerald;
user.coal += coal;
user.stone += stone;
user.lastmiming = new Date() * 1;
}

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;
handler.group = true;

export default handler;

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

hours = (hours < 10) ? '0' + hours : hours;
minutes = (minutes < 10) ? '0' + minutes : minutes;
seconds = (seconds < 10) ? '0' + seconds : seconds;

return minutes + ' m y ' + seconds + ' s ';
}
