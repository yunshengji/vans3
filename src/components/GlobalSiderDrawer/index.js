import React from 'react';
import { Link, router, withRouter } from 'umi';
import { Drawer, Icon, Menu } from 'antd';
import { connect } from 'dva';

class GlobalSiderDrawer extends React.Component {
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
    const { dispatch } = this.props;
    router.push(`/${key}`);
    setTimeout(() => {
      dispatch({
        type: 'global/rUpdateState',
        payload: {
          drawerMenuVisible: false,
        },
      });
    }, 200);
  };

  render() {
    const { drawerMenuVisible } = this.props;
    return (
      <Drawer placement="left" closable={false} width={200} visible={drawerMenuVisible} onClose={this.onClose}
              className="globalSiderDrawer">
        <div className="globalSiderDrawerWrapper">
          <Link to="/">
            <img src="/system-name.svg" alt="万铭"/>
          </Link>
          <Menu mode="inline" selectedKeys={[this.props.history.location.pathname.split('/')[1]]}
                onSelect={this.onSelect}>
            <Menu.Item key="dashboard">
              <Icon type="dashboard"/><span>工作台</span>
            </Menu.Item>
            <Menu.Item key="projects">
              <Icon type="user"/><span>项目库</span>
            </Menu.Item>
            <Menu.Item key="contracts">
              <Icon type="user"/><span>合同</span>
            </Menu.Item>
            <Menu.Item key="datum">
              <Icon type="user"/><span>资料库</span>
            </Menu.Item>
            <Menu.Item key="contacts">
              <Icon type="contacts"/><span>联系人</span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon type="user"/><span>用户</span>
            </Menu.Item>
            <Menu.Item key="messages">
              <Icon type="user"/><span>消息</span>
            </Menu.Item>
          </Menu>
        </div>
      </Drawer>
    );
  }
}

export default withRouter(connect(({ global }) => ({
  drawerMenuVisible: global.drawerMenuVisible,
}))(GlobalSiderDrawer));
