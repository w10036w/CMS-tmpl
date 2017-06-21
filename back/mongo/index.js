const mongoose = require('mongoose');

const models = require('./models');
const actions = require('./actions');
const filter = require('./filter')
const io = require('./io');

const connect = (uri) => {
  mongoose.Promise = Promise;
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => log.error(error))
      .on('close', () => log.debug('db:mongo connection closed.'))
      .once('open', () => {
        log.info('db:mongo connected.');
        return resolve(mongoose.connections[0])
      });

    mongoose.connect(uri);
  });
}

module.exports = {
  connect, models, actions, filter, io
};