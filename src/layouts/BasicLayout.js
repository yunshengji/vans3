import React from 'react';
import { connect } from 'dva';
import { Layout, Icon, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import styles from './BasicLayout.less';
import GlobalHeader from '@/layouts/BasicHeader.js';
import GlobalSide from '@/layouts/BasicSide.js';
import GlobalSideDrawer from '@/layouts/BasicSideDrawer.js';

const { Content, Footer } = Layout;

class BasicLayout extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'common/eGetMe' });
  }

  render() {
    return (
      <ConfigProvider csp={{ nonce: 'YourNonceCode' }} locale={zhCN}>
        <Layout>
          <GlobalSide/>
          <GlobalSideDrawer/>
          <Layout className={styles.main}>
            <GlobalHeader/>
            <Content>{this.props.children}</Content>
            <Footer className={styles.footer}>
              万铭星系统 <Icon type="copyright"/> 2020 万铭研发部出品
            </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}

export default connect()(BasicLayout);
