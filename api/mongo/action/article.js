const md = require('../models/article')
const { _catch } = require('../utils')

// if need elastic search name & content, recommend to add one more ES engine
module.exports = {
  // cond = { _id, path }
  findOne: async cond => {
    const select = '_id title author path html category tags updateAt createAt allowComment thumbnail'    
    try {
      const data = await md.findOne(cond, select)
        .populate('author', '_id username displayName')
        .populate('category', '_id name path')
        .populate('tags', '_id name path')
        .exec()
      return { data }
    } catch (e) { return _catch(e) }
  },
  // find abstract objects (no main contents)
  // cond = { author, category, tag }, can be {}
  find: async ({ cond, limit, skip, sort, count }) => {
    try {
      const select = 'title path thumbnail summary author category tags createAt updateAt'
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
  },
  findContext: async (cond, limit=1) => {
    try {
      const select = '_id path title'
      const task = md.find(cond, select).limit(limit)
      const data = await task.exec()
      return { data }
    } catch (e) { return _catch(e) }
  }
}