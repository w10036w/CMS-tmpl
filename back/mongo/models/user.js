const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT = 10

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const _base = require('./_base')

const schema = new Schema(Object.assign({}, {
  // public
  username: { type: String, lowercase: true, trim: true,
    index: true, unique: true, required: true },
  displayName: { type: String, default: '', index: true },
  hashed_password: String,
  email: String,
  avatar: String,
  role: { type: String, default: 'editor' },
  bio: String,
}, _base));

schema.virtual('password')
  .set(function (password) {
    this._password = password
    log.debug(password)
    this.hashed_password = this.encryptPassword(password)
  }).get(function () {
  return this._password
});

schema.methods = {
  verify (plain) {
    return bcrypt.compareSync(plain, this.hashed_password)
  },
  encryptPassword (password) {
    if (!password) return '';
    return bcrypt.hashSync(password, SALT)
  }
}

module.exports = mongoose.model('user', schema)