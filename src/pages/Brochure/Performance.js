import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Row, Form, Col, Input, Select, Modal } from 'antd';
import moment from 'moment';
import UploadPerformance from '@/pages/Brochure/components/UploadPerformance';
import { getFileURL } from '@/utils/transfer';
import { PERFORMANCE_CATEGORIES } from '../../../config/constant';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;


class Performance extends React.Component {
  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'performanceList/eGetPerformances',
      payload: { page: current, page_size: pageSize },
    });
  }

  showUploadPerformancesModal = () => {
    this.props.dispatch({
      type: 'performanceList/rUpdateState',
      payload: { uploadPerformancesModalVisible: true },
    });
  };
  // searchLawsList = () => {
  //   const values = this.props.form.getFieldsValue();
  //   const { dispatch, current, pageSize } = this.props;
  //   dispatch({
  //     type: 'performanceList/eGetPerformances',
  //     payload: { page: current, page_size: pageSize, ...values },
  //   });
  // };
  showDeleteConfirm = ({ id, attachment: { file_name_local } }) => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除此宣传册',
      content: <p>文件 <b>《{file_name_local}》</b> 删除后将无法恢复</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'performanceList/eDeletePerformance', id });
      },
    });
  };
  performancesPaginationChange = (page, pageSize) => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'performanceList/eGetPerformances',
      payload: { page, page_size: pageSize, ...values },
    });
  };

  render() {
    const { form, fetchingPerformances, deletingPerformance, routes, level, belong_to, total, current, pageSize, performanceList } = this.props;
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
          <Button type="link" size="small" onClick={this.showUploadPerformancesModal}>上传</Button>
        </div>
        <UploadPerformance/>
        <div className="contentWrapper">
          <h3>业绩表筛选</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="类别">
                  {form.getFieldDecorator('belong_to', {
                    initialValue: belong_to,
                  })(
                    <Select placeholder="请选择">
                      <Option key="全部" value="">全部</Option>
                      {PERFORMANCE_CATEGORIES.map((item) =>
                        <Option key={item} value={item}>{item}</Option>,
                      )}
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
          <h3>业绩表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={performanceList}
                 loading={fetchingPerformances || deletingPerformance} rowKey={record => record.id}>
            <Column title="文件名" dataIndex="attachment" render={(text, record) => (
              <a href={getFileURL(record['attachment']['id'])}
                 target="_blank">{record['attachment']['file_name_local']}</a>
            )}/>
            <Column title="类别" dataIndex="category" render={text => (<b>{text}</b>)}/>
            <Column title="上传者" dataIndex="creator" render={(text, record) => (
              <React.Fragment>{record['attachment']['creator']['name']}</React.Fragment>)}/>
            <Column title="上传时间" dataIndex="created_at"
                    render={text => (<React.Fragment>{moment(text * 1000).format('YYYY-MM-DD')}</React.Fragment>)}/>
            {
              level > 1 &&
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
            }
          </Table>
          <div className="paginationWrapper">
            <Pagination showQuickJumper total={total} current={current} pageSize={pageSize}
                        showTotal={() => `共 ${total} 条`}
                        onChange={this.performancesPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'Performance' })(Performance);

export default connect(({ loading, common, performanceList }) => ({
  fetchingPerformances: loading.effects['performanceList/eGetPerformances'],
  deletingPerformance: loading.effects['performanceList/eDeletePerformance'],
  level: common.mine.level,
  routes: performanceList.routes,
  belong_to: performanceList.searchParams.belong_to,
  total: performanceList.performances.total,
  current: performanceList.performances.current,
  pageSize: performanceList.performances.pageSize,
  performanceList: performanceList.performances.list,
}))(WrappedForm);
