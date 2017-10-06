// all countable (like, visit to redis)
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const common = require('./_base')

const schema = new Schema(Object.assign({
  // public
  title: { type: String, required: true },
  path: { type: String, index: true, unique: true, required: true },
  top: { type: Boolean, default: false }, // 0 normal 1 top
  author: { type: ObjectId, required: true, ref: 'user' },
  thumbnail: { type: String, default: '' },
  summary: { type: String, default: '' },
  // format is always md
  content: { type: String, required: true },
  html: { type: String, required: true },
  tags: [{ type: ObjectId, ref: 'tag' }],
  category: { type: ObjectId, required: true, ref: 'category' },
  allowComment: { type: Boolean, default: true },
  // not recorded in db
}, common));

schema.index({ top: -1, _id: -1 })
schema.index({ author: 1, createAt: -1 })

module.exports = mongoose.model('article', schema);