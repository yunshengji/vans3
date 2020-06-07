import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Row, Form, Col, Select, Modal } from 'antd';
import moment from 'moment';
import UploadProjectArchive from '@/pages/Archive/components/UploadProjectArchive';
import { getFileURL } from '@/utils/transfer';
import _ from 'lodash';

const { Column } = Table;
const { confirm } = Modal;


class ProjectArchive extends React.Component {
  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'projectArchiveList/eGetProjectArchives',
      payload: { page: current, page_size: pageSize },
    });
  }

  showUploadProjectArchivesModal = () => {
    this.props.dispatch({
      type: 'projectArchiveList/rUpdateState',
      payload: { uploadProjectArchivesModalVisible: true },
    });
  };
  // searchLawsList = () => {
  //   const values = this.props.form.getFieldsValue();
  //   const { dispatch, current, pageSize } = this.props;
  //   dispatch({
  //     type: 'projectArchiveList/eGetProjectArchives',
  //     payload: { page: current, page_size: pageSize, ...values },
  //   });
  // };
  showDeleteConfirm = ({ id, attachment: { file_name_local } }) => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除此档案',
      content: <p>文件 <b>《{file_name_local}》</b> 删除后将无法恢复</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'projectArchiveList/eDeleteProjectArchive', id });
      },
    });
  };
  projectArchivesPaginationChange = (page, pageSize) => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'projectArchiveList/eGetProjectArchives',
      payload: { page, page_size: pageSize, ...values },
    });
  };

  render() {
    const { form, fetchingProjectArchives, deletingProjectArchive, routes, level, belong_to, total, current, pageSize, projectArchiveList } = this.props;
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
          <Button type="link" size="small" onClick={this.showUploadProjectArchivesModal}>上传</Button>
        </div>
        <UploadProjectArchive/>
        <div className="contentWrapper">
          <h3>档案筛选</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="档案类型">
                  {form.getFieldDecorator('belong_to', {
                    initialValue: belong_to,
                  })(
                    <Select placeholder="请选择">
                      <Select.Option key="上游档案" value="">上游档案</Select.Option>
                      <Select.Option key="下游档案" value="">下游档案</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="是否结算">
                  {form.getFieldDecorator('belong_to', {
                    initialValue: belong_to,
                  })(
                    <Select placeholder="请选择">
                      <Select.Option key="已结算" value="">已结算</Select.Option>
                      <Select.Option key="未结算" value="">未结算</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <div className="searchButtons">
                  <Button type="primary" onClick={this.searchLawsList}>搜索</Button>
                  <Button style={{ marginLeft: '1em' }}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <h3>档案列表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={projectArchiveList}
                 loading={fetchingProjectArchives || deletingProjectArchive} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Column title="档案名称" dataIndex="name"/>
            <Column title="档案类型" dataIndex="category"/>
            <Column title="是否结算" dataIndex="settlement"/>
            <Column title="相关文件" dataIndex="attachment" render={(attachment) => {
              return (
                _.map(attachment, (value, key) => {
                  return (
                    <p key={key}>
                      <a href={getFileURL(value.id)} target="_blank">{value['file_name_local']}</a>
                    </p>
                  );
                })
              );
            }}/>
            <Column title="明细文件" dataIndex="detail" render={(detail) => {
              return (
                _.map(detail, (value, key) => {
                  return (
                    <p key={key}>
                      <a href={getFileURL(value.id)} target="_blank">{value['file_name_local']}</a>
                    </p>
                  );
                })
              );
            }}/>
            <Column title="操作" dataIndex="action"
                    render={(text, record) => (
                      <div className="actionGroup">
                        <Button type="link" icon="delete" className="redButton"
                                onClick={() => {
                                  this.showDeleteConfirm(record);
                                }}>
                          删除
                        </Button>
                      </div>
                    )}/>
          </Table>
          <div className="paginationWrapper">
            <Pagination showQuickJumper total={total} current={current} pageSize={pageSize}
                        showTotal={() => `共 ${total} 条`}
                        onChange={this.projectArchivesPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'ProjectArchive' })(ProjectArchive);

export default connect(({ loading, common, projectArchiveList }) => ({
  fetchingProjectArchives: loading.effects['projectArchiveList/eGetProjectArchives'],
  deletingProjectArchive: loading.effects['projectArchiveList/eDeleteProjectArchive'],
  level: common.mine.level,
  routes: projectArchiveList.routes,
  belong_to: projectArchiveList.searchParams.belong_to,
  total: projectArchiveList.projectArchives.total,
  current: projectArchiveList.projectArchives.current,
  pageSize: projectArchiveList.projectArchives.pageSize,
  projectArchiveList: projectArchiveList.projectArchives.list,
}))(WrappedForm);
