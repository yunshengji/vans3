import aliyunTheme from '@ant-design/aliyun-theme';

export default {
  treeShaking: true,
  hash: true,
  targets: { ie: 11 },
  theme: {
    aliyunTheme,
    'primary-color': '#3f78ff',
  },
  routes: [
    {
      path: '/login',
      component: '../layouts/ValidateLayout',
      routes: [
        { path: '/login', component: './User/Login' },
        { path: '/login/forget', component: './User/ForgetPassword' },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/components/AuthToken'],
      routes: [
        { path: '/', redirect: '/gossip' },
        { path: '/403', component: './Exception/403' },
        { path: '/404', component: './Exception/404' },
        { path: '/500', component: './Exception/500' },

        { path: '/pamphlet/', component: './Brochure/Pamphlet' },
        { path: '/performance/', component: './Brochure/Performance' },
        { path: '/aptitude/', component: './Brochure/Aptitude' },

        { path: '/projectArchive', component: './Archive/ProjectArchive' },
        { path: '/contractArchive', component: './Archive/ContractArchive' },

        { path: '/specialDebt', component: './Project/SpecialDebtList' },
        { path: '/specialDebt/edit/:id', component: './Project/EditSpecialDebt' },
        { path: '/specialDebt/profile/:id', component: './Project/SpecialDebtProfile' },


        { path: '/originList', component: './ApprovalProjects/OriginList' },
        { path: '/recordList', component: './ApprovalProjects/RecordList' },
        { path: '/executeList', component: './ApprovalProjects/ExecuteList' },
        { path: '/serviceList', component: './ApprovalProjects/ServiceList' },
        { path: '/approvalProject/edit', component: './ApprovalProjects/EditApprovalProject' },
        { path: '/approvalProject/edit/:id', component: './ApprovalProjects/EditApprovalProject' },
        { path: '/approvalProject/profile/:id', component: './ApprovalProjects/ProfileApprovalProject' },


        { path: '/gossip', component: './Gossip/Gossip' },

        { path: '/workDiaries', component: './WorkDiaries/List' },

        { path: '/contacts', component: './Contacts/List' },

        { path: '/experts', component: './Experts/Index' },

        { path: '/staff', component: './Staff/StaffList' },
        { path: '/staff/me', component: './Staff/StaffProfile' },
        { path: '/staff/edit', component: './Staff/EditStaff' },
        { path: '/staff/edit/:id', component: './Staff/EditStaff' },

        { path: '/laws', component: './Law/List' },

        { path: '/users', component: './User/List' },
        { path: '/users/setting', component: './User/Setting' },
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
