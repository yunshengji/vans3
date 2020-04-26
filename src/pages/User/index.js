import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Tag, Tooltip, Form, Input, Select, Pagination } from 'antd';
import PageHeader from '@/pages/User/components/PageHeader';
import styles from './index.less';

const { Column } = Table;
const { Option } = Select;

class User extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'users/eGetUsersData' });
  }

  projectsPaginationChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/eGetUsersData',
      payload: { page, pageSize },
    });
  };

  render() {
    const { fetchingUsersData, usersList, usersListPagination } = this.props;
    return (
      <div className={styles.root}>
        <PageHeader/>
        <Row className={styles.filterPanel}>
          <Col className={styles.filterContainer}>
            <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              <Row gutter={[20]}>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="用户名">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="账号">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="手机号码">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="邮箱">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={8} md={12} sm={24}>
                  <Form.Item label="身份">
                    <Select mode="multiple" placeholder="Please select"
                            defaultValue={['admin', 'tech', 'Seller']}>
                      <Option key="admin" value="admin">管理员</Option>
                      <Option key="tech" value="tech">技术部</Option>
                      <Option key="Seller" value="Seller">销售</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button style={{ marginLeft: 8 }}>
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row className={styles.content}>
          <Col span={24}>
            <div className={styles.userContainer}>
              <div className={styles.plusPanel}>
                <Tooltip title="创建新用户">
                  <Button icon="plus"/>
                </Tooltip>
              </div>
              <div style={{ width: '100%', overflow: 'auto' }}>
                <Table rowKey={record => record.name} dataSource={usersList} loading={fetchingUsersData}
                       pagination={false}>
                  <Column title="用户名" dataIndex="name"/>
                  <Column title="账号" dataIndex="username"/>
                  <Column title="手机号码" dataIndex="phone"/>
                  <Column title="邮箱" dataIndex="email"/>
                  <Column title="创建日期" dataIndex="created_at"/>
                  <Column title="最近修改" dataIndex="updated_at"/>
                  <Column title="身份" dataIndex="role"
                          render={role => (<Tag>{role}</Tag>)}/>
                </Table>
              </div>
              <div className="paginationWrapper">
                <Pagination showQuickJumper defaultCurrent={1} total={usersListPagination.total}
                            current={usersListPagination.current} pageSize={usersListPagination.pageSize}
                            showTotal={() => `共 ${usersListPagination.total} 条`}
                            onChange={this.projectsPaginationChange}/>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
      ;
  }
}


export default connect(({ loading, users }) => ({
  fetchingUsersData: loading.effects['users/eGetUsersData'],
  usersList: users.usersData.list,
  usersListPagination: users.usersData.pagination,
}))(User);
