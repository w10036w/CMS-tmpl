

function gSitemap (config) {
  const apiCache = LRU(cache)

  let key = 'sitemap'
  if (apiCache.has(key)) return apiCache.get(key)

  

  return axios.get(uri)
    .then(r => r.data)
    .then(data => {
      let body = data.reduce((prev, curr) => {
        prev += `  <url>\r\n`
        prev += `    <loc>${host}/post/${curr.path}</loc>\r\n`
        prev += `    <lastmod>${curr.updateAt.slice(0, 10)}</lastmod>\r\n`
        prev += `    <priority>0.6</priority>\r\n`
        prev += `  </url>\r\n`
        return prev
      }, '')
      const resp = head + body + tail
      apiCache.set(key, resp)
      return resp
    })
}
const axios = require('axios')
const LRU = require('lru-cache')

module.exports = (app, config) => {
  app.use('/sitemap.xml', (req, res) => {
    const { apiHost, host, cache } = config
    const apiCache = LRU(cache)
  
    const key = 'sitemap'
    res.header('Content-Type', 'application/xml')
    if (apiCache.has(key)) res.send(apiCache.get(key))
  
    let head = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n`
    let tail = '</urlset>'
    let uri = `${apiHost}/sitemap`

    return axios.get(uri)
      .then(r => r.data)
      .then(data => {
        let body = data.reduce((prev, curr) => {
          prev += `  <url>\r\n`
          prev += `    <loc>${host}/article/${curr.path}</loc>\r\n`
          prev += `    <lastmod>${curr.updateAt.slice(0, 10)}</lastmod>\r\n`
          prev += `    <priority>0.6</priority>\r\n`
          prev += `  </url>\r\n`
          return prev
        }, '')
        const sitemap = head + body + tail
        apiCache.set(key, sitemap)
        return res.send(sitemap)
      }).catch(e => console.log(e.response && e.response.status)) 

  })
}