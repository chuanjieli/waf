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
      component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
    }, {
      path: '/wafscreen/:site',
      name: 'wafscreen',
      component: () => import(/* webpackChunkName: "wafscreen" */ '@/views/wafScreen.vue'),
      meta: {
        requireAuth: true,
        roles: ['0']
      }
    }, {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [{
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './components/home.vue'),
        meta: {
          requireAuth: true,
          roles: ['1']
        }
      }, {
        path: '/weblist',
        name: 'weblist',
        component: () => import(/* webpackChunkName: "weblist" */ './components/weblist.vue'),
        meta: {
          requireAuth: true,
          roles: ['1']
        }
      }, {
        path: '/weblist/protectreport/:domain/:date',
        name: 'protectreport',
        component: () => import(/* webpackChunkName: "protectreport" */ './components/protectReport.vue'),
        meta: {
          requireAuth: true,
          roles: ['1']
        }
      }, {
        path: '/weblist/visitreport/:domain/:date',
        name: 'visitreport',
        component: () => import(/* webpackChunkName: "visitreport" */ './components/visitReport.vue'),
        meta: {
          requireAuth: true,
          roles: ['1']
        }
      }]
    }, {
      path: '*',
      name: 'notfound',
      component: () => import(/* webpackChunkName: "login" */ './views/notfound.vue')
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
    let role = localStorage.getItem('role')
    if (token === null || token === '' || role === '') {
      next('/login')
    } else {
      if (to.meta.roles) {
        if (to.meta.roles.length !== 0) {
          for (let i = 0; i < to.meta.roles.length; i++) {
            if (role === to.meta.roles[i]) {
              next()
              break
            } else {
              next('/login')
            }
          }
        }
      } else {
        next()
      }
    }
  }
})
export default router
