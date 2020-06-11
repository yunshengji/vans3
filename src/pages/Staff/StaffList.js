import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Tag, Form, Row, Col, Input, Select } from 'antd';
import moment from 'moment';

class StaffList extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'staffList/eGetDepartments',
      payload: { page_size: 10000 },
    });
    this.props.dispatch({ type: 'staffList/eLoadStaffs' });
  }

  searchStaffList = e => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'staffList/rUpdateState',
      payload: { searchParams: { ...values }, staffs: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'staffList/eLoadStaffs' });
    e.preventDefault();
  };
  resetSearch = e => {
    this.props.form.setFieldsValue({
      name: undefined,
      department: undefined,
      position: undefined,
    });
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'staffList/rUpdateState',
      payload: { searchParams: { ...values }, staffs: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'staffList/eLoadStaffs' });
    e.preventDefault();
  };

  staffsPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'staffList/eLoadStaffs',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form: { getFieldDecorator }, fetchingStaffList, routes, searchParams, departments, total, current, pageSize, staffList } = this.props;
    return (
      <React.Fragment>
        <div className='headerWrapperWithCreate'>
          <Breadcrumb>
            {routes.map((item, index) => {
              const { path, breadcrumbName } = item;
              if (path) {
                return (
                  <Breadcrumb.Item key={index}>
                    <Link to={path}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item key={index}>
                    <span>{breadcrumbName}</span>
                  </Breadcrumb.Item>
                );
              }
            })}
          </Breadcrumb>
          <Link to="/staff/edit">
            <Button icon="plus-circle">新建员工资料</Button>
          </Link>
        </div>
        <div className="contentWrapper">
          <h3>员工搜索</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="姓名">
                  {getFieldDecorator('name', { initialValue: searchParams['name'] })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="部门">
                  {getFieldDecorator('department', { initialValue: searchParams['department'] })(
                    <Select placeholder="请选择" allowClear>
                      {departments.map(item =>
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>,
                      )}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="职位">
                  {getFieldDecorator('position', { initialValue: searchParams['position'] })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <div className="searchButtons">
                  <Button type="primary" onClick={this.searchStaffList}>搜索</Button>
                  <Button style={{ marginLeft: '1em' }} onClick={this.resetSearch}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <h3>员工列表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={staffList}
                 loading={fetchingStaffList} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Table.Column title="姓名" dataIndex="name"/>
            <Table.Column title="部门" dataIndex="department" render={(text, record) => (
              <React.Fragment>
                {text && text.name}
              </React.Fragment>
            )}/>
            <Table.Column title="职位" dataIndex="position"/>
            <Table.Column title="手机号码" dataIndex="phone"/>
            <Table.Column title="入职时间" dataIndex="entry_time" render={text => {
              return text && <span>{moment(1000 * text).format('YYYY-MM-DD')}</span>;
            }}/>
            <Table.Column title="状态" dataIndex="status" render={(text, record) => (
              <React.Fragment>
                {text === true && <Tag color="green">在职</Tag>}
                {text === false && <Tag color="orange">已离职</Tag>}
              </React.Fragment>
            )}/>
            <Table.Column title="操作" dataIndex="action" width={150}
                          render={(text, record) => (
                            <Link to={`/staff/edit/${record.id}`}>
                              <Button type="link" icon="edit">
                                编辑
                              </Button>
                            </Link>
                          )}/>
          </Table>
          <div className="paginationWrapper">
            <Pagination showQuickJumper total={total} current={current} pageSize={pageSize}
                        showTotal={() => `共 ${total} 条`}
                        onChange={this.staffsPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'StaffList' })(StaffList);

export default connect(({ loading, common, staffList }) => ({
  fetchingStaffList: loading.effects['staffList/eLoadStaffs'],
  routes: staffList.routes,
  searchParams: staffList.searchParams,
  departments: staffList.departments,
  total: staffList.staffs.total,
  current: staffList.staffs.current,
  pageSize: staffList.staffs.pageSize,
  staffList: staffList.staffs.list,
}))(WrappedForm);
