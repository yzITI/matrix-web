import { createRouter, createWebHashHistory } from 'vue-router'

const index = {
  '/': () => import('./views/Login.vue'),
  '/home': () => import('./views/Home.vue'),
  '/service': () => import('./views/Service.vue')
}

const routes = []
for (const r in index) routes.push({ path: r, component: index[r] })
const router = createRouter({ history: createWebHashHistory(), routes }) 

router.beforeEach(() => { NProgress.start() })
router.afterEach(() => {
  Swal.close()
  NProgress.done()
})

export default router