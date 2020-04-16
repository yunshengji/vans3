import React from 'react';
import { connect } from 'dva';
import PageHeader from '@/pages/Dashboard/PageHeader';
import styles from './index.less';

class Dashboard extends React.Component {

  render() {
    return (
      <div className={styles.root}>
        <PageHeader/>
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
