import React from 'react';
import { Layout } from 'antd';
import BasicMenu from '@/layouts/BasicMenu';
import styles from './BasicSide.less';

class BasicSide extends React.Component {

  render() {
    return (
      <Layout.Sider width="200" theme="dark" className={styles.basicSide}>
        <a className={styles.systemName} href="http://www.cdwmzx.cn/" target="_blank">
          <img src="/system-name.svg" alt="万铭"/>
        </a>
        <div style={{ marginTop: '2em' }}>
          <BasicMenu/>
        </div>
      </Layout.Sider>
    );
  }
}

export default BasicSide;
