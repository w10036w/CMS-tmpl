const mongoose = require('mongoose')
const crypto = require('crypto')
// only stable version supported
// const bcrypt = require('bcrypt')
// const SALT = 10

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const _base = require('./_base')

const schema = new Schema(Object.assign({}, {
  // public
  username: { type: String, lowercase: true, trim: true,
    index: true, unique: true, required: true },
  displayName: { type: String, default: '', index: true },
  hashed_password: String,
  salt: String,
  email: String,
  avatar: String,
  role: { type: String, default: 'editor' },
  bio: String,
}, _base));

schema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encrypt(password)
  }).get(function () {
    return this._password
  });
schema.methods = {
  verify (plainText) {
    const encrypted = this.encrypt(plainText);
    const hashed = this.hashed_password;
    return encrypted === hashed;
  },
  encrypt (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt + '')
        .update(password)
        .digest('hex');
    } catch (err) {
      return err;
    }
  },
  makeSalt() {
    return Math.round((new Date().valueOf() * Math.random()))
  },
}

// schema.virtual('password')
//   .set(function (password) {
//     this._password = password
//     this.hashed_password = this.encryptPassword(password)
//   }).get(function () {
//   return this._password
// });

// schema.methods = {
//   verify (plain) {
//     return bcrypt.compareSync(plain, this.hashed_password)
//   },
//   encryptPassword (password) {
//     if (!password) return '';
//     return bcrypt.hashSync(password, SALT)
//   }
// }

module.exports = mongoose.model('user', schema)