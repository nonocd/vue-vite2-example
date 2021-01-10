import BasicLayout from '../layouts/BasicLayout';
import Home from '../views/Home.vue';
import { RouterView } from 'vue-router';

export const menus = [
  {
    path: '/welcome',
    name: 'welcome',
    component: Home,
    meta: { icon: 'SmileOutlined', title: 'Welcome' },
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '首页', icon: 'HomeOutlined' },
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: '关于', icon: 'QuestionCircleOutlined' },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: RouterView,
    meta: { icon: 'dashboard-outlined', title: 'Dashboard' },
    children: [
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        meta: { icon: 'SmileOutlined', title: 'Analysis' },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: '/dashboard/monitor',
        name: 'Monitor',
        meta: { icon: 'SmileOutlined', title: 'Monitor' },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        meta: { icon: 'SmileOutlined', title: 'Workplace' },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    component: RouterView,
    meta: { title: '表单页', icon: 'FormOutlined' },
    children: [
      {
        path: 'add',
        name: 'Add',
        meta: { title: '增加', icon: 'EditOutlined' },
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
    ],
  },
];

export const routerMap = [
  {
    path: '/',
    name: '',
    component: BasicLayout,
    children: menus,
  },
];
