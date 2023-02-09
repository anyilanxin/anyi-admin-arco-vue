import { Layout, ParentLayout } from '@/router/routes/base';
import { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '/process',
  name: 'process',
  component: Layout,
  meta: {
    locale: '流程',
    icon: 'icon-file',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'instance11',
      name: 'instance11',
      component: ParentLayout,
      meta: {
        locale: '实例',
        requiresAuth: true,
        roles: ['admin'],
        ignoreCache: true,
      },
      children: [
        {
          path: 'camunda11',
          name: 'camunda11',
          component: () => import('@/views/process/camunda.vue'),
          meta: {
            locale: 'camunda建模',
            requiresAuth: true,
            roles: ['admin'],
            ignoreCache: true,
          },
        },
        {
          path: 'camunda-simple11',
          name: 'camunda-simple11',
          component: () => import('@/views/process/camunda-simple.vue'),
          meta: {
            locale: 'camundaSimple建模',
            requiresAuth: true,
            roles: ['admin'],
            ignoreCache: true,
          },
        },
      ],
    },
    {
      path: 'camunda',
      name: 'camunda',
      component: () => import('@/views/process/camunda.vue'),
      meta: {
        locale: 'camunda建模',
        requiresAuth: true,
        roles: ['admin'],
        ignoreCache: true,
      },
    },
    {
      path: 'camunda-simple',
      name: 'camunda-simple',
      component: () => import('@/views/process/camunda-simple.vue'),
      meta: {
        locale: 'camundaSimple建模',
        requiresAuth: true,
        roles: ['admin'],
        ignoreCache: true,
      },
    },
    {
      path: 'zeebe',
      name: 'zeebe',
      component: () => import('@/views/process/zeebe.vue'),
      meta: {
        locale: 'zeebe建模',
        requiresAuth: true,
        roles: ['admin'],
        // ignoreCache: true,
      },
    },
    {
      path: 'zeebe-simple',
      name: 'zeebe-simple',
      component: () => import('@/views/process/zeebe-simple.vue'),
      meta: {
        locale: 'zeebeSimple建模',
        requiresAuth: true,
        roles: ['admin'],
        // ignoreCache: true,
      },
    },
    {
      path: 'instance',
      name: 'instance',
      component: () => import('@/views/process/instance.vue'),
      meta: {
        locale: '流程实例',
        requiresAuth: true,
        roles: ['admin'],
        // ignoreCache: true,
      },
    },
  ],
};

export default FORM;
