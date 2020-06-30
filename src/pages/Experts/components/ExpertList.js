import React from 'react';
import { connect } from 'dva';
import { Button, Table, Pagination, Tag, Row, Col, Form, Input, Modal, Select } from 'antd';
import CreateExpert from '@/pages/Experts/components/CreateExpert';
import EditExpert from '@/pages/Experts/components/EditExpert';

class ExpertList extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'experts/eLoadExperts' });
  }

  searchExpertList = e => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { searchExpertParams: { ...values }, expertsList: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'experts/eLoadExperts' });
    e.preventDefault();
  };
  resetSearch = e => {
    this.props.form.setFieldsValue({
      name: undefined,
      procurement_num: undefined,
      procurement_category: undefined,
      law_num: undefined,
      law_category: undefined,
    });
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { searchExpertParams: { ...values }, expertsList: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'experts/eLoadExperts' });
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
      type: 'experts/eLoadExperts',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form: { getFieldDecorator }, fetchingExpertsList, editingExpert, deletingExpert, searchExpertParams, total, current, pageSize, experts } = this.props;
    return (
      <React.Fragment>
        <CreateExpert/>
        <EditExpert/>
        <h3>专家搜索</h3>
        <Form layout="horizontal" className="searchWrapper">
          <Row gutter={[80]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="姓名">
                {getFieldDecorator('name', { initialValue: searchExpertParams['name'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="政府采购专家证号">
                {getFieldDecorator('procurement_num', { initialValue: searchExpertParams['procurement_num'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="政府采购评审专业类别">
                {getFieldDecorator('procurement_category', { initialValue: searchExpertParams['procurement_category'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="四川省评标专家证号">
                {getFieldDecorator('law_num', { initialValue: searchExpertParams['law_num'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="四川省评标专家评审类别">
                {getFieldDecorator('law_category', { initialValue: searchExpertParams['law_category'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <div className="searchButtons">
                <Button type="primary" onClick={this.searchExpertList}>搜索</Button>
                <Button style={{ marginLeft: '1em' }} onClick={this.resetSearch}>重置</Button>
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
          <Table.Column title="姓名" dataIndex="name" render={(text, record) => (
            <a onClick={() => this.showExpertProfile(record)}>{text}</a>
          )}/>
          <Table.Column title="政府采购专家证号" dataIndex="procurement_num"/>
          <Table.Column title="四川省评标专家证号" dataIndex="law_num"/>
          <Table.Column title="电话号码" dataIndex="phone_inner" render={(text, record) => (
            <div style={{ whiteSpace: 'pre' }}>{record['phone_inner']}</div>
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
                                    onClick={() => this.showEditExpert(record)}>
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

const WrappedForm = Form.create({ name: 'ExpertsList' })(ExpertList);

export default connect(({ loading, common, experts }) => ({
  fetchingExpertsList: loading.effects['experts/eLoadExperts'],
  editingExpert: loading.effects['experts/eEditExpert'],
  deletingExpert: loading.effects['experts/eDeleteExpert'],
  searchExpertParams: experts.searchExpertParams,
  total: experts.expertsList.total,
  current: experts.expertsList.current,
  pageSize: experts.expertsList.pageSize,
  experts: experts.expertsList.list,
}))(WrappedForm);
