import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Breadcrumb, Button, Tabs } from 'antd';
import EditSpecialDebtInfo from '@/pages/Project/components/EditSpecialDebtInfo';
import EditSpecialDebtFiles from '@/pages/Project/components/EditSpecialDebtFiles';

class EditSpecialDebt extends React.Component {
  changeTab = (activeKey) => {
    this.props.dispatch({
      type: 'editSpecialDebt/rUpdateState',
      payload: { activeKey },
    });
  };
  showUpload = () => {
    this.props.dispatch({
      type: 'editSpecialDebt/rUpdateState',
      payload: { uploadVisible: true },
    });
  };

  render() {
    const { match, activeKey, routesInfo } = this.props;
    return (
      <React.Fragment>
        <div className="headerWrapperWithCreate">
          <Breadcrumb>
            {routesInfo.map((item, index) => {
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
          {activeKey === 'EditSpecialDebtFiles' && <Button type="link" onClick={this.showUpload}>上传文件</Button>}
        </div>
        <div className="contentWrapper">
          <Tabs activeKey={activeKey} onChange={this.changeTab}>
            <Tabs.TabPane tab="项目信息" key="EditSpecialDebtInfo">
              <EditSpecialDebtInfo/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="项目文件" key="EditSpecialDebtFiles">
              <EditSpecialDebtFiles/>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </React.Fragment>);
  }
}


export default connect(({ loading, common, editSpecialDebt }) => ({
  activeKey: editSpecialDebt.activeKey,
  routesInfo: editSpecialDebt.routesInfo,
}))(EditSpecialDebt);
