import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Iview from 'iview'
import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
Vue.use(Iview)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
