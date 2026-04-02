// Connected layout navigation items
// Designers: customize these to match your prototype's sidebar

export interface NavChild {
  path: string
  label: string
  badge?: string
}

export interface NavItem {
  path: string
  label: string
  icon: string
  badge?: string
  children?: NavChild[]
}

export const topItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: 'home' },
  {
    path: '/orders',
    label: 'Orders',
    icon: 'cart',
    children: [
      { path: '/orders', label: 'All orders' },
      { path: '/factoring', label: 'Factoring', badge: 'New' },
    ],
  },
  { path: '/network', label: 'My network', icon: 'people' },
  { path: '/products', label: 'Products', icon: 'box-seam' },
  { path: '/shop', label: 'My shop', icon: 'shop-window' },
  { path: '/messages', label: 'Messages', icon: 'chat', badge: '3' },
]

export const bottomItems: NavItem[] = [
  { path: '/billing', label: 'Payment & billing', icon: 'credit-card-2-back' },
  { path: '/settings', label: 'Settings', icon: 'gear' },
  { path: '/integrations', label: 'Integrations', icon: 'puzzle' },
  { path: '/help', label: 'Help Centre', icon: 'question-circle' },
]
