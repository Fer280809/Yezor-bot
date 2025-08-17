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
  let top = Object.values(clans)
    .sort((a, b) => (b.batallas.ganadas + (b.trofeos.length * 3)) - (a.batallas.ganadas + (a.trofeos.length * 3)))
    .slice(0, 10)
    .map((c, i) => `#${i + 1} ${c.nombre} - Ganadas: ${c.batallas.ganadas} | Trofeos: ${c.trofeos.length}`)
    .join('\n')
  return m.reply('🏅 Top Clanes:\n' + top)
}
handler.help = ['topclanes']
handler.tags = ['clan']
handler.command = ['topclanes']
export default handler