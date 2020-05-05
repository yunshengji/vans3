import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Form, Input, Pagination, Select, Modal } from 'antd';
import moment from 'moment';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;

class Contractors extends React.Component {

  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'contactsList/eGetContractors',
      payload: { page: current, page_size: pageSize },
    });
  }

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
    confirm({
      title: '确定删除此客户信息', content: `若客户 ${name} 有关联的项目，将导致删除失败`,
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
      type: 'contactsList/eGetContractors',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingContractors, deletingContractor, total, current, pageSize, contractorsList } = this.props;
    return (
      <React.Fragment>
        <h3 style={{ marginTop: '1em' }}>查找合作伙伴</h3>
        <Form layout="horizontal">
          <Row gutter={[80]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="姓名">
                <Input placeholder="请输入"/>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="性别">
                <Select placeholder="请选择">
                  <Option key="male" value="male">男</Option>
                  <Option key="female" value="female">女</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="公司">
                <Input placeholder="请输入"/>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="职务">
                <Input placeholder="请输入"/>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="手机号码">
                <Input placeholder="请输入"/>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="微信">
                <Input placeholder="请输入"/>
              </Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="邮箱">
                <Input placeholder="请输入"/>
              </Form.Item>
            </Col>
          </Row>
          <div className="searchWrapper">
            <Button type="primary">搜索</Button>
            <Button style={{ marginLeft: '1em' }}>重置</Button>
          </div>
        </Form>
        <h3 style={{ marginBottom: '2em' }}>合作伙伴列表</h3>
        <Table size="middle" tableLayout="fixed" pagination={false} dataSource={contractorsList}
               loading={fetchingContractors || deletingContractor} rowKey={record => record.id}>
          <Column title="姓名" dataIndex="name"/>
          <Column title="性别" dataIndex="gender"
                  render={(text) => (<span>{text === 'male' ? '男' : '女'}</span>)}/>
          <Column title="公司及职务" dataIndex="companyAndJob"
                  render={(text, record) => (
                    <React.Fragment>
                      <span>{record['company']} </span>
                      <span>{record['job_title']}</span>
                    </React.Fragment>
                  )}/>
          <Column title="手机号码" dataIndex="phone"/>
          <Column title="微信" dataIndex="wx"/>
          <Column title="邮箱" dataIndex="email"/>
          <Column title="创建日期" dataIndex="created_at" sorter={(a, b) => a['created_at'] - b['created_at']}
                  render={(text) => (<span>{moment(1000 * text).format('YYYY-MM-DD')}</span>)}/>
          <Column title="操作" dataIndex="action"
                  render={(text, record) => (
                    <div className="actionGroup">
                      <Button type="link" icon="edit"
                              onClick={() => {
                                this.showEditForm(record);
                              }}>
                        修改
                      </Button>
                      <Button type="link" icon="delete" className="redButton"
                              onClick={() => {
                                this.deleteContractor(record);
                              }}>
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

export default connect(({ loading, contactsList }) => ({
  fetchingContractors: loading.effects['contactsList/eGetContractors'],
  deletingContractor: loading.effects['contactsList/eDeleteContractor'],
  total: contactsList.contractors.total,
  current: contactsList.contractors.current,
  pageSize: contactsList.contractors.pageSize,
  contractorsList: contactsList.contractors.list,
}))(Contractors);
