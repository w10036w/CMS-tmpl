// non-dep deps
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const { logger } = resolve('middleware/resp')
const { name, config, description, repository, license, author, version } = require('./package')

const app = new Koa();
app.info = { name, description, config, repository, license, author, version }
app.use(static('static/'), { maxage: '10000' })
app.use(logger);
app.use(bodyParser());
app.keys = [conf.secret];

// route plugin
require('./route')(app);

module.exports = app
