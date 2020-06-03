import React from 'react';
import { Link, router, withRouter } from 'umi';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import DashboardIcon from '../../public/menu/dashboard.svg';
import DashboardReverseIcon from '../../public/menu/dashboard-reverse.svg';
import ContractsIcon from '../../public/menu/contracts.svg';
import ContractsReverseIcon from '../../public/menu/contracts-reverse.svg';
import MakeProject from '../../public/menu/make-project.svg';
import MakeProjectReverseIcon from '../../public/menu/make-projects-reverse.svg';
import LawIcon from '../../public/menu/laws.svg';
import LawReverseIcon from '../../public/menu/laws-reverse.svg';
import WorkDiaries from '../../public/menu/workDiaries.svg';
import WorkDiariesReverseIcon from '../../public/menu/workDiaries-reverse.svg';
import GossipIcon from '../../public/menu/gossip.svg';
import GossipReverseIcon from '../../public/menu/gossip-reverse.svg';
import ContactsIcon from '../../public/menu/contacts.svg';
import ContactsReverseIcon from '../../public/menu/contacts-reverse.svg';
import ExpertsIcon from '../../public/menu/experts.svg';
import ExpertsReverseIcon from '../../public/menu/experts-reverse.svg';
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
      <Layout.Sider width="200" collapsible breakpoint="lg" theme="dark" onCollapse={this.onCollapse}
                    className="basicSide">
        <Link className="systemName" to="/projects">
          {
            menuCollapsed ?
              <img src="/system-icon.svg" alt="万铭"/> :
              <img src="/system-name.svg" alt="万铭"/>
          }
        </Link>
        <Menu mode="inline" theme="dark" selectedKeys={[selectKeys]} onSelect={this.onSelect}>
          <Menu.Item key="projects">
            <Icon component={selectKeys === 'projects' ? DashboardReverseIcon : DashboardIcon}/><span>项目库</span>
          </Menu.Item>
          <Menu.Item key="workDiaries">
            <Icon component={selectKeys === 'workDiaries' ? WorkDiariesReverseIcon : WorkDiaries}/><span>工作日志</span>
          </Menu.Item>
          <Menu.SubMenu
            key="approvalProject"
            title={
              <span>
                <Icon component={selectKeys === 'workDiaries' ? MakeProject : MakeProject}/>
                <span>销售部</span>
              </span>
            }
          >
            <Menu.Item key="originList">
              <Icon type="smile" theme="twoTone"/><span>立项表</span>
            </Menu.Item>
            <Menu.Item key="recordList">
              <Icon type="smile" theme="twoTone"/><span>备案表</span>
            </Menu.Item>
            <Menu.Item key="executeList">
              <Icon type="smile" theme="twoTone"/><span>营销实施情况表</span>
            </Menu.Item>
            <Menu.Item key="serviceList">
              <Icon type="smile" theme="twoTone"/><span>跟踪服务表</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="laws">
            <Icon component={selectKeys === 'laws' ? LawReverseIcon : LawIcon}/><span>法律法规</span>
          </Menu.Item>
          <Menu.Item key="gossip">
            <Icon component={selectKeys === 'gossip' ? GossipReverseIcon : GossipIcon}/><span>吐槽角</span>
          </Menu.Item>
          <Menu.Item key="contacts">
            <Icon component={selectKeys === 'contacts' ? ContactsReverseIcon : ContactsIcon}/><span>联系人</span>
          </Menu.Item>
          <Menu.Item key="experts">
            <Icon component={selectKeys === 'experts' ? ExpertsReverseIcon : ExpertsIcon}/><span>专家组</span>
          </Menu.Item>
          <Menu.Item key="users">
            <Icon component={selectKeys === 'users' ? UsersReverseIcon : UsersIcon}/><span>用户</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default withRouter(connect(({ common }) => ({
  menuCollapsed: common.menuCollapsed,
}))(BasicSide));
