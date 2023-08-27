import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/locations', name: 'locations', component: () => import('../views/Locations.vue') },
    { path: '/history', name: 'history', component: () => import('../views/History.vue') },
  ]
})

export default router
