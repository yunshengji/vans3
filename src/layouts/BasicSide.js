import React from 'react';
import { Link, router, withRouter } from 'umi';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import DashboardIcon from '../../public/menu/dashboard.svg';
import DashboardReverseIcon from '../../public/menu/dashboard-reverse.svg';
import ContractsIcon from '../../public/menu/contracts.svg';
import ContractsReverseIcon from '../../public/menu/contracts-reverse.svg';
import LawReverseIcon from '../../public/menu/laws-reverse.svg';
import LawIcon from '../../public/menu/laws.svg';
import GossipIcon from '../../public/menu/gossip.svg';
import GossipReverseIcon from '../../public/menu/gossip-reverse.svg';
import ContactsIcon from '../../public/menu/contacts.svg';
import ContactsReverseIcon from '../../public/menu/contacts-reverse.svg';
import ExpertsIcon from '../../public/menu/contacts.svg';
import ExpertsReverseIcon from '../../public/menu/contacts-reverse.svg';
import UsersIcon from '../../public/menu/users.svg';
import UsersReverseIcon from '../../public/menu/users-reverse.svg';

class BasicSide extends React.Component {
  onCollapse = (menuCollapsed) => {
    this.props.dispatch({
      type: 'common/rUpdateState',
      payload: { menuCollapsed },
    });
  };
  onSelect = ({ item, key }) => {
    router.push(`/${key}`);
  };

  render() {
    const { menuCollapsed } = this.props;
    const selectKeys = this.props.history.location.pathname.split('/')[1];
    return (
      <Layout.Sider width="180" collapsible breakpoint="lg" theme="light" onCollapse={this.onCollapse}
                    className="basicSide">
        <Link className="systemName" to="/projects">
          {
            menuCollapsed ?
              <img src="/system-icon.svg" alt="万铭"/> :
              <img src="/system-name.svg" alt="万铭"/>
          }
        </Link>
        <Menu mode="inline" selectedKeys={[selectKeys]} onSelect={this.onSelect}>
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
          <Menu.Item key="laws">
            <Icon component={selectKeys === 'laws' ? LawReverseIcon : LawIcon}/>
            <span>法律法规</span>
          </Menu.Item>
          <Menu.Item key="gossip">
            <Icon component={selectKeys === 'gossip' ? GossipReverseIcon : GossipIcon}/>
            <span>吐槽角</span>
          </Menu.Item>
          <Menu.Item key="contacts">
            <Icon component={selectKeys === 'contacts' ? ContactsReverseIcon : ContactsIcon}/>
            <span>联系人</span>
          </Menu.Item>
          <Menu.Item key="experts">
            <Icon component={selectKeys === 'experts' ? ExpertsReverseIcon : ExpertsIcon}/>
            <span>专家组</span>
          </Menu.Item>
          <Menu.Item key="users">
            <Icon component={selectKeys === 'users' ? UsersReverseIcon : UsersIcon}/>
            <span>用户</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default withRouter(connect(({ common }) => ({
  menuCollapsed: common.menuCollapsed,
}))(BasicSide));
