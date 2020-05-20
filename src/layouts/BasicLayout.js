import React from 'react';
import { connect } from 'dva';
import { Layout, Icon } from 'antd';
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
    );
  }
}

export default connect()(BasicLayout);
