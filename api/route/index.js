const cors = require('kcors')
const r = require('koa-router')()
const bProd = process.env.NODE_ENV === 'production'
const suff = bProd ? 'com':'dev'
// whitelist
const wl = [
  `https://api.arknodejs.${suff}`,
  `https://arknodejs.${suff}`,
  `https://www.arknodejs.${suff}`,
  `https://admin.arknodejs.${suff}`,
]
// whitelist filter
function wlFilter(ctx) {
  const reqOrigin = ctx.accept.headers.origin
  if (wl.indexOf(reqOrigin)===-1) 
    return ctx.body =`[CORS] ${reqOrigin} is not allowed`
  return reqOrigin
}


module.exports = app => {
  // use authentication
  //r.prefix('/'+prefix) // set prefix
  // welcome
  r.get('/', ctx => {
    return ctx.body = {
      env: app.env,
      info: app.info,
      authentication: 'jwt'
    }
  })
  
  require('./auth')(r)
  require('./rest/')(r)
  // require('./graph')(r)
  require('./qiniu')(r)

  // swagger jsdoc
  // const swagger = require('swagger-jsdoc')
  // const swaggerSpec = swagger({
  //   swaggerDefinition: {
  //     info: {
  //       title: `${app.info.name} (from jsdoc)`,
  //       version: app.info.version,
  //       description: app.info.description
  //     },
  //     schemes: 'https',
  //     host: 'api.arknodejs.'+suff,
  //     consumes: 'application/json',
  //     produces: 'application/json',
  //     //basePath: '/'
  //   },
  //   apis: ['./**/*.js', '../mongo/models/*.js']
  // })
  // r.get('/data/api-v1.json', ctx => {
  //   return ctx.body = swaggerSpec
  // })

  app.use(cors({ origin: wlFilter }))
  app.use(r.routes())//.use(r.allowedMethods())
}
