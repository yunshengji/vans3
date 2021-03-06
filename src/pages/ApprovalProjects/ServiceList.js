import React from 'react';
import { Link, router } from 'umi';
import { connect } from 'dva';
import { Button, Breadcrumb, Form, Row, Col, Input, Select, Table, Pagination, Modal } from 'antd';
import moment from 'moment';

class ServiceList extends React.Component {
  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'serviceList/GetServiceTableList',
      payload: { page: current, page_size: pageSize },
    });
  }

  deleteService = ({ id, name }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此备案表', content: <p>请仔细检查备案表 <b>{name}</b>，删除后不可恢复</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'serviceList/eDeleteServiceTable', id });
      },
    });
  };
  servicePaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'serviceList/GetServiceTableList',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingServiceTable, routes, total, current, pageSize, serviceTableList } = this.props;
    return (
      <React.Fragment>
        <div className="headerWrapper">
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
        </div>
        <div className="contentWrapper">
          <h3 style={{ marginBottom: '2em' }}>跟踪服务表</h3>
          <Table size="middle" tableLayout="fixed" pagination={false} dataSource={serviceTableList}
                 loading={fetchingServiceTable} rowKey={service => service.id}
                 rowClassName={(service, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Table.Column title="项目名称" render={(text, service) => {
              return service['origin']['name'];
            }}/>
            <Table.Column title="项目类别" render={(text, service) => {
              return service['origin']['category'];
            }}/>
            <Table.Column title="备案时间" dataIndex="created" render={text => {
              return <span>{moment(1000 * text).format('YYYY-MM-DD')}</span>;
            }}/>
            <Table.Column title="团队名称" render={(text, service) => {
              return service['team'];
            }}/>
            <Table.Column title="对接领导级别" render={(text, service) => {
              return service['leader_level'];
            }}/>
            <Table.Column title="操作" dataIndex="action"
                          render={(text, service) => (
                            <div className="actionGroup">
                              <Button type="link" icon="edit"
                                      onClick={() => {
                                        window.location.href = `/approvalProject/edit/${service.origin.id}`;
                                      }}>
                                修改
                              </Button>
                              <Button type="link" icon="delete" className="redButton"
                                      onClick={() => {
                                        this.deleteService(service);
                                      }}>
                                删除
                              </Button>
                            </div>
                          )}/>
          </Table>
          <div className="paginationWrapper">
            <Pagination showQuickJumper defaultCurrent={1} total={total} current={current} pageSize={pageSize}
                        showTotal={() => `共 ${total} 条`} onChange={this.servicePaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, serviceList }) => ({
  fetchingServiceTable: loading.effects['serviceList/GetServiceTableList'],
  routes: serviceList.routes,
  mine: common.mine,
  total: serviceList.serviceTableList.total,
  current: serviceList.serviceTableList.current,
  pageSize: serviceList.serviceTableList.pageSize,
  serviceTableList: serviceList.serviceTableList.list,
}))(ServiceList);
