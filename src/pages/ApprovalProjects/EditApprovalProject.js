import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Tabs } from 'antd';
import { Link } from 'umi';
import EditTableOrigin from '@/pages/ApprovalProjects/components/EditTableOrigin';
import EditTableRecord from '@/pages/ApprovalProjects/components/EditTableRecord';
import EditTableService from '@/pages/ApprovalProjects/components/EditTableService';
import EditTableExecute from '@/pages/ApprovalProjects/components/EditTableExecute';
import ChooseProcess from '@/pages/ApprovalProjects/components/ChooseProcess';

class EditApprovalProject extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'editApprovalProject/eGetUsers', payload: {} });
    this.props.dispatch({ type: 'editApprovalProject/eGetContracts', payload: {} });
    const { path, params } = this.props.match;
    const isEditing = path === '/approvalProject/edit/:id';
    if (isEditing) {
      const { id } = params;
      this.props.dispatch({ type: 'editApprovalProject/eGetOriginTable', id });
    }
  }

  changeTab = (activeKey) => {
    this.props.dispatch({
      type: 'editApprovalProject/rUpdateState',
      payload: { activeKey },
    });
  };

  render() {
    const { match: { path }, activeKey } = this.props;
    const isEditing = path === '/approvalProject/edit/:id';
    const routes = isEditing ?
      [{ breadcrumbName: '项目立项', path: '/originList' }, { breadcrumbName: '修改项目' }]
      :
      [{ breadcrumbName: '项目立项', path: '/originList' }, { breadcrumbName: '创建新项目' }];
    return (
      <React.Fragment>
        <div className="headerWrapper">
          <Breadcrumb>
            {routes.map((item, index) => {
              const { path, breadcrumbName } = item;
              if (path) {
                return (
                  <Breadcrumb.Item key={index}>
                    <Link to={path}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item key={index}>
                    <span>{breadcrumbName}</span>
                  </Breadcrumb.Item>
                );
              }
            })}
          </Breadcrumb>
        </div>
        <div className="contentWrapper">
          {isEditing ?
            <Tabs activeKey={activeKey} onChange={this.changeTab}>
              <Tabs.TabPane tab="立项表" key="EditTableOrigin">
                <EditTableOrigin/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="备案表" key="EditTableRecord">
                <EditTableRecord/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="营销实施情况表" key="EditTableExecute">
                <EditTableExecute/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="跟踪服务表" key="EditTableService">
                <EditTableService/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="项目流程" key="Process">
                <ChooseProcess/>
              </Tabs.TabPane>
            </Tabs>
            :
            <Tabs activeKey={activeKey}>
              <Tabs.TabPane tab="立项表" key="EditTableOrigin">
                <EditTableOrigin/>
              </Tabs.TabPane>
            </Tabs>
          }
        </div>
      </React.Fragment>);
  }
}


export default connect(({ loading, common, editApprovalProject }) => ({
  activeKey: editApprovalProject.activeKey,
}))(EditApprovalProject);
