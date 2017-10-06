const base = require('./index')
const proto = base.proto
module.exports = Object.assign({}, base, {
  // data_env=dev
  //apiHost: 'http://api.arknodejs.dev',
  host: 'https://arknodejs.dev',
  apiHost: 'http://localhost:8000',

  cache: {
    max: 1000,
    maxAge: 30000
  },
})