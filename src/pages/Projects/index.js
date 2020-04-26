import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Button, Table, Tabs, Select, Input, Rate, Form, Pagination } from 'antd';
import PageHeader from '@/pages/Projects/components/PageHeader';
import styles from './index.less';

const { Column } = Table;
const { Option } = Select;

class Projects extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'projects/eGetProjectsData' });
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
    return (
      <div className={styles.root}>
        <PageHeader/>
        <div className={styles.contentWrapper}>
          <Row>
            <h3>项目筛选</h3>
            <Form layout="horizontal">
              <Row gutter={[80]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目名称">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="负责人">
                    <Select mode="multiple" placeholder="请选择">
                      <Option key="a">王玉成</Option>
                      <Option key="b">汪宇晨</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目所在地">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目类型">
                    <Select mode="multiple" placeholder="请选择">
                      <Option key="a">PPP</Option>
                      <Option key="b">专项债</Option>
                      <Option key="c">十四五规划</Option>
                      <Option key="d">中期评估项目</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="所属行业">
                    <Select mode="multiple" placeholder="请选择">
                      <Option key="a">水利</Option>
                      <Option key="b">高标准农田</Option>
                      <Option key="c">园区开发</Option>
                      <Option key="d">市政</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="项目状态">
                    <Select placeholder="请选择">
                      <Option key="a">未审批</Option>
                      <Option key="b">进行中</Option>
                      <Option key="c">被驳回</Option>
                      <Option key="d">失败</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col className={styles.searchContainer}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button style={{ marginLeft: 8 }}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
          <Row>
            <h3 style={{ marginBottom: '2em' }}>项目列表</h3>
            <div className={styles.content}>
              <Table dataSource={projectsList} loading={fetchingProjectsData} pagination={false}
                     rowKey={record => record.name}>
                <Column title="项目名称" dataIndex="name"/>
                <Column title="负责人" dataIndex="principal"/>
                <Column title="项目所在地" dataIndex="principal"/>
                <Column title="项目类型" dataIndex="type"/>
                <Column title="所属行业" dataIndex="type"/>
                <Column title="优先级" dataIndex="priority"
                        render={priority => (<Rate disabled defaultValue={priority}/>)}/>
                <Column title="创建日期" dataIndex="created_at"/>
                <Column title="最近修改" dataIndex="updated_at"/>
                <Column title="操作" dataIndex="action"
                        render={(text, record) => (
                          <div className="actionGroup">
                            <Button type="link" icon="edit">
                              <Link to={`/projects/edit/${record.name}`}>编辑</Link>
                            </Button>
                            <Button type="link" icon="delete" className="redButton">删除</Button>
                          </div>
                        )}/>
              </Table>
              <div className="paginationWrapper">
                <Pagination showQuickJumper defaultCurrent={1} total={projectsListPagination.total}
                            current={projectsListPagination.current} pageSize={projectsListPagination.pageSize}
                            showTotal={() => `共 ${projectsListPagination.total} 条`}
                            onChange={this.projectsPaginationChange}/>
              </div>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}


export default connect(({ loading, projects }) => ({
  fetchingProjectsData: loading.effects['projects/eGetProjectsData'],
  projectsList: projects.projectsData.list,
  projectsListPagination: projects.projectsData.pagination,
}))(Projects);
