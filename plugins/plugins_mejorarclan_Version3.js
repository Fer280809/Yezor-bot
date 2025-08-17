import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')

async function loadClans() {
  try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') }
  const data = await readFile(clanPath, 'utf-8')
  return JSON.parse(data)
}
async function saveClans(data) {
  await writeFile(clanPath, JSON.stringify(data, null, 2))
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
  if (clans[clan].dinero < 1000) return m.reply('🔴 El clan necesita $1000 para mejorar.')
  clans[clan].capacidad = (clans[clan].capacidad || 10) + 5
  clans[clan].dinero -= 1000
  await saveClans(clans)
  return m.reply('🚀 ¡El clan ha mejorado su capacidad en +5 miembros! (-$1000)')
}
handler.help = ['mejorarclan']
handler.tags = ['clan']
handler.command = ['mejorarclan']
export default handler