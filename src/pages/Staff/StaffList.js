import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Tag } from 'antd';
import moment from 'moment';

const { Column } = Table;

class StaffList extends React.Component {

  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'staffList/eGetStaffList',
      payload: { page: current, page_size: pageSize },
    });
  }

  usersPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'staffList/eGetStaffList',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingStaffList, routes, level, total, current, pageSize, staffList } = this.props;
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
            <Button type="link" size="small">新建员工资料</Button>
          </Link>
        </div>
        <div className="contentWrapper">
          <h3>员工列表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={staffList}
                 loading={fetchingStaffList} rowKey={record => record.id}>
            <Column title="姓名" dataIndex="name"/>
            <Column title="部门" dataIndex="department" render={(text, record) => (
              <React.Fragment>
                {text && text.name}
              </React.Fragment>
            )}/>
            <Column title="职位" dataIndex="position"/>
            <Column title="手机号码" dataIndex="phone"/>
            <Column title="入职时间" dataIndex="entry_time" render={text => {
              return text && <span>{moment(1000 * text).format('YYYY-MM-DD')}</span>;
            }}/>
            <Column title="状态" dataIndex="status" render={(text, record) => (
              <React.Fragment>
                {text === true && <Tag color="#108EE9">在职</Tag>}
                {text === false && <Tag color="#F50">已离职</Tag>}
              </React.Fragment>
            )}/>
            <Column title="操作" dataIndex="action" width={150}
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
                        onChange={this.usersPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, staffList }) => ({
  fetchingStaffList: loading.effects['staffList/eGetStaffList'],
  routes: staffList.routes,
  level: common.mine.level,
  total: staffList.staffs.total,
  current: staffList.staffs.current,
  pageSize: staffList.staffs.pageSize,
  staffList: staffList.staffs.list,
}))(StaffList);
