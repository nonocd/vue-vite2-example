import { MenuDataItem } from '@ant-design-vue/pro-layout/lib/typings';

export const menus: MenuDataItem[] = [
  {
    path: '/welcome',
    name: 'welcome',
    meta: { icon: 'SmileOutlined', title: 'Welcome' },
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页', icon: 'HomeOutlined' },
  },
  {
    path: '/about',
    name: 'About',
    meta: { title: '关于', icon: 'QuestionCircleOutlined' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { icon: 'dashboard-outlined', title: 'Dashboard' },
    children: [
      {
        path: '/dashboard/analysis',
        name: 'Analysis',
        meta: { icon: 'SmileOutlined', title: 'Analysis' },
      },
      {
        path: '/dashboard/monitor',
        name: 'Monitor',
        meta: { icon: 'SmileOutlined', title: 'Monitor' },
      },
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        meta: { icon: 'SmileOutlined', title: 'Workplace' },
      },
    ],
  },
  {
    path: '/form2',
    meta: { title: '表单页', icon: 'FormOutlined' },
    children: [
      {
        path: 'add',
        name: 'Add',
        meta: { title: '增加', icon: 'EditOutlined' },
      },
    ],
  },
];
