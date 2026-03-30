import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/bluetooth-to-kb-input',
    name: 'btkbi',
    component: () => import('../views/BtKBiView.vue')
  },
  {
    path: '/bluetooth-to-kb-input-flasher',
    name: 'btkbi-flasher',
    component: () => import('../views/BtKBiFlasherView.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
