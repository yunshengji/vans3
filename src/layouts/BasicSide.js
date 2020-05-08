import React from 'react';
import { Link, router, withRouter } from 'umi';
import { Avatar, Layout, Menu, Spin } from 'antd';
import { connect } from 'dva';
import styles from './BasicSide.less';
import { getFileURL } from '@/utils/transfer';

const { Sider } = Layout;

class BasicSide extends React.Component {
  onCollapse = (menuCollapsed) => {
    this.props.dispatch({
      type: 'basicLayout/rUpdateState',
      payload: { menuCollapsed },
    });
  };
  onSelect = ({ item, key }) => {
    router.push(`/${key}`);
  };

  render() {
    const { menuCollapsed, avatar, name } = this.props;
    const selectKeys = this.props.history.location.pathname.split('/')[1];
    return (
      <Sider width="180" collapsible breakpoint="lg" theme="light" onCollapse={this.onCollapse}
             className={styles.globalSide}>
        <Link className="systemName" to="/projects">
          {
            menuCollapsed ?
              <img src="/system-icon.svg" alt="万铭"/> :
              <img src="/system-name.svg" alt="万铭"/>
          }
        </Link>
        <Link className="userWrapper" to="/users/setting">
          {
            (avatar || name) ?
              <div className="userContainer">
                <Avatar size={48} src={getFileURL(avatar)}/>
                {
                  menuCollapsed ||
                  <div className="username">
                    <p>姓名</p>
                    <p>{name}</p>
                  </div>
                }
              </div>
              :
              <Spin/>
          }
        </Link>
        <Menu mode="inline" selectedKeys={[selectKeys]} onSelect={this.onSelect}>
          <Menu.Item key="projects">
            <img src={selectKeys === 'projects' ? '/menu/dashboard-reverse.svg' : '/menu/dashboard.svg'} alt="项目库"/>
            <span>项目库</span>
          </Menu.Item>
          <Menu.Item key="workDiaries">
            <img src={selectKeys === 'workDiaries' ? '/menu/dashboard-reverse.svg' : '/menu/dashboard.svg'} alt="项目库"/>
            <span>工作日志</span>
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
      </Sider>
    );
  }
}

export default withRouter(connect(({ basicLayout }) => ({
  menuCollapsed: basicLayout.menuCollapsed,
  avatar: basicLayout.mine.avatar,
  name: basicLayout.mine.name,
}))(BasicSide));
