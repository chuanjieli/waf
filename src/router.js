import Vue from 'vue'
import Router from 'vue-router'
import layout from './views/layout.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_ROUTER_URL || process.env.VUE_APP_ROUTER_PRO_URL || '/',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    }, {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './components/home.vue')
      }, {
        path: '/weblist',
        name: 'weblist',
        component: () => import(/* webpackChunkName: "weblist" */ './components/weblist.vue')
      }, {
        path: '/weblist/protectreport/:domain/:date',
        name: 'protectreport',
        component: () => import(/* webpackChunkName: "protectreport" */ './components/protectReport.vue')
      }, {
        path: '/weblist/visitreport/:domain/:date',
        name: 'visitreport',
        component: () => import(/* webpackChunkName: "visitreport" */ './components/visitReport.vue')
      }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    localStorage.removeItem('user')
    localStorage.removeItem('Authorization')
    next()
  } else {
    let token = localStorage.getItem('Authorization')

    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
