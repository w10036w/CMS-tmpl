const log4js = require('log4js');

const { name } = resolve('package')
const bProd = process.env.NODE_ENV !== 'development'
const conf = {
  dev: { 
    appenders: [{ type: 'console' }],
  },
  prod: {
    appenders: [{
      type: 'file',
      filename: '../logs/app.log',
      category: name, 
      maxLogSize: 204800
    }]
  }
}
log4js.configure(bProd ? conf.prod : conf.dev)

const log = log4js.getLogger(name);
//log.setLevel(bProd ? 'DEBUG' : 'ERROR');

module.exports = log;
