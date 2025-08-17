// Acepta la solicitud de alianza pendiente
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
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let myClan = getUserClan(sender, clans)
  let fromClan = clans[myClan].solicitudAlianza
  if (!myClan) return m.reply('No estás en ningún clan.')
  if (!fromClan || !clans[fromClan]) return m.reply('No tienes solicitudes.')
  clans[myClan].aliados = clans[myClan].aliados || []
  clans[fromClan].aliados = clans[fromClan].aliados || []
  clans[myClan].aliados.push(fromClan)
  clans[fromClan].aliados.push(myClan)
  delete clans[myClan].solicitudAlianza
  await saveClans(clans)
  m.reply(`Alianza aceptada con ${fromClan}.`)
}
handler.help = ['clanaceptarsolicitudalianza']
handler.tags = ['clan']
handler.command = ['clanaceptarsolicitudalianza']
export default handler