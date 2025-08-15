const replicate = async (prompt) => {
    const headers = {
        "Authorization": "Token r8_8mNSPyfG01geTuhbsB1sdIoCkQSXgW51i9ayN",
        "Content-Type": "application/json"
    }

    const body = JSON.stringify({
        version: "a9758cbf60c58800e00c82d3c7d9d22813c6ec5c22ef07d5f6c1e7b542d0abb4", // Zeroscope XL v2
        input: {
            prompt: prompt
        }
    })

    const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers,
        body
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`Error al generar video: ${response.statusText}\n${JSON.stringify(err.error)}`);
    }

    const json = await response.json();

    const getStatus = async () => {
        const res = await fetch(`https://api.replicate.com/v1/predictions/${json.id}`, {
            headers: {
                "Authorization": "Token r8_8mNSPyfG01geTuhbsB1sdIoCkQSXgW51i9ayN"
            }
        });
        return res.json();
    }

    let output = null;
    while (!output) {
        const status = await getStatus();
        if (status.status === "succeeded") {
            output = status.output;
        } else if (status.status === "failed") {
            throw new Error("❌ La generación del video falló.");
        }
        await new Promise(res => setTimeout(res, 2000));
    }

    return output;
}

async function handler(m, { conn, text }) {
    if (!text) return m.reply('📝 Escribe una descripción para el video.\n\nEjemplo: .aivideo a dragon flying over mountains')

    m.reply('🎥 Generando video, por favor espera...')

    try {
        const videoUrls = await replicate(text);

        await conn.sendMessage(m.chat, {
            video: { url: videoUrls[0] },
            caption: "🎬 Video generado con IA (Replicate - Zeroscope)"
        }, { quoted: m });

    } catch (error) {
        m.reply(`❌ Error: ${error.message}`);
    }
}

handler.help = ['aivideo']
handler.command = ['aivideo']
handler.tags = ['ai']

export default handler
