const { models, actions } = resolve('mongo')

const { bSigned, bEditor, bAdmin, bAdminOrEditor, bAdminOrSelf } = resolve('middleware/auth');

const api = require('./public')
const pref = 'blog'
// public access
function app_api (r) {
  // user
  r.get('/user', api.user.findOne) // query: id, username, select, limit, skip, sort, count

  // article
  r.get('/articles', api.article.find) // all or by author(_id), tag(_id), category(_id)
  r.get('/articles/category/:path', api.article.findByCategory) // by path
  r.get('/articles/tag/:path', api.article.findByTag) // by path
  r.get('/article', api.article.findOne) // by _id or path
  r.get('/article/context', api.article.findContext) // by id

  // tag
  r.get('/tagcloud', api.tag.findSortedTagsArticles) // all or by limit/sort/skip/count
  r.get('/tags', api.tag.find) // all or by limit/sort/skip/count
  r.get('/tag', api.tag.findOne) // _id or path

  // category
  r.get('/categories', api.category.find) // same with tag
  r.get('/categorycloud', api.category.findSortedCategoriesArticles) // same with tag
  r.get('/category', api.category.findOne)

  r.get('/sitemap', api.article.sitemap)
}

// admin controls all mutations
function admin_api (r) {
  let keys = Object.keys(models)
  let i = keys.length
  let model, name, action;
  while (i--) {
    model = models[keys[i]]
    name = model.modelName
    action = actions(model)

    if (name==='user') {
      r.post(`/admin/${name}`, bSigned, bAdmin, action.create)
      r.get(`/admin/${name}`, bSigned, bAdmin, action.findOne)
      r.del(`/admin/${name}`, bSigned, bAdmin, action.removeOne)
      r.get(`/admin/${name}/:id`, bSigned, bAdmin, action.findById)
      r.patch(`/admin/${name}/:id`, bSigned, bAdminOrSelf, action.updateById)
      r.get(`/admin/${name}s`, bSigned, bAdmin, action.find)
      r.del(`/admin/${name}s`, bSigned, bAdmin, action.remove)
    } else {
      r.post(`/admin/${name}`, bSigned, bAdminOrEditor, action.create)
      r.get(`/admin/${name}`, bSigned, bAdminOrEditor, action.findOne)
      r.del(`/admin/${name}`, bSigned, bAdminOrEditor, action.removeOne)
      r.get(`/admin/${name}/:id`, bSigned, bAdminOrEditor, action.findById)
      r.patch(`/admin/${name}/:id`, bSigned, bAdminOrEditor, action.updateById)
      if (name === 'category') {
        r.get(`/admin/categories`, bSigned, bAdminOrEditor, action.find)
        r.del(`/admin/categories`, bSigned, bAdmin, action.remove)
      } else {
        r.get(`/admin/${name}s`, bSigned, bAdminOrEditor, action.find)
        r.del(`/admin/${name}s`, bSigned, bAdmin, action.remove)
      }
    }
  }
  // password only
  r.patch('/admin/password/:id', bSigned, bAdminOrSelf, action.updateVirtual)
  // change options, current only themes
  //r.path('/admin/theme')
}

module.exports = r => {
  app_api(r)
  admin_api(r)
};