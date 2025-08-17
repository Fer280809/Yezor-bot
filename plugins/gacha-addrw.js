import fs from 'fs'
import path from 'path'

const handler = async (m, { text, usedPrefix, command, conn }) => {
    const args = text.split(',').map(arg => arg.trim())

    if (args.length < 7) {
        return m.reply(`❀ Por favor ingresé la info del personaje.\n✧ Ejemplo: ${usedPrefix}${command} <Nombre del personaje>, <Género>, <Valor>, <Origen>, <Enlace de imagen 1>, <Enlace de imagen 2>, <Enlace de imagen 3>`)
    }

    const [name, gender, value, source, img1, img2, img3] = args

    if (!img1.startsWith('http') || !img2.startsWith('http') || !img3.startsWith('http')) {
        return m.reply('✧ Por favor, proporciona enlaces válidos para las imágenes.')
    }

    // Ruta absoluta al archivo de personajes
    const dbPath = path.join(process.cwd(), 'src', 'database', 'characters.json')

    // Cargar la base actual de personajes
    let characters = []
    if (fs.existsSync(dbPath)) {
        try {
            const data = fs.readFileSync(dbPath, 'utf-8')
            characters = JSON.parse(data)
        } catch (e) {
            characters = []
        }
    }

    // Crear nuevo personaje
    const characterData = {
        id: Date.now().toString(),
        name,
        gender,
        value,
        source,
        img: [img1, img2, img3],
        vid: [],
        user: null,
        status: "Libre",
        votes: 0
    }

    // Agregar a la lista y guardar
    characters.push(characterData)
    fs.writeFileSync(dbPath, JSON.stringify(characters, null, 2), 'utf-8')

    // Notificar al staff principal
    const tagNumber = '5214181450063@s.whatsapp.net'
    const jsonMessage = `❀ Nuevo personaje añadido ❀\n\n\`\`\`${JSON.stringify(characterData, null, 2)}\`\`\`\n\nEnviado por: wa.me/${m.sender.replace(/[^0-9]/g, '')}`
    await conn.sendMessage(tagNumber, { text: jsonMessage })

    // Mensaje de éxito al usuario
    m.reply(`❀ El personaje *"${name}"* fue añadido exitosamente y notificado al staff.`)
}

handler.command = ['addcharacter', 'addrw']

export default handler
