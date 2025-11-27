# 🤖 YEZOR BOT v2.0

Bot de WhatsApp inteligente con IA multilenguaje, sistema de auto-mejora y **JadiBot** (Sub-Bots).

![Yezor Logo](https://files.catbox.moe/r42zb3.jpg)

## ✨ Características

- 🌐 **Multilenguaje** (Español/Inglés) con traducción automática
- 🤖 **Inteligencia Artificial** integrada con Claude
- 🔄 **Auto-mejora** - El bot aprende y se actualiza solo
- 💬 **Conversación natural** con contexto
- 📊 **Estadísticas** en tiempo real
- 🎯 **Sistema de plugins** modular y organizado
- 🔌 **JadiBot** - Sistema de sub-bots independientes
- 💾 **Base de datos** persistente
- 👥 **Comandos para grupos** con configuración
- 👑 **Comandos de owner** para administración

## 🆕 Sistema JadiBot

El **JadiBot** permite a los usuarios convertir su propio WhatsApp en un sub-bot independiente. Cada usuario puede tener su propio bot activo.

### Características de JadiBot:
- ✅ Activación/desactivación por el owner
- 🔐 Sistema de sesiones independientes
- 📱 Código QR para vinculación
- 📊 Estadísticas de sub-bots activos
- 🔄 Reconexión automática

## 📋 Requisitos

- Node.js v16 o superior
- WhatsApp instalado en tu teléfono
- Termux (para Android) o Terminal (PC)

## 🚀 Instalación en Termux

# Clonar repositorio
```bash
git clone https://github.com/Fer280809/yezor-bot.git && cd yezor-bot
```
# Ejecutar script de instalación
```bash
bash termux.sh
```
# Instalar dependencias
```bash
npm install
```
# Iniciar bot
npm start
```

## 🖥️ Instalación en PC


# Clonar repositorio

```bash
git clone https://github.com/Fer280809/yezor-bot.git
```

```bash
cd yezor-bot
```

# Instalar dependencias
```bash
npm install
```
# Iniciar bot
```bash
npm start
```

## 📱 Comandos Disponibles

### 📋 Comandos Generales
| Comando | Descripción |
|---------|-------------|
| `/menu` | Mostrar menú principal |
| `/ping` | Verificar latencia |
| `/serbot code` | Obtener código QR para sub-bot |
| `/serbot stop` | Detener tu sub-bot |
| `/serbot status` | Ver estado de tu sub-bot |

### 👑 Comandos de Owner
| Comando | Descripción |
|---------|-------------|
| `/jadibot on` | Activar sistema de sub-bots |
| `/jadibot off` | Desactivar sistema de sub-bots |
| `/jadibot list` | Listar sub-bots activos |
| `/jadibot stats` | Estadísticas de JadiBot |
| `/broadcast users [msg]` | Mensaje a todos los usuarios |
| `/broadcast grupos [msg]` | Mensaje a todos los grupos |

### 👥 Comandos de Grupo
| Comando | Descripción |
|---------|-------------|
| `/bienvenida on` | Activar mensajes de bienvenida |
| `/bienvenida off` | Desactivar mensajes de bienvenida |

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
├── lib/
│   ├── simple.js           # Funciones simplificadas
│   ├── jadibot.js          # Sistema de sub-bots
│   └── pluginLoader.js     # Cargador de plugins
├── plugins/
│   │   ├── ping.js
│   │   └── serbot.js         # Comandosgenerales
│   │  
│   ├── owner/
│   │   ├── jadibot.js
│   │   └── broadcast.js       # Comandos de owner
│   └── grupo/
│       └── bienvenida.js.   # Comandos de grupo
└── jadibot_sessions/       # Sesiones de sub-bots
```

## 🔌 Sistema de Plugins

Los plugins están organizados en tres categorías:

1. **plugins/comandos/** - Comandos generales para todos
2. **plugins/owner/comandos/** - Comandos solo para el owner
3. **plugins/grupo/comandos/** - Comandos específicos para grupos

### Crear un Plugin

```javascript
// plugins/comandos/ejemplo.js
module.exports = {
  cmd: ['ejemplo', 'test'],
  type: 'general',
  description: 'Comando de ejemplo',
  
  async exec(m, sock, args, { db, settings }) {
    await m.reply('¡Hola desde el plugin!');
  }
};
```

## ⚙️ Configuración

Edita el archivo `settings.json`:

```json
{
  "botName": "Yezor",
  "ownerNumber": "5214181450066",
  "prefix": "/",
  "idiomas": ["español", "inglés"]
}
```

## 🤖 Uso del JadiBot

### Para Usuarios:
1. Envía `/serbot code` al bot
2. Escanea el QR que te envíe
3. Tu WhatsApp ahora es un sub-bot
4. Usa `/serbot stop` para detenerlo

### Para Owner:
1. Activa el sistema: `/jadibot on`
2. Ver bots activos: `/jadibot list`
3. Desactivar: `/jadibot off`

## 🔧 Tecnologías

- [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- Node.js - Runtime
- QRCode - Generación de códigos QR
- JSON - Base de datos

## 📝 Licencia

MIT License - Libre para uso personal y comercial

## 👨‍💻 Autor

Creado por 𝕱𝖊𝖗𝖓𝖆𝖓𝖉𝖔

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## ⚠️ Disclaimer

Este bot es solo para propósitos educativos. Úsalo responsablemente y respeta los términos de servicio de WhatsApp.

## 📞 Soporte

¿Problemas? Abre un [Issue](https://github.com/Fer280809/yezor-bot/issues)

---

## 🌟 Características Destacadas

### 🔥 JadiBot System
- Permite a los usuarios crear sus propios sub-bots
- Cada sub-bot es independiente
- Sistema de sesiones seguro
- Control total del owner

### 📦 Sistema Modular
- Plugins organizados por categorías
- Fácil agregar nuevos comandos
- Recarga en caliente de plugins

### 🛡️ Seguridad
- Comandos de owner protegidos
- Sistema anti-spam
- Validación de permisos en grupos

---

**¡Dale una ⭐ si te gustó este proyecto!**