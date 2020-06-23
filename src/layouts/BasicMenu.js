import React from 'react';
import { router, withRouter } from 'umi';
import { Menu, Icon } from 'antd';
import { connect } from 'dva';

import ProjectGray from '../../public/menu/ProjectGray.svg';
import ProjectBlue from '../../public/menu/ProjectBlue.svg';
import ProjectWhite from '../../public/menu/ProjectWhite.svg';

import ApprovalGray from '../../public/menu/ApprovalGray.svg';
import ApprovalBlue from '../../public/menu/ApprovalBlue.svg';
import ApprovalWhite from '../../public/menu/ApprovalWhite.svg';

import BrochureGray from '../../public/menu/BrochureGray.svg';
import BrochureBlue from '../../public/menu/BrochureBlue.svg';
import BrochureWhite from '../../public/menu/BrochureWhite.svg';

import ArchiveGray from '../../public/menu/ArchiveGray.svg';
import ArchiveBlue from '../../public/menu/ArchiveBlue.svg';
import ArchiveWhite from '../../public/menu/ArchiveWhite.svg';

import GossipGray from '../../public/menu/GossipGray.svg';
import GossipBlue from '../../public/menu/GossipBlue.svg';
import GossipWhite from '../../public/menu/GossipWhite.svg';

import WorkDiaryGray from '../../public/menu/WorkDiaryGray.svg';
import WorkDiaryBlue from '../../public/menu/WorkDiaryBlue.svg';
import WorkDiaryWhite from '../../public/menu/WorkDiaryWhite.svg';

import ContactGray from '../../public/menu/ContactGray.svg';
import ContactBlue from '../../public/menu/ContactBlue.svg';
import ContactWhite from '../../public/menu/ContactWhite.svg';

import ExpertGray from '../../public/menu/ExpertGray.svg';
import ExpertBlue from '../../public/menu/ExpertBlue.svg';
import ExpertWhite from '../../public/menu/ExpertWhite.svg';

import HRGray from '../../public/menu/HRGray.svg';
import HRBlue from '../../public/menu/HRBlue.svg';
import HRWhite from '../../public/menu/HRWhite.svg';

import LawGray from '../../public/menu/LawGray.svg';
import LawBlue from '../../public/menu/LawBlue.svg';
import LawWhite from '../../public/menu/LawWhite.svg';

import UserGray from '../../public/menu/UserGray.svg';
import UserBlue from '../../public/menu/UserBlue.svg';
import UserWhite from '../../public/menu/UserWhite.svg';

class BasicMenu extends React.Component {
  onSelect = ({ item, key }) => {
    router.push(`/${key}`);
    setTimeout(() => {
      this.props.dispatch({ type: 'common/rUpdateState', payload: { drawerMenuVisible: false } });
    }, 200);
  };

  render() {
    const { mine: { level, department }, chooseDepartment } = this.props;
    const computedDepartment = chooseDepartment ? chooseDepartment : department['name'];
    const selectKeys = this.props.history.location.pathname.split('/')[1];

    return (
      <Menu mode="inline" selectedKeys={[selectKeys]} onSelect={this.onSelect}>

        <Menu.SubMenu key="common" title={<span>公共区域</span>}>
          <Menu.SubMenu key="brochure"
                        title={<span><Icon component={BrochureBlue}/><span>公司宣传</span></span>}>
            <Menu.Item key="pamphlet">
              <span>宣传册</span>
            </Menu.Item>
            <Menu.Item key="performance">
              <span>业绩表</span>
            </Menu.Item>
            <Menu.Item key="aptitude">
              <span>资质库</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="laws">
            <Icon component={selectKeys === 'laws' ? LawWhite : LawBlue}/>
            <span>法律法规</span>
          </Menu.Item>
          <Menu.Item key="contacts">
            <Icon component={selectKeys === 'contacts' ? ContactWhite : ContactBlue}/><span>联系人</span>
          </Menu.Item>
          <Menu.Item key="workDiaries">
            <Icon component={selectKeys === 'workDiaries' ? WorkDiaryWhite : WorkDiaryBlue}/><span>工作日志</span>
          </Menu.Item>
          <Menu.Item key="gossip">
            <Icon component={selectKeys === 'gossip' ? GossipWhite : GossipBlue}/><span>吐槽角</span>
          </Menu.Item>
          <Menu.Item key="users">
            <Icon component={selectKeys === 'users' ? UserWhite : UserBlue}/>
            <span>系统用户</span>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="department" title={<span>{computedDepartment}</span>}>
          <Menu.SubMenu key="project" title={<span><Icon component={ProjectBlue}/><span>项目管理</span></span>}>
            <Menu.Item key="specialDebt">
              <span>专项债</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="approvalProject" title={<span><Icon component={ApprovalBlue}/><span>项目立项</span></span>}>
            <Menu.Item key="originList">
              <span>立项表</span>
            </Menu.Item>
            {
              (computedDepartment === '营销部' || computedDepartment === '总裁部') &&
              <Menu.Item key="recordList" disabled={department.name !== '营销部' && level < 9}>
                <span>备案表</span>
              </Menu.Item>
            }
            {
              (computedDepartment === '营销部' || computedDepartment === '总裁部') &&
              <Menu.Item key="executeList" disabled={department.name !== '营销部' && level < 9}>
                <span>营销实施情况表</span>
              </Menu.Item>
            }
            {
              (computedDepartment === '营销部' || computedDepartment === '总裁部') &&
              <Menu.Item key="serviceList" disabled={department.name !== '营销部' && level < 9}>
                <span>跟踪服务表</span>
              </Menu.Item>
            }
          </Menu.SubMenu>
          {
            (computedDepartment === '产品技术部' || computedDepartment === '营销部' || computedDepartment === '运营部' || computedDepartment === '总裁部') &&
            <Menu.SubMenu key="archive" title={<span><Icon component={ArchiveBlue}/><span>档案管理</span></span>}>
              <Menu.Item key="projectArchive" disabled={level < 2}>
                <span>项目档案</span>
              </Menu.Item>
              <Menu.Item key="contractArchive"
                         disabled={level < 2 && !(department.name === '产品技术部' || department.name === '营销部')}>
                <span>合同档案</span>
              </Menu.Item>
            </Menu.SubMenu>
          }
          {
            (computedDepartment === '招投标部' || computedDepartment === '总裁部') &&
            <Menu.Item key="experts" disabled={!(department.name === '招投标部' || department.name === '总裁部')}>
              <Icon component={selectKeys === 'experts' ? ExpertWhite : ExpertBlue}/>
              <span>专家组</span>
            </Menu.Item>
          }
          {
            (computedDepartment === '运营部' || computedDepartment === '总裁部')
            &&
            <Menu.Item key='staff' disabled={level < 2 || !(department.name === '运营部' || department.name === '总裁部')}>
              <Icon component={selectKeys === 'staff' ? HRWhite : HRBlue}/>
              <span>员工管理</span>
            </Menu.Item>
          }
        </Menu.SubMenu>

      </Menu>
    );
  }
}

export default withRouter(connect(({ common }) => ({
  mine: common.mine,
  chooseDepartment: common.chooseDepartment,
}))(BasicMenu));
