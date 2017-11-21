const proto = 'http'

module.exports = {
  // basic
  proto,
  port: 8002,
  serverApiPref: '/api',

  // app general
  ga: {
    // TODO: change to proper GAId
    id: 'UA-107326123-1',
    version: 1,
    api: 'https://www.google-analytics.com/collect',
    spider: /spider|bot|appid|go-http-client|loadtest|feed/i,
  }

}
