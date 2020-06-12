import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Breadcrumb, Form, Row, Col, Input, Select, Table, Pagination, Modal, Tag } from 'antd';
import { TABLE_FOR_MAKING_PROJECT_CATEGORIES } from '../../../config/constant';


class OriginList extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'originList/eLoadOriginList' });
  }

  searchOriginList = e => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'originList/rUpdateState',
      payload: { searchParams: { ...values }, originTableList: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'originList/eLoadOriginList' });
    e.preventDefault();
  };
  resetSearch = e => {
    this.props.form.setFieldsValue({
      name: undefined,
      area: undefined,
      category: undefined,
    });
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'originList/rUpdateState',
      payload: { searchParams: { ...values }, originTableList: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'originList/eLoadOriginList' });
    e.preventDefault();
  };
  deleteOrigin = ({ id, name }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此立项表', content: <p>请仔细检查立项表 <b>{name}</b>，删除后不可恢复</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'originList/eDeleteOriginTable', id });
      },
    });
  };
  originPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'originList/eLoadOriginList',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form: { getFieldDecorator }, fetchingOriginTable, routes, searchParams, total, current, pageSize, originTableList } = this.props;
    return (
      <React.Fragment>
        <div className="headerWrapperWithCreate">
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
          <a href="/approvalProject/edit" target="_blank">
            <Button icon="plus-circle">新建立项表
            </Button>
          </a>

        </div>
        <div className="contentWrapper">
          <h3>立项表搜索</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目名称">
                  {getFieldDecorator('name', { initialValue: searchParams['name'] })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目地区">
                  {getFieldDecorator('area', { initialValue: searchParams['area'] })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="项目类别">
                  {getFieldDecorator('category', { initialValue: searchParams['category'] })(
                    <Select placeholder="请选择" allowClear>
                      {TABLE_FOR_MAKING_PROJECT_CATEGORIES.map(item =>
                        <Select.Option key={item} value={item}>{item}</Select.Option>,
                      )}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <div className="searchButtons">
                  <Button type="primary" onClick={this.searchOriginList}>搜索</Button>
                  <Button style={{ marginLeft: '1em' }} onClick={this.resetSearch}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <h3 style={{ marginBottom: '2em' }}>立项表</h3>
          <Table size="middle" tableLayout="fixed" pagination={false} dataSource={originTableList}
                 loading={fetchingOriginTable} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Table.Column title="项目名称" dataIndex="name" width={400}/>
            <Table.Column title="项目类别" dataIndex="category"/>
            <Table.Column title="立项状态" dataIndex="status" render={status => (
              <React.Fragment>
                {status === '执行中' && <Tag color="blue">{status}</Tag>}
                {status === '已废弃' && <Tag color="orange">{status}</Tag>}
                {status === '已完结' && <Tag color="green">{status}</Tag>}
              </React.Fragment>
            )}
            />
            <Table.Column title="流程" dataIndex="process" render={status => (
              <React.Fragment>
                {
                  status === '流程未定' ? <Tag color="orange">{status}</Tag> : <Tag color="blue">{status}</Tag>}
              </React.Fragment>
            )}/>
            <Table.Column title="操作" dataIndex="action"
                          render={(text, record) => (
                            <div className="actionGroup">
                              <Button type="link" icon="edit"
                                      onClick={() => {
                                        window.location.href = `/approvalProject/edit/${record.id}`;
                                      }}>
                                修改
                              </Button>
                              {/*<Button type="link" icon="delete" className="redButton"*/}
                              {/*        onClick={() => {*/}
                              {/*          this.deleteOrigin(record);*/}
                              {/*        }}>*/}
                              {/*  删除*/}
                              {/*</Button>*/}
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

const WrappedForm = Form.create({ name: 'OriginList' })(OriginList);

export default connect(({ loading, common, originList }) => ({
  fetchingOriginTable: loading.effects['originList/eLoadOriginList'],
  routes: originList.routes,
  mine: common.mine,
  searchParams: originList.searchParams,
  total: originList.originTableList.total,
  current: originList.originTableList.current,
  pageSize: originList.originTableList.pageSize,
  originTableList: originList.originTableList.list,
}))(WrappedForm);
