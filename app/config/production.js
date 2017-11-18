const base = require('./index')
const proto = base.proto
module.exports = Object.assign({}, base, {
  host: 'https://arknodejs.com',
  // apiHost: 'http://api.arknodejs.com',
  apiHost: 'http://127.0.0.1:8000',
  cache: {
    max: 1000,
    maxAge: 900000
  },
})
