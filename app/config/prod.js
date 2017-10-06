const base = require('./index')
const proto = base.proto
module.exports = Object.assign({}, base, {
  // data_env=prod
  host: 'https://arknodejs.com',
  apiHost: 'http://localhost:8000',
  
  cache: {
    max: 1000,
    maxAge: 900000
  },
})
