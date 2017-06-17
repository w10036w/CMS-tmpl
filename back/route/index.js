const r = require('koa-router')()

const { prefix } = resolve('package').config


module.exports = app => {
  // use authentication
  require('./auth')(r);
  r.prefix('/'+prefix)
  // welcome
  r.get('/', ctx => {
    return ctx.body = {
      name: 'arkcms',
      graph: 'disabled',
      prefix,
      methodology: 'jwt'
    }
  })
  // use graph api
  // require('./graph')(r);
  // use rest api
  // require('./rest/')(r)
  // cdn, e.g. qiniu
  // require('./cdn')(r)

  app.use(r.routes()).use(r.allowedMethods())
}
