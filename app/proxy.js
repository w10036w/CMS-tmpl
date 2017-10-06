const LRU = require('lru-cache')
const axios = require('axios')
const data_env = process.env.DATA_ENV || 'dev'

module.exports = (app, config) => {
  const { apiHost, serverApiPref, cache } = config
  const apiCache = LRU(cache)

  app.use(serverApiPref, (req, res) => {
    const ctx = req.originalUrl.substr(serverApiPref.length+1)
    const key = ctx || 'welcome'
    if (apiCache.has(key)) {
      console.info(`[PROXY][${key}] - cached`)
      let resp = apiCache.get(key)
      res.status(resp.status)
      data_env!=='prod' && res.header("x-ncache", "hit")
      res.send(resp.data)
      return
    }
    let uri = `${apiHost}/${ctx}`
    const start = Date.now()
    console.log(`[PROXY][${key}] - proxying to ${uri}`)
    return axios.get(uri).then(resp => {
      if (resp.status === 200) {
        apiCache.set(key, resp)
      }
      res.status(resp.status)
      data_env!=='prod' && res.header("x-node-proxy", uri) // debug
      data_env!=='prod' && res.header("x-node-proxy-duration", `${Date.now()-start}ms`) // debug
      res.send(resp.data)
    }).catch(e => {
      console.log(e.response && e.response.status)
    })
  })
}