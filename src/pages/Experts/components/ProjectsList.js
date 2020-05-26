import React from 'react';
import { connect } from 'dva';
import { Button, Table, Pagination, Tag, Row, Col, Form, Input, Modal, Icon } from 'antd';
import CreateProject from '@/pages/Experts/components/CreateProject';
import EditProject from '@/pages/Experts/components/EditProject';
import ChooseExpertsNumber from '@/pages/Experts/components/ChooseExpertsNumber';

class ProjectsList extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'experts/eReloadProjectsList' });
  }

  expandedRowRender = (record, index) => {
    const expertList = record['expert_list'];
    return (
      <Table size="middle" dataSource={expertList} pagination={false} rowKey={record => record.id}>
        <Table.Column title="专家姓名" dataIndex="name"/>
        <Table.Column title="采购证号" dataIndex="procurement_num"/>
        <Table.Column title="法改证号" dataIndex="law_num"/>
        <Table.Column title="电话号码" dataIndex="phone" render={(text, record) => (
          <React.Fragment>
            {record['phone_inner'] && <div>库内：{record['phone_inner']}</div>}
            {record['phone_outer'] && <div>库外：{record['phone_outer']}</div>}
          </React.Fragment>
        )}/>
        <Table.Column title="操作" dataIndex="operation" render={(text, record) => (
          <Button type="link" icon="delete" className="redButton"
                  onClick={() => {
                    this.removeRandomExpert(record, index);
                  }}/>
        )}/>

      </Table>
    );
  };
  removeRandomExpert = (record, index) => {
    const { dispatch, projects } = this.props;
    const project = projects[index];
    const { expert_list: expertsList, id } = project;
    Modal.confirm({
      title: '确定移除此评审专家',
      content: <p>确认移除此项目的评审专家 : <b>{record.name}</b> ?</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'experts/eRemoveExpertFromProject',
          payload: { id, expertsList, record },
        });
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
  showChooseExpertsNum = ({ id }) => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: {
        chooseExpertsNumVisible: true,
        chooseExpertsNumProjectId: id,
      },
    });
  };
  projectsListPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'experts/eGetProjectsList',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingProjectsList, editingProject, deletingProject, removingExpertFromProject, level, total, current, pageSize, projects } = this.props;
    return (
      <React.Fragment>
        <CreateProject/>
        <EditProject/>
        <ChooseExpertsNumber/>
        <h3>查找项目</h3>
        <Form layout="horizontal" className="searchWrapper">
          <Row gutter={[80]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="记录表名称"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="项目编号"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="项目名称"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <div className="searchButtons">
                <Button type="primary">搜索</Button>
                <Button style={{ marginLeft: '1em' }}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <h3>项目列表</h3>
        <Table tableLayout="fixed" size="middle" pagination={false} dataSource={projects} rowKey={record => record.id}
               expandedRowRender={this.expandedRowRender}
               rowClassName={(record, index) => {
                 if (index % 2 === 1) {
                   return 'zebraHighlight';
                 }
               }}
               loading={fetchingProjectsList || editingProject || deletingProject || removingExpertFromProject}>
          <Table.Column title="记录表名称" dataIndex="name"/>
          <Table.Column title="项目编号" dataIndex="project_num"/>
          <Table.Column title="项目名称" dataIndex="project_name"/>
          <Table.Column title="专家组状态" dataIndex="expert_list" render={(expertList, record) => (
            <React.Fragment>
              {expertList.length > 0 ? <Tag color="green">已生成</Tag> : <Tag color="orange">未生成</Tag>}
            </React.Fragment>
          )}/>
          <Table.Column title="操作" dataIndex="action"
                        render={(text, record) => (
                          <div className="actionGroup">
                            <Button type="link"
                                    onClick={() => {
                                      this.showEditProject(record);
                                    }}>
                              修改
                            </Button>
                            <Button type="link" className="redButton"
                                    onClick={() => {
                                      this.deleteProject(record);
                                    }}>
                              删除
                            </Button>
                            {record['expert_list'].length === 0 ?
                              <Button shape="circle" onClick={() => {
                                this.showChooseExpertsNum(record);
                              }}>
                                <Icon type="smile" theme="twoTone"/>
                              </Button> : null}
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

export default connect(({ loading, common, experts }) => ({
  fetchingProjectsList: loading.effects['experts/eGetProjectsList'],
  editingProject: loading.effects['experts/eEditProject'],
  deletingProject: loading.effects['experts/eDeleteProject'],
  removingExpertFromProject: loading.effects['experts/eRemoveExpertFromProject'],
  level: common.mine.level,
  total: experts.projectsList.total,
  current: experts.projectsList.current,
  pageSize: experts.projectsList.pageSize,
  projects: experts.projectsList.list,
}))(ProjectsList);
