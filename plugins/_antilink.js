let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
let linkRegex1 = /whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
    if (!m.isGroup) return;
    if (isAdmin || isOwner || m.fromMe || isROwner) return;
    
    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    const user = `@${m.sender.split`@`[0]}`;
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');
    let bot = global.db.data.settings[conn.user.jid] || {};
    const isGroupLink = linkRegex.exec(m.text) || linkRegex1.exec(m.text);
    const grupo = `https://chat.whatsapp.com`;
    
    if (chat.antilink && isGroupLink && !isAdmin) {
        
        // Verificar si es el enlace del mismo grupo
        try {
            const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return !0;
        } catch (error) {
            console.log('Error al obtener código de invitación:', error);
        }
        
        // Eliminar el mensaje primero
        try {
            await conn.sendMessage(m.chat, { 
                delete: { 
                    remoteJid: m.chat, 
                    fromMe: false, 
                    id: bang, 
                    participant: delet 
                } 
            });
        } catch (error) {
            console.log('Error al eliminar mensaje:', error);
        }
        
        // Enviar notificación de eliminación
        await conn.sendMessage(m.chat, { 
            text: `> ✦ Se ha eliminado a ${user} del grupo por Anti-Link.`, 
            mentions: [m.sender] 
        }, { 
            quoted: m, 
            ephemeralExpiration: 24*60*100, 
            disappearingMessagesInChat: 24*60*100 
        });
        
        // Eliminar al usuario del grupo
        try {
            let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === "404") {
                await conn.sendMessage(m.chat, { 
                    text: `> ⚠️ No se pudo eliminar a ${user}.`, 
                    mentions: [m.sender] 
                });
            }
        } catch (error) {
            console.log('Error al eliminar usuario:', error);
            await conn.sendMessage(m.chat, { 
                text: `> ❌ No se pudo eliminar a ${user}.`, 
                mentions: [m.sender] 
            });
        }
    } 
    return !0;
}
