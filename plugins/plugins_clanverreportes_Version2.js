// Lista los reportes activos contra miembros del clan
import { readFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
function isOwnerOrAdmin(user, clanObj) { return clanObj.owner === user || (clanObj.admins && clanObj.admins.includes(user)) }
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { return {} } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('No estás en ningún clan.')
  if (!isOwnerOrAdmin(sender, clans[clan])) return m.reply('Solo owner/admin puede ver reportes.')
  let reportes = clans[clan].reportes || []
  if (!reportes.length) return m.reply('Sin reportes.')
  let msg = '🚨 Reportes:\n'
  for (let r of reportes) msg += `• ${r.usuario} - ${r.motivo} (${r.fecha})\n`
  m.reply(msg)
}
handler.help = ['clanverreportes']
handler.tags = ['clan']
handler.command = ['clanverreportes']
export default handler