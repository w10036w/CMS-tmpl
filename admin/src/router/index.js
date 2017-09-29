import Vue from 'vue'
import Router from 'vue-router'

const ViewHome = () => import('~v/ViewHome')
const ViewStats = () => import('~v/ViewStats') // Google Analytics, Discuz
const ViewLogin = () => import('~v/ViewLogin')

const PageError = () => import('~p/PageError')

Vue.use(Router)

import ViewList from '~v/ViewList'
import ViewItem from '~v/ViewItem'

function listView (opts) {
  return {
    name: `view-list-${opts.name}`,
    render: h => h(ViewList, { props: { opts } })
  }
}
function itemView (opts) {
  return {
    name: `view-item-${opts.name}`,
    render: h => h(ViewItem, { props: { opts } })
  }
}

export default new Router({
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    { path: '/', name: 'ViewHome', component: ViewHome },
    { path: '/stats', name: 'ViewStats', component: ViewStats },
    { path: '/login', name: 'ViewLogin', component: ViewLogin },
    { path: '/users', name: 'ViewUsers', component: listView({
      name: 'users', model: 'user', columns: [ 'avatar', 'username', 'displayName', 'role', 'email', 'createAt' ]
    }) },
    { path: '/articles', name: 'ViewArticles', component: listView({
      name: 'articles', model: 'article', columns: [ 'title', 'author', 'category', 'tags', 'createAt' ]
    }) },
    { path: '/categories', name: 'ViewCategories', component: listView({
      name: 'categories', model: 'category', columns: [ 'name', 'path', 'createAt' ]
    }) },
    { path: '/tags', name: 'ViewTags', component: listView({
      name: 'tags', model: 'tag', columns: [ 'name', 'path', 'createAt' ]
    }) },

    { path: '/create/tag', name: 'ViewCreateTag', component: itemView({ name: 'tag', type: 'create' }) },
    { path: '/create/category', name: 'ViewCreateCategory', component: itemView({ name: 'category', type: 'create' }) },
    { path: '/create/article', name: 'ViewCreateArticle', component: itemView({ name: 'article', type: 'create' }) },
    { path: '/create/user', name: 'ViewCreateUser', component: itemView({ name: 'user', type: 'create' }) },
    { path: '/tag/:id', name: 'ViewTag', component: itemView({ name: 'tag' }) },
    { path: '/category/:id', name: 'ViewCategory', component: itemView({ name: 'category' }) },
    { path: '/article/:id', name: 'ViewArticle', component: itemView({ name: 'article' }) },
    { path: '/user/:id', name: 'ViewUser', component: itemView({ name: 'user' }) },

    { path: '/error', name: 'PageError', component: PageError },

    //{ path: '/manage/:list', component: listView() },
    { path: '*', redirect: '/' },
  ]
})
