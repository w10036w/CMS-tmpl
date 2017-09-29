import api from '../api'

export default {
  namespaced: true,
  state: {
    authed: null,
  },
  getters: {
    authed: state => state.authed,
  },
  actions: {
    login ({ commit }, { username, password }) {
      const uri = '/login'
      commit('SET_LOADING', true)
      return api.post(uri, { username, password }).then(r => {
        let j = null
        let type = 'USER LOGIN'
        if (!r) {
          commit('ADD_LOGS', { type, code: 502, note: 'No Response Content' }, 
            { root: true })
        } else if (r.status === 200) {
          j = r.data
          // set headers for all ajax
          api.addAuth(j.token)
        } else {
          commit('ADD_LOGS', { type: 'USER LOGIN', code: r.status, note: r.message }, 
            { root: true })
        }
        commit('SET_AUTHED', j) // notice: commit will return nothing
        commit('SET_LOADING', false)
        return j
      })
    },
    verify ({ commit }, token) {
      // set headers for all ajax
      token && api.addAuth(token)
      return api.get('/verify').then(r => {
        let j = null
        if (r.status === 200) j = r.data
        commit('SET_AUTHED', j) // notice: commit will return nothing
        return j
      })
    },
  },
  
  mutations: {
    SET_AUTHED: (state, user) => state.authed = user,
  },
}