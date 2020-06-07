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

        { path: '/staff', component: './Staff/StaffList' },
        { path: '/staff/edit', component: './Staff/EditStaff' },
        { path: '/staff/edit/:id', component: './Staff/EditStaff' },

        { path: '/pamphlet/', component: './Brochure/Pamphlet' },
        { path: '/performance/', component: './Brochure/Performance' },
        { path: '/aptitude/', component: './Brochure/Aptitude' },

        { path: '/archive/', component: './Archive/projectArchive' },


        { path: '/originList', component: './ApprovalProjects/OriginList' },
        { path: '/recordList', component: './ApprovalProjects/RecordList' },
        { path: '/executeList', component: './ApprovalProjects/ExecuteList' },
        { path: '/serviceList', component: './ApprovalProjects/ServiceList' },
        { path: '/approvalProject/edit', component: './ApprovalProjects/EditApprovalProject' },
        { path: '/approvalProject/edit/:id', component: './ApprovalProjects/EditApprovalProject' },

        { path: '/projects/create/specialDebt', component: './Projects/CreateSpecialDebt' },
        { path: '/workDiaries', component: './WorkDiaries/List' },
        { path: '/laws', component: './Laws/List' },
        { path: '/gossip', component: './Gossip/Gossip' },
        { path: '/contacts', component: './Contacts/List' },
        { path: '/experts', component: './Experts/Index' },
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
  urlLoaderExcludes: [/\.svg$/],
  chainWebpack(config) {
    config.module
      .rule('svg')
      .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
      .use([
        { loader: 'babel-loader' },
        {
          loader: '@svgr/webpack', options: { babel: false, icon: true },
        },
      ])
      .loader(require.resolve('@svgr/webpack'));
  },
};
