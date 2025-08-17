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
function isOwnerOrAdmin(user, clanObj, isAdmin, isBotOwner) {
  return clanObj.owner === user || isAdmin || isBotOwner
}

const handler = async (m, { args, user, isAdmin, isOwner: isBotOwner, quoted }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('🔴 No estás en ningún clan.')
  if (!isOwnerOrAdmin(sender, clans[clan], isAdmin, isBotOwner))
    return m.reply('🔴 Solo el owner o admin pueden cambiar la foto del clan.')

  let url = args[0]
  if (!url && quoted && quoted.mimetype && quoted.mimetype.startsWith('image/')) {
    url = quoted.url || (quoted.download && await quoted.download())
    if (!url) return m.reply('🔴 No se pudo obtener la imagen citada.')
  }
  if (url && !url.startsWith('http')) return m.reply('🔴 El link debe ser una URL válida de imagen.')
  if (!url) return m.reply('🔴 Debes enviar un link de imagen o responder a una imagen.')

  clans[clan].foto = url
  await saveClans(clans)
  return m.reply('✅ Foto del clan actualizada.')
}
handler.help = ['clanfoto <link> (o responde a una imagen)']
handler.tags = ['clan']
handler.command = ['clanfoto']
export default handler