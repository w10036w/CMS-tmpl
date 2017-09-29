const mongoose = require('mongoose')
const crypto = require('crypto')
// only stable version supported
// const bcrypt = require('bcrypt')
// const SALT = 10

const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const _base = require('./_base')

// e.g. for swagger
/**
 *  @swagger
 *  definitions:
 *    User:
 *      type: object
 *      required: ['_id', 'username', 'email']
 *      properties:
 *        _id:
 *          type: string
 *          format: objectId
 *          example: 59b43d704c71b6812be2d02d
 *        username:
 *          type: string
 *          example: admin
 *        displayName:
 *          type: string
 *          example: admin Display-Name
 *        email:
 *          type: string
 *          example: admin@arknodejs.com
 *        avatar:
 *          type: string
 *          example: https://avatars.githubusercontent.com/u/3350260?v=3
 *        role:
 *          type: string
 *          example: admin
 *          description: user role, can be editor, admin
 *        bio:
 *          type: string
 *          example: a good hacker
 *        createAt:
 *          type: date
 *        
 */
const schema = new Schema(Object.assign({}, {
  // public
  username: { type: String, lowercase: true, trim: true,
    index: true, unique: true, required: true },
  displayName: { type: String, default: 'casual editor', index: true },
  hashed_password: String,
  salt: String,
  email: { type: String, lowercase: true, required: true },
  avatar: String,
  role: { type: String, default: 'editor' },
  bio: { type: String, default: '' },
//}, _base), { runSettersOnQuery: true }); // for lowercase email, but will interupt populate
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

module.exports = mongoose.model('user', schema)
