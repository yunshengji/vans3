import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Breadcrumb, Form, Row, Col, Input, Select, Table, Pagination, Modal } from 'antd';
import moment from 'moment';

class RecordList extends React.Component {
  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'recordList/GetRecordTableList',
      payload: { page: current, page_size: pageSize },
    });
  }

  deleteRecord = ({ id, name }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此备案表', content: <p>请仔细检查备案表 <b>{name}</b>，删除后不可恢复</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'recordList/eDeleteRecordTable', id });
      },
    });
  };
  recordPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'recordList/GetRecordTableList',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { fetchingRecordTable, routes, total, current, pageSize, recordTableList } = this.props;
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
          <h3 style={{ marginBottom: '2em' }}>备案表</h3>
          <Table size="middle" tableLayout="fixed" pagination={false} dataSource={recordTableList}
                 loading={fetchingRecordTable} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Table.Column title="项目名称" render={(text, record) => {
              return record['origin']['name'];
            }}/>
            <Table.Column title="项目类别" render={(text, record) => {
              return record['origin']['category'];
            }}/>
            <Table.Column title="备案时间" dataIndex="created" render={text => {
              return <span>{moment(1000 * text).format('YYYY-MM-DD')}</span>;
            }}/>
            <Table.Column title="团队名称" render={(text, record) => {
              return record['team'];
            }}/>
            <Table.Column title="对接领导级别" render={(text, record) => {
              return record['leader_level'];
            }}/>
            <Table.Column title="操作" dataIndex="action"
                          render={(text, record) => (
                            <div className="actionGroup">
                              <Button type="link" icon="edit"
                                      onClick={() => {
                                        window.location.href = `/approvalProject/edit/${record.origin.id}`;
                                      }}>
                                修改
                              </Button>
                              <Button type="link" icon="delete" className="redButton"
                                      onClick={() => {
                                        this.deleteRecord(record);
                                      }}>
                                删除
                              </Button>
                            </div>
                          )}/>
          </Table>
          <div className="paginationWrapper">
            <Pagination showQuickJumper defaultCurrent={1} total={total} current={current} pageSize={pageSize}
                        showTotal={() => `共 ${total} 条`} onChange={this.recordPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(({ loading, common, recordList }) => ({
  fetchingRecordTable: loading.effects['recordList/GetRecordTableList'],
  routes: recordList.routes,
  mine: common.mine,
  total: recordList.recordTableList.total,
  current: recordList.recordTableList.current,
  pageSize: recordList.recordTableList.pageSize,
  recordTableList: recordList.recordTableList.list,
}))(RecordList);
