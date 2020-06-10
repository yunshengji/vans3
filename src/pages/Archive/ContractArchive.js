import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Row, Form, Col, Select, Modal, Input } from 'antd';
import moment from 'moment';
import { getFileURL } from '@/utils/transfer';
import UploadContractArchive from '@/pages/Archive/components/UploadContractArchive';

class ContractArchive extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'contractArchiveList/eLoadContracts' });
    this.props.dispatch({
      type: 'contractArchiveList/eGetOriginList',
      payload: { page: 1, page_size: 10000 },
    });
  }

  searchContractList = e => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateState',
      payload: { searchParams: { ...values }, staffs: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'contractArchiveList/eLoadContracts' });
    e.preventDefault();
  };
  resetSearch = e => {
    this.props.form.setFieldsValue({
      name: undefined,
      category: undefined,
      settlement: undefined,
    });
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateState',
      payload: { searchParams: { ...values }, staffs: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'contractArchiveList/eLoadContracts' });
    e.preventDefault();
  };
  showUploadContractArchivesModal = () => {
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateState',
      payload: { uploadContractArchivesModalVisible: true },
    });
  };
  showDeleteConfirm = ({ id, attachment: { file_name_local } }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此档案',
      content: <p>文件 <b>《{file_name_local}》</b> 删除后将无法恢复</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'contractArchiveList/eDeleteContractArchive', id });
      },
    });
  };
  contractArchivesPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'contractArchiveList/eLoadContracts',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form, fetchingContractArchives, deletingContractArchive, routes, searchParams, total, current, pageSize, contractArchiveList } = this.props;
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
          <Button icon="plus-circle" onClick={this.showUploadContractArchivesModal}>上传</Button>
        </div>
        <UploadContractArchive/>
        <div className="contentWrapper">
          <h3>档案筛选</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="合同名称">
                  {form.getFieldDecorator('name', {
                    initialValue: searchParams['name'],
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="档案类型">
                  {form.getFieldDecorator('category', {
                    initialValue: searchParams['category'],
                  })(
                    <Select placeholder="请选择" allowClear>
                      <Select.Option key="上游档案" value="上游档案">上游档案</Select.Option>
                      <Select.Option key="下游档案" value="下游档案">下游档案</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="是否结算">
                  {form.getFieldDecorator('settlement', {
                    initialValue: searchParams['settlement'],
                  })(
                    <Select placeholder="请选择" allowClear>
                      <Select.Option key="已结算" value="已结算">已结算</Select.Option>
                      <Select.Option key="未结算" value="未结算">未结算</Select.Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <div className="searchButtons">
                  <Button type="primary" onClick={this.searchContractList}>搜索</Button>
                  <Button style={{ marginLeft: '1em' }} onClick={this.resetSearch}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <h3>档案列表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={contractArchiveList}
                 loading={fetchingContractArchives || deletingContractArchive} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Table.Column title="合同" dataIndex="attachment" render={(attachment) => (
              <a href={getFileURL(attachment.id)} target="_blank">{attachment['file_name_local']}</a>
            )}/>
            <Table.Column title="关联项目" dataIndex="origin"
                          render={(origin) => (
                            <a target="_blank" href={`/approvalProject/edit/${origin.id}`}>{origin.name}</a>)}/>
            <Table.Column title="合同类型" dataIndex="category"/>
            <Table.Column title="是否结算" dataIndex="settlement"/>
            <Table.Column title="合同金额（元）" dataIndex="cash"/>
            <Table.Column title="差旅费（元）" dataIndex="travel_cash"/>
            <Table.Column title="所属年份" dataIndex="time"
                          render={(text) => (<span>{moment(1000 * text).format('YYYY')}</span>)}/>/>
            <Table.Column title="操作" dataIndex="action"
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
                        onChange={this.contractArchivesPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'ContractArchive' })(ContractArchive);

export default connect(({ loading, common, contractArchiveList }) => ({
  fetchingContractArchives: loading.effects['contractArchiveList/eLoadContracts'],
  deletingContractArchive: loading.effects['contractArchiveList/eDeleteContractArchive'],
  level: common.mine.level,
  routes: contractArchiveList.routes,
  searchParams: contractArchiveList.searchParams,
  total: contractArchiveList.contractArchives.total,
  current: contractArchiveList.contractArchives.current,
  pageSize: contractArchiveList.contractArchives.pageSize,
  contractArchiveList: contractArchiveList.contractArchives.list,
}))(WrappedForm);
