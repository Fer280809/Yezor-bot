import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
const charactersPath = path.join(__dirname, '../src/database/characters.json')

async function getWaifuIDs(user) {
  try {
    await access(charactersPath, constants.F_OK)
    const data = await readFile(charactersPath, 'utf-8')
    return JSON.parse(data).filter(c => c.user === user).map(c => `${c.name}-${user}`)
  } catch { return [] }
}
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
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('🔴 No estás en ningún clan.')
  let id = text
  if (!id) return m.reply('🔴 Escribe el id del personaje.')
  const userSoldiers = await getWaifuIDs(sender)
  if (!userSoldiers.includes(id)) return m.reply('🔴 No tienes un personaje con ese id en el clan.')
  let soldado = clans[clan].soldados.find(s => s.id === id)
  if (!soldado) return m.reply('🔴 No tienes un personaje con ese id en el clan.')
  soldado.salud = soldado.max_salud
  await saveClans(clans)
  return m.reply(`💉 Tu personaje ${id} ha sido curado.`)
}
handler.help = ['curar <id>']
handler.tags = ['clan']
handler.command = ['curar']
export default handler