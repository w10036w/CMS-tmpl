const base = require('./index')
const proto = base.proto
module.exports = Object.assign({}, base, {
  host: 'https://arknodejs.dev',
  // apiHost: 'http://127.0.0.1:8000',
  apiHost: 'http://127.0.0.1:8000',
  cache: {
    max: 1000,
    maxAge: 30000
  },
})