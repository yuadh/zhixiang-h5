import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/auth'

Vue.use(Vuex)
const TOKEN_KEY = 'ZHIXIANG_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY) || {},
    userInfo: {}
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(TOKEN_KEY, state.user)
    },
    setUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
