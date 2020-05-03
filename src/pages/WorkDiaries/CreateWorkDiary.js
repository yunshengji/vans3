import React from 'react';
import { connect } from 'dva';
import { Row, Col, Rate, Form, Modal, Select, Input, Button, message } from 'antd';
import CreateHeader from '@/pages/WorkDiaries/components/CreateHeader';

const { TextArea } = Input;
const { confirm } = Modal;
const { Option } = Select;


class CreateWorkDiary extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'WorkDiariesList/eGetUsers' });
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
    const { fetchingUsersData, WorkDiariesList, WorkDiariesListPagination } = this.props;
    return (
      <div>
        <CreateHeader/>
        <div className="contentWrapper">
          <h3>基本信息</h3>
          <Form layout="horizontal">
            <Row gutter={[80]}>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="标题">
                  <Input placeholder="请输入"/>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="同行人员">
                  <Select mode="tags">
                    <Option key="a">张三</Option>
                    <Option key="b">李四</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={6} md={12} sm={24}>
                <Form.Item label="重点跟踪标注">
                  <Rate count={3} onChange={this.handleChange} value={1}/>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <h3 style={{ marginBottom: '1.5em' }}>日志内容</h3>
          <Row gutter={[80]}>
            <Col md={16} sm={24}>
              <TextArea rows={15} placeholder="编辑出差内容"/>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: '4em' }}>
            <Col md={4} xs={24}>
              <Button type="primary" block>
                发布
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default connect(({ loading, WorkDiariesList }) => ({
  fetchingUsersData: loading.effects['WorkDiariesList/eGetUsers'],
  WorkDiariesList: WorkDiariesList.users.list,
  WorkDiariesListPagination: WorkDiariesList.users.pagination,
}))(CreateWorkDiary);
