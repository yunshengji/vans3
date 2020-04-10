import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

class PageLoading extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Spin size="large"/>
      </div>
    );
  }
}

export default PageLoading;
