import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './BasicLayout.less';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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

  onSelect = ({ item, key }) => {
    router.push(`/${key}`);
  };

  // TODO:移动端适配
  // TODO:npx npx npx


  render() {
    return (
      <Layout>
        <Sider width="220" collapsible breakpoint="lg" onCollapse={this.onCollapse}>
          <Link className={styles.logo} to="/">
            {
              this.state.isCollapsed ?
                <img src="/logo.png" alt="万铭"/> :
                <img src="/system-name.svg" alt="万铭"/>
            }
          </Link>
          <Menu className={styles.menu} theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}
                onSelect={this.onSelect}>
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
        </Sider>
        <Layout className={styles.main}>
          <Header className={styles.header}>
            <GlobalHeader/>
          </Header>
          <Content>{this.props.children}</Content>
          <Footer className={styles.footer}>
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
