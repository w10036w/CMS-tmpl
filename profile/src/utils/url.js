function parseUrl(str, reg) {
  if (str) {
    var data = {};
    str.replace(reg, function ($0, $1, $2, $3) {
      data[$1] = $3;
    });
    return data;
  }
}
export function URL (search, hash) {
  search = search || window.location.search;
  hash = hash || window.location.hash;
  return {
    search: parseUrl(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
    hash: parseUrl(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
  };
}