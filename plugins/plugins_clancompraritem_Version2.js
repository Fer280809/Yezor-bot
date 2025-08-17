import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
const itemsTienda = {
  pocionvida: { precio: 400 },
  escudomax:  { precio: 1500 },
  trampa:     { precio: 1000 },
  boostxp:    { precio: 1000 }
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
  if (!itemsTienda[item]) return m.reply('❌ Ese ítem no existe en la tienda. Usa .clantienda')
  if (clans[clan].dinero < itemsTienda[item].precio) return m.reply('❌ Tu clan no tiene suficiente dinero.')
  if (!clans[clan].items) clans[clan].items = {}
  clans[clan].items[item] = (clans[clan].items[item] || 0) + 1
  clans[clan].dinero -= itemsTienda[item].precio
  await saveClans(clans)
  m.reply(`✅ Compraste 1 ${item} para tu clan.`)
}
handler.help = ['clancompraritem <item>']
handler.tags = ['clan']
handler.command = ['clancompraritem']
export default handler