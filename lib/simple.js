// ============================================
// SIMPLE.JS - Funciones Simplificadas para Baileys
// ============================================

const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@whiskeysockets/baileys');
const fs = require('fs');
const fetch = require('node-fetch');
const axios = require('axios');

class WAConnection {
  constructor(sock) {
    this.sock = sock;
  }

  // ============================================
  // ENVIAR MENSAJE DE TEXTO
  // ============================================
  async sendText(jid, text, quoted = null, options = {}) {
    return await this.sock.sendMessage(jid, { 
      text: text,
      ...options 
    }, { 
      quoted: quoted 
    });
  }

  // ============================================
  // ENVIAR IMAGEN
  // ============================================
  async sendImage(jid, path, caption = '', quoted = null, options = {}) {
    let buffer;
    
    if (Buffer.isBuffer(path)) {
      buffer = path;
    } else if (/^https?:\/\//.test(path)) {
      buffer = await this.getBuffer(path);
    } else {
      buffer = fs.readFileSync(path);
    }

    return await this.sock.sendMessage(jid, {
      image: buffer,
      caption: caption,
      ...options
    }, {
      quoted: quoted
    });
  }

  // ============================================
  // ENVIAR VIDEO
  // ============================================
  async sendVideo(jid, path, caption = '', quoted = null, options = {}) {
    let buffer;
    
    if (Buffer.isBuffer(path)) {
      buffer = path;
    } else if (/^https?:\/\//.test(path)) {
      buffer = await this.getBuffer(path);
    } else {
      buffer = fs.readFileSync(path);
    }

    return await this.sock.sendMessage(jid, {
      video: buffer,
      caption: caption,
      ...options
    }, {
      quoted: quoted
    });
  }

  // ============================================
  // ENVIAR AUDIO
  // ============================================
  async sendAudio(jid, path, quoted = null, ptt = false, options = {}) {
    let buffer;
    
    if (Buffer.isBuffer(path)) {
      buffer = path;
    } else if (/^https?:\/\//.test(path)) {
      buffer = await this.getBuffer(path);
    } else {
      buffer = fs.readFileSync(path);
    }

    return await this.sock.sendMessage(jid, {
      audio: buffer,
      ptt: ptt,
      mimetype: 'audio/mpeg',
      ...options
    }, {
      quoted: quoted
    });
  }

  // ============================================
  // ENVIAR DOCUMENTO
  // ============================================
  async sendDocument(jid, path, filename, mimetype, quoted = null, options = {}) {
    let buffer;
    
    if (Buffer.isBuffer(path)) {
      buffer = path;
    } else if (/^https?:\/\//.test(path)) {
      buffer = await this.getBuffer(path);
    } else {
      buffer = fs.readFileSync(path);
    }

    return await this.sock.sendMessage(jid, {
      document: buffer,
      fileName: filename,
      mimetype: mimetype,
      ...options
    }, {
      quoted: quoted
    });
  }

  // ============================================
  // ENVIAR STICKER
  // ============================================
  async sendSticker(jid, path, quoted = null, options = {}) {
    let buffer;
    
    if (Buffer.isBuffer(path)) {
      buffer = path;
    } else if (/^https?:\/\//.test(path)) {
      buffer = await this.getBuffer(path);
    } else {
      buffer = fs.readFileSync(path);
    }

    return await this.sock.sendMessage(jid, {
      sticker: buffer,
      ...options
    }, {
      quoted: quoted
    });
  }

  // ============================================
  // ENVIAR BOTONES
  // ============================================
  async sendButton(jid, text, footer, buttons, quoted = null) {
    const buttonMessage = {
      text: text,
      footer: footer,
      buttons: buttons.map((btn, index) => ({
        buttonId: `id${index}`,
        buttonText: { displayText: btn },
        type: 1
      })),
      headerType: 1
    };

    return await this.sock.sendMessage(jid, buttonMessage, { quoted });
  }

  // ============================================
  // ENVIAR LISTA
  // ============================================
  async sendList(jid, title, text, buttonText, sections, quoted = null) {
    const listMessage = {
      text: text,
      footer: title,
      title: title,
      buttonText: buttonText,
      sections: sections
    };

    return await this.sock.sendMessage(jid, listMessage, { quoted });
  }

  // ============================================
  // ENVIAR CONTACTO
  // ============================================
  async sendContact(jid, contacts, quoted = null) {
    const vcard = contacts.map(contact => 
      `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL;type=CELL;type=VOICE;waid=${contact.number}:${contact.number}\nEND:VCARD`
    ).join('\n');

    return await this.sock.sendMessage(jid, {
      contacts: {
        displayName: contacts[0].name,
        contacts: [{ vcard }]
      }
    }, {
      quoted: quoted
    });
  }

  // ============================================
  // ENVIAR UBICACIÓN
  // ============================================
  async sendLocation(jid, latitude, longitude, text = '', quoted = null) {
    return await this.sock.sendMessage(jid, {
      location: {
        degreesLatitude: latitude,
        degreesLongitude: longitude,
        name: text
      }
    }, {
      quoted: quoted
    });
  }

  // ============================================
  // REACCIONAR A MENSAJE
  // ============================================
  async sendReact(jid, emoji, key) {
    return await this.sock.sendMessage(jid, {
      react: {
        text: emoji,
        key: key
      }
    });
  }

  // ============================================
  // DESCARGAR MULTIMEDIA
  // ============================================
  async downloadMediaMessage(message) {
    const type = Object.keys(message)[0];
    const msg = message[type];
    
    if (!msg) return null;
    
    const stream = await downloadContentFromMessage(msg, type.replace('Message', ''));
    let buffer = Buffer.from([]);
    
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    
    return buffer;
  }

  // ============================================
  // OBTENER BUFFER DE URL
  // ============================================
  async getBuffer(url) {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer'
      });
      return Buffer.from(response.data);
    } catch (error) {
      throw new Error(`Error al obtener buffer: ${error.message}`);
    }
  }

  // ============================================
  // ELIMINAR MENSAJE
  // ============================================
  async deleteMessage(jid, key) {
    return await this.sock.sendMessage(jid, { delete: key });
  }

  // ============================================
  // EDITAR MENSAJE
  // ============================================
  async editMessage(jid, key, text) {
    return await this.sock.sendMessage(jid, {
      text: text,
      edit: key
    });
  }

  // ============================================
  // ENVIAR TYPING
  // ============================================
  async sendPresenceUpdate(type, jid) {
    return await this.sock.sendPresenceUpdate(type, jid);
  }

  // ============================================
  // OBTENER FOTO DE PERFIL
  // ============================================
  async getProfilePicture(jid) {
    try {
      return await this.sock.profilePictureUrl(jid, 'image');
    } catch {
      return 'https://i.ibb.co/3Fh9V6p/avatar-contact.png';
    }
  }

  // ============================================
  // OBTENER NOMBRE
  // ============================================
  getName(jid) {
    const contact = this.sock.store?.contacts[jid];
    return contact?.name || contact?.verifiedName || jid.split('@')[0];
  }

  // ============================================
  // PARSEAR MENSAJE
  // ============================================
  parseMessage(m) {
    const type = Object.keys(m.message || {})[0];
    const content = m.message?.[type];
    
    return {
      type: type,
      content: content,
      text: content?.text || content?.caption || '',
      isMedia: ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'].includes(type),
      sender: m.key.remoteJid,
      fromMe: m.key.fromMe,
      id: m.key.id,
      quoted: m.message?.[type]?.contextInfo?.quotedMessage ? {
        key: {
          remoteJid: m.message[type].contextInfo.participant || m.key.remoteJid,
          id: m.message[type].contextInfo.stanzaId
        },
        message: m.message[type].contextInfo.quotedMessage
      } : null
    };
  }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function serialize(m, sock) {
  if (!m) return m;
  
  const conn = new WAConnection(sock);
  
  m.reply = (text, options = {}) => {
    return conn.sendText(m.key.remoteJid, text, m, options);
  };

  m.react = (emoji) => {
    return conn.sendReact(m.key.remoteJid, emoji, m.key);
  };

  m.delete = () => {
    return conn.deleteMessage(m.key.remoteJid, m.key);
  };

  m.download = async () => {
    return await conn.downloadMediaMessage(m.message);
  };

  const parsed = conn.parseMessage(m);
  Object.assign(m, parsed);

  return m;
}

module.exports = {
  WAConnection,
  serialize
};