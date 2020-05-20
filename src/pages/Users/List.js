import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Tag } from 'antd';
import CreateUserModal from '@/pages/Users/components/CreateUserModal';
import EditUserModal from '@/pages/Users/components/EditUserModal';

const { Column } = Table;

class UsersList extends React.Component {

  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'usersList/eGetDepartments',
      payload: { page_size: 10000 },
    });
    dispatch({
      type: 'usersList/eGetUsers',
      payload: { page: current, page_size: pageSize },
    });
  }

  showCreateUserModal = () => {
    this.props.dispatch({
      type: 'usersList/rUpdateState',
      payload: { createUserModalVisible: true },
    });
  };
  showEditUserModal = (record) => {
    this.props.dispatch({
      type: 'usersList/rUpdateState',
      payload: {
        editUserModalVisible: true,
        editUser: { ...record },
      },
    });
  };
  usersPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'usersList/eGetUsers',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingUsers, routes, level, total, current, pageSize, usersList } = this.props;
    return (
      <React.Fragment>
        <CreateUserModal/>
        <EditUserModal/>
        <div className={level === 9 ? 'headerWrapperWithCreate' : 'headerWrapper'}>
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
          {level === 9 && <Button type="primary" size="small" onClick={this.showCreateUserModal}>新建用户</Button>}
        </div>
        <div className="contentWrapper">
          <h3>用户列表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={usersList}
                 loading={fetchingUsers} rowKey={record => record.id}>
            <Column title="姓名" dataIndex="name"/>
            <Column title="部门" dataIndex="department" render={(text, record) => (
              <React.Fragment>
                {text.name}
              </React.Fragment>
            )}/>
            <Column title="权限" dataIndex="level" render={(text, record) => (
              <React.Fragment>
                {text === 9 && <Tag color="#F50">管理员</Tag>}
                {text === 2 && <Tag color="#108EE9">主管</Tag>}
                {text === 1 && <Tag>普通</Tag>}
              </React.Fragment>
            )}/>
            <Column title="手机号码" dataIndex="phone"/>
            <Column title="邮箱" dataIndex="email"/>
            <Column title="状态" dataIndex="alive" render={(text, record) => (
              <React.Fragment>
                {text ? <Tag color="#108EE9">在职</Tag> : <Tag color="#F50">离职</Tag>}
              </React.Fragment>
            )}/>
            {
              level === 9 &&
              <Column title="操作" dataIndex="action" width={150}
                      render={(text, record) => (
                        <Button disabled={record.level === 9} type="link" icon="edit"
                                onClick={() => {
                                  this.showEditUserModal(record);
                                }}>
                          编辑
                        </Button>
                      )}/>
            }
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

export default connect(({ loading, common, usersList }) => ({
  fetchingUsers: loading.effects['usersList/eGetUsers'],
  routes: usersList.routes,
  level: common.mine.level,
  createUserModalVisible: usersList.createUserModalVisible,
  total: usersList.users.total,
  current: usersList.users.current,
  pageSize: usersList.users.pageSize,
  usersList: usersList.users.list,
}))(UsersList);
