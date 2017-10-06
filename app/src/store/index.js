import Vue from 'vue'
import Vuex from 'vuex'
import { _get } from '@a'
import { qsify } from '@u/filters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      page: 1,
      categories: [],
      tags: [],
      tagcloud: [],
      articles: [],
      article_ctx: [null, null],
      article: {},
      md: null
    },
    getters: {
      md: state => state.md,
      page: state => state.page,
      categories: state => state.categories,
      tags: state => state.tags,
      prev: state => state.prev,
      next: state => state.next,
      articles: state => state.articles,
      article_ctx: state => state.article_ctx,
      article: state => state.article,
      tagcloud: state => state.tagcloud,
    },
    actions: {
      // articles: 
      fetch_articles ({ commit }, { pref, sort="", limit=20, skip=0 }) {
        const uri = `${pref}?${qsify({sort,limit,skip})}`
        return _get(uri).then(r => {
          let j = null
          if (r && r.status===200) j = r.data
          commit('SET_ARTICLES', j)
          return j
        })
      },
      fetch_article ({ commit }, { path }) {
        const uri = '/article?path=' + path
        return _get(uri).then(r => {
          let j = null
          if (r && r.status===200) j = r.data
          commit('SET_ARTICLE', j)
          return j
        })
      },
      fetch_article_ctx ({ commit }, { id }) {
        const uri = `/article/context?id=${id}`
        return _get(uri).then(r => {
          let j = [null, null]
          if (r && r.status===200) j = r.data
          commit('SET_ARTICLE_CTX', j)
          return j
        })
      },
      fetch_tagcloud ({ commit }) {
        const uri = `/tagcloud`
        return _get(uri).then(r => {
          let j = []
          if (r && r.status===200) j = r.data
          commit('SET_TAGCLOUD', j)
          return j
        })
      },
      fetch_categories ({ commit }) {
        const uri = `/categorycloud`
        return _get(uri).then(r => {
          let j = []
          if (r && r.status===200) j = r.data
          commit('SET_CATEGORIES', j)
          return j
        })
      },
      set_page ({ commit }, pageNo) {
        commit('SET_PAGE', pageNo)
      },
      set_mobile_detect ({ commit }, md) {
        const ua = {
          tablet: md.tablet(),
          mobile: md.mobile()
        }
        return commit('SET_MD', ua)
      },
    },
    mutations: {
      SET_MD: (state, md) => state.md = md ,
      SET_PAGE: (state, pageNo) => state.page = pageNo,
      SET_CATEGORIES: (state, categories) => state.categories = categories,
      SET_TAGS: (state, tags) => state.tags = tags,
      SET_ARTICLE_CTX: (state, article_ctx) => state.article_ctx = article_ctx,
      SET_ARTICLE: (state, article) => state.article = article,
      SET_ARTICLES: (state, articles) => state.articles = articles,
      SET_TAGCLOUD: (state, tagcloud) => state.tagcloud = tagcloud,
    },
  })
}
