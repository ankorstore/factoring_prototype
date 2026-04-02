import { createRouter, createWebHistory } from 'vue-router'

// Layout: 'default' (simple topbar+sidebar) or 'connected' (full backoffice)
// Set layout in route meta: meta: { layout: 'connected' }
// Default layout is used when no layout is specified.

const routes = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Home', icon: 'home', layout: 'connected' },
  },
  {
    path: '/orders',
    component: () => import('@/pages/OrderListPage.vue'),
    meta: { title: 'Orders', icon: 'orders', layout: 'connected' },
  },
  {
    path: '/orders/:id',
    component: () => import('@/pages/OrderDetailPage.vue'),
    meta: { title: 'Order Detail', icon: 'orders', layout: 'connected' },
  },
  {
    path: '/factoring',
    component: () => import('@/pages/FactoringDashboardPage.vue'),
    meta: { title: 'Factoring', icon: 'orders', layout: 'connected' },
  },
  {
    path: '/factoring/new',
    component: () => import('@/pages/FactoringNewRequestPage.vue'),
    meta: { title: 'New Factoring Request', icon: 'orders', layout: 'connected' },
  },
  {
    path: '/factoring/new/review',
    component: () => import('@/pages/FactoringReviewPage.vue'),
    meta: { title: 'New Financing Request', icon: 'orders', layout: 'connected' },
  },
  {
    path: '/factoring/request/:id',
    component: () => import('@/pages/FactoringRequestDetailPage.vue'),
    meta: { title: 'Loan Request', icon: 'orders', layout: 'connected' },
  },
  {
    path: '/showcase/colors',
    component: () => import('@/pages/showcase/ColorsPage.vue'),
    meta: { title: 'Colors', icon: 'grid' },
  },
  {
    path: '/showcase/typography',
    component: () => import('@/pages/showcase/TypographyPage.vue'),
    meta: { title: 'Typography', icon: 'grid' },
  },
  {
    path: '/showcase/spacing',
    component: () => import('@/pages/showcase/SpacingPage.vue'),
    meta: { title: 'Spacing & Radius', icon: 'grid' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
