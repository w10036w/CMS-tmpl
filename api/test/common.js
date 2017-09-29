const env = process.env.NODE_ENV || 'dev'
const { port } = require('../package').config
const axios = require('axios')
const baseURL = `http://localhost:${port}`
let app

module.exports = (() => {
  app = app || require('../index')
  
  const customApi = (opts={}) => {
    opts.baseURL = baseURL
    return axios.create(opts)
  }
  const api = customApi()
  
  const schemas = require('./schemas')
  const gText = {
    desc: (type, path, desc) => `[${type.toUpperCase()}] ${path} ${desc}`,
    it: (code, note) => `${code}: ${note}`
  }

  return {
    api,
    customApi,
    schemas,
    gText,
  }
})()