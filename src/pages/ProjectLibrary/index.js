import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Button, Table, Tabs, Icon, Timeline, Skeleton, Input, Rate } from 'antd';
import PageHeader from '@/pages/ProjectLibrary/components/PageHeader';
import styles from './index.less';

const { Column } = Table;
const { TabPane } = Tabs;
const { TextArea } = Input;

class ProjectLibrary extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'dashboard/eGetProjectsData' });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  projectsPaginationChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboard/eGetProjectsData',
      payload: { page, pageSize },
    });
  };


  render() {
    const { fetchingProjectsData, projectsList, projectsListPagination } = this.props;
    const paginationProps = {
      showQuickJumper: true,
      showTotal: () => `共 ${projectsListPagination.total} 条`,
      defaultCurrent: 1,
      total: projectsListPagination.total,
      current: projectsListPagination.current,
      pageSize: projectsListPagination.pageSize,
      onChange: (page, pageSize) => this.projectsPaginationChange(page, pageSize),
    };
    return (
      <div className={styles.root}>
        <PageHeader/>
        <div className={styles.content}>
          <Row gutter={[20]}>
            <Col md={24} lg={17}>
              <div className={styles.leftContainer}>
                <div className={styles.createProject}>
                  <Button type="primary">
                    <Link to="">
                      新建项目
                    </Link>
                  </Button>
                </div>
                <Table rowKey={record => record.name} dataSource={projectsList} loading={fetchingProjectsData}
                       pagination={paginationProps}>
                  <Column title="项目名" dataIndex="name"/>
                  <Column title="负责人" dataIndex="principal"/>
                  <Column title="创建日期" dataIndex="created_at"/>
                  <Column title="最近修改" dataIndex="updated_at"/>
                  <Column title="项目类型" dataIndex="type"/>
                  <Column title="优先级" dataIndex="priority"
                          render={priority => (<Rate disabled defaultValue={priority}/>)}/>
                </Table>
              </div>
            </Col>
            <Col md={24} lg={7}>
              <div className={styles.rightContainer}>
                <Tabs animated={false} defaultActiveKey="1">
                  <TabPane tab={<span><Icon type="eye"/>动态</span>} key="1">
                    <div className={styles.tab}>
                      <Skeleton loading={this.state.loading} active>
                        <Timeline>
                          <Timeline.Item>Create a services services site 2015-09-01</Timeline.Item>
                          <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                          <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                        </Timeline>
                      </Skeleton>
                    </div>
                  </TabPane>
                  <TabPane tab={<span><Icon type="schedule"/>日志</span>} key="2">
                    <div className={styles.tab}>
                      <TextArea autoSize={{ minRows: 4, maxRows: 10 }} placeholder="出差描述"/>
                      <Button type="primary" block className={styles.dialogSubmit}>提交</Button>
                    </div>
                  </TabPane>
                </Tabs>
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
}))(ProjectLibrary);
