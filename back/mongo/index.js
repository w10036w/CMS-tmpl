const mongoose = require('mongoose');

const models = require('./models');
const actions = require('./actions');
const filter = require('./filter')
const io = require('./io');

function connect (uri) {
  mongoose.Promise = Promise;
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => log.error(error))
      .on('close', () => log.info('[MONGO] connection closed.'))
      .once('open', () => {
        log.info('[MONGO] connected.');
        return resolve(mongoose.connections[0])
      });

    mongoose.connect(uri);
  });
}
async function initAdmin () {
  const criteria = {
    username: conf.defaultAdmin.username
  }
  let user = await models.user.findOne(criteria)
  if (!user) {
    await models.user.create(conf.defaultAdmin)
    log.info(`[MONGO] default admin created`)
  }
}
async function init () {
  try {
    await connect(conf.mongo.host)
    initAdmin()
  } catch (e) {
    log.error('[MONGO] Unable to connect to mongodb: ' + e);
  }
}

module.exports = {
  init, models, actions, filter, io
};