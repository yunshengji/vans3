import React from 'react';
import { Link, router, withRouter } from 'umi';
import { Drawer, Icon, Layout, Menu } from 'antd';
import { connect } from 'dva';
import DashboardReverseIcon from '../../public/menu/dashboard-reverse.svg';
import DashboardIcon from '../../public/menu/dashboard.svg';
import ContractsReverseIcon from '../../public/menu/contracts-reverse.svg';
import ContractsIcon from '../../public/menu/contracts.svg';
import DatumReverseIcon from '../../public/menu/datum-reverse.svg';
import DatumIcon from '../../public/menu/datum.svg';
import ContactsReverseIcon from '../../public/menu/contacts-reverse.svg';
import ContactsIcon from '../../public/menu/contacts.svg';
import UsersReverseIcon from '../../public/menu/users-reverse.svg';
import UsersIcon from '../../public/menu/users.svg';
import MessagesReverseIcon from '../../public/menu/messages-reverse.svg';
import MessagesIcon from '../../public/menu/messages.svg';

class BasicSideDrawer extends React.Component {
  onClose = () => {
    this.props.dispatch({
      type: 'common/rUpdateState',
      payload: { drawerMenuVisible: false },
    });
  };
  onSelect = ({ item, key }) => {
    router.push(`/${key}`);
    setTimeout(() => {
      this.props.dispatch({
        type: 'common/rUpdateState',
        payload: { drawerMenuVisible: false },
      });
    }, 200);
  };

  render() {
    const { drawerMenuVisible } = this.props;
    const selectKeys = this.props.history.location.pathname.split('/')[1];
    return (
      <Drawer placement="left" closable={false} width="12rem" visible={drawerMenuVisible} onClose={this.onClose}
              className="basicSideDrawer">
        <div className="basicSideDrawerWrapper">
          <Link to="/projects">
            <img src="/system-name.svg" alt="万铭"/>
          </Link>
          <Menu mode="inline" theme="dark" selectedKeys={[selectKeys]} onSelect={this.onSelect}>
            <Menu.Item key="projects">
              <Icon component={selectKeys === 'projects' ? DashboardReverseIcon : DashboardIcon}/>
              <span>项目库</span>
            </Menu.Item>
            <Menu.Item key="workDiaries">
              <Icon component={selectKeys === 'workDiaries' ? DashboardReverseIcon : DashboardIcon}/>
              <span>工作日志</span>
            </Menu.Item>
            <Menu.Item key="contracts">
              <Icon component={selectKeys === 'contracts' ? ContractsReverseIcon : ContractsIcon}/>
              <span>合同</span>
            </Menu.Item>
            <Menu.Item key="datum">
              <Icon component={selectKeys === 'datum' ? DatumReverseIcon : DatumIcon}/>
              <span>资料库</span>
            </Menu.Item>
            <Menu.Item key="contacts">
              <Icon component={selectKeys === 'contacts' ? ContactsReverseIcon : ContactsIcon}/>
              <span>联系人</span>
            </Menu.Item>
            <Menu.Item key="users">
              <Icon component={selectKeys === 'users' ? UsersReverseIcon : UsersIcon}/>
              <span>用户</span>
            </Menu.Item>
            <Menu.Item key="messages">
              <Icon component={selectKeys === 'messages' ? MessagesReverseIcon : MessagesIcon}/>
              <span>消息</span>
            </Menu.Item>
          </Menu>
        </div>
      </Drawer>
    );
  }
}

export default withRouter(connect(({ common }) => ({
  drawerMenuVisible: common.drawerMenuVisible,
}))(BasicSideDrawer));
