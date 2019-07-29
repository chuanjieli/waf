import Vue from 'vue'
import Router from 'vue-router'
// import home from './components/home.vue'
import layout from './views/layout.vue'
// import login from './views/login.vue'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_ROUTER_URL || process.env.VUE_APP_ROUTER_PRO_URL || '/',
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [{
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ './components/home.vue'),
        name: 'home'
      }]
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/login.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
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
