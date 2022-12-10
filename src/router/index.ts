import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layout/layout.vue'),
      children: [
        { path: 'music', component: () => import('../components/Music.vue') },
        {
          path: 'login', component: () => import('../views/login/index.vue'),
          children: [
            { path: 'qr', component: () => import('../views/login/loginByqr.vue') },
            { path: 'shortMsg', component: () => import('../views/login/loginByShortMsg.vue') },
          ]
        },

      ]
    }
  ]
})

export default router
