import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Row, Form, Col, Input, Cascader, Modal } from 'antd';
import moment from 'moment';
import UploadLaws from '@/pages/Law/components/UploadLaws';
import { getFileURL } from '@/utils/transfer';
import { LAWS_LABELS } from '../../../config/constant';

class LawsList extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'lawsList/eLoadLaws', payload: {} });
  }

  searchLawList = e => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'lawsList/rUpdateState',
      payload: { searchParams: { ...values }, laws: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'lawsList/eLoadLaws' });
    e.preventDefault();
  };
  resetSearch = e => {
    this.props.form.setFieldsValue({
      name: undefined,
      belong_to: [],
    });
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'lawsList/rUpdateState',
      payload: { searchParams: { ...values }, users: { current: 1, pageSize: 10 } },
    });
    this.props.dispatch({ type: 'lawsList/eLoadLaws' });
    e.preventDefault();
  };
  showUploadLawsModal = () => {
    this.props.dispatch({
      type: 'lawsList/rUpdateState',
      payload: { uploadLawsModalVisible: true },
    });
  };
  showDeleteConfirm = ({ id, creator: { name }, attachment: { file_name_local } }) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确定删除此资料',
      content: <p><b>{name}</b> 上传的的资料 <b>{file_name_local}</b></p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'lawsList/eDeleteLaw', id });
      },
    });
  };
  lawsPaginationChange = (page, pageSize) => {
    this.props.dispatch({
      type: 'lawsList/eLoadLaws',
      payload: { page, page_size: pageSize },
    });
  };

  render() {
    const { form: { getFieldDecorator }, fetchingLaws, deletingLaw, routes, level, searchParams, total, current, pageSize, lawsList } = this.props;
    return (
      <React.Fragment>
        <UploadLaws/>
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
          <Button icon="plus-circle" onClick={this.showUploadLawsModal}>上传</Button>
        </div>
        <div className="contentWrapper">
          <h3>资料搜索</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="文件名">
                  {getFieldDecorator('name', { initialValue: searchParams['name'] })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="法律法规类型">
                  {getFieldDecorator('belong_to', { initialValue: searchParams['belong_to'] })(
                    <Cascader options={LAWS_LABELS} expandTrigger="hover" placeholder="请选择"/>,
                  )}
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <div className="searchButtons">
                  <Button type="primary" onClick={this.searchLawList}>搜索</Button>
                  <Button style={{ marginLeft: '1em' }} onClick={this.resetSearch}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
          <h3>资料列表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={lawsList}
                 loading={fetchingLaws || deletingLaw} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Table.Column title="文件名" width={300} dataIndex="attachment"
                          render={(text, record) => (
                            <a href={getFileURL(record['attachment']['id'])} target="_blank">
                              {record['attachment']['file_name_local']}
                            </a>
                          )}/>
            <Table.Column title="类别" dataIndex="belong_to" width={150}
                          render={(belong_to, { belong_to_2 }) => (
                            belong_to_2 ?
                              <b>{belong_to + '-' + belong_to_2}</b>
                              :
                              <b>{belong_to}</b>
                          )}/>
            <Table.Column title="上传者" dataIndex="creator" width={80}
                          render={text => (<React.Fragment>{text['name']}</React.Fragment>)}/>
            <Table.Column title="上传时间" dataIndex="created_at" width={120}
                          render={text => (
                            <React.Fragment>{moment(text * 1000).format('YYYY-MM-DD')}</React.Fragment>
                          )}/>
            {
              level > 1 &&
              <Table.Column title="操作" dataIndex="action" width={80}
                            render={(text, record) => (
                              <div className="actionGroup">
                                <Button type="link" icon="delete" className="redButton"
                                        onClick={() => this.showDeleteConfirm(record)}>
                                  删除
                                </Button>
                              </div>
                            )}/>
            }
          </Table>
          <div className="paginationWrapper">
            <Pagination showQuickJumper total={total} current={current} pageSize={pageSize}
                        showTotal={() => `共 ${total} 条`}
                        onChange={this.lawsPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'lawsList' })(LawsList);

export default connect(({ loading, common, lawsList }) => ({
  fetchingLaws: loading.effects['lawsList/eLoadLaws'],
  deletingLaw: loading.effects['lawsList/DeleteLaw'],
  level: common.mine.level,
  routes: lawsList.routes,
  searchParams: lawsList.searchParams,
  total: lawsList.laws.total,
  current: lawsList.laws.current,
  pageSize: lawsList.laws.pageSize,
  lawsList: lawsList.laws.list,
}))(WrappedForm);
