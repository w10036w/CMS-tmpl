global.Promise = require("bluebird")
global.resolve = name => require(`${__dirname}/${name}`)

// // pm2 conflicts with log4js save to file
// //winston.add(winston.transports.File, { filename: './logs/app.log' });
global.log = require('./util/log')

global.conf = require('./conf')
const mongo = require('./mongo')

const app = require('./app');
(async() => {
  await mongo.init()
  await app.listen(conf.port);
  log.info(`[API] running on port ${conf.port}`);
})();
