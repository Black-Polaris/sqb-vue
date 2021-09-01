import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


// 设置反向代理，前端请求默认发送到 http://localhost:8080/api
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8082/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(mavonEditor)

router.beforeEach((to, from, next) => {
      if (to.meta.requireAuth) {
        if (store.state.user.username) {
          next()
        } else {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      } else {
        next()
      }
    }
)

new Vue({
  el:'#app',
  render:h => h(App),
  router,
  store,
  components:{App},
  template:'<App/>'
})
