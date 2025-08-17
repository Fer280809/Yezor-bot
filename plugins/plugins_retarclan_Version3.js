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

const handler = async (m, { args, user }) => {
  const clans = await loadClans()
  let text = args.join(' ')
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let myClan = getUserClan(sender, clans)
  let targetClan = text
  if (!myClan) return m.reply('🔴 No estás en ningún clan.')
  if (!clans[targetClan]) return m.reply('🔴 No existe ese clan.')
  if (targetClan === myClan) return m.reply('🔴 No puedes retar a tu propio clan.')
  clans[myClan].reto = targetClan
  await saveClans(clans)
  return m.reply(`⚔️ Reto enviado a ${targetClan}.\nEl owner de ese clan debe usar .aceptarbatalla para iniciar.`)
}
handler.help = ['retarclan <nombre>']
handler.tags = ['clan']
handler.command = ['retarclan']
export default handler