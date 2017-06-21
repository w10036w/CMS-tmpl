// non-dep deps
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const fs = require('fs');
const path = require('path');
global.Promise = require("bluebird")
//global.resolve = file => path.resolve(__dirname, file)
global.resolve = name => require(`${__dirname}/${name}`);
global.log = resolve('util/log')
const conf = resolve('conf')
const mongo = resolve('mongo');
const { logger } = resolve('middleware/resp')

const app = new Koa();
app.use(logger);
app.use(bodyParser());
app.keys = [conf.secret];
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
      log.info(`default admin account created`)
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
