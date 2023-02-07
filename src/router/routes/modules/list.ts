import { Layout } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/list',
  name: 'list',
  component: Layout,
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/showcase-volc-live~tplv-uwbnlip3yd-png.png',
    iconType: 2,
    order: 2,
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'card',
      name: 'Card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        locale: 'menu.list.cardList',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default LIST;
