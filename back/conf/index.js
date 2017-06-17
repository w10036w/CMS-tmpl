const development = require('./dev')
const production = require('./prod')

module.exports = {
  development, production
}[process.env.NODE_ENV || 'development']