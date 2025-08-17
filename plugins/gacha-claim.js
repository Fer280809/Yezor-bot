import { promises as fs } from 'fs';
const charactersFilePath = './src/database/characters.json';
const haremFilePath = './src/database/harem.json';
const cooldowns = {};

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('❀ No se pudo cargar el archivo characters.json.');
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('❀ No se pudo guardar el archivo characters.json.');
    }
}

let handler = async (m, { conn }) => {
    const userId = m.sender;
    const now = Date.now();
    
    // Verificar cooldown
    if (cooldowns[userId] && now < cooldowns[userId]) {
        const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        
        return await conn.reply(m.chat, `⏰ *Cooldown activo*\n⏳ Espera ${minutes}m ${seconds}s para usar #c`, m);
    }

    // Verificar si citó un mensaje del bot
    if (m.quoted && m.quoted.sender === conn.user.jid) {
        try {
            const characters = await loadCharacters();
            const characterIdMatch = m.quoted.text.match(/✦ ID: \*(.+?)\*/);
            
            if (!characterIdMatch) {
                await conn.reply(m.chat, '❌ No se encontró el ID del personaje', m);
                return;
            }

            const characterId = characterIdMatch[1];
            const character = characters.find(c => c.id === characterId);
            
            if (!character) {
                await conn.reply(m.chat, '⚠️ Personaje inválido. Usa *#roll* para invocar nuevos', m);
                return;
            }

            // Verificar si ya está reclamado
            if (character.user && character.user !== userId) {
                await conn.reply(m.chat, `💔 *${character.name}* ya pertenece a @${character.user.split('@')[0]}\n🎯 ¡Mejor suerte la próxima!`, m, { mentions: [character.user] });
                return;
            }

            // Reclamar personaje exitosamente
            character.user = userId;
            character.status = "Reclamado";
            await saveCharacters(characters);
            
            await conn.reply(m.chat, `🎉 ¡Has reclamado a *${character.name}* con éxito!\n✨ Usa *#harem* para ver tu colección`, m);
            cooldowns[userId] = now + 30 * 60 * 1000; // 30 minutos de cooldown
            
        } catch (error) {
            await conn.reply(m.chat, `💥 Error: ${error.message}`, m);
        }
    } else {
        const instructionMsg = `╭─⌈ 📖 INSTRUCCIONES ⌉
│ 
│ 🎯 Para reclamar un personaje:
│ 
│ 1️⃣ Usa *#roll* para invocar personajes
│ 2️⃣ Responde/cita el personaje que quieras
│ 3️⃣ Escribe *#c* o *#claim*
│ 
│ ⚡ ¡Es así de simple!
│ 
╰────────────────────
💡 *Tip:* Solo puedes reclamar personajes libres`;
        
        await conn.reply(m.chat, instructionMsg, m);
    }
};

handler.help = ['claim'];
handler.tags = ['gacha'];
handler.command = ['c', 'claim', 'reclamar'];
handler.group = true;

export default handler;
