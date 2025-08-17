import { readFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')

async function loadClans() {
  try { await access(clanPath, constants.F_OK) } catch { return {} }
  const data = await readFile(clanPath, 'utf-8')
  return JSON.parse(data)
}
function getUserClan(user, clans) {
  for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan
  return null
}

const handler = async (m, { user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('🔴 No estás en ningún clan.')
  return m.reply(`💰 Dinero actual del clan: $${clans[clan].dinero}`)
}
handler.help = ['fondoclan']
handler.tags = ['clan']
handler.command = ['fondoclan']
export default handler