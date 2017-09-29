export function capitalize (s) {
  return s[0].toUpperCase() + s.substr(1)
}
function digit2 (int) {
  return int>9 ? int : '0'+int
}
// YYYY-MM-DD
// ts can be timestamp or iso time format
export function fmtDateyymd (ts) {
  const t = new Date(ts)
  const m = digit2(t.getMonth()+1)
  const d = digit2(t.getDate())
  return `${t.getFullYear()}-${m}-${d}`
}
export function fmtDateyymdhms (ts) {
  const t = new Date(ts)
  const m = digit2(t.getMonth()+1)
  const d = digit2(t.getDate())
  const h = digit2(t.getHours())
  const min = digit2(t.getMinutes())
  const s = digit2(t.getSeconds())
  return `${t.getFullYear()}-${m}-${d} ${h}:${min}:${s}`
}

export function urlize (str) {
  return encodeURIComponent(str.toLowerCase().replace(/\s+/g, '-'))
}