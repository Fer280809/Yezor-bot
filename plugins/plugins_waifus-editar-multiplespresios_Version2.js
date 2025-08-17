// COMANDO 4: EDITAR MÚLTIPLES PRECIOS
// Archivo: editarventas.js
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
        await conn.reply(m.chat, '🌸 *Opciones:*\n🔸 .editarventas bajar 10% - Baja todos los precios 10%\n🔸 .editarventas subir 500 - Sube $500 a todos\n🔸 .editarventas fijar 1000 - Pone $1000 fijo a todos', m)
        return
    }

    const action = args[0].toLowerCase()
    const value = parseInt(args[1])

    if (isNaN(value) || value <= 0) {
        await conn.reply(m.chat, '🌸 *Valor inválido*', m)
        return
    }

    try {
        const market = await loadMarket()
        const myListings = market.filter(l => l.sellerId === userId)

        if (myListings.length === 0) {
            await conn.reply(m.chat, '🌸 *No tienes waifus en venta*', m)
            return
        }

        let changedCount = 0

        for (let listing of myListings) {
            const oldPrice = listing.price
            let newPrice

            switch (action) {
                case 'bajar':
                    newPrice = Math.floor(oldPrice * (1 - value / 100))
                    break
                case 'subir':
                    newPrice = oldPrice + value
                    break
                case 'fijar':
                    newPrice = value
                    break
                default:
                    await conn.reply(m.chat, '🌸 *Acción inválida. Usa: bajar, subir o fijar*', m)
                    return
            }

            if (newPrice > 0) {
                listing.price = newPrice
                listing.listedAt = Date.now()
                changedCount++
            }
        }

        await saveMarket(market)

        let actionText = ''
        switch (action) {
            case 'bajar':
                actionText = `bajados ${value}%`
                break
            case 'subir':
                actionText = `subidos $${value}`
                break
            case 'fijar':
                actionText = `fijados a $${value}`
                break
        }

        await conn.reply(m.chat, `💰 *${changedCount} precios ${actionText}*`, m)
    } catch (error) {
        await conn.reply(m.chat, `❌ Error: ${error.message}`, m)
    }
}

handler.help = ['editarventas <acción> <valor>']
handler.tags = ['anime']
handler.command = ['editarventas', 'editsales', 'masivo']
handler.group = true
handler.register = true

export default handler