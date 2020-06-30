import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Breadcrumb, Button, Tabs } from 'antd';
import ExpertsList from '@/pages/Experts/components/ExpertList';
import ProjectsList from '@/pages/Experts/components/ProjectList';
import ExpertProfile from '@/pages/Experts/components/ExpertProfile';

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
    const { activeKey, routes } = this.props;
    return (
      <React.Fragment>
        <div className="headerWrapperWithCreate">
          <Breadcrumb>
            {routes[activeKey].map((item, index) => {
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
          <Button icon="plus-circle" onClick={this.showCreateProject}>
            新建评审
          </Button>
          }
          {activeKey === 'expertsLibrary' &&
          <Button icon="plus-circle" onClick={this.showCreateExpert}>
            新建专家
          </Button>
          }
        </div>
        <div className="contentWrapper">
          <ExpertProfile/>
          <Tabs activeKey={activeKey} onChange={this.changeTab}>
            <Tabs.TabPane tab="评审组" key="resultsLibrary">
              <ProjectsList/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="专家库" key="expertsLibrary">
              <ExpertsList/>
            </Tabs.TabPane>
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
