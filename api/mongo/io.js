// validation must be done by actions (previous step)
// io.js will never expose to external
const { json } = resolve('util/http')

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
// Mongo error:
// 1. if not objectId / objectId not exist
//  Cast to ObjectId failed for value "bawwe" at path "_id" for model "user"
function userFieldsFilter(model, data, error) {
  if (!error && data && model.modelName === 'user') {
    if (data.salt) {
      data.salt = undefined      
      delete data.salt
    }
    if (data.hashed_password) {
      data.hashed_password = undefined
      delete data.hashed_password
    }
  }
  return { data, error }
}

module.exports = model => ({
// queries needs to be declared obviously (like graphql)
  findOne: async (criteria, select, populate) => {
    const task = model.findOne(criteria, select)
    if (populate) {
      for (k in populate) {
        task.populate(k, populate[k])
      }
    }
    return await mongoTry(task)
  },
  find: async (criteria, select, { limit, skip, sort, count, populate }) => {
    const task = model.find(criteria, select)
    if (populate) {
      for (k in populate) {
        task.populate(k, populate[k])
      }
    }
    if (limit) task.limit(parseInt(limit))
    if (skip) task.skip(parseInt(skip))
    if (sort) task.sort(sort)
    if (count) task.count()
    let { data, error } = await mongoTry(task)
    return userFieldsFilter(model, data, error)
  },
  findById: async (id, select, populate) => {
    const task = model.findById(id, select)
    if (populate) {
      for (k in populate) {
        task.populate(k, populate[k])
      }
    }
    let { data, error } = await mongoTry(task)
    return userFieldsFilter(model, data, error)
  },
// mutations
  create: async body => {
    let task = new model(body)
    return await mongoTry(task, 'save')
  },
  updateById: async (id, body) => {
    body.updateAt = Date.now()
    const task = model.findByIdAndUpdate(id, body, {new:true})
    let { data, error } = await mongoTry(task)
    return userFieldsFilter(model, data, error)
  },
  removeOne: async (cond) => {
    const task = model.findOneAndRemove(cond)
    return await mongoTry(task)
  },
  remove: async ids => {
    try { await model.remove({ _id: { $in: ids } }) }
    catch (e) { 
      return mongoError(e)
    }
    return {}
  },
  // for password or some other virtual fields
  updateVirtual: async (id, body) => {
    const task = model.findById({ _id: id }, 
      function (err, doc) {
        if (!doc) return null
        Object.keys(body).forEach(e => {
          doc[e] = body[e]
        })
        doc.updateAt = Date.now()
        doc.save()
      })
    return await mongoTry(task)
  },
})

