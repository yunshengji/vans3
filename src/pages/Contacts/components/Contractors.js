import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Form, Input, Pagination, Modal } from 'antd';

class Contractors extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'contactsList/eLoadContractors' });
  }

  searchContractorList = e => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { searchParamsContractor: { ...values }, contractors: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'contactsList/eLoadContractors' });
    e.preventDefault();
  };
  resetSearch = e => {
    this.props.form.setFieldsValue({
      name: undefined,
      company: undefined,
    });
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { searchParamsContractor: { ...values }, contractors: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'contactsList/eLoadContractors' });
    e.preventDefault();
  };
  showEditForm = (record) => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        editContractorModalVisible: true,
        editContractorForm: { ...record },
      },
    });
  };

  deleteContractor = ({ id, name }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此合作伙伴信息', content: `若合作伙伴 ${name} 有关联的项目，将导致删除失败`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'contactsList/eDeleteContractor', id });
      },
    });
  };
  contractorsPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'contactsList/eLoadContractors',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form: { getFieldDecorator }, fetchingContractors, deletingContractor, searchParamsContractor, total, current, pageSize, contractorsList } = this.props;
    return (
      <React.Fragment>
        <h3>合作伙伴搜索</h3>
        <Form layout="horizontal" className="searchWrapper">
          <Row gutter={[80]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="姓名">
                {getFieldDecorator('name', { initialValue: searchParamsContractor['name'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="公司名称">
                {getFieldDecorator('company', { initialValue: searchParamsContractor['company'] })(
                  <Input placeholder="请输入"/>,
                )}
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <div className="searchButtons">
                <Button type="primary" onClick={this.searchContractorList}>搜索</Button>
                <Button style={{ marginLeft: '1em' }} onClick={this.resetSearch}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <h3 style={{ marginBottom: '2em' }}>合作伙伴列表</h3>
        <Table size="middle" tableLayout="fixed" pagination={false} dataSource={contractorsList}
               loading={fetchingContractors || deletingContractor} rowKey={record => record.id}>
          <Table.Column title="姓名" dataIndex="name"/>
          <Table.Column title="性别" dataIndex="gender"
                        render={(text) => (<span>{text === 'male' ? '男' : '女'}</span>)}/>
          <Table.Column title="公司及职务" dataIndex="companyAndJob"
                        render={(text, record) => (
                          <React.Fragment>
                            <span>{record['company']} </span>
                            <span>{record['job_title']}</span>
                          </React.Fragment>
                        )}/>
          <Table.Column title="手机号码" dataIndex="phone"/>
          <Table.Column title="微信" dataIndex="wx"/>
          <Table.Column title="邮箱" dataIndex="email"/>
          <Table.Column title="操作" dataIndex="action"
                        render={(text, record) => (
                          <div className="actionGroup">
                            <Button type="link" icon="edit"
                                    onClick={() => this.showEditForm(record)}>
                              修改
                            </Button>
                            <Button type="link" icon="delete" className="redButton"
                                    onClick={() => this.deleteContractor(record)}>
                              删除
                            </Button>
                          </div>
                        )}/>
        </Table>
        <div className="paginationWrapper">
          <Pagination showQuickJumper defaultCurrent={1} total={total} current={current} pageSize={pageSize}
                      showTotal={() => `共 ${total} 条`} onChange={this.contractorsPaginationChange}/>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'Contractors' })(Contractors);

export default connect(({ loading, common, contactsList }) => ({
  fetchingContractors: loading.effects['contactsList/eLoadContractors'],
  deletingContractor: loading.effects['contactsList/eDeleteContractor'],
  mine: common.mine,
  searchParamsContractor: contactsList.searchParamsContractor,
  total: contactsList.contractors.total,
  current: contactsList.contractors.current,
  pageSize: contactsList.contractors.pageSize,
  contractorsList: contactsList.contractors.list,
}))(WrappedForm);
