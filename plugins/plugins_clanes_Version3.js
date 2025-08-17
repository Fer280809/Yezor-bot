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

const handler = async (m) => {
  const clans = await loadClans()
  if (Object.keys(clans).length === 0) return m.reply('🔴 No hay clanes.')
  let list = Object.values(clans).map((c, i) => `${i + 1}. ${c.nombre} (${c.miembros.length} miembros)`).join('\n')
  return m.reply('🏰 Clanes existentes:\n' + list)
}
handler.help = ['clanes']
handler.tags = ['clan']
handler.command = ['clanes']
export default handler