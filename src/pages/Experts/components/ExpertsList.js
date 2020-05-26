import React from 'react';
import { connect } from 'dva';
import { Button, Table, Pagination, Tag, Row, Col, Form, Input, Modal } from 'antd';
import CreateExpert from '@/pages/Experts/components/CreateExpert';
import EditExpert from '@/pages/Experts/components/EditExpert';

class ExpertsList extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'experts/eReloadExpertsList' });
  }

  showEditExpert = (record) => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: {
        editExpertVisible: true,
        editExpert: { ...record },
      },
    });
  };
  deleteExpert = ({ id, name }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此专家信息',
      content: `若专家 ${name} 有关联的评审项目，将导致删除失败`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'experts/eDeleteExpert', id });
      },
    });
  };
  expertsListPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'experts/eGetExpertsList',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingExpertsList, editingExpert, deletingExpert, level, total, current, pageSize, experts } = this.props;
    return (
      <React.Fragment>
        <CreateExpert/>
        <EditExpert/>
        <h3>查找专家</h3>
        <Form layout="horizontal" className="searchWrapper">
          <Row gutter={[80]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="姓名"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="采购证号"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="法改证号"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="手机号码"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <div className="searchButtons">
                <Button type="primary">搜索</Button>
                <Button style={{ marginLeft: '1em' }}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <h3>专家列表</h3>
        <Table tableLayout="fixed" size="middle" pagination={false} dataSource={experts}
               rowClassName={(record, index) => {
                 if (index % 2 === 1) {
                   return 'zebraHighlight';
                 }
               }}
               loading={fetchingExpertsList || editingExpert || deletingExpert} rowKey={record => record.id}>
          <Table.Column title="姓名" dataIndex="name"/>
          <Table.Column title="采购证号" dataIndex="procurement_num"/>
          <Table.Column title="法改证号" dataIndex="law_num"/>
          <Table.Column title="电话号码" render={(text, record) => (
            <React.Fragment>
              {record['phone_inner'] && <div>库内：{record['phone_inner']}</div>}
              {record['phone_outer'] && <div>库外：{record['phone_outer']}</div>}
            </React.Fragment>
          )}/>
          <Table.Column title="状态" dataIndex="alive" render={(text, record) => (
            <React.Fragment>
              {text ? <Tag color="green">正常</Tag> : <Tag color="orange">不可用</Tag>}
            </React.Fragment>
          )}/>
          <Table.Column title="操作" dataIndex="action"
                        render={(text, record) => (
                          <div className="actionGroup">
                            <Button type="link" icon="edit"
                                    onClick={() => {
                                      this.showEditExpert(record);
                                    }}>
                              修改
                            </Button>
                            <Button type="link" icon="delete" className="redButton"
                                    onClick={() => {
                                      this.deleteExpert(record);
                                    }}>
                              删除
                            </Button>
                          </div>
                        )}/>
        </Table>
        <div className="paginationWrapper">
          <Pagination showQuickJumper total={total} current={current} pageSize={pageSize}
                      showTotal={() => `共 ${total} 条`}
                      onChange={this.expertsListPaginationChange}/>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, experts }) => ({
  fetchingExpertsList: loading.effects['experts/eGetExpertsList'],
  editingExpert: loading.effects['experts/eEditExpert'],
  deletingExpert: loading.effects['experts/eDeleteExpert'],
  level: common.mine.level,
  total: experts.expertsList.total,
  current: experts.expertsList.current,
  pageSize: experts.expertsList.pageSize,
  experts: experts.expertsList.list,
}))(ExpertsList);
