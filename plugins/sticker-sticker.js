import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import Jimp from 'jimp';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        if (!/image\//.test(mime) && !/video\//.test(mime)) {
            return m.reply(`⚠️ Responde a una imagen o video para convertirlo en sticker.\n\nEjemplo:\n${usedPrefix + command} (respondiendo a una imagen/video)`);
        }

        let media = await q.download();
        if (!media) throw '⚠️ No se pudo descargar el archivo.';

        if (/video\//.test(mime) && (q.msg || q).seconds > 10) {
            return m.reply('⚠️ El video no puede durar más de 10 segundos.');
        }

        // Procesar la imagen con Jimp (filtros/modificaciones locales)
        if (/image\//.test(mime)) {
            let image = await Jimp.read(media);
            image.resize(512, Jimp.AUTO); // Ajusta tamaño para sticker
            image.color([{ apply: 'saturate', params: [15] }]); // Satura colores
            image.brightness(0.05); // Ajusta brillo
            media = await image.getBufferAsync(Jimp.MIME_PNG);
        }

        // Crear sticker localmente
        let sticker = new Sticker(media, {
            pack: 'Bot Stickers',
            author: 'By YourBot',
            type: StickerTypes.FULL,
            quality: 70
        });

        const buffer = await sticker.build();
        await conn.sendFile(m.chat, buffer, 'sticker.webp', '', m, false, { asSticker: true });

    } catch (e) {
        console.error(e);
        m.reply('⚠️ Error al crear el sticker. Asegúrate de enviar una imagen o video válido.');
    }
};

handler.command = ['sticker', 's', 'stiker'];
export default handler;
