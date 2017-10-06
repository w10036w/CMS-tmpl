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
const act_tag = resolve('mongo/action/tag')
const act_category = resolve('mongo/action/category')

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
    findContext: async ctx => {
      const { id } = ctx.query
      if (!id) return ctx.throw(405, 'missing query: id')
      const cond1 = { _id: { $lt: id }, hidden: false }
      const cond2 = { _id: { $gt: id }, hidden: false }
      return Promise.all([
        act_article.findContext(cond1, 1),
        act_article.findContext(cond2, 1),
      ]).then(obj => {
        if (obj[0].error) ctx.throw(500, obj[0].error)
        if (obj[1].error) ctx.throw(500, obj[1].error)
        return ctx.body = [obj[0].data[0], obj[1].data[0]]
      }).catch(e => ctx.throw(405, 'findContext error'))
    },
    find: async ctx => {
      let { author, category, tag, limit, skip, sort, count } = ctx.query
      let cond = {}
      // findAll if no author | category | tag
      if (author) cond.author = author
      if (category) cond.category = category
      if (tag) cond.tags = tag
      if (limit) limit = Math.floor(limit)
      if (skip) skip = Math.floor(skip)
      cond.hidden = false
      // https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
      const { data, error } = await act_article.find({ cond, limit, skip, sort, count })
      if (error) ctx.throw(500, error)
      else ctx.body = data
    },
    findByTag: async ctx => {
      const { path } = ctx.params
      let { limit, skip, sort, count } = ctx.query
      if (!path) ctx.throw(405, 'missing params: path')
      let select = '_id name'
      const tag = await io_tag.findOne({ path, hidden: false }, select)
      if (tag.error) ctx.throw(500)
      if (!tag.data) ctx.throw(204) // tag not exist
      const cond = { tags: tag.data._id, hidden: false }
      if (limit) limit = Math.floor(limit) || 20
      if (skip) skip = Math.floor(skip) || 0
      const { data, error } = await act_article.find({ cond, limit, skip, sort, count })
      if (error) ctx.throw(500)
      ctx.body = data
    },
    findByCategory: async ctx => {
      const { path } = ctx.params
      let { limit, skip, sort, count } = ctx.query
      if (!path) ctx.throw(405, 'missing params: path')
      let select = '_id name'
      const category = await io_category.findOne({ path, hidden: false }, select)
      if (category.error) ctx.throw(500)
      if (!category.data) ctx.throw(204) // tag not exist
      const cond = { category: category.data._id, hidden: false }
      if (limit) limit = Math.floor(limit) || 20
      if (skip) skip = Math.floor(skip) || 0
      const { data, error } = await act_article.find({ cond, limit, skip, sort, count })
      if (error) ctx.throw(500)
      ctx.body = data
    },
    sitemap: async ctx => {
      const cond = { hidden: false }
      const select = 'path updateAt createAt'
      const sort = '-createAt'
      const { data, error } = await io_article.find(cond, select, { sort })
      if (error) ctx.throw(500)
      ctx.body = data
    }
  },
  tag: {
    // actually findAll not hidden
    find: async ctx => {
      let { limit, skip, sort, count } = ctx.query
      const select = '_id name path'
      const cond = { hidden: false }
      if (limit) limit = Math.floor(limit) || 20
      if (skip) skip = Math.floor(skip) || 0
      let { data, error } = await io_tag.find(cond, select, { limit, skip, sort, count })
      if (error) ctx.throw(500)
      ctx.body = data
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
    findSortedTagsArticles: async ctx => {
      const { data, error } = await act_tag.findSortedTagsArticles()
      if (error) ctx.throw(500, error)
      ctx.body = data
    }
  },
  category: {
    // actually findAll not hidden
    find: async ctx => {
      let { limit, skip, sort, count } = ctx.query
      const select = '_id name path'
      const cond = { hidden: false }
      let { data, error } = await io_category.find(cond, select, { limit, skip, sort, count })
      if (error) ctx.throw(500)
      ctx.body = data
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
    findSortedCategoriesArticles: async ctx => {
      const { data, error } = await act_category.findSortedCategoriesArticles()
      if (error) ctx.throw(500, error)
      ctx.body = data
    }
  }


}
