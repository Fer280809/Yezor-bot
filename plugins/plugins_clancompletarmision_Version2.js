import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { args, user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('❌ No estás en ningún clan.')
  let id = parseInt(args[0])
  if (!id) return m.reply('❌ Ingresa el id de la misión.')
  let misiones = clans[clan].misiones || []
  let mision = misiones.find(m => m.id === id)
  if (!mision) return m.reply('❌ No existe esa misión.')
  if (mision.completada) return m.reply('❌ Ya fue completada.')
  mision.completada = true
  // Ejemplo de recompensa simple
  if (mision.recompensa.includes('xp')) clans[clan].experiencia = (clans[clan].experiencia || 0) + parseInt(mision.recompensa)
  if (mision.recompensa.includes('$')) clans[clan].dinero = (clans[clan].dinero || 0) + parseInt(mision.recompensa)
  await saveClans(clans)
  m.reply(`✅ Misión completada: ${mision.objetivo}.\nRecompensa: ${mision.recompensa}`)
}
handler.help = ['clancompletarmision <id>']
handler.tags = ['clan']
handler.command = ['clancompletarmision']
export default handler