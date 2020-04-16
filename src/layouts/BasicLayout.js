import React from 'react';
import { Link, router, withRouter } from 'umi';
import { connect } from 'dva';
import { Layout, Menu, Icon, Drawer } from 'antd';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './BasicLayout.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'global/eGetMe' });
  }

  onCollapse = (menuCollapsed) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/rUpdateState',
      payload: { menuCollapsed },
    });
  };

  onClose = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/rUpdateState',
      payload: {
        drawerMenuVisible: false,
      },
    });
  };

  onSelect = ({ item, key }) => {
    router.push(key);
  };

  render() {
    const { menuCollapsed, drawerMenuVisible } = this.props;
    return (
      <Layout>
        <Sider width="220" collapsible breakpoint="lg" onCollapse={this.onCollapse} className={styles.side}>
          <Link className={styles.logo} to="/">
            {
              menuCollapsed ?
                <img src="/logo.png" alt="万铭"/> :
                <img src="/system-name.png" alt="万铭"/>
            }
          </Link>
          <Menu className={styles.menu} theme="dark" mode="inline" selectedKeys={[this.props.history.location.pathname]}
                onSelect={this.onSelect}>
            <Menu.Item key="/dashboard">
              <Icon type="dashboard"/><span>工作台</span>
            </Menu.Item>
            <SubMenu key="project"
                     title={
                       <span><Icon type="project"/><span>项目库</span></span>
                     }>
              <Menu.Item key="zhuanxiangzhai">
                <Icon type="smile"/><span>专项债</span>
              </Menu.Item>
              <Menu.Item key="ppp">
                <Icon type="smile"/><span>PPP</span>
              </Menu.Item>
              <Menu.Item key="shierwuguihua">
                <Icon type="smile"/><span>十二五规划</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="contacts">
              <Icon type="contacts"/><span>联系人</span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon type="user"/><span>用户</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Drawer placement="left" closable={false} width={220} visible={drawerMenuVisible} onClose={this.onClose}
                className="globalDrawerMenu">
          <div className="globalDrawerMenuWrapper">
            <Link to="/">
              <img src="/system-name.png" alt="万铭"/>
            </Link>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} onSelect={this.onSelect}>
              <Menu.Item key="dashboard">
                <Icon type="dashboard"/><span>工作台</span>
              </Menu.Item>
              <SubMenu key="project"
                       title={
                         <span><Icon type="project"/><span>项目库</span></span>
                       }>
                <Menu.Item key="zhuanxiangzhai">
                  <Icon type="smile"/><span>专项债</span>
                </Menu.Item>
                <Menu.Item key="ppp">
                  <Icon type="smile"/><span>PPP</span>
                </Menu.Item>
                <Menu.Item key="shierwuguihua">
                  <Icon type="smile"/><span>十二五规划</span>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="contacts">
                <Icon type="contacts"/><span>联系人</span>
              </Menu.Item>
              <Menu.Item key="users">
                <Icon type="user"/><span>用户</span>
              </Menu.Item>
            </Menu>
          </div>
        </Drawer>
        <Layout className={styles.main}>
          <Header className={styles.header}>
            <GlobalHeader/>
          </Header>
          <Content className={styles.content}>{this.props.children}</Content>
          <Footer className={styles.footer}>
            万铭星系统 <Icon type="copyright"/> 2020 万铭技术部出品
          </Footer>
        </Layout>
      </Layout>
    );
  }

}

export default withRouter(connect(({ global }) => ({
  menuCollapsed: global.menuCollapsed,
  drawerMenuVisible: global.drawerMenuVisible,
}))(BasicLayout));
