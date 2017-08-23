import Vue from 'vue'
import Router from 'vue-router'
import mytabs from '@/components/_mytabs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mytabs',
      component: mytabs
    }
  ]
})
