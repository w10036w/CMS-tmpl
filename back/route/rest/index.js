const { models, actions } = resolve('mongo')

const { bSigned, bEditor, bAdmin, bAdminOrEditor, bAdminOrSelf } = resolve('middleware/auth');

const api = require('./v1')

// specify criteria, e.g. id, username, path
function app_api (r) {
  // user
  r.get('/users', api.user.find) // query: id, username, select, limit, skip, sort, count

  // article
  r.get('/articles', api.article.find) // articleId, authorId, tagId, categoryId

  // tag
  r.get('/tags', api.tag.find) // all or by given ids

  // category
  r.get('/categories', api.category.find)
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

    r.get(`/admin/${name}s`, bSigned, bAdminOrEditor, action.find)
    r.get(`/admin/${name}`, bSigned, bAdminOrEditor, action.findOne)
    r.get(`/admin/${name}/:id`, bSigned, bAdminOrEditor, action.findById)

    if (name==='user') {
      r.post(`/admin/${name}`, bSigned, bAdmin, action.create)
      r.del(`/admin/${name}/:id`, bSigned, bAdmin, action.removeById)
      r.del(`/admin/${name}s`, bSigned, bAdmin, action.remove)
      r.patch(`/admin/${name}/:id`, bSigned, bAdminOrSelf, action.updateById)
    } else {
      r.post(`/admin/${name}`, bSigned, bAdminOrEditor, action.create)
      r.del(`/admin/${name}/:id`, bSigned, bAdminOrEditor, action.removeById)
      r.del(`/admin/${name}s`, bSigned, bAdmin, action.remove)
      r.patch(`/admin/${name}/:id`, bSigned, bAdminOrEditor, action.updateById)
    }
  }
}

module.exports = r => {
  app_api(r)
  admin_api(r)
};