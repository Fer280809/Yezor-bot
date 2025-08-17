// COMANDO 3: VER MIS VENTAS
// Archivo: misventas.js
import { promises as fs } from 'fs'

const marketFilePath = './src/database/market.json'

async function loadMarket() {
    try {
        const data = await fs.readFile(marketFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

let handler = async (m, { conn, args }) => {
    const userId = m.sender

    try {
        const market = await loadMarket()
        const myListings = market.filter(l => l.sellerId === userId)

        if (myListings.length === 0) {
            await conn.reply(m.chat, '🌸 *No tienes waifus en venta*', m)
            return
        }

        let message = `🏪 *MIS VENTAS* 🏪\n\n`

        for (let i = 0; i < myListings.length; i++) {
            const listing = myListings[i]
            const timeAgo = Math.floor((Date.now() - listing.listedAt) / (1000 * 60 * 60))
            
            message += `${i + 1}. *${listing.characterName}*\n`
            message += `💰 $${listing.price}\n`
            message += `⏰ ${timeAgo}h\n\n`
        }

        message += `💡 *Comandos:*\n`
        message += `📝 .cambiarprecio <nombre> <precio>\n`
        message += `🗑️ .quitarventa <nombre>`

        await conn.reply(m.chat, message, m)
    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
    }
}

handler.help = ['misventas']
handler.tags = ['anime']
handler.command = ['misventas', 'mysales', 'ventas']
handler.group = true
handler.register = true

export default handler