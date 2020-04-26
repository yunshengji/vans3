import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Table, Tag, Tooltip, Form, Input, Pagination } from 'antd';
import PageHeader from '@/pages/Contacts/components/PageHeader';
import styles from './index.less';

const { Column } = Table;

class Contacts extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'contacts/eGetContactsData' });
  }

  projectsPaginationChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'contacts/eGetContactsData',
      payload: { page, pageSize },
    });
  };

  render() {
    const { fetchingContactsData, contactsList, contactsListPagination } = this.props;
    return (
      <div className={styles.root}>
        <PageHeader/>
        <Row className={styles.filterPanel}>
          <Col className={styles.filterContainer}>
            <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              <Row gutter={[20]}>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="联系人姓名">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="账号">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="手机号码">
                    <Input placeholder="请输入"/>
                  </Form.Item>
                </Col>
                <Col xl={6} md={12} sm={24}>
                  <Form.Item label="邮箱">
                    <Input placeholder="请输入"/>
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
                <Tooltip title="创建联系人">
                  <Button icon="plus"/>
                </Tooltip>
              </div>
              <div style={{ width: '100%', overflow: 'auto' }}>
                <Table size="middle" tableLayout="fixed" pagination={false} dataSource={contactsList}
                       loading={fetchingContactsData} rowKey={record => record.contacts_name}>
                  <Column title="联系人姓名" dataIndex="contacts_name"/>
                  <Column title="性别" dataIndex="sex"/>
                  <Column title="公司名称" dataIndex="company"/>
                  <Column title="职位" dataIndex="job"/>
                  <Column title="手机号码" dataIndex="phone"/>
                  <Column title="邮箱" dataIndex="email"/>
                  <Column title="创建日期" dataIndex="created_at" sorter={(a, b) => a.age - b.age}/>
                  <Column title="操作" dataIndex="action"
                          render={(text, record) => (
                            <Button type="link" icon="edit">编辑</Button>
                          )}
                  />
                </Table>
              </div>
              <div className="paginationWrapper">
                <Pagination showQuickJumper defaultCurrent={1} total={contactsListPagination.total}
                            current={contactsListPagination.current} pageSize={contactsListPagination.pageSize}
                            showTotal={() => `共 ${contactsListPagination.total} 条`}
                            onChange={this.projectsPaginationChange}/>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


export default connect(({ loading, contacts }) => ({
  fetchingContactsData: loading.effects['contacts/eGetContactsData'],
  contactsList: contacts.contactsData.list,
  contactsListPagination: contacts.contactsData.pagination,
}))(Contacts);
