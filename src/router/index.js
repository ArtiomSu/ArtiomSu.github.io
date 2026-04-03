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
  },
  {
    path: '/mana-ball-track-ball',
    name: 'mana-ball-track-ball',
    component: () => import('../views/ManaBallTrackballView.vue')
  },
  {
    path: '/qmk-raw-hid-router',
    name: 'qmk-raw-hid-router',
    component: () => import('../views/QmkHidRouterView.vue')
  },
  {
    path: '/dactyl-manuform-5x7',
    name: 'dactyl-manuform-5x7',
    component: () => import('../views/DactylManuformView.vue')
  },
  {
    path: '/yubikey-ssh-manager',
    name: 'yubikey-ssh-manager',
    component: () => import('../views/YubikeySSHManagerView.vue')
  },
  {
    path: '/dynamicrypt',
    name: 'dynamicrypt',
    component: () => import('../views/DynamiCryptView.vue')
  },
  {
    path: '/macropad-pico',
    name: 'macropad-pico',
    component: () => import('../views/MacropadView.vue')
  },
  {
    path: '/ssupss',
    name: 'ssupss',
    component: () => import('../views/SsupssView.vue')
  },
  {
    path: '/asus-rog-rgb',
    name: 'asus-rog-rgb',
    component: () => import('../views/AsusRogRgbView.vue')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})
