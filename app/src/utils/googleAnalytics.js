// borrow from https://github.com/smallpath/blog/blob/master/front/middleware/serverGoogleAnalytic.js
const { ga } = require('../../config')
const request = require('axios')
const EMPTY_GIF = new Buffer('R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==', 'base64')
const uuid = require('uuid')
const expires = 3600 * 1000 * 24 * 365 * 2 // 2 years

const shouldBanSpider = ua => ua ? ga.spider.test(ua) : true

const getClientIp = req => {
  let matched = req.ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)
  return matched ? matched[0] : req.ip
}

module.exports = ({ title, url, cid }, req, res) => {
  if (!ga.id) return console.error('No GA Id')
  const now = Date.now()
  if (!cid) {
    cid = uuid.v4()
    res.cookie('ga_cid', cid, { expires: new Date(now + expires) })
  }

  let ua = req.header('user-agent')
  if (shouldBanSpider(ua)) return

  let form = {
    v: ga.version,
    tid: ga.id,
    ds: 'web',
    z: now + cid,
    cid,
    uip: getClientIp(req),
    ua,
    t: 'pageview',
    an: title,
    dt: title,
    dh: url,
    dr: url,
    dp: url,
  }
  request.get(ga.api, { params: form })
    .then(resp => 
      resp.status !== 200 ? console.error(response, form)
        : console.info(`Sent to GA: cid=${cid}&ua=${ua}&url=${url}`)
    ).catch(err => console.error(err, form))
}
