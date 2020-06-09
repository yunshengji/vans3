import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Breadcrumb, Form, Row, Col, Input, Select, Table, Pagination, Modal } from 'antd';
import moment from 'moment';

class SpecialDebtList extends React.Component {
  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'specialDebtList/eGetSpecialDebtList',
      payload: { page: current, page_size: pageSize },
    });
  }

  // deleteOrigin = ({ id, name }) => {
  //   const { dispatch } = this.props;
  //   Modal.confirm({
  //     title: '确定删除此立项表', content: <p>请仔细检查立项表 <b>{name}</b>，删除后不可恢复</p>,
  //     okText: '删除',
  //     okType: 'danger',
  //     cancelText: '取消',
  //     onOk() {
  //       dispatch({ type: 'specialDebtList/eDeleteSpecialDebtList', id });
  //     },
  //   });
  // };
  // originPaginationChange = (page, pageSize) => {
  //   this.props.dispatch({
  //     type: 'specialDebtList/GetSpecialDebtListList',
  //     payload: { page, page_size: pageSize },
  //   });
  // };

  render() {
    const { fetchingSpecialDebtList, routes, total, current, pageSize, specialDebtList } = this.props;
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
          <h3 style={{ marginTop: '1em' }}>查找</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目名称">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目类别">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目状态">
                  <Select placeholder="请选择">
                    <Select.Option key="male" value="male">男</Select.Option>
                    <Select.Option key="female" value="female">女</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <div className="searchButtons">
                  <Button type="primary">搜索</Button>
                  <Button style={{ marginLeft: '1em' }}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <h3 style={{ marginBottom: '2em' }}>立项表</h3>
          <Table size="middle" tableLayout="fixed" pagination={false} dataSource={specialDebtList}
                 loading={fetchingSpecialDebtList} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Table.Column title="项目名称" dataIndex="name"/>
            <Table.Column title="项目类别" dataIndex="status"/>
            <Table.Column title="操作" dataIndex="action"
                          render={(text, record) => (
                            <div className="actionGroup">
                              <Button type="link" icon="edit"
                                      onClick={() => {
                                        window.location.href = `/specialDebt/edit/${record.id}`;
                                      }}>
                                修改
                              </Button>
                              <Button type="link" icon="delete" className="redButton"
                                      onClick={() => {
                                        this.deleteOrigin(record);
                                      }}>
                                删除
                              </Button>
                            </div>
                          )}/>
          </Table>
          <div className="paginationWrapper">
            <Pagination showQuickJumper defaultCurrent={1} total={total} current={current} pageSize={pageSize}
                        showTotal={() => `共 ${total} 条`} onChange={this.originPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, specialDebtList }) => ({
  fetchingSpecialDebtList: loading.effects['specialDebtList/eGetSpecialDebtList'],
  routes: specialDebtList.routes,
  mine: common.mine,
  total: specialDebtList.specialDebtList.total,
  current: specialDebtList.specialDebtList.current,
  pageSize: specialDebtList.specialDebtList.pageSize,
  specialDebtList: specialDebtList.specialDebtList.list,
}))(SpecialDebtList);
