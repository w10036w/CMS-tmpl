const md = require('../models/article')
const { _catch } = require('../utils')

// if need elastic search name & content, recommend to add one more ES engine
module.exports = {
  // cond = { _id, path }
  findOne: async cond => {
    try {
      const data = await md.findOne(cond)
        .populate('author', '_id username')
        .populate('category', '_id name path')
        .populate('tags', '_id name path')
        .exec()
      return { data }
    } catch (e) { return _catch(e) }
  },
  // find abstract objects (no main contents)
  // cond = { author, category, tag }, can be {}
  find: async ({ cond, limit=20, skip=0, sort, count }) => {
    try {
      const select = 'title path thumbnail summary author category tags createAt'
      const task = md.find(cond, select)
        .populate('author', '_id username displayName avatar')
        .populate('category', '_id name path')
        .populate('tags', '_id name path')
      if (limit) task.limit(limit)
      if (skip) task.skip(skip)
      if (sort) task.sort(sort)
      if (count) task.count()
      const data = await task.exec()
      return { data }
    } catch (e) { return _catch(e) }
  },
  // cond = { name: (partial) }
  findByName: async (cond, limit, skip, sort, count) => {
    try {
      const task = md.find(cond)
        .populate('author', '_id username avatar')
        .populate('category', '_id name path')
        .populate('tags', '_id name path')
      if (limit) task.limit(limit)
      if (skip) task.skip(skip)
      if (sort) task.sort(sort)
      if (count) task.count()
      const data = await task.exec()
      return { data }
    } catch (e) { return _catch(e) }
  }
}