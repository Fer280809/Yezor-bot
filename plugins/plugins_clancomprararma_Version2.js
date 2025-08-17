import { readFile, writeFile, access, constants } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clanPath = path.join(__dirname, 'clanData.json')
const armasTienda = {
  espada:  { precio: 500, ataque: 5 },
  lanza:   { precio: 800, ataque: 8 },
  arco:    { precio: 700, ataque: 7 },
  hacha:   { precio: 1000, ataque: 10 },
  escudo:  { precio: 700, defensa: 7 },
  catapulta: { precio: 2500, ataque: 20 }
}
async function loadClans() { try { await access(clanPath, constants.F_OK) } catch { await writeFile(clanPath, '{}') } const data = await readFile(clanPath, 'utf-8'); return JSON.parse(data) }
async function saveClans(data) { await writeFile(clanPath, JSON.stringify(data, null, 2)) }
function getUserClan(user, clans) { for (const clan in clans) if (clans[clan].miembros.includes(user)) return clan; return null }
const handler = async (m, { args, user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let clan = getUserClan(sender, clans)
  if (!clan) return m.reply('❌ No estás en ningún clan.')
  let arma = (args[0] || '').toLowerCase()
  if (!armasTienda[arma]) return m.reply('❌ Esa arma no existe en la tienda. Usa .clantienda')
  if (clans[clan].dinero < armasTienda[arma].precio) return m.reply('❌ Tu clan no tiene suficiente dinero.')
  if (!clans[clan].armas) clans[clan].armas = {}
  clans[clan].armas[arma] = (clans[clan].armas[arma] || 0) + 1
  clans[clan].dinero -= armasTienda[arma].precio
  await saveClans(clans)
  m.reply(`✅ Compraste 1 ${arma} para tu clan.`)
}
handler.help = ['clancomprararma <arma>']
handler.tags = ['clan']
handler.command = ['clancomprararma']
export default handler