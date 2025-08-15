// COMANDO 1: QUITAR WAIFU DEL MERCADO
// Archivo: quitarventa.js
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

async function saveMarket(market) {
    try {
        await fs.writeFile(marketFilePath, JSON.stringify(market, null, 2), 'utf-8')
    } catch (error) {
        throw new Error('No se pudo guardar market.json')
    }
}

let handler = async (m, { conn, args }) => {
    const userId = m.sender

    if (args.length === 0) {
        await conn.reply(m.chat, '🌸 *Uso:* .quitarventa <nombre>', m)
        return
    }

    const characterName = args.join(' ').toLowerCase().trim()

    try {
        const market = await loadMarket()
        const listingIndex = market.findIndex(l => 
            l.characterName.toLowerCase() === characterName && 
            l.sellerId === userId
        )

        if (listingIndex === -1) {
            await conn.reply(m.chat, `🌸 *${characterName}* no está en tu lista de ventas`, m)
            return
        }

        const removedListing = market[listingIndex]
        market.splice(listingIndex, 1)
        await saveMarket(market)

        await conn.reply(m.chat, `💔 *${removedListing.characterName}* retirado del mercado`, m)
    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
    }
}

handler.help = ['quitarventa <personaje>']
handler.tags = ['anime']
handler.command = ['quitarventa', 'removesale', 'retirar']
handler.group = true
handler.register = true

export default handler