// for admin
// queries needs to be declared obviously
// validation here
// empty select will be rejected
// reference for ./action
const { json } = resolve('util/http')

const io = require('./io')

module.exports = model => ({
  findOne: async ctx => {
    let { criteria, select, populate } = ctx.query;
    try {
      criteria = criteria ? JSON.parse(criteria) : {}
      if (populate) populate = JSON.parse(populate)
    } catch (e) { ctx.throw(400, 'invalid criteria or populate') }
    if (!select) select = ''
      // ctx.throw(400, 'missing query: select')
    
    const { data, error } = await io(model).findOne(criteria, select, populate)
    if (error) ctx.throw = json(500, error)
    ctx.body = data
  },
  find: async ctx => {
    let { criteria, select, populate, limit, skip, sort, count } = ctx.query
    try {
      criteria = criteria ? JSON.parse(criteria) : {}
      if (populate) populate = JSON.parse(populate)
    } catch (e) { ctx.throw(400, 'invalid query: criteria or populate') }
    if (!select) select = ''
    let opts = {}
    if (populate) opts.populate = populate
    if (limit && Math.floor(limit)) opts.limit = Math.floor(limit)
    if (skip && Math.floor(skip)) opts.skip = Math.floor(skip)
    if (sort) {
      if (typeof sort !== 'string')
        return ctx.throw(400, 'invalid query: sort. Must be a string')
      opts.sort = sort
    }
    if (count) opts.count = true
    const { error, data } = await io(model).find(criteria, select, opts)
    if (error) ctx.throw(405, error)
    ctx.body = data
  },
  findById: async ctx => {
    const id = ctx.params.id
    if (!id) ctx.throw(405, 'missing params: id')
    let select = ctx.query.select || ''
    let populate = ctx.query.populate
    try {
      if (populate) populate = JSON.parse(populate)
    } catch (e) { ctx.throw(400, 'invalid query: populate') }
    const { data, error } = await io(model).findById(id, select, populate)
    if (error) ctx.throw(405, error)
    ctx.body = data
  },

// mutations
  // POST 201
  create: async ctx => {
    let body = ctx.request.body
    if (typeof body !== 'object')
      return ctx.throw(405, 'invalid request body')
    const { data, error } = await io(model).create(body)
    if (error) return ctx.throw(405, error)
    ctx.status = 201
    ctx.set('Location', `/${model.modelName}/${data._id}`)
    return ctx.body = data
  },
  // PATCH 200
  updateById: async ctx => {
    const id = ctx.params.id
    if (!id) return ctx.throw(405, 'missing params: id')
    let body = ctx.request.body
    if (typeof body !== 'object')
      return ctx.throw(405, 'invalid request body')
    const { data, error } = await io(model).updateById(id, body)
    if (error) ctx.throw(405, error)
    ctx.body = data
  },
  // DELETE 204
  removeOne: async ctx => {
    if (!Object.keys(ctx.query).length)
      return ctx.throw(400, 'invalid params')
    let cond = ctx.query

    const { data, error } = await io(model).removeOne(cond)
    if (error) return ctx.throw(405, error)
    ctx.status = 204
  },
  remove: async ctx => {
    const ids = ctx.request.body.ids // []
    if (!ids || !ids.length)
      return ctx.throw(405, 'invalid body: ids')
    const { data, error } = await io(model).remove(ids)
    if (error) return ctx.throw(405, error)
    ctx.status = 204
  },

  updateVirtual: async ctx => {
    const id = ctx.params.id
    if (!id) return ctx.throw(400, 'invalid params: id')
    const body = ctx.request.body
    const { data, error } = await io(model).updateVirtual(id, body)
    if (error) return ctx.throw(405, error) // never expose user id
    ctx.body = data
  }
})

