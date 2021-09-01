import Vue from 'vue'
import Vuex from 'vuex'
//引入Vuex 实现前端登录拦截器
Vue.use(Vuex)

//localStorage，即本地存储，在项目打开的时候会判断本地存储中是否有 user 这个对象存在，
// 如果存在就取出来并获得username的值，否则则把username设置为空
export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout(state){
      state.user = []
      window.localStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
