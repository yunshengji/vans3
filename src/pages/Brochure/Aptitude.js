import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Button, Table, Pagination, Breadcrumb, Row, Form, Col, Select, Modal } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import UploadAptitude from '@/pages/Brochure/components/UploadAptitude';
import { getFileURL } from '@/utils/transfer';
import { PAMPHLET_CATEGORIES } from '../../../config/constant';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;


class Aptitude extends React.Component {
  componentDidMount() {
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'aptitudeList/eGetAptitudes',
      payload: { page: current, page_size: pageSize },
    });
  }

  showUploadAptitudesModal = () => {
    this.props.dispatch({
      type: 'aptitudeList/rUpdateState',
      payload: { uploadAptitudesModalVisible: true },
    });
  };
  // searchLawsList = () => {
  //   const values = this.props.form.getFieldsValue();
  //   const { dispatch, current, pageSize } = this.props;
  //   dispatch({
  //     type: 'aptitudeList/eGetAptitudes',
  //     payload: { page: current, page_size: pageSize, ...values },
  //   });
  // };
  showDeleteConfirm = ({ id, attachment: { file_name_local } }) => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除此资质',
      content: <p>文件 <b>《{file_name_local}》</b> 删除后将无法恢复</p>,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({ type: 'aptitudeList/eDeleteAptitude', id });
      },
    });
  };
  aptitudesPaginationChange = (page, pageSize) => {
    const values = this.props.form.getFieldsValue();
    this.props.dispatch({
      type: 'aptitudeList/eGetAptitudes',
      payload: { page, page_size: pageSize, ...values },
    });
  };

  render() {
    const { form, fetchingAptitudes, deletingAptitude, routes, level, belong_to, total, current, pageSize, aptitudeList } = this.props;
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
          <Button type="link" size="small" onClick={this.showUploadAptitudesModal}>上传</Button>
        </div>
        <UploadAptitude/>
        <div className="contentWrapper">
          <h3>资质筛选</h3>
          <Form layout="horizontal" className="searchWrapper">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="类别">
                  {form.getFieldDecorator('belong_to', {
                    initialValue: belong_to,
                  })(
                    <Select placeholder="请选择">
                      <Option key="全部" value="">全部</Option>
                      {PAMPHLET_CATEGORIES.map((item) =>
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
          <h3>资质列表</h3>
          <Table tableLayout="fixed" size="middle" pagination={false} dataSource={aptitudeList}
                 loading={fetchingAptitudes || deletingAptitude} rowKey={record => record.id}
                 rowClassName={(record, index) => {
                   if (index % 2 === 1) {
                     return 'zebraHighlight';
                   }
                 }}>
            <Column title="资质名称" dataIndex="name"/>
            <Column title="资质描述" dataIndex="remark"/>
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
            <Column title="创建日期" dataIndex="created_at"
                    render={(text) => (<span>{moment(1000 * text).format('YYYY-MM-DD')}</span>)}/>
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
                        onChange={this.aptitudesPaginationChange}/>
          </div>
        </div>
      </React.Fragment>
    )
      ;
  }
}

const WrappedForm = Form.create({ name: 'Aptitude' })(Aptitude);

export default connect(({ loading, common, aptitudeList }) => ({
  fetchingAptitudes: loading.effects['aptitudeList/eGetAptitudes'],
  deletingAptitude: loading.effects['aptitudeList/eDeleteAptitude'],
  level: common.mine.level,
  routes: aptitudeList.routes,
  belong_to: aptitudeList.searchParams.belong_to,
  total: aptitudeList.aptitudes.total,
  current: aptitudeList.aptitudes.current,
  pageSize: aptitudeList.aptitudes.pageSize,
  aptitudeList: aptitudeList.aptitudes.list,
}))(WrappedForm);