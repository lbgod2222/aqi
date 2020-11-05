import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      // component: HelloWorld,
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('../pages/loginPage.vue'),
      hidden: true,
      name: 'login'
    },
    {
      path: '/map',
      component: () => import('../pages/mapPage.vue'),
      hidden: true,
      name: 'login'
    }
  ]
})
