import { readFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { return {} } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
const handler = async (m) => {
  const clans = await loadClans()
  let ranking = Object.values(clans).sort((a, b) => (b.experiencia || 0) - (a.experiencia || 0))
    .map((c, i) => `#${i + 1} ${c.nombre} - Exp: ${c.experiencia || 0}`).join('\n')
  m.reply('🏆 Ranking por experiencia:\n' + ranking)
}
handler.help = ['clanranking']
handler.tags = ['clan']
handler.command = ['clanranking']
export default handler