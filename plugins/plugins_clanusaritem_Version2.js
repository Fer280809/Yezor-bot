import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
const items = {
  pocionvida: "Todos los soldados han sido curados.",
  escudomax: "¡El clan está protegido por un escudo máximo!",
  trampa: "¡Una trampa ha sido activada contra los enemigos!",
  boostxp: "¡El clan obtiene 30% exp extra en próximas batallas!"
}
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { args, user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('❌ No estás en ningún clan.')
  let item = (args[0] || '').toLowerCase()
  if (!items[item]) return m.reply('❌ Ese ítem no existe o no es usable.')
  if (!clans[clan].items || !clans[clan].items[item]) return m.reply('❌ No tienes ese ítem en el clan.')
  clans[clan].items[item] -= 1
  if (clans[clan].items[item] <= 0) delete clans[clan].items[item]
  // Aquí puedes agregar efectos reales sobre el clan según el ítem
  await saveClans(clans)
  m.reply(`✅ Usaste ${item}: ${items[item]}`)
}
handler.help = ['clanusaritem <item>']
handler.tags = ['clan']
handler.command = ['clanusaritem']
export default handler