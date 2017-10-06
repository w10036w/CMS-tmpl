import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth },
  state: {
    appHost: api.appHost,
    logs: [],
    loading: false,
    list: [],
    item: {}
  },
  getters: {
    logs: state => state.logs,
    loading: state => state.loading,
    list: state => state.list,
    item: state => state.item,
  },
  // lowercase_x
  // TODO: error handling
  actions: {
    add_logs: ({ commit }, log) => commit('ADD_LOGS', log),
    set_loading: ({ commit }, status=false) => commit('SET_LOADING', status),
    fetch_list ({ commit }, opts) {
      return api.get(`/admin/${opts.name}`, opts.params).then(r => {
        let j = []
        if (r.status === 200) j = r.data
        commit('SET_LIST', j)
        return j
      })
    },
    fetch_item ({ commit }, opts) {
      return api.get(`/admin/${opts.name}/${opts.id}`, opts.params).then(r => {
        let j = null
        if (r.status === 200) j = r.data
        commit('SET_ITEM', j)
        return j
      })
    },
    create_item ({ commit }, opts) {
      return api.post(`/admin/${opts.name}`, opts.body).then(r => {
        let j = null
        if (r.status && r.status === 201) j = r.data
        commit('SET_ITEM', j)
        return j
      })
    },
    update_item ({ commit }, opts) {
      return api.patch(`/admin/${opts.name}/${opts.id}`, opts.body).then(r => {
        let j = null
        if (r.status && r.status === 200) j = r.data
        commit('SET_ITEM', j)
        return j
      })
    },
    remove_item ({ commit }, opts) {
      return api.del(`/admin/${opts.name}?_id=${opts.id}`).then(r => {
        if (r.status && r.status === 204) return null
        return null
      }).catch(error => ({ error }) )
    },
    remove_list ({ commit }, opts) {
      return api.del(`/admin/${opts.name}`, opts.body).then(r => {
        if (r.status && r.status === 204) return null
        return null
      }).catch(error => ({ error }) )
    },
    change_pass ({ commit }, opts) {
      return api.patch(`/admin/password/${opts.id}`, { password: opts.password })
        .then(r => {
          let j = null
          if (r.status && r.status === 200) j = r.data
          return j
        })
    },
    qiniu_token ({ commit }, name) {
      return api.post(`/qiniu/token?name=${name}`)
        .then(r => {
          let j = null
          if (r.status && r.status === 200) j = r.data
          return j
        })
    },
  },
  // uppercase_x
  mutations: {
    ADD_LOGS: (state, res) => state.logs.push(res),
    SET_LOADING: (state, v) => state.loading = v,
    SET_LIST: (state, data) => state.list = data,
    SET_ITEM: (state, data) => state.item = data,
  }
})
