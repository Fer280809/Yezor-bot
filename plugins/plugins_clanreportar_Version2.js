// Reporta a un miembro del clan por mal comportamiento
import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { mentionByTag, mentionByReply, args, user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  let target = (mentionByTag && mentionByTag[0]) || (mentionByReply && mentionByReply[0])
  let motivo = args.slice(1).join(' ')
  if (!clan) return m.reply('No estás en ningún clan.')
  if (!target) return m.reply('Menciona a quién reportar.')
  clans[clan].reportes = clans[clan].reportes || []
  clans[clan].reportes.push({ usuario: target, motivo, fecha: new Date().toLocaleString('es-ES') })
  await saveClans(clans)
  m.reply('Reporte registrado.')
}
handler.help = ['clanreportar @usuario <motivo>']
handler.tags = ['clan']
handler.command = ['clanreportar']
export default handler