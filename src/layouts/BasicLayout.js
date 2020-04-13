import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import styles from './BasicLayout.less';

const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState(() => ({
      isCollapsed: collapsed,
    }));
  };
  // TODO:Logo改为链接
  // TODO:403、404、500页面
  // TODO:Header通知消息、用户头像、注销、个人中心、个人设置等
  // TODO:用户信息存储global模型中，登录成功的钩子函数请求数据并更新
  // TODO:自定义BasicLayout以使其自由适配无需纵向满屏的页面
  // TODO:导航栏图标和功能具名化
  // TODO:解决部署后网页图标失效的问题

  render() {
    return (
      <Layout>
        <Sider width="220"
               collapsible
               breakpoint="lg"
               onCollapse={this.onCollapse}>
          <div className={styles.logo}>
            {
              this.state.isCollapsed ?
                <img src="/logo.png" alt="W"/> :
                <img src="/system-name.png" alt="W"/>
            }
          </div>
          <Menu
            className={styles.menu}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}>
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
        <Layout>
          <Header className={styles.header}/>
          <Content className={styles.content}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>万铭星系统 ©2020 万铭技术部出品</Footer>
        </Layout>
      </Layout>
    );
  }

}

export default connect(({ settings }) => ({
  ...settings,
}))(BasicLayout);
