import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import TheLayout from '@/layouts/TheLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: TheLayout,
    children: [
      {
        path: '',
        redirect: (to) => ({
          name: 'accounts',
          query: to.query,
          hash: to.hash,
        }),
      },
      {
        path: 'accounts',
        name: 'accounts',
        component: () => import('@/pages/AccountsView.vue'),
      },
      {
        path: 'sales',
        name: 'sales',
        component: () => import('@/pages/sales/SalesLayout.vue'),
        meta: { title: 'Sales' },
        children: [
          {
            path: '',
            name: 'sales-overview',
            component: () => import('@/pages/sales/SalesOverview.vue'),
            meta: { title: 'Overview' },
          },
          {
            path: 'subscriptions',
            name: 'sales-subscriptions',
            component: () => import('@/pages/sales/SalesSubscriptions.vue'),
            meta: { title: 'Subscriptions' },
          },
          {
            path: 'invoices',
            name: 'sales-invoices',
            component: () => import('@/pages/sales/SalesInvoices.vue'),
            meta: { title: 'Invoices' },
          },
          {
            path: 'deposits',
            name: 'sales-deposits',
            component: () => import('@/pages/sales/SalesDeposits.vue'),
            meta: { title: 'Deposits' },
          },
        ],
      },
      { path: 'expenses', name: 'expenses', component: () => import('@/pages/ExpensesView.vue') },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const segments = to.matched
    .filter((r) => r.meta?.title) // bierzemy tylko te z meta.title
    .map((r) => r.meta.title as string);

  const fullTitle = [...segments, 'HeyBooks'].join(' • ');

  document.title = fullTitle;
});

export default router;
