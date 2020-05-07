import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Form, Input, Pagination, Select, Modal, Tag, Switch } from 'antd';
import moment from 'moment';
import CustomerProfileModal from './CustomerProfileModal';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;

class Customers extends React.Component {

  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'contactsList/eGetCustomers',
      payload: { page: current, page_size: pageSize },
    });
  }

  showEditForm = (record) => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        editCustomerModalVisible: true,
        editCustomerForm: { ...record },
      },
    });
  };

  deleteCustomer = ({ id, name }) => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除此客户信息', content: `若客户 ${name} 有关联的项目，将导致删除失败`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'contactsList/eDeleteCustomer', id });
      },
    });
  };
  customersPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'contactsList/eGetCustomers',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingCustomers, deletingCustomer, mine, total, current, pageSize, customersList } = this.props;
    return (
      <React.Fragment>
        <CustomerProfileModal/>
        <h3 style={{ marginTop: '1em' }}>查找客户</h3>
        <Form layout="horizontal" className="searchWrapper">
          <Row gutter={[80]}>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="姓名"><Input placeholder="请输入"/></Form.Item>
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
              <Form.Item label="地区"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="公司"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="职务"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="手机号码"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="微信"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="邮箱"><Input placeholder="请输入"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="是否共享"><Switch checked checkedChildren="公开" unCheckedChildren="隐藏"/></Form.Item>
            </Col>
            <Col xl={6} md={12} sm={24}>
              <div className="searchButtons">
                <Button type="primary">搜索</Button>
                <Button style={{ marginLeft: '1em' }}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <h3 style={{ marginBottom: '2em' }}>客户列表</h3>
        <Table size="middle" tableLayout="fixed" pagination={false} dataSource={customersList}
               loading={fetchingCustomers || deletingCustomer} rowKey={record => record.id}>
          <Column title="姓名" dataIndex="name" render={(name, record) => (
            <Button type="link" onClick={() => {
              this.props.dispatch({
                type: 'contactsList/rUpdateState',
                payload: { customerProfileModalVisible: true, customerProfile: record },
              });
            }}>
              {name}
            </Button>
          )}/>
          <Column title="性别" dataIndex="gender" render={(text) => (<span>{text === 'male' ? '男' : '女'}</span>)}/>
          <Column title="地区" dataIndex="area"/>
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
          <Column title="状态" dataIndex="private"
                  render={text => (text ? <Tag>隐藏</Tag> : <Tag color="#108EE9">公开</Tag>)}/>
          <Column title="创建人" dataIndex="creator" render={(creator) => creator.name}/>
          <Column title="创建日期" dataIndex="created_at" sorter={(a, b) => a['created_at'] - b['created_at']}
                  render={(text) => (<span>{moment(1000 * text).format('YYYY-MM-DD')}</span>)}/>
          <Column title="操作" dataIndex="action"
                  render={(text, record) => (
                    <div className="actionGroup">
                      <Button type="link" icon="edit"
                              disabled={!(record['creator']['id'] === mine['id'] || mine.level === 9)}
                              onClick={() => {
                                this.showEditForm(record);
                              }}>
                        修改
                      </Button>
                      <Button type="link" icon="delete" className="redButton"
                              disabled={!(record['creator']['id'] === mine['id'] || mine.level === 9)}
                              onClick={() => {
                                this.deleteCustomer(record);
                              }}>
                        删除
                      </Button>
                    </div>
                  )}/>
        </Table>
        <div className="paginationWrapper">
          <Pagination showQuickJumper defaultCurrent={1} total={total} current={current} pageSize={pageSize}
                      showTotal={() => `共 ${total} 条`} onChange={this.customersPaginationChange}/>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, basicLayout, contactsList }) => ({
  fetchingCustomers: loading.effects['contactsList/eGetCustomers'],
  deletingCustomer: loading.effects['contactsList/eDeleteCustomer'],
  mine: basicLayout.mine,
  total: contactsList.customers.total,
  current: contactsList.customers.current,
  pageSize: contactsList.customers.pageSize,
  customersList: contactsList.customers.list,
}))(Customers);
