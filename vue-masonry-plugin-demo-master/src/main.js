import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})
