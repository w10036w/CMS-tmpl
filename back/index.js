// non-dep deps
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
global.Promise = require("bluebird");
//global.resolve = file => path.resolve(__dirname, file)
global.resolve = name => require(`${__dirname}/${name}`);
// pm2 conflicts with log4js
//winston.add(winston.transports.File, { filename: './logs/app.log' });
global.log = resolve('util/log')
const { logger } = resolve('middleware/resp')

global.conf = require('./conf')
const mongo = require('./mongo');

const app = new Koa();
app.use(logger);
app.use(bodyParser());
app.keys = [conf.secret];
/** route setting, including auth */
require('./route')(app);

(async() => {
  await mongo.init()
  await app.listen(conf.port);
  log.info(`[API] running on port ${conf.port}`);
})();
