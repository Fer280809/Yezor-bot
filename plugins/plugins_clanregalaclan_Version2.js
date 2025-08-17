// Regala un ítem o recurso a otro clan aliado
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
  let myClan = getUserClan(sender, clans)
  let targetClan = args[0]
  let item = (args[1] || '').toLowerCase()
  if (!myClan) return m.reply('No estás en ningún clan.')
  if (!targetClan || !clans[targetClan]) return m.reply('Ese clan no existe.')
  if (!clans[myClan].items || !clans[myClan].items[item]) return m.reply('No tienes ese ítem.')
  clans[myClan].items[item] -= 1
  if (clans[myClan].items[item] <= 0) delete clans[myClan].items[item]
  clans[targetClan].items = clans[targetClan].items || {}
  clans[targetClan].items[item] = (clans[targetClan].items[item] || 0) + 1
  await saveClans(clans)
  m.reply(`Has regalado 1 ${item} al clan ${targetClan}`)
}
handler.help = ['clanregalaclan <clan> <item>']
handler.tags = ['clan']
handler.command = ['clanregalaclan']
export default handler