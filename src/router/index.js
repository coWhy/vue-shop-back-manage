import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home/Home.vue'),
      children: [
        {
          path: '/users',
          name: 'users',
          component: () => import('@/components/users/Users.vue')
        }
      ]
    }

  ]
})
