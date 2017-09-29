// public access api
//const ObjectId = require('mongoose').Types.ObjectId
const { json } = resolve('util/http')
const { models, io } = resolve('mongo')
const io_user = io(models.user)
const io_article = io(models.article)
const io_tag = io(models.tag)
const io_category = io(models.category)

const act_article = resolve('mongo/action/article')
const act_user = resolve('mongo/action/user')

module.exports = {
  user: {
    findOne: async ctx => {
      const { _id, username, email } = ctx.query
      const cond = {}
      if (_id) cond._id = _id
      else if (username) cond.username = username
      else if (email) cond.email = email
      else return ctx.throw(405, 'missing query: _id / username / email')
      cond.hidden = false
      cond.role = { $not: /^admin$/ } // has to be RegEx
      const { data, error } = await act_user.findOne(cond)
      if (error) ctx.throw(500, error)
      else ctx.body = data
    },
  },
  article: {
    findOne: async ctx => {
      const { _id, path, author } = ctx.query
      let cond = {}
      if (_id) cond._id = _id
      else if (path) cond.path = path
      else if (author) cond.author = author
      else return ctx.throw(405, 'missing query: _id / path / author')
      cond.hidden = false
      const { data, error } = await act_article.findOne(cond)
      if (error) ctx.throw(500, error)
      else ctx.body = data
    },
    find: async ctx => {
      const { author, category, tag, limit, skip, sort, count } = ctx.query
      let cond = {}
      // findAll if no author | category | tag
      if (author) cond.author = author
      if (category) cond.category = category
      if (tag) cond.tags = tag
      cond.hidden = false
      // https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
      const { data, error } = await act_article.find({ cond, limit, skip, sort, count })
      if (error) ctx.throw(500, error)
      else ctx.body = data
    },
  },
  tag: {
    // actually findAll not hidden
    find: async ctx => {
      let { limit, skip, sort, count } = ctx.query
      const select = '_id name path'
      const cond = { hidden: false }
      let j = await io_tag.find(cond, select, { limit, skip, sort, count })
      if (j.code!==200) return ctx.throw(j.code, j.note)
      return ctx.body = j.data
    },
    findOne: async ctx => {
      let { _id, path } = ctx.query
      const select = '_id name path'
      let cond = {}
      if (_id) cond._id = _id
      else if (path) cond.path = path
      else return ctx.throw(405, 'missing query: _id / path')
      cond.hidden = false
      const { data, error } = await io_tag.findOne(cond, select)
      if (error) ctx.throw(500)
      ctx.body = data
    },
    findArticles: async ctx => {
      const { path } = ctx.params
      const { limit, skip, sort, count } = ctx.query
      if (!path) ctx.throw(405, 'missing params: path')
      let select = '_id name'
      const tag = await io_tag.findOne({ path, hidden: false }, select)
      if (tag.error) ctx.throw(500)
      if (!tag.data) ctx.throw(204) // tag not exist
      const cond = { tags: tag.data._id, hidden: false }
      const { data, error } = await act_article.find({ cond, limit, skip, sort, count })
      if (error) ctx.throw(500)
      ctx.body = data
    },
  },
  category: {
    // actually findAll not hidden
    find: async ctx => {
      let { limit, skip, sort, count } = ctx.query
      const select = '_id name path'
      const cond = { hidden: false }
      let j = await io_category.find(cond, select, { limit, skip, sort, count })
      if (j.code!==200) return ctx.throw(j.code, j.note)
      return ctx.body = j.data
    },
    findOne: async ctx => {
      let { _id, path } = ctx.query
      const select = '_id name path'
      let cond = {}
      if (_id) cond._id = _id
      else if (path) cond.path = path
      else return ctx.throw(405, 'missing query: _id / path')
      cond.hidden = false
      const { data, error } = await io_category.findOne(cond, select)
      if (error) ctx.throw(500)
      ctx.body = data
    },
    findArticles: async ctx => {
      const { path } = ctx.params
      const { limit, skip, sort, count } = ctx.query
      if (!path) ctx.throw(405, 'missing params: path')
      let select = '_id name'
      const category = await io_category.findOne({ path, hidden: false }, select)
      if (category.error) ctx.throw(500)
      if (!category.data) ctx.throw(204) // tag not exist
      const cond = { category: category.data._id, hidden: false }
      const { data, error } = await act_article.find({ cond, limit, skip, sort, count })
      if (error) ctx.throw(500)
      ctx.body = data
    },
  }


}
