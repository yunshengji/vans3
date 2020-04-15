export default {
  treeShaking: true,
  routes: [
    { path: '/Login', component: './Login' },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/403', component: './Exception/403' },
        { path: '/404', component: './Exception//404' },
        { path: '/500', component: './Exception//500' },
        { path: '/Dashboard', component: './Dashboard' },
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
