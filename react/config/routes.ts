export default [


  // 管理后台路由
  { path: '/', redirect: '/welcome' },
  {
    name: '欢迎',
    icon: 'table',
    path: '/welcome',
    component: './Welcome',
    resourceKey: 'Welcome',
  },
  {
    name: '学生列表',
    icon: 'table',
    path: '/stuList',
    component: './Stu',
    resourceKey: 'StudentList',
  },

  { component: './404' },
];
