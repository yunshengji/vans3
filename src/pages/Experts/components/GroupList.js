import React from 'react';
import { connect } from 'dva';
import { Button, Table, Pagination, Tag, Row, Col, Form, Input, Modal, Icon, Tooltip } from 'antd';
import Cookies from 'js-cookie';
import { prefix } from '../../../../config/api';
import CreateProject from '@/pages/Experts/components/CreateGroup';
import EditProject from '@/pages/Experts/components/EditGroup';
import ChooseGroupProperty from '@/pages/Experts/components/ChooseGroupProperty';
import ChooseGroupExpertProperty from '@/pages/Experts/components/ChooseGroupExpertProperty';

class GroupList extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'experts/eLoadProjects' });
  }

  searchProjectList = e => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { searchProjectParams: { ...values }, staffs: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'experts/eLoadProjects' });
    e.preventDefault();
  };
  resetSearch = e => {
    this.props.form.setFieldsValue({ name: undefined });
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { searchProjectParams: { ...values }, staffs: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'experts/eLoadProjects' });
    e.preventDefault();
  };
  showExpertProfile = (record) => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: {
        expertProfileVisible: true,
        expertProfile: { ...record },
      },
    });
  };
  expandedRowRender = (record, index) => {
    const expertList = record['expert_list'];
    return (
      <Table size="middle" dataSource={expertList} pagination={false} rowKey={record => record.id}>
        <Table.Column title="专家姓名" dataIndex="name" render={(text, record) => (
          <a onClick={() => this.showExpertProfile(record)}>{text}</a>
        )}/>
        <Table.Column title="采购证号" dataIndex="procurement_num"/>
        <Table.Column title="发改证号" dataIndex="law_num"/>
        <Table.Column title="电话号码" dataIndex="phone" render={(text, record) => (
          <div style={{ whiteSpace: 'pre' }}>
            {record['phone_inner'] && <div>{record['phone_inner']}</div>}
          </div>
        )}/>
        <Table.Column title="操作" dataIndex="operation" render={(text, record) => (
          <Button type="link" onClick={() => this.showChooseRandomExpert(record, index)}>
            更换
          </Button>
        )}/>

      </Table>
    );
  };
  showChooseRandomExpert = (record, index) => {
    const { dispatch, projects } = this.props;
    const { expert_list, id, roll_type } = projects[index];
    dispatch({
      type: 'experts/rUpdateState',
      payload: {
        chooseNewExpertVisible: true,
        chooseNewExpertProjectId: id,
        chooseNewExpertProjectType: roll_type,
        exitsExpertList: expert_list,
        chooseNewExpertDetail: record,
      },
    });
  };
  deleteProject = ({ id, name }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此抽取的专家组',
      content: <p>确认删除记录表 : <b>{name}</b> ?</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'experts/eDeleteProject', id });
      },
    });
  };
  showEditProject = (record) => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: {
        editProjectVisible: true,
        editProject: { ...record },
      },
    });
  };
  showChooseExpertsNum = ({ id, roll_type }) => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: {
        chooseExpertsNumVisible: true,
        chooseExpertsNumProjectId: id,
        chooseExpertsNumProjectCategory: roll_type,
      },
    });
  };
  exportResult = ({ id }) => {
    const token = Cookies.get('token');
    window.open(`${prefix}/roll/export/${id}?token=${token}`, '_blank');
  };
  projectsListPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'experts/eLoadProjects',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form: { getFieldDecorator }, fetchingProjectsList, editingProject, deletingProject, removingExpertFromProject, searchProjectParams, total, current, pageSize, projects } = this.props;
    return (
      <React.Fragment>
        <CreateProject/>
        <EditProject/>
        <ChooseGroupProperty/>
        <ChooseGroupExpertProperty/>
        <h3>评审搜索</h3>
        <Form layout="horizontal" className="searchWrapper">
          <Row gutter={[80]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="记录表名称">
                {getFieldDecorator('name', { initialValue: searchProjectParams['name'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <div className="searchButtons">
                <Button type="primary" onClick={this.searchProjectList}>搜索</Button>
                <Button style={{ marginLeft: '1em' }} onClick={this.resetSearch}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <h3>评审列表</h3>
        <Table tableLayout="fixed" size="middle" pagination={false} dataSource={projects} rowKey={record => record.id}
               expandedRowRender={this.expandedRowRender}
               loading={fetchingProjectsList || editingProject || deletingProject || removingExpertFromProject}>
          <Table.Column title="记录表名称" dataIndex="name"/>
          <Table.Column title="项目编号" dataIndex="project_num"/>
          <Table.Column title="项目名称" dataIndex="project_name"/>
          <Table.Column title="专家组状态" dataIndex="expert_list" render={expertList => (
            <React.Fragment>
              {expertList.length > 0 ? <Tag color="green">已生成</Tag> : <Tag color="orange">未生成</Tag>}
            </React.Fragment>
          )}/>
          <Table.Column title="操作" dataIndex="action"
                        render={(text, record) => (
                          <div className="actionGroup">
                            <Button type="link" icon="edit"
                                    onClick={() => this.showEditProject(record)}>
                              修改
                            </Button>
                            <Button type="link" icon="delete" className="redButton"
                                    onClick={() => this.deleteProject(record)}>
                              删除
                            </Button>
                            {
                              record['expert_list'].length === 0 ?
                                <Tooltip placement="topLeft" title="生成随机评审成员" arrowPointAtCenter>
                                  <Button shape="circle" type="primary"
                                          onClick={() => this.showChooseExpertsNum(record)}>
                                    <Icon type="deployment-unit"/>
                                  </Button>
                                </Tooltip>
                                :
                                <Button type="link" icon="cloud-download" onClick={() => this.exportResult(record)}>
                                  导出结果
                                </Button>
                            }
                          </div>
                        )}/>
        </Table>
        <div className="paginationWrapper">
          <Pagination showQuickJumper total={total} current={current} pageSize={pageSize}
                      showTotal={() => `共 ${total} 条`}
                      onChange={this.projectsListPaginationChange}/>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'ProjectsList' })(GroupList);

export default connect(({ loading, common, experts }) => ({
  fetchingProjectsList: loading.effects['experts/eLoadProjects'],
  editingProject: loading.effects['experts/eEditProject'],
  deletingProject: loading.effects['experts/eDeleteProject'],
  removingExpertFromProject: loading.effects['experts/eRemoveExpertFromProject'],
  searchProjectParams: experts.searchProjectParams,
  total: experts.projectsList.total,
  current: experts.projectsList.current,
  pageSize: experts.projectsList.pageSize,
  projects: experts.projectsList.list,
}))(WrappedForm);
