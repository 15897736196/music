import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layout/layout.vue'),
      children: [
        { path: 'music', name: 'Music', component: () => import('@/components/Music.vue'), meta: { keepAlive: true } },
        {
          path: 'login', component: () => import('../views/login/index.vue'),
          children: [
            { path: 'qr', component: () => import('../views/login/loginByqr.vue') },
            { path: 'shortMsg', component: () => import('../views/login/loginByShortMsg.vue') },
          ]
        },
        { path: 'wave', component: () => import('@/components/MusicWave/wave.vue'), meta: { keepAlive: true } }
      ]
    }
  ]
})

export default router
