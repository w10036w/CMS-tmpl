const mongoose = require('mongoose')
const { json } = resolve('util/http')
const { models, io, filter } = resolve('mongo')
const io_user = io(models.user)
const io_article = io(models.article)
const io_tag = io(models.tag)
const io_category = io(models.category)


module.exports = {
  user: {
    find: async ctx => {
      let { id, username, select, limit, skip, sort, count } = ctx.query
      if (!id && !username) return ctx.redirect('/')
      select = filter.filterUser(select)
      let j
      // never expose admin and hidden user
      if (id) {
        j = await io_user.findById(id, select)
        if (j.data.role === 'admin' || j.data.hidden)
          return ctx.body = null // 204
      } else {
        let criteria = { username, role: { $not: /^admin$/ }, hidden: false }
        j = await io_user.find(criteria, select, { limit, skip, sort, count })
      }
      if (j.code!==200) return ctx.throw(j.code, j.note)
      return ctx.body = j.data
    },
  },
  article: {
    find: async ctx => {
      let { articleId, authorId, categoryId, tagId, select, 
            limit, skip, sort, count } = ctx.query
      let criteria
      if (articleId) criteria = { _id: articleId }
      else if (authorId) criteria = { author: authorId }
      else if (categoryId) criteria = { category: categoryId }
      // https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
      else if (tagId) criteria = { tags: tagId }
      let j = await io_article.find(criteria, select, { limit, skip, sort, count })
      if (j.code!==200) return ctx.throw(j.code, j.note)
      return ctx.body = j.data
    }
  },
  tag: {
    find: async ctx => {
      let { ids, select, limit, skip, sort, count } = ctx.query
      let criteria = ids ? { _id: { $in: ids } } : {}
      let j = await io_tag.find({}, select, { limit, skip, sort, count })
      if (j.code!==200) return ctx.throw(j.code, j.note)
      return ctx.body = j.data
    },
  },
  category: {
    find: async ctx => {
      let { ids, select, limit, skip, sort, count } = ctx.query
      let criteria = ids ? { _id: { $in: ids } } : {}
      let j = await io_category.find({}, select, { limit, skip, sort, count })
      if (j.code!==200) return ctx.throw(j.code, j.note)
      return ctx.body = j.data
    },
  }


}
