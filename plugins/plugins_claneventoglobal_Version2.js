// Muestra información del evento global activo para clanes (demo)
import { readFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const globalEventPath = path.join(__dirname, 'clanEvent.json')
async function loadEvent() { try { await access(globalEventPath, constants.F_OK) } catch { return {} } const data = await readFile(globalEventPath, 'utf-8'); return JSON.parse(data) }
const handler = async (m) => {
  const event = await loadEvent()
  if (!event || !event.nombre) return m.reply('No hay evento global activo.')
  let msg = `🎉 Evento global: ${event.nombre}\nDescripción: ${event.descripcion}\nPremio: ${event.premio}\nTermina: ${event.fin}`
  m.reply(msg)
}
handler.help = ['claneventoglobal']
handler.tags = ['clan']
handler.command = ['claneventoglobal']
export default handler