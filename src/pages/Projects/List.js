import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Button, Table, Select, Input, Rate, Form, Pagination, Modal, message, Breadcrumb, List } from 'antd';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;

class Projects extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'projectsList/eGetProjects' });
  }

  showCreateProjectModal = () => {
    this.props.dispatch({
      type: 'projectsList/rUpdateState',
      payload: { createModalVisible: true },
    });
  };
  cancelCreateProjectModal = () => {
    this.props.dispatch({
      type: 'projectsList/rUpdateState',
      payload: { createModalVisible: false },
    });
  };
  showDeleteConfirm = ({ name, principal }) => {
    confirm({
      title: '确定删除此项目',
      content: `${principal}负责的项目"${name}"`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('删除成功');
      },
    });
  };
  projectsPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'projectsList/eGetProjects',
      payload: { page, pageSize },
    });
  };

  render() {
    const {
      breadcrumbs,
      fetchingProjectsData,
      createModalVisible,
      projectsList,
      projectsListPagination,
    } = this.props;
    return (
      <React.Fragment>
        <div className="headerWrapperWithCreate">
          <Breadcrumb>
            {breadcrumbs.map((item, index) => {
              const { path, breadcrumbName } = item;
              return (path ?
                  <Breadcrumb.Item key={index}>
                    <Link to={path}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                  :
                  <Breadcrumb.Item key={index}>
                    <span>{breadcrumbName}</span>
                  </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
          <Button type="primary" size="small" onClick={this.showCreateProjectModal}>
            新建项目
          </Button>
          <Modal footer={null} title="选择项目模板" visible={createModalVisible} onCancel={this.cancelCreateProjectModal}>
            <List>
              <List.Item>
                <Link to="/projects/create/specialDebt" onClick={this.cancelCreateProjectModal}>专项债模板</Link>
              </List.Item>
              <List.Item>
                <Link to="/createPPP" onClick={this.cancelCreateProjectModal}>PPP模板</Link>
              </List.Item>
              <List.Item>
                <Link to="/createshisi" onClick={this.cancelCreateProjectModal}>十四五规划模板</Link>
              </List.Item>
              <List.Item>
                <Link to="/zhongqi" onClick={this.cancelCreateProjectModal}>中期评估项目</Link>
              </List.Item>
            </List>
          </Modal>
        </div>
        <div className="contentWrapper">
          <h3>项目筛选</h3>
          <Row>
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
                <Col className="searchWrapper">
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
          <h3 style={{ marginBottom: '1.5em' }}>项目列表</h3>
          <Table dataSource={projectsList} size="middle" loading={fetchingProjectsData} pagination={false}
                 rowKey={record => record.name}>
            <Column title="项目名称" dataIndex="name"/>
            <Column title="负责人" dataIndex="principal"/>
            <Column title="项目所在地" dataIndex="area"/>
            <Column title="项目类型" dataIndex="type"/>
            <Column title="所属行业" dataIndex="industry"/>
            <Column title="优先级" dataIndex="priority"
                    render={priority => (<Rate disabled count={3} defaultValue={priority}/>)}/>
            <Column title="创建日期" dataIndex="created_at"/>
            <Column title="最近修改" dataIndex="updated_at"/>
            <Column title="操作" dataIndex="action"
                    render={(text, record) => (
                      <div className="actionGroup">
                        <Button type="link" icon="edit">
                          <Link to={`/projects/edit/${record.name}`}>编辑</Link>
                        </Button>
                        <Button type="link" icon="delete" className="redButton"
                                onClick={() => {
                                  this.showDeleteConfirm(record);
                                }}>
                          删除
                        </Button>
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
      </React.Fragment>
    );
  }
}


export default connect(({ loading, projectsList }) => ({
  fetchingProjectsData: loading.effects['projectsList/eGetProjects'],
  breadcrumbs: projectsList.breadcrumbs,
  createModalVisible: projectsList.createModalVisible,
  projectsList: projectsList.projects.list,
  projectsListPagination: projectsList.projects.pagination,
}))(Projects);
