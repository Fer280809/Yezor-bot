// Regala un ítem del clan a un miembro específico
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
  if (!clan) return m.reply('No estás en ningún clan.')
  let target = (mentionByTag && mentionByTag[0]) || (mentionByReply && mentionByReply[0])
  let item = (args[1] || '').toLowerCase()
  if (!target || !item) return m.reply('Uso: .clanregalaitem @usuario <item>')
  if (!clans[clan].items || !clans[clan].items[item]) return m.reply('No tienes ese ítem.')
  clans[clan].items[item] -= 1
  if (clans[clan].items[item] <= 0) delete clans[clan].items[item]
  // Aquí puedes sumar el ítem al inventario personal del usuario si tienes sistema
  await saveClans(clans)
  m.reply(`Has regalado 1 ${item} a ${target}`)
}
handler.help = ['clanregalaitem @usuario <item>']
handler.tags = ['clan']
handler.command = ['clanregalaitem']
export default handler