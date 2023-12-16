import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {}
  },
  mutations: {
    SET_USER_INFO (state, obj) {
      if (typeof obj === 'object') {
        state.data = obj
      }
    },
    SET_USER_KEY_VALUE (state, obj) {
      if (Object.prototype.hasOwnProperty.call(obj, 'key') 
        && Object.prototype.hasOwnProperty.call(obj, 'value')) {
        state.data[obj.key] = obj.value
      }
      // if (obj.hasOwnProperty('key') && obj.hasOwnProperty('value')) {
      //   state.data[obj.key] = obj.value
      // }
    }
  },
  actions: {
    set_userInfo: ({ commit }, obj) => {
      commit('SET_USER_INFO', obj)
    },
    set_userInfo_keyValue: ({ commit }, obj) => {
      commit('SET_USER_KEY_VALUE', obj)
    }
  }
})
