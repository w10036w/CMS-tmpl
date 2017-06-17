const development = require('./dev')
const staging = require('./prod')

module.exports = {
  development, staging
}[process.env.NODE_ENV || 'development']