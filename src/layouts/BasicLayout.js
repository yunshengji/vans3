import React from 'react';
import { connect } from 'dva';
import { Layout, Icon } from 'antd';
import styles from './BasicLayout.less';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalSider from '@/components/GlobalSider';
import GlobalSiderDrawer from '@/components/GlobalSiderDrawer';

const { Content, Footer } = Layout;

class BasicLayout extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'global/eGetMe' });
  }

  render() {
    return (
      <Layout>
        <GlobalSider/>
        <GlobalSiderDrawer/>
        <Layout className={styles.main}>
          <GlobalHeader/>
          <Content className={styles.content}>{this.props.children}</Content>
          <Footer className={styles.footer}>
            万铭星系统 <Icon type="copyright"/> 2020 万铭技术部出品
          </Footer>
        </Layout>
      </Layout>
    );
  }

}

export default connect()(BasicLayout);
