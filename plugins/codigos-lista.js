let handler = async (m, { conn }) => {
    // Inicialización segura de la base de datos de códigos
    global.db.data.codes = global.db.data.codes || {}

    const codes = Object.entries(global.db.data.codes)
    if (!codes.length) {
        return m.reply('❗ No hay códigos generados o activos actualmente.')
    }

    let txt = '🔑 *Códigos generados/activos:*\n\n'
    for (const [code, info] of codes) {
        txt += `• Código: *${code}*\n`
        if (info.owner) txt += `  - Generado por: ${info.owner}\n`
        if (info.createdAt) txt += `  - Fecha: ${new Date(info.createdAt).toLocaleString()}\n`
        if (info.status) txt += `  - Estado: ${info.status}\n`
        txt += '\n'
    }

    await conn.reply(m.chat, txt.trim(), m)
}

handler.help = ['listcodes', 'codigos', 'codes']
handler.tags = ['tools', 'owner']
handler.command = ['listcodes', 'codigos', 'codes']
handler.register = true
handler.group = false
handler.owner = false

export default handler
