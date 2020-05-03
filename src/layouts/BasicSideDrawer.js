import React from 'react';
import { Link, router, withRouter } from 'umi';
import { Drawer, Menu } from 'antd';
import { connect } from 'dva';
import styles from './BasicSideDrawer.less';

class BasicSideDrawer extends React.Component {
  onClose = () => {
    this.props.dispatch({
      type: 'basicLayout/rUpdateState',
      payload: { drawerMenuVisible: false },
    });
  };
  onSelect = ({ item, key }) => {
    router.push(`/${key}`);
    setTimeout(() => {
      this.props.dispatch({
        type: 'basicLayout/rUpdateState',
        payload: { drawerMenuVisible: false },
      });
    }, 200);
  };

  render() {
    const { drawerMenuVisible } = this.props;
    const selectKeys = this.props.history.location.pathname.split('/')[1];
    return (
      <Drawer placement="left" closable={false} width={180} visible={drawerMenuVisible} onClose={this.onClose}
              className={styles.globalSideDrawer}>
        <div className="globalSideDrawerWrapper">
          <Link to="/projects">
            <img src="/system-name.svg" alt="万铭"/>
          </Link>
          <Menu selectedKeys={[selectKeys]} onSelect={this.onSelect}>
            <Menu.Item key="projects">
              <img src={selectKeys === 'projects' ? '/menu/dashboard-reverse.svg' : '/menu/dashboard.svg'} alt="项目库"/>
              <span>项目库</span>
            </Menu.Item>
            <Menu.Item key="contracts">
              <img src={selectKeys === 'contracts' ? '/menu/contracts-reverse.svg' : '/menu/contracts.svg'} alt="合同"/>
              <span>合同</span>
            </Menu.Item>
            <Menu.Item key="datum">
              <img src={selectKeys === 'datum' ? '/menu/datum-reverse.svg' : '/menu/datum.svg'} alt="资料库"/>
              <span>资料库</span>
            </Menu.Item>
            <Menu.Item key="contacts">
              <img src={selectKeys === 'contacts' ? '/menu/contacts-reverse.svg' : '/menu/contacts.svg'} alt="联系人"/>
              <span>联系人</span>
            </Menu.Item>
            <Menu.Item key="users">
              <img src={selectKeys === 'users' ? '/menu/users-reverse.svg' : '/menu/users.svg'} alt="用户"/>
              <span>用户</span>
            </Menu.Item>
            <Menu.Item key="messages">
              <img src={selectKeys === 'messages' ? '/menu/messages-reverse.svg' : '/menu/messages.svg'} alt="消息"/>
              <span>消息</span>
            </Menu.Item>
          </Menu>
        </div>
      </Drawer>
    );
  }
}

export default withRouter(connect(({ basicLayout }) => ({
  drawerMenuVisible: basicLayout.drawerMenuVisible,
}))(BasicSideDrawer));
