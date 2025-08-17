// Regala experiencia del clan a un miembro específico
import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { args, mentionByTag, mentionByReply, user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  let target = (mentionByTag && mentionByTag[0]) || (mentionByReply && mentionByReply[0])
  let cantidad = parseInt(args[1])
  if (!clan) return m.reply('No estás en ningún clan.')
  if (!target || isNaN(cantidad)) return m.reply('Uso: .clanregalarexp @usuario <cantidad>')
  if (clans[clan].experiencia < cantidad) return m.reply('El clan no tiene suficiente experiencia.')
  clans[clan].experiencia -= cantidad
  // Aquí puedes aumentar la exp del usuario si tienes sistema
  await saveClans(clans)
  m.reply(`Has regalado ${cantidad} exp a ${target}`)
}
handler.help = ['clanregalarexp @usuario <cantidad>']
handler.tags = ['clan']
handler.command = ['clanregalarexp']
export default handler