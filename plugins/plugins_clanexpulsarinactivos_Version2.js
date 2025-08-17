// Expulsa automáticamente a los miembros inactivos (requiere sistema de actividad real)
import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { user }) => {
  // Aquí deberías conectar con tu sistema real de actividad
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('No estás en ningún clan.')
  let inactivos = (clans[clan].miembros || []).filter((u, i) => i % 2 === 0) // DEMO
  clans[clan].miembros = clans[clan].miembros.filter(u => !inactivos.includes(u))
  await saveClans(clans)
  m.reply(`Expulsados por inactividad:\n${inactivos.join('\n')}`)
}
handler.help = ['clanexpulsarinactivos']
handler.tags = ['clan']
handler.command = ['clanexpulsarinactivos']
export default handler