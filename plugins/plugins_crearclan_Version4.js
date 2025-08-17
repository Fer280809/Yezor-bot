import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
const charactersPath = path.join(__dirname, '../src/database/characters.json')

async function getWaifus(user) {
  try {
    await access(charactersPath, constants.F_OK)
    const data = await readFile(charactersPath, 'utf-8')
    const allChars = JSON.parse(data)
    return allChars
      .filter(c => c.user === user)
      .map(c => ({
        id: `${c.name}-${user}`,
        name: c.name,
        salud: c.max_salud || 100,
        max_salud: c.max_salud || 100,
        value: c.value || 1
      }))
  } catch {
    return []
  }
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
  if (!text) return m.reply('🔴 Escribe el nombre del clan.')
  if (clans[text]) return m.reply('🔴 Ya existe un clan con ese nombre.')
  if (getUserClan(sender, clans)) return m.reply('🔴 Ya estás en un clan.')
  const waifus = await getWaifus(sender)
  clans[text] = {
    nombre: text,
    owner: sender,
    miembros: [sender],
    dinero: 0,
    experiencia: 0,
    trofeos: [],
    batallas: { ganadas: 0, perdidas: 0 },
    soldados: waifus
  }
  await saveClans(clans)
  return m.reply(`✅ Clan "${text}" creado y te has unido como owner.\nPuedes invitar a tus amigos con .unirclan ${text}`)
}
handler.help = ['crearclan <nombre>']
handler.tags = ['clan']
handler.command = ['crearclan']
export default handler