// COMANDO 2: CAMBIAR PRECIO DE WAIFU
// Archivo: cambiarprecio.js
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

    if (args.length < 2) {
        await conn.reply(m.chat, '🌸 *Uso:* .cambiarprecio <nombre> <nuevo precio>', m)
        return
    }

    const newPrice = parseInt(args[args.length - 1])
    if (isNaN(newPrice) || newPrice <= 0) {
        await conn.reply(m.chat, '🌸 *El precio debe ser válido y mayor a 0*', m)
        return
    }

    const characterName = args.slice(0, -1).join(' ').toLowerCase().trim()

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

        const oldPrice = market[listingIndex].price
        market[listingIndex].price = newPrice
        market[listingIndex].listedAt = Date.now() // Actualizar tiempo
        
        await saveMarket(market)

        await conn.reply(m.chat, `💰 *${market[listingIndex].characterName}*\n📉 Precio anterior: $${oldPrice}\n📈 Nuevo precio: $${newPrice}`, m)
    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
    }
}

handler.help = ['cambiarprecio <personaje> <precio>']
handler.tags = ['anime']
handler.command = ['cambiarprecio', 'changeprice', 'precio']
handler.group = true
handler.register = true

export default handler