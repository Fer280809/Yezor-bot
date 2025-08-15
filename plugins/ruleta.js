// plugins/ruleta.js
import fs from 'fs-extra'
import path from 'path'
import { generarRuletaImagen } from '../lib/ruleta.js'
import ffmpeg from 'fluent-ffmpeg'
import { v4 as uuidv4 } from 'uuid'
import db from '../lib/database.js'

let handler = async (m, { conn }) => {
    const who = m.sender
    const user = global.db.data.users[who]
    if (!user) return m.reply('⚠️ No estás registrado en la base de datos.')
    
    const COST = 100
    if ((user.coin || 0) < COST) {
        return m.reply(`❌ No tienes suficiente dinero para jugar. Costo: ${COST} 🪙`)
    }

    // Cobrar
    user.coin -= COST

    // Crear ruleta aleatoria
    const segmentCount = getRandomInt(6, 12)
    const segments = []
    const prizeTiers = [
        { min: 50, max: 150, weight: 50 },
        { min: 200, max: 500, weight: 30 },
        { min: 800, max: 1500, weight: 12 },
        { min: 2000, max: 5000, weight: 8 }
    ]
    const totalWeight = prizeTiers.reduce((a,b)=>a+b.weight,0)

    for (let i = 0; i < segmentCount; i++) {
        const tier = weightedChoice(prizeTiers, totalWeight)
        const prize = getRandomInt(tier.min, tier.max)
        segments.push({
            label: prize.toString(),
            prize,
            color: randomColor()
        })
    }

    // Elegir ganador
    const winnerIndex = Math.floor(Math.random() * segments.length)
    const winner = segments[winnerIndex]

    // Animación
    const tempDir = path.join('./tmp', uuidv4())
    await fs.ensureDir(tempDir)
    const frames = 30
    const rotations = 4 * 360 + (360 / segmentCount) * winnerIndex + (360 / (segmentCount * 2))

    for (let f = 0; f < frames; f++) {
        const progress = easeOutCubic(f / (frames - 1))
        const currentRotation = progress * rotations
        const framePath = path.join(tempDir, `frame_${String(f).padStart(3, '0')}.png`)
        await generarRuletaImagen(framePath, segments, currentRotation)
    }

    // Convertir a video
    const videoPath = path.join(tempDir, 'ruleta.mp4')
    await new Promise((resolve, reject) => {
        ffmpeg()
            .input(path.join(tempDir, 'frame_%03d.png'))
            .inputFPS(30)
            .outputOptions(['-pix_fmt yuv420p', '-movflags +faststart'])
            .save(videoPath)
            .on('end', resolve)
            .on('error', reject)
    })

    // Depositar premio
    user.bank = (user.bank || 0) + winner.prize
    if (global.db?.write) await global.db.write()

    // Enviar resultado
    await conn.sendMessage(m.chat, {
        video: await fs.readFile(videoPath),
        mimetype: 'video/mp4',
        caption: `🎰 *RULETA* 🎮\nGanaste: *${winner.prize} 🪙*\n💳 Se depositó en tu banco.`
    }, { quoted: m })

    // Limpiar
    await fs.remove(tempDir)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function randomColor() {
    const colors = ['#ff6b6b','#ffd93d','#6bffb3','#6bd1ff','#c86bff','#ff8fb3','#ffbf6b','#6b7bff']
    return colors[Math.floor(Math.random() * colors.length)]
}
function weightedChoice(tiers, totalWeight){
    let r = Math.random() * totalWeight
    for (const t of tiers) {
        if (r < t.weight) return t
        r -= t.weight
    }
    return tiers[tiers.length - 1]
}
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
}

handler.help = ['ruleta']
handler.tags = ['game']
handler.command = ['ruleta']
handler.register = true

export default handler
