// Inicia una votación interna en el clan
import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { args, user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  let tema = args.join(' ')
  if (!clan) return m.reply('No estás en ningún clan.')
  if (clans[clan].votacion) return m.reply('Hay una votación activa.')
  if (!tema) return m.reply('Especifica el tema de la votación.')
  clans[clan].votacion = { tema, votos: {}, opciones: ['si', 'no'] }
  await saveClans(clans)
  m.reply(`Votación iniciada: ${tema}\nOpciones: si, no\nVota con .clanvotar <opcion>`)
}
handler.help = ['clanvotacion <tema>']
handler.tags = ['clan']
handler.command = ['clanvotacion']
export default handler