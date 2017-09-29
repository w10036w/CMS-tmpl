const log4js = require('log4js');
const { name } = resolve('package')
const bProd = process.env.NODE_ENV !== 'development'
const conf = {
  appenders: [{ type: 'console' }],
  replaceConsole: true
}
log4js.configure(conf)
const log = log4js.getLogger(name);
//log.setLevel(bProd ? 'DEBUG' : 'ERROR');
module.exports = log;
