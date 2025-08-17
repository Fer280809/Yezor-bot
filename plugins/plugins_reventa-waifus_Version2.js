// COMANDO 3: VER MERCADO (REVENTAS)
// Archivo: mercado.js
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
    try {
        const market = await loadMarket()

        if (market.length === 0) {
            await conn.reply(m.chat, '🌸 *Mercado vacío*', m)
            return
        }

        let page = 1
        const itemsPerPage = 5

        if (args.length > 0) {
            page = parseInt(args[0])
            if (isNaN(page) || page < 1) page = 1
        }

        const totalPages = Math.ceil(market.length / itemsPerPage)
        const startIndex = (page - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const pageItems = market.slice(startIndex, endIndex)

        let message = `🛍️ *MERCADO WAIFU* 🛍️\n`
        message += `📄 ${page}/${totalPages}\n\n`

        for (let i = 0; i < pageItems.length; i++) {
            const listing = pageItems[i]
            const timeAgo = Math.floor((Date.now() - listing.listedAt) / (1000 * 60 * 60))
            
            message += `${i + 1}. *${listing.characterName}*\n`
            message += `💰 $${listing.price}\n`
            message += `👤 @${listing.sellerId.split('@')[0]}\n`
            message += `⏰ ${timeAgo}h\n\n`
        }

        message += `🛒 .comprar <nombre>\n`
        if (totalPages > 1) {
            message += `📄 .mercado <página>`
        }

        await conn.reply(m.chat, message, m)
    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
    }
}

handler.help = ['mercado [página]']
handler.tags = ['anime']
handler.command = ['mercado', 'market']
handler.group = true
handler.register = true

export default handler