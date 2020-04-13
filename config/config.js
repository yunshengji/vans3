export default {
  treeShaking: true,
  routes: [
    {
      path: '/login',
      component: './login',
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/dashboard', component: '../pages/dashboard' },
      ],
    },
  ],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true, loadingComponent: '../src/components/routeLoading' },
      dll: true,
    }],
  ],
};
