import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

class Dashboard extends React.Component {

  render() {
    return (
      <div className={styles.root}>
        工作台路由匹配成功！
      </div>
    );
  }
}


export default connect(({ loading }) => ({
  submitting: loading.effects['Login/eLogin'],
  loading,
}))(Dashboard);
