import React from 'react';
import {Link} from 'umi';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './BasicLayout.less';

const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'Global/eGetMe' });
  }

  onCollapse = (collapsed) => {
    this.setState(() => ({
      isCollapsed: collapsed,
    }));
  };

  // TODO:Header通知消息
  // TODO:导航栏图标和功能具名化，点击进行路由跳转
  // TODO:npx npx npx


  render() {
    return (
      <Layout>
        <Sider width="220" collapsible breakpoint="lg" onCollapse={this.onCollapse}>
          <Link className={styles.logo} to="/">
            {
              this.state.isCollapsed ?
                <img src="/logo.png" alt="W"/> :
                <img src="/system-name.svg" alt="W"/>
            }
          </Link>
          <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user"/>
              <span>工作台</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span>专项债</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload"/>
              <span>联系人</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="upload"/>
              <span>用户</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={styles.main}>
          <Header className={styles.header}>
            <GlobalHeader/>
          </Header>
          <Content className={styles.content}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            万铭星系统 <Icon type="copyright"/> 2020 万铭技术部出品
          </Footer>
        </Layout>
      </Layout>
    );
  }

}

export default connect(({ loading, Global }) => ({
  loading,
  // Global,
}))(BasicLayout);
