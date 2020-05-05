import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Form, Input, Pagination, Select, Modal, Tag, Switch } from 'antd';
import moment from 'moment';

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
    const { fetchingCustomers, deletingCustomer, total, current, pageSize, customersList } = this.props;
    return (
      <React.Fragment>
        <h3 style={{ marginTop: '1em' }}>查找客户</h3>
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
              <Form.Item label="地区">
                <Input placeholder="请输入"/>
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
            <Col xl={6} md={12} sm={24}>
              <Form.Item label="是否共享">
                <Switch checked checkedChildren="公开" unCheckedChildren="隐藏"/>
              </Form.Item>
            </Col>
          </Row>
          <div className="searchWrapper">
            <Button type="primary">搜索</Button>
            <Button style={{ marginLeft: '1em' }}>重置</Button>
          </div>
        </Form>
        <h3 style={{ marginBottom: '2em' }}>客户列表</h3>
        <Table size="middle" tableLayout="fixed" pagination={false} dataSource={customersList}
               loading={fetchingCustomers || deletingCustomer} rowKey={record => record.id}>
          <Column title="姓名" dataIndex="name"/>
          <Column title="性别" dataIndex="gender"
                  render={(text) => (<span>{text === 'male' ? '男' : '女'}</span>)}/>
          <Column title="地区" dataIndex="area"/>
          <Column title="公司及职务" dataIndex="companyAndJob"
                  render={(text, record) => (
                    <React.Fragment>
                      <span>{record['company']} </span>
                      <span>{record['job_title']}</span>
                    </React.Fragment>
                  )}/>
          {/*<Column title="职务" dataIndex="job_title"/>*/}
          <Column title="手机号码" dataIndex="phone"/>
          <Column title="微信" dataIndex="wx"/>
          <Column title="邮箱" dataIndex="email"/>
          {/*<Column title="客户特点" dataIndex="personality"/>*/}
          {/*<Column title="备注" dataIndex="description"/>*/}
          {/*<Column title="重点关注" dataIndex="points"/>*/}
          <Column title="状态" dataIndex="private"
                  render={text => (text ? <Tag>隐藏</Tag> : <Tag color="#108EE9">公开</Tag>)}/>
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

export default connect(({ loading, contactsList }) => ({
  fetchingCustomers: loading.effects['contactsList/eGetCustomers'],
  deletingCustomer: loading.effects['contactsList/eDeleteCustomer'],
  total: contactsList.customers.total,
  current: contactsList.customers.current,
  pageSize: contactsList.customers.pageSize,
  customersList: contactsList.customers.list,
}))(Customers);
