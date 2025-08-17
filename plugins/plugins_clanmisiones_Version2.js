import { readFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { return {} } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('❌ No estás en ningún clan.')
  let misiones = clans[clan].misiones || [
    { id: 1, objetivo: "Gana 3 batallas", recompensa: "+400xp", completada: false },
    { id: 2, objetivo: "Recluta 2 miembros", recompensa: "+300$", completada: false }
  ]
  let msg = `🎯 Misiones activas del clan ${clan}:\n`
  for (let mision of misiones)
    msg += `\n• [${mision.completada ? '✔️' : '❌'}] (${mision.id}) ${mision.objetivo} | Recompensa: ${mision.recompensa}`
  m.reply(msg)
}
handler.help = ['clanmisiones']
handler.tags = ['clan']
handler.command = ['clanmisiones']
export default handler