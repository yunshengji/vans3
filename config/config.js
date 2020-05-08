export default {
  treeShaking: true,
  routes: [
    { path: '/login', component: './Users/Login' },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/components/AuthToken'],
      routes: [
        { path: '/', redirect: '/users' },
        { path: '/403', component: './Exception/403' },
        { path: '/404', component: './Exception/404' },
        { path: '/500', component: './Exception/500' },
        { path: '/projects', component: './Projects/List' },
        { path: '/projects/create/specialDebt', component: './Projects/CreateSpecialDebt' },
        { path: '/workDiaries', component: './WorkDiaries/List' },
        { path: '/lawsRegulations', component: './LawsRegulations/List' },
        { path: '/contacts', component: './Contacts/List' },
        { path: '/users', component: './Users/List' },
        { path: '/users/setting', component: './Users/Setting' },
      ],
    },
  ],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true, loadingComponent: './components/RouteLoading' },
      dll: true,
    }],
  ],
};
