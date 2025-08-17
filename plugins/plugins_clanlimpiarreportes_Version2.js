// Limpia todos los reportes del clan
import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
function isOwnerOrAdmin(user, clanObj) { return clanObj.owner === user || (clanObj.admins && clanObj.admins.includes(user)) }
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('No estás en ningún clan.')
  if (!isOwnerOrAdmin(sender, clans[clan])) return m.reply('Solo owner/admin puede limpiar reportes.')
  clans[clan].reportes = []
  await saveClans(clans)
  m.reply('Reportes limpiados.')
}
handler.help = ['clanlimpiarreportes']
handler.tags = ['clan']
handler.command = ['clanlimpiarreportes']
export default handler