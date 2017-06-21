const r = require('koa-router')()

const { prefix } = resolve('package').config


module.exports = app => {
  // use authentication
  require('./auth')(r);
  r.prefix('/'+prefix)
  // welcome
  r.get('/', ctx => {
    return ctx.body = {
      env: app.env,
      name: 'arkcms',
      prefix,
      authentication: 'jwt'
    }
  })
  // use graph api
  // require('./graph')(r);
  // use rest api
  require('./rest/')(r)
  require('./qiniu')(r)

  app.use(r.routes()).use(r.allowedMethods())
}
