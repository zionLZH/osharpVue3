import Layout from '@/core/Layout'
const coreRoutes = [
  {
    path: '/',
    name: 'layout',
    component: Layout
  },
  {
    path: '/404',
    name: '404',
    meta: { pass: true },
    component: () => import('@/view/statusPage/404')
  },
  {
    path: '/401',
    name: '401',
    meta: { pass: true },
    component: () => import('@/view/statusPage/401')
  }
]
export {
  coreRoutes
}
