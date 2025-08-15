// COMANDO 2: COMPRAR WAIFU
// Archivo: comprar.js
import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters.json'
const marketFilePath = './src/database/market.json'
const haremFilePath = './src/database/harem.json'

async function loadCharacters() {
    try {
        const data = await fs.readFile(charactersFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('No se pudo cargar characters.json')
    }
}

async function saveCharacters(characters) {
    try {
        await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8')
    } catch (error) {
        throw new Error('No se pudo guardar characters.json')
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

async function loadHarem() {
    try {
        const data = await fs.readFile(haremFilePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

async function saveHarem(harem) {
    try {
        await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2))
    } catch (error) {
        throw new Error('No se pudo guardar harem.json')
    }
}

// Función para manejar dinero del usuario
async function getUserMoney(userId) {
    try {
        // Aquí debes adaptar según tu sistema de economía
        // Por ejemplo, si usas un archivo global.db:
        return global.db.data.users[userId]?.money || 0
    } catch (error) {
        return 0
    }
}

async function setUserMoney(userId, amount) {
    try {
        if (!global.db.data.users[userId]) {
            global.db.data.users[userId] = {}
        }
        global.db.data.users[userId].money = amount
    } catch (error) {
        throw new Error('No se pudo actualizar el dinero')
    }
}

let handler = async (m, { conn, args }) => {
    const userId = m.sender

    if (args.length === 0) {
        await conn.reply(m.chat, '🌸 *Uso:* .comprar <nombre>', m)
        return
    }

    const characterName = args.join(' ').toLowerCase().trim()

    try {
        const market = await loadMarket()
        const listing = market.find(l => l.characterName.toLowerCase() === characterName)

        if (!listing) {
            await conn.reply(m.chat, `🌸 *${characterName}* no está en venta`, m)
            return
        }

        if (listing.sellerId === userId) {
            await conn.reply(m.chat, '🌸 *No puedes comprar tu propio waifu*', m)
            return
        }

        const buyerMoney = await getUserMoney(userId)
        const sellerMoney = await getUserMoney(listing.sellerId)

        if (buyerMoney < listing.price) {
            await conn.reply(m.chat, `🌸 *Dinero insuficiente*\n💰 Necesitas: $${listing.price}\n💸 Tienes: $${buyerMoney}`, m)
            return
        }

        // Transferir dinero
        await setUserMoney(userId, buyerMoney - listing.price)
        await setUserMoney(listing.sellerId, sellerMoney + listing.price)

        // Transferir personaje
        const characters = await loadCharacters()
        const character = characters.find(c => c.id === listing.characterId)
        character.user = userId

        // Actualizar harem
        const harem = await loadHarem()
        const userEntryIndex = harem.findIndex(entry => entry.userId === userId)

        if (userEntryIndex !== -1) {
            harem[userEntryIndex].characterId = character.id
            harem[userEntryIndex].lastClaimTime = Date.now()
        } else {
            const userEntry = {
                userId: userId,
                characterId: character.id,
                lastClaimTime: Date.now()
            }
            harem.push(userEntry)
        }

        // Remover del mercado
        const updatedMarket = market.filter(l => l.id !== listing.id)

        // Guardar cambios
        await saveCharacters(characters)
        await saveHarem(harem)
        await saveMarket(updatedMarket)

        await conn.reply(m.chat, `💝 *${character.name}* comprado por $${listing.price}`, m)
    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
    }
}

handler.help = ['comprar <personaje>']
handler.tags = ['anime']
handler.command = ['comprar', 'buy', 'buywaifu']
handler.group = true
handler.register = true

export default handler
