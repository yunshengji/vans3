import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Button, Table, Form, Input, Pagination, Select, message, Modal } from 'antd';
import styles from './Contractors.less';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;

class Contractors extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'contactsList/eGetContractors' });
  }

  showEditForm = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: {
        contractorsEditModalVisible: true,
        contractorsEditForm: { ...record },
      },
    });
  };
  handleEditFormOk = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: { contractorsEditModalVisible: false },
    });
  };
  handleEditFormCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/rUpdateState',
      payload: { contractorsEditModalVisible: false },
    });
  };
  showDeleteConfirm = ({ contacts_name }) => {
    confirm({
      title: '确定删除此合作伙伴信息',
      content: `若合作伙伴 ${contacts_name} 有关联的项目，将导致删除失败`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('删除成功');
      },
    });
  };
  projectsPaginationChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contactsList/eGetContractors',
      payload: { page, pageSize },
    });
  };

  render() {
    const {
      fetchingContractors,
      contractorsEditModalVisible,
      contractorsEditForm,
      contactsList,
      contactsListPagination,
    } = this.props;
    return (
      <React.Fragment>
        <Row>
          <h3>查找合作伙伴</h3>
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
                    <Option key="a">男</Option>
                    <Option key="b">女</Option>
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
                <Form.Item label="部门">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="邮箱">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="手机号码">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <div className={styles.searchWrapper}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{ marginLeft: 8 }}>
                  重置
                </Button>
              </div>
            </Row>
          </Form>
        </Row>
        <Row>
          <h3 style={{ marginBottom: '2em' }}>合作伙伴列表</h3>
          <Modal title={contractorsEditForm.contacts_name} visible={contractorsEditModalVisible}
                 onOk={this.handleEditFormOk}
                 onCancel={this.handleEditFormCancel}>
            <Form layout="horizontal" labelCol={{ xs: 4 }} wrapperCol={{ xs: 18 }}>
              <Row gutter={[80]}>
                <Col>
                  <Form.Item label="姓名">
                    <Input placeholder="请输入" value={contractorsEditForm.contacts_name}/>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="性别">
                    <Select placeholder="请选择" value={contractorsEditForm.sex}>
                      <Option key="a">男</Option>
                      <Option key="b">女</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="公司">
                    <Input placeholder="请输入" value={contractorsEditForm.contacts_name}/>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="部门">
                    <Input placeholder="请输入" value={contractorsEditForm.company}/>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="职务">
                    <Input placeholder="请输入" value={contractorsEditForm.job}/>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="手机号码">
                    <Input placeholder="请输入" value={contractorsEditForm.phone}/>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="邮箱">
                    <Input placeholder="请输入" value={contractorsEditForm.email}/>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
          <div className={styles.content}>
            <Table size="middle" tableLayout="fixed" pagination={false} dataSource={contactsList}
                   loading={fetchingContractors} rowKey={record => record.contacts_name}>
              <Column title="姓名" dataIndex="contacts_name"/>
              <Column title="性别" dataIndex="sex"/>
              <Column title="地区" dataIndex="area"/>
              <Column title="公司" dataIndex="company"/>
              <Column title="部门" dataIndex="department"/>
              <Column title="职务" dataIndex="job"/>
              <Column title="手机号码" dataIndex="phone"/>
              <Column title="邮箱" dataIndex="email"/>
              <Column title="创建日期" dataIndex="created_at" sorter={(a, b) => a.age - b.age}/>
              <Column title="操作" dataIndex="action"
                      render={(text, record) => (
                        <div className="actionGroup">
                          <Button type="link" icon="edit" onClick={() => {
                            this.showEditForm(record);
                          }}>
                            编辑
                          </Button>
                          <Button type="link" icon="delete" className="redButton" onClick={() => {
                            this.showDeleteConfirm(record);
                          }}>
                            删除
                          </Button>
                        </div>
                      )}/>
              />
            </Table>
            <div className="paginationWrapper">
              <Pagination showQuickJumper defaultCurrent={1} total={contactsListPagination.total}
                          current={contactsListPagination.current} pageSize={contactsListPagination.pageSize}
                          showTotal={() => `共 ${contactsListPagination.total} 条`}
                          onChange={this.projectsPaginationChange}/>
            </div>
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, contactsList }) => ({
  fetchingContractors: loading.effects['contactsList/eGetContractors'],
  contractorsEditModalVisible: contactsList.contractorsEditModalVisible,
  contractorsEditForm: contactsList.contractorsEditForm,
  contactsList: contactsList.contractors.list,
  contactsListPagination: contactsList.contractors.pagination,
}))(Contractors);
