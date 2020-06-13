import React from 'react';
import { connect } from 'dva';
import { Layout, Icon, ConfigProvider, Spin } from 'antd';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';
import BasicSide from '@/layouts/BasicSide.js';
import BasicSideDrawer from '@/layouts/BasicSideDrawer.js';
import BasicHeader from '@/layouts/BasicHeader.js';
import styles from './BasicLayout.less';

class BasicLayout extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'common/eGetMe' });
  }

  render() {
    const { isLogOuting } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <Layout>
          <BasicSide/><BasicSideDrawer/>
          <Layout className={styles.main}>
            <BasicHeader/>
            <Layout.Content>{this.props.children}</Layout.Content>
            <Layout.Footer className={styles.footer}>
              万铭星系统 <Icon type="copyright"/> 2020 万铭研发部出品
            </Layout.Footer>
          </Layout>
        </Layout>
        {
          isLogOuting &&
          <Spin size="large" tip="正在退出登录 ..." spinning={true} className={styles.loading}/>
        }
      </ConfigProvider>
    );
  }
}

export default connect(({ common }) => ({
  isLogOuting: common.isLogOuting,
}))(BasicLayout);
