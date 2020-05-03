import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import {
  Row,
  List, Input,
  Col,
  Button,
  Pagination,
  Skeleton, Form,
  Modal,
  message, Rate,
  Breadcrumb,
} from 'antd';
import moment from 'moment';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from './List.less';

const { confirm } = Modal;


class WorkDiariesList extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'workDiariesList/eGetWorkDiaries' });
  }

  showDeleteConfirm = ({ name, principal }) => {
    confirm({
      title: '确定删除此工作日志',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('删除成功');
      },
    });
  };
  usersPaginationChange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'WorkDiariesList/eGetUsers',
      payload: { page, pageSize },
    });
  };

  render() {
    const { fetchingWorkDiaries, routes, form, total, current, pageSize, workDiariesList } = this.props;
    const { getFieldDecorator } = form;
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator'];
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
          <Button type="primary" size="small" onClick={this.showCreateUserModal}>新建日志</Button>
        </div>
        <div className="contentWrapper">
          <Row gutter={[80]}>
            <Col md={9} sm={24}>
              <h3 style={{ marginBottom: '2em' }}>日志列表</h3>
              <List itemLayout="vertical" dataSource={workDiariesList}
                    renderItem={item => (
                      <List.Item className={styles.listItem}>
                        <Skeleton avatar title={false} loading={item.loading} active>
                          <List.Item.Meta
                            title={moment(1000 * item.created_at).format('YYYY-MM-DD') + '' + item.title}
                            description={
                              <React.Fragment>
                                重要性：<Rate disabled count={3} defaultValue={item.points}/>
                              </React.Fragment>}/>
                          <div className={styles.content}>
                            {item.content}
                          </div>
                        </Skeleton>
                      </List.Item>
                    )}
              />
              <div className="paginationWrapper">
                <Pagination showQuickJumper defaultCurrent={1} total={total} current={current} pageSize={pageSize}
                            showTotal={() => `共 ${total} 条`} onChange={this.usersPaginationChange}/>
              </div>
            </Col>
            <Col md={15} sm={24}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item label="日志标题">
                  {getFieldDecorator('title', {})(
                    <Input placeholder="请输入标题"/>,
                  )}
                </Form.Item>
                <Form.Item label="日志正文">
                  {getFieldDecorator('content', {
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('请输入正文内容');
                        } else {
                          callback();
                        }
                      },
                    }],
                  })(
                    <BraftEditor controls={controls} placeholder="请输入正文内容"
                                 contentStyle={{ boxShadow: '0 0 2px 2px rgba(0,0,0,.04)' }}/>,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'createWorkDiary' })(WorkDiariesList);

export default connect(({ loading, workDiariesList }) => ({
  fetchingWorkDiaries: loading.effects['WorkDiariesList/eGetWorkDiaries'],
  workDiariesList: workDiariesList.workDiaries.list,
  workDiariesListPagination: workDiariesList.workDiaries.pagination,
  routes: workDiariesList.routes,
  createUserModalVisible: workDiariesList.createUserModalVisible,
  total: workDiariesList.workDiaries.total,
  current: workDiariesList.workDiaries.current,
  pageSize: workDiariesList.workDiaries.pageSize,
  usersList: workDiariesList.workDiaries.list,
}))(WrappedForm);
