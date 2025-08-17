// Lista los miembros inactivos (requiere integración con sistema de actividad real)
import { readFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { return {} } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
const handler = async (m, { user }) => {
  // Aquí deberías conectar con tu sistema real de actividad (último mensaje, última conexión, etc)
  // De ejemplo se listan los miembros cuyo "actividad" sea hace más de 7 días (simulado)
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('No estás en ningún clan.')
  let inactivos = (clans[clan].miembros || []).filter((u, i) => i % 2 === 0) // DEMO: la mitad está inactiva
  if (!inactivos.length) return m.reply('Todos los miembros están activos.')
  let msg = '🛌 Miembros inactivos:\n' + inactivos.join('\n')
  m.reply(msg)
}
handler.help = ['claninactivos']
handler.tags = ['clan']
handler.command = ['claninactivos']
export default handler