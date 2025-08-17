// Votación para expulsar a un miembro conflictivo
import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { mentionByTag, mentionByReply, user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  let target = (mentionByTag && mentionByTag[0]) || (mentionByReply && mentionByReply[0])
  if (!clan) return m.reply('No estás en ningún clan.')
  if (!target || !clans[clan].miembros.includes(target)) return m.reply('Ese usuario no es miembro de tu clan.')
  clans[clan].votacion = { tema: `Expulsar a ${target}`, votos: {}, opciones: ['si', 'no'], expulsar: target }
  await saveClans(clans)
  m.reply(`Votación para expulsar a ${target} iniciada. Vota con .clanvotar si/no`)
}
handler.help = ['clanexpulsarvotacion @usuario']
handler.tags = ['clan']
handler.command = ['clanexpulsarvotacion']
export default handler