import React from 'react';
import { Link, router, withRouter } from 'umi';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import DashboardIcon from '../../public/menu/ArchiveWhite.svg';
import DashboardReverseIcon from '../../public/menu/ArchiveGray.svg';
import ContractsIcon from '../../public/menu/contracts.svg';
import ContractsReverseIcon from '../../public/menu/contracts-reverse.svg';
import MakeProject from '../../public/menu/make-project.svg';
import MakeProjectReverseIcon from '../../public/menu/make-projects-reverse.svg';


import BrochureWhite from '../../public/menu/BrochureWhite.svg';
import BrochureGray from '../../public/menu/BrochureGray.svg';

import ArchiveWhite from '../../public/menu/ArchiveWhite.svg';
import ArchiveGray from '../../public/menu/ArchiveGray.svg';

import GossipGray from '../../public/menu/GossipGray.svg';
import GossipWhite from '../../public/menu/GossipWhite.svg';

import WorkDiaryGray from '../../public/menu/WorkDiaryGray.svg';
import WorkDiaryWhite from '../../public/menu/WorkDiaryWhite.svg';

import ContactGray from '../../public/menu/ContactGray.svg';
import ContactWhite from '../../public/menu/ContactWhite.svg';

import ExpertGray from '../../public/menu/ExpertGray.svg';
import ExpertWhite from '../../public/menu/ExpertWhite.svg';

import HRGray from '../../public/menu/HRGray.svg';
import HRWhite from '../../public/menu/HRWhite.svg';

import LawGray from '../../public/menu/LawGray.svg';
import LawWhite from '../../public/menu/LawWhite.svg';

import UserGray from '../../public/menu/users.svg';
import UserWhite from '../../public/menu/UserWhite.svg';

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
    const { menuCollapsed, mine } = this.props;
    const selectKeys = this.props.history.location.pathname.split('/')[1];
    return (
      <Layout.Sider width="200" collapsible breakpoint="lg" theme="dark"
                    onCollapse={this.onCollapse}
                    className="basicSide">
        <Link className="systemName" to="/projects">
          {
            menuCollapsed ?
              <img src="/system-icon.svg" alt="万铭"/> :
              <img src="/system-name.svg" alt="万铭"/>
          }
        </Link>

        <Menu mode="inline" theme="dark" selectedKeys={[selectKeys]} onSelect={this.onSelect}>
          <Menu.SubMenu
            key="project"
            title={
              <span>
                <Icon component={selectKeys === 'project' ? MakeProject : MakeProject}/>
                <span>项目管理</span>
              </span>
            }
          >
            <Menu.Item key="specialDebt">
              <Icon type="smile"/><span>专项债</span>
            </Menu.Item>
            <Menu.Item key="ppp">
              <Icon type="smile"/><span>PPP</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="approvalProject"
            title={
              <span>
                <Icon component={selectKeys === 'approvalProject' ? MakeProject : MakeProject}/>
                <span>销售部</span>
              </span>
            }
          >
            <Menu.Item key="originList">
              <Icon type="smile"/><span>立项表</span>
            </Menu.Item>
            <Menu.Item key="recordList">
              <Icon type="smile"/><span>备案表</span>
            </Menu.Item>
            <Menu.Item key="executeList">
              <Icon type="smile"/><span>营销实施情况表</span>
            </Menu.Item>
            <Menu.Item key="serviceList">
              <Icon type="smile"/><span>跟踪服务表</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="brochure"
            title={
              <span>
                <Icon component={
                  selectKeys.startsWith('pamphlet') || selectKeys.startsWith('performance') || selectKeys.startsWith('aptitude')
                    ? BrochureWhite : BrochureGray}/>
                <span>公司宣传</span>
              </span>
            }
          >
            <Menu.Item key="pamphlet">
              <Icon type="smile"/><span>宣传册</span>
            </Menu.Item>
            <Menu.Item key="performance">
              <Icon type="smile"/><span>业绩表</span>
            </Menu.Item>
            <Menu.Item key="aptitude">
              <Icon type="smile"/><span>资质库</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="archive"
            title={
              <span>
                <Icon component={
                  selectKeys.startsWith('projectArchive') || selectKeys.startsWith('contractArchive')
                    ? ArchiveWhite : ArchiveGray}/>
                <span>档案管理</span>
              </span>
            }
          >
            {
              (mine.level > 1) &&
              <Menu.Item key="projectArchive">
                <Icon type="smile"/><span>项目档案</span>
              </Menu.Item>
            }
            {
              (mine.level > 1 || mine.department.name === '产品技术部' || mine.department.name === '营销部') &&
              <Menu.Item key="contractArchive">
                <Icon type="smile"/><span>合同档案</span>
              </Menu.Item>
            }
          </Menu.SubMenu>
          <Menu.Item key="gossip">
            <Icon component={selectKeys === 'gossip' ? GossipWhite : GossipGray}/><span>吐槽角</span>
          </Menu.Item>
          <Menu.Item key="workDiaries">
            <Icon component={selectKeys === 'workDiaries' ? WorkDiaryWhite : WorkDiaryGray}/><span>工作日志</span>
          </Menu.Item>
          <Menu.Item key="contacts">
            <Icon component={selectKeys === 'contacts' ? ContactWhite : ContactGray}/><span>联系人</span>
          </Menu.Item>

          {
            (mine.department.name === '招投标部' || mine.level > 2) &&
            <Menu.Item key="experts">
              <Icon component={selectKeys === 'experts' ? ExpertWhite : ExpertGray}/>
              <span>专家组</span>
            </Menu.Item>
          }

          {
            ((mine.level > 1 && mine.department.name === '行政部') || mine.level > 2)
            &&
            <Menu.Item key='staff'>
              <Icon component={selectKeys === 'staff' ? HRWhite : HRGray}/>
              <span>员工管理</span>
            </Menu.Item>
          }
          <Menu.Item key="laws">
            <Icon component={selectKeys === 'laws' ? LawWhite : LawGray}/>
            <span>法律法规</span>
          </Menu.Item>
          <Menu.Item key="users">
            <Icon component={selectKeys === 'users' ? UserWhite : UserGray}/>
            <span>系统用户</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default withRouter(connect(({ common }) => ({
  menuCollapsed: common.menuCollapsed,
  mine: common.mine,
}))(BasicSide));
