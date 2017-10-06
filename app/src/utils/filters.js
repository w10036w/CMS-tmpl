export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}
export function fullPath (url) {
  return '/' + url.split('/').filter((e, i) => i>2).join('/')
}

export function camelize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function uppercase (s) {
  return s.toUpperCase()
}
export function qsify (obj) {
  return Object.keys(obj).filter(e => e).map(e => `${e}=${obj[e]}`).join('&')
}
function digit2 (int) {
  return int>9 ? int : '0'+int
}
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
// export function timeAgo (time) {
//   const between = Date.now() / 1000 - Number(time)
//   if (between < 3600) {
//     return pluralize(~~(between / 60), ' minute')
//   } else if (between < 86400) {
//     return pluralize(~~(between / 3600), ' hour')
//   } else {
//     return pluralize(~~(between / 86400), ' day')
//   }
// }
// function pluralize (time, label) {
//   if (time === 1) {
//     return time + label
//   }
//   return time + label + 's'
// }