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
        { path: '/', component: '../pages/index' },
      ],
    },
  ],
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true, loadingComponent: '../src/components/RouteLoading' },
      dll: true,
      locale: { enable: true, default: 'en-US' },
      title: '万铭星系统',
      metas: [{ 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }],
      links: [{ rel: 'icon', href: '../src/assets/favicon.ico', type: 'image/x-icon' }],
      routes: {
        exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\//],
      },
    }],
  ],
};
