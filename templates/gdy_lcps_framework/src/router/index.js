import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('@/views/Loading/index.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/Error/index.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
