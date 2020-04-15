import React from 'react';
import { connect } from 'dva';
import GlobalBreadcrumb from '@/components/GlobalBreadcrumb';
import TutorialDescription from '@/components/TutorialDescription';
import styles from './index.less';

class Dashboard extends React.Component {

  render() {
    const breadcrumbs = [
      { path: '/dashboard', name: '首页' },
      { path: '/dashboard/son', name: '子功能' },
      { name: '工作台' },
    ];
    const title = '早安，郑晓媛，祝你开心每一天！';
    return (
      <div className={styles.root}>
        <GlobalBreadcrumb breadcrumbs={breadcrumbs} title={title}>
          <TutorialDescription/>
        </GlobalBreadcrumb>
        <div className={styles.content}>
          内容区
        </div>
      </div>
    );
  }
}


export default connect(({ loading }) => ({
  submitting: loading.effects['Login/eLogin'],
  loading,
}))(Dashboard);
