import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
const handler = async (m, { user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let invitadoEn = Object.keys(clans).find(c => (clans[c].invitacion || []).includes(sender))
  if (!invitadoEn) return m.reply('❌ No tienes invitaciones pendientes.')
  clans[invitadoEn].invitacion = (clans[invitadoEn].invitacion || []).filter(u => u !== sender)
  clans[invitadoEn].miembros.push(sender)
  await saveClans(clans)
  m.reply(`✅ Te uniste al clan ${invitadoEn}.`)
}
handler.help = ['clanaceptarinvitacion']
handler.tags = ['clan']
handler.command = ['clanaceptarinvitacion']
export default handler