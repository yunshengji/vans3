import React from 'react';
import { Spin } from 'antd';
import styles from './RouteLoading.less';

class RouteLoading extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Spin size="large"/>
      </div>
    );
  }
}

export default RouteLoading;
