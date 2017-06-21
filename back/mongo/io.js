const { json } = resolve('util/http')
const filter = require('./filter')

function mongoError (e) {
  if (e.name && e.name==='CastError')
    return { error: 'DB read: ObjectId not exist'}
  else if (e.code && e.code===11000)
    return { error: 'DB create: duplicate key'}
}
async function mongoTry (fn, action='exec') {
  try { 
    let data = await fn[action]() 
    return { data }
  } catch (e) { return mongoError(e) }
}
// Mongo erroror:
// 1. if not objectId / objectId not exist
//  Cast to ObjectId failed for value "bawwe" at path "_id" for model "user"

module.exports = model => ({
// queries needs to be declared obviously (like graphql)
  findOne: async (criteria, select) => {
    const task = model.findOne(criteria, select)
    const { error, data } = await mongoTry(task)
    return error ? json(400, error) : json(200, data)
  },
  find: async (criteria, select, { limit=30, skip=0, sort=null, count=false }) => {
    const task = model.find(criteria, select)
    if (limit) task.limit(parseInt(limit))
    if (skip) task.skip(parseInt(skip))
    if (sort) task.sort(sort)
    if (count) task.count()
    const { error, data } = await mongoTry(task)
    return error ? json(400, error) : json(200, data)
  },
  findById: async (id, select) => {
    const task = model.findById(id, select)
    const { error, data } = await mongoTry(task)
    return error ? json(400, error) : json(200, data)
  },
// mutations
  create: async body => {
    let task = new model(body)
    let { error, data } = await mongoTry(task, 'save')
    if (error) return json(400, error)
    if (model.modelName === 'user') {      
      let _data = {}
      const userFields = filter.user
      userFields.forEach(e => {
        if (typeof data[e] !== 'undefined') 
          _data[e] = data[e]
      })
      data = _data
    }
    return json(201, data)
  },
  updateById: async (id, body) => {
    const task = model.findByIdAndUpdate(id, body, {new:true})
    let { error, data } = await mongoTry(task)

    if (error) return json(400, error)
    // user only
    if (model.modelName === 'user') {      
      let _data = {}
      const userFields = filter.user
      userFields.forEach(e => {
        if (typeof data[e] !== 'undefined') 
          _data[e] = data[e]
      })
      data = _data
    }
    return json(200, data)
  },
  removeById: async id => {
    const task = model.findByIdAndRemove(id)
    let { error, data } = await mongoTry(task)
    return error ? json(400, error) : json(204)
  },
  remove: async ids => {
    try { await model.remove({ _id: { $in: ids } }) }
    catch (e) { 
      let { error } = mongoError(e)
      return json(400, error) 
    }
    return json(204)
  }
})

