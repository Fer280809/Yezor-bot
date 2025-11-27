# 🤖 YEZOR BOT

Bot de WhatsApp inteligente con IA multilenguaje y sistema de auto-mejora.

![Yezor Logo](https://files.catbox.moe/r42zb3.jpg)

## ✨ Características

- 🌐 **Multilenguaje** (Español/Inglés) con traducción automática
- 🤖 **Inteligencia Artificial** integrada con Claude
- 🔄 **Auto-mejora** - El bot aprende y se actualiza solo
- 💬 **Conversación natural** con contexto
- 📊 **Estadísticas** en tiempo real
- 🎯 **Comandos personalizables**
- 💾 **Base de datos** persistente

## 📋 Requisitos

- Node.js v16 o superior
- WhatsApp instalado en tu teléfono
- Termux (para Android) o Terminal (PC)

## 🚀 Instalación en Termux

```bash
# Clonar repositorio
git clone https://github.com/Fer280809/yezor-bot.git
cd yezor-bot

# Ejecutar script de instalación
bash termux.sh

# Instalar dependencias
npm install

# Iniciar bot
npm start
```

## 🖥️ Instalación en PC

```bash
# Clonar repositorio
git clone https://github.com/Fer280809/yezor-bot.git
cd yezor-bot

# Instalar dependencias
npm install

# Iniciar bot
npm start
```

## 📱 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `/menu` | Mostrar menú principal |
| `/idioma` | Cambiar idioma del bot |
| `/traducir [texto]` | Traducir texto |
| `/preguntar [pregunta]` | Hacer pregunta a la IA |
| `/stats` | Ver estadísticas |
| `/mejoras` | Ver mejoras sugeridas |
| `/nuevafuncion` | Generar nueva función |
| `/ping` | Verificar latencia |
| `/info` | Información del bot |

## ⚙️ Configuración

Edita el archivo `settings.json`:

```json
{
  "botName": "Yezor",
  "ownerNumber": "524181450063",
  "prefix": "/",
  "idiomas": ["español", "inglés"]
}
```

## 🔧 Tecnologías

- [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- Node.js - Runtime
- JSON - Base de datos

## 📝 Licencia

MIT License - Libre para uso personal y comercial

## 👨‍💻 Autor

Creado 𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## ⚠️ Disclaimer

Este bot es solo para propósitos educativos. Úsalo responsablemente.

## 📞 Soporte

¿Problemas? Abre un [Issue](https://github.com/Fer280809/yezor-bot/issues)

---

## 📂 Estructura del Proyecto

```
yezor-bot/
├── README.md
├── package.json
├── settings.json
├── index.js
├── database.js
├── termux.sh
├── .gitignore
└── plugins/
    ├── comandos.js
    ├── ia.js
    ├── mensajes.js
    └── utils.js
```