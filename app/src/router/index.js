import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// dynamic pages
const ViewArticles = () => import('@v/ViewArticles')
const ViewArticle = () => import('@v/ViewArticle')
//const ViewArchive = () => import('@v/ViewArchive')
const ViewTags = () => import('@v/ViewTags')
const ViewCategories = () => import('@v/ViewCategories')
const ViewSearch = () => import('@v/ViewSearch')

// static pages
const PageAbout = () => import('@p/PageAbout')
const PageError = () => import('@p/PageError')

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: function(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      else {
        let position = { x: 0, y: 0 }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    },
    routes: [
      // add router rules here
      { path: '/', name: 'ViewHome', component: ViewArticles },
      { path: '/category/:path', name: 'ViewArticlesByCategory', component: ViewArticles },
      { path: '/tag/:path', name: 'ViewArticlesByTag', component: ViewArticles },
      { path: '/article/:path', name: 'ViewArticle', component: ViewArticle },
      { path: '/tags', name: 'ViewTags', component: ViewTags },
      { path: '/categories', name: 'ViewCategories', component: ViewCategories },
      { path: '/search', name: 'ViewSearch', component: ViewSearch },
      { path: '/about', name: 'PageAbout', redirect: '/article/about' },
      { path: '/error', name: 'PageError', component: PageError },
      { path: '*', redirect: '/error' },
    ]
  })
}
