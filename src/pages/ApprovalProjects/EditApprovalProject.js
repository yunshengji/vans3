import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'umi';
import EditTableOrigin from '@/pages/ApprovalProjects/components/EditTableOrigin';
import EditTableRecord from '@/pages/ApprovalProjects/components/EditTableRecord';
import EditTableService from '@/pages/ApprovalProjects/components/EditTableService';
import EditTableExecute from '@/pages/ApprovalProjects/components/EditTableExecute';

class EditApprovalProject extends React.Component {
  changeTab = (activeKey) => {
    this.props.dispatch({
      type: 'editApprovalProject/rUpdateState',
      payload: { activeKey },
    });
  };

  render() {
    const { match, activeKey, routesCreating, routesEditing } = this.props;
    const isEditing = match.path === '/approvalProject/edit/:id';
    const routes = isEditing ? routesEditing : routesCreating;
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
  routesCreating: editApprovalProject.routesCreating,
  routesEditing: editApprovalProject.routesEditing,
}))(EditApprovalProject);
