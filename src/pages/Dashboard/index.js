import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Button, Table } from 'antd';
import PageHeader from '@/pages/Dashboard/PageHeader';
import styles from './index.less';

const { Column } = Table;

class Dashboard extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'dashboard/eGetProjectsData' });
  }

  render() {
    const { fetchingProjectsData, projectsList, projectsListPagination } = this.props;
    return (
      <div className={styles.root}>
        <PageHeader/>
        <div className={styles.content}>
          <Row gutter={[20]}>
            <Col sm={24} md={17} lg={17} xl={17}>
              <div className={styles.leftContainer}>
                <div className={styles.createProject}>
                  <Button type="primary">
                    <Link to="">
                      新建项目
                    </Link>
                  </Button>
                </div>
                <Table rowKey={record => record.name} dataSource={projectsList} loading={fetchingProjectsData}
                       pagination={projectsListPagination}>
                  <Column title="项目名" dataIndex="name"/>
                  <Column title="负责人" dataIndex="principal"/>
                  <Column title="创建日期" dataIndex="created_at"/>
                  <Column title="最近修改" dataIndex="updated_at"/>
                  <Column title="项目类型" dataIndex="type"/>
                  <Column title="优先级" dataIndex="priority"/>
                </Table>
              </div>
            </Col>
            <Col sm={24} md={7} lg={7} xl={7}>
              <div className={styles.rightContainer}>
                COL
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default connect(({ loading, dashboard }) => ({
  fetchingProjectsData: loading.effects['dashboard/eGetProjectsData'],
  projectsList: dashboard.projectsData.list,
  projectsListPagination: dashboard.projectsData.pagination,
}))(Dashboard);
