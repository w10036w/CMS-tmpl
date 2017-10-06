// temp
// k,v of scripts
export const srcs = {
  
}

let imgs = {}
export function loadImg(e) {
  if (imgs[e]) return imgs[e]
  let p = new Promise((resolve, reject) => {
    var img = document.createElement('img')
    img.src = e
    img.style.display = 'none'
    document.body.appendChild(img)
    resolve(e)
  })
  return imgs[e] = p
}

let styles = {}
function loadCss(e) {
  if (styles[e]) return styles[e]
  let p = new Promise((resolve, reject) => {
    var h = document.getElementsByTagName("head")[0],
        link = document.createElement("link");
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = e;
    h.appendChild(link);
    resolve( e )
  });
  return styles[e] = p
}

let scripts = {}
export function loadScript(e) {
  if (Array.isArray(e)) {
    const self = this, promises = []
    e.forEach(e => promises.push(self.script(item)))
    return Promise.all(promises).then(d => d).catch(e => e)
  }
  if (scripts[e])return scripts[e];
  let p = new Promise((resolve, reject) => {
    var r = false,
      h = document.getElementsByTagName("head")[0],
      s = document.createElement("script");
    s.onload = s.onreadystatechange = function () {
      if (!r && (!this.readyState || this.readyState == "complete")) {
        r = true;
        resolve(e);
      }
    };
    s.onerror = s.onabort = reject;
    s.async = true;
    s.src = e
    h.appendChild(s);
  });
  scripts[e] = p
  return p
}