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
  let armas = clans[clan].armas || {}
  let items = clans[clan].items || {}
  let msg = `🗡️ *Inventario del clan ${clan}*\n\n*Armas:*\n`
  if (Object.keys(armas).length === 0) msg += '_Sin armas compradas_\n'
  else {
    for (let a in armas) msg += `• ${a}: ${armas[a]}\n`
  }
  msg += '\n*Ítems:*\n'
  if (Object.keys(items).length === 0) msg += '_Sin ítems_\n'
  else {
    for (let i in items) msg += `• ${i}: ${items[i]}\n`
  }
  m.reply(msg)
}
handler.help = ['claninventario']
handler.tags = ['clan']
handler.command = ['claninventario']
export default handler