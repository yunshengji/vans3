import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Breadcrumb, Button, Tabs } from 'antd';
import ExpertsList from '@/pages/Experts/components/ExpertsList';
import ProjectsList from '@/pages/Experts/components/ProjectsList';

const { TabPane } = Tabs;

class Experts extends React.Component {
  changeTab = (activeKey) => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { activeKey },
    });
  };
  showCreateExpert = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { createExpertVisible: true },
    });
  };
  showCreateProject = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { createProjectVisible: true },
    });
  };

  render() {
    let { activeKey, routes } = this.props;
    routes = routes[activeKey];
    return (
      <React.Fragment>
        <div className="headerWrapperWithCreate">
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
          {activeKey === 'resultsLibrary' &&
          <Button size="small" type="link" onClick={this.showCreateProject}>
            新建项目
          </Button>
          }
          {activeKey === 'expertsLibrary' &&
          <Button size="small" type="link" onClick={this.showCreateExpert}>
            新建专家
          </Button>
          }
        </div>
        <div className="contentWrapper">
          <Tabs activeKey={activeKey} onChange={this.changeTab}>
            <TabPane tab="抽取结果" key="resultsLibrary">
              <ProjectsList/>
            </TabPane>
            <TabPane tab="专家库" key="expertsLibrary">
              <ExpertsList/>
            </TabPane>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, experts }) => ({
  activeKey: experts.activeKey,
  routes: experts.routes,
}))(Experts);
