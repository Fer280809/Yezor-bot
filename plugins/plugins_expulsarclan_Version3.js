import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
const charactersPath = path.join(__dirname, '../src/database/characters.json')

async function getWaifuNames(user) {
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
function isOwner(user, clanObj) { return clanObj.owner === user }

const handler = async (m, { user, isAdmin, isOwner: isBotOwner, mentionByTag, mentionByReply }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('🔴 No estás en ningún clan.')
  if (!isOwner(sender, clans[clan]) && !isAdmin && !isBotOwner)
    return m.reply('🔴 Solo el owner o admin pueden expulsar.')
  let expulsado = (mentionByTag && mentionByTag[0]) || (mentionByReply && mentionByReply[0])
  if (!expulsado) return m.reply('🔴 Menciona a alguien para expulsar.')
  if (!clans[clan].miembros.includes(expulsado)) return m.reply('🔴 El usuario no está en tu clan.')
  if (expulsado === sender) return m.reply('🔴 No puedes expulsarte a ti mismo.')
  clans[clan].miembros = clans[clan].miembros.filter(u => u !== expulsado)
  const soldierIDs = await getWaifuNames(expulsado)
  clans[clan].soldados = clans[clan].soldados.filter(s => !soldierIDs.includes(s.id))
  await saveClans(clans)
  return m.reply('✅ Usuario expulsado del clan.')
}
handler.help = ['expulsarclan <@usuario>']
handler.tags = ['clan']
handler.command = ['expulsarclan']
export default handler