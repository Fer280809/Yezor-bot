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
function isOwner(user, clanObj) { return clanObj.owner === user }

const handler = async (m, { user }) => {
  const clans = await loadClans()
  let sender = user || (m.sender || '').replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let myClan = getUserClan(sender, clans)
  if (!myClan) return m.reply('🔴 No estás en ningún clan.')
  if (!isOwner(sender, clans[myClan])) return m.reply('🔴 Solo el owner puede aceptar la batalla.')
  let retador = Object.keys(clans).find(clan => clans[clan].reto === myClan)
  if (!retador) return m.reply('🔴 No tienes retos pendientes.')
  let fuerzaMiClan = clans[myClan].soldados.length
  let fuerzaRetador = clans[retador].soldados.length
  let ganador, perdedor
  if (fuerzaMiClan >= fuerzaRetador) {
    ganador = myClan; perdedor = retador
  } else {
    ganador = retador; perdedor = myClan
  }
  clans[ganador].batallas.ganadas++
  clans[perdedor].batallas.perdidas++
  clans[ganador].dinero += 500
  clans[ganador].experiencia += 100
  clans[ganador].trofeos.push(perdedor)
  clans[perdedor].dinero = Math.max(0, clans[perdedor].dinero - 200)
  clans[perdedor].experiencia = Math.max(0, clans[perdedor].experiencia - 50)
  delete clans[retador].reto
  await saveClans(clans)
  return m.reply(`🥇 ¡${ganador} ha ganado la batalla! +$500, +100xp y trofeo.\n😵 ${perdedor} perdió $200 y 50xp.`)
}
handler.help = ['aceptarbatalla']
handler.tags = ['clan']
handler.command = ['aceptarbatalla']
export default handler