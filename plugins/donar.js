let handler = async (m, { command }) => {
    let msg = `
╭━━━[ 🤝 𝙳𝙾𝙽𝙰𝙲𝙸𝙾𝙽𝙴𝚂 𝙰𝙻 𝙱𝙾𝚃 ]━━━╮

¡Gracias por apoyar este proyecto! 🙌

Tu donación ayuda a mantener el bot activo, mejorar sus funciones y motivar el desarrollo continuo.

🌟 Puedes donar fácilmente vía PayPal:

🔗 *[Clic aquí para donar](https://paypal.me/fer280809?country.x=MX&locale.x=es_XC)*

O ingresa el siguiente enlace en tu navegador:

https://paypal.me/fer280809?country.x=MX&locale.x=es_XC

¡Cualquier aporte es bienvenido!  
Si donas, puedes enviar tu comprobante para obtener beneficios premium o un agradecimiento especial en la comunidad. 💖

╰━━━━━━━━━━━━━━━━━━━╯
`;
    m.reply(msg.trim(), null, {
        mentions: [m.sender]
    });
};

handler.help = ['donar'];
handler.tags = ['info'];
handler.command = ['donar'];

export default handler;
