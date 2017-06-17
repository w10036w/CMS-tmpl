// non-dep deps
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const fs = require('fs');
const path = require('path');
const compress = require('koa-compress')

// app conf
//global.resolve = file => path.resolve(__dirname, file)
global.resolve = name => require(`${__dirname}/${name}`);
global.Promise = require("bluebird")
global.log = require('./util/log')

const conf = require('./conf')
const mongo = require('./mongo');

const app = new Koa();
app.use(compress({
  // filter: content_type => /test/.test(content_type),
  threshold: 0, // default 1024 byte
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(bodyParser());
app.keys = [conf.secret];

// Logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  // TODO: error trace, req / res size
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`);
});
/** route setting, including auth */
require('./route')(app);

(async() => {
  try {
    await mongo.connect(conf.mongo.host)
    // init first admin
    const criteria = {
      username: conf.defaultAdmin.username
    }
    let user = await mongo.models.user.findOne(criteria)
    if (!user) {
      await mongo.models.user.create(conf.defaultAdmin)
      log.info(`account created: ${conf.defaultAdmin.username}`)
    }
  } catch (err) {
    log.error('Unable to connect to database: '+err);
  }
  // main api service
  await app.listen(conf.port);
  log.info(`ApiServer is running on port ${conf.port}`);
  // other services 
  // require('./wss')
})();
