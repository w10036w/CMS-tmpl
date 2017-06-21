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
  author: { type: ObjectId, required: true },
  type: { type: String, default: 'md' },
  thumbnail: String,
  content: String,
  galleries: [ObjectId],
  tags: [ObjectId],
  category: { type: ObjectId, required: true },
  allowComment: { type: Boolean, default: true },
  lastReplyId: ObjectId, // click to redirect to the reply
  lastReplyAt: { type: Date, default: Date.now },
  // not recorded in db
}, common));

schema.index({ top: -1, _id: -1 })
schema.index({ top: -1, lastReplyAt: -1 })
schema.index({ authorId: 1, createAt: -1 })

module.exports = mongoose.model('article', schema);