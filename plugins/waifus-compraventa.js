// COMANDO 1: PONER WAIFU EN VENTA
// Archivo: vender.js
import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const marketFilePath = './src/database/market.json'

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('No se pudo cargar characters.json')
    }
}

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
        await conn.reply(m.chat, '🌸 *Uso:* .vender <nombre> <precio>', m)
        return
    }

    const price = parseInt(args[args.length - 1])
    if (isNaN(price) || price <= 0) {
        await conn.reply(m.chat, '🌸 *El precio debe ser válido y mayor a 0*', m)
        return
    }

    const characterName = args.slice(0, -1).join(' ').toLowerCase().trim()

    try {
        const characters = await loadCharacters()
        const character = characters.find(c => c.name.toLowerCase() === characterName && c.user === userId)

        if (!character) {
            await conn.reply(m.chat, `🌸 *${characterName}* no te pertenece`, m)
            return
        }

        const market = await loadMarket()
        const existingListing = market.find(listing => listing.characterId === character.id)

        if (existingListing) {
            await conn.reply(m.chat, `🌸 *${character.name}* ya está en venta`, m)
            return
        }

        const listing = {
            id: Date.now(),
            characterId: character.id,
            characterName: character.name,
            characterImage: character.image || '',
            sellerId: userId,
            price: price,
            listedAt: Date.now()
        }

        market.push(listing)
        await saveMarket(market)

        await conn.reply(m.chat, `💝 *${character.name}* en venta por $${price}`, m)
    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
    }
}

handler.help = ['vender <personaje> <precio>']
handler.tags = ['anime']
handler.command = ['vender', 'sell', 'sellwaifu']
handler.group = true
handler.register = true

export default handler
