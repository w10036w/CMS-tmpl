// full access for admin
const { json } = resolve('util/http')

const io = require('./io')

module.exports = model => ({
// queries needs to be declared obviously
// empty select will be rejected
  findOne: async ctx => {
    let { criteria, select } = ctx.query;
    try {
      criteria = JSON.parse(criteria) || {}
    } catch (e) { ctx.throw(400, 'invalid criteria') }
    if (!select) ctx.throw(400, 'missing query: select')
    
    const j = await io(model).findOne(criteria, select)
    if (j.code===200) return ctx.body = j.data
    return ctx.throw(j.code, j.note)
  },
  find: async ctx => {
    let { criteria, select, limit, skip, sort, count } = ctx.query
    try {
      criteria = JSON.parse(criteria) || {}
    } catch (e) { ctx.throw(400, 'invalid criteria') }
    if (!select)
      return ctx.body = json(400, 'missing query: select')
    let opts = {}
    if (limit && Math.floor(limit)) opts.limit = Math.floor(limit)
    if (skip && Math.floor(skip)) opts.skip = Math.floor(skip)
    try {
      if (sort) opts.sort = JSON.parse(sort)
    } catch (e) {}
    if (count) opts.count = true
    const j = await io(model).find(criteria, select, opts)
    if (j.code===200) return ctx.body = j.data
    return ctx.throw(j.code, j.note)
  },
  findById: async ctx => {
    const id = ctx.params.id
    if (!id) ctx.throw(400, 'missing params: id')
    let select = ctx.query.select
    if (!select) ctx.throw(400, 'missing query: select')

    const j = await io(model).findById(id, select)
    if (j.code===200) return ctx.body = j.data
    return ctx.throw(j.code, j.note)
  },

// mutations
  // POST 201
  create: async ctx => {
    let body = ctx.request.body
    const j = await io(model).create(body)
    if (j.code!==201) return ctx.throw(j.code, j.note)
    ctx.status = 201
    ctx.set('Location', `/${model.modelName}/${j.data._id}`)
    return ctx.body = j.data
  },
  // PATCH 200
  updateById: async ctx => {
    const id = ctx.params.id
    if (!id) return ctx.body = json(400, 'missing params: id')
    let body = ctx.request.body

    const j = await io(model).updateById(id, body)
    if (j.code!==200) return ctx.throw(j.code, j.note)
    ctx.status = 200
    return ctx.body = j.data
  },
  // DELETE 204
  removeById: async ctx => {
    const id = ctx.params.id
    if (!id) return ctx.body = json(400, 'invalid params: id')

    const j = await io(model).removeById(id)
    if (j.code!==204) return ctx.throw(j.code, j.note)
    return ctx.body = null
  },
  remove: async ctx => {
    const ids = ctx.request.body.ids // []
    if (!ids || !ids.length)
      return ctx.body = json(400, 'invalid body: ids')
    const j = await io(model).remove(ids)
    if (j.code!==204) return ctx.throw(j.code, j.note)
    return ctx.body = null
  }
})

