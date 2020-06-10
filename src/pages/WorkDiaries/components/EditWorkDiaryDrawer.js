import React from 'react';
import { connect } from 'dva';
import { Drawer, Form, Modal, Spin, Input, Rate, Button } from 'antd';
import moment from 'moment';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import styles from '../List.less';

class EditWorkDiaryDrawer extends React.Component {
  componentDidMount() {
    const { editWorkDiary } = this.props;
    this.props.form.setFieldsValue({
      content: BraftEditor.createEditorState(editWorkDiary.content),
    });
  }

  closeDrawer = () => {
    this.props.dispatch({
      type: 'workDiariesList/rUpdateState',
      payload: { editWorkDiaryDrawerVisible: false },
    });
  };
  deleteWorkDiary = () => {
    const { dispatch, editWorkDiary } = this.props;
    const { id } = editWorkDiary;
    Modal.confirm({
      title: '确定删除此工作日志',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'workDiariesList/eDeleteWorkDiary',
          payload: { id },
        });
      },
    });
  };
  handleSubmit = e => {
    const { dispatch, form, editWorkDiary: { id } } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'workDiariesList/eEditWorkDiary',
          id,
          payload: {
            title: values.title,
            points: values.points,
            content: values.content.toRAW(),
          },
        });
      }
    });
  };

  render() {
    const { deletingWorkDiary, updatingWorkDiary, form, editWorkDiaryDrawerVisible, editWorkDiary } = this.props;
    const { getFieldDecorator } = form;
    const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link'];
    return (
      <React.Fragment>
        <Drawer title="修改日志" className="editDrawerWrapper" width={650} onClose={this.closeDrawer}
                visible={editWorkDiaryDrawerVisible}>
          <Spin spinning={Boolean(deletingWorkDiary) || Boolean(updatingWorkDiary)}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="修改时间">
                <span>{moment(1000 * editWorkDiary['created_at']).format('YYYY-MM-DD HH:mm')}</span>
              </Form.Item>
              <Form.Item label="日志标题">
                {getFieldDecorator('title', {
                  initialValue: editWorkDiary.title,
                })(
                  <Input placeholder="请输入标题"/>,
                )}
              </Form.Item>
              <Form.Item label="重要性">
                {getFieldDecorator('points', {
                  initialValue: editWorkDiary.points,
                })(
                  <Rate count={3}/>,
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
                  <BraftEditor controls={controls} contentStyle={{ height: '40vh' }} className={styles.editWrapper}
                               placeholder="请输入正文内容"/>,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSubmit}>更新</Button>
                <Button type="danger" onClick={this.deleteWorkDiary} style={{ marginLeft: '1em' }}>删除</Button>
              </Form.Item>
            </Form>
          </Spin>
        </Drawer>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditWorkDiaryDrawer' })(EditWorkDiaryDrawer);

export default connect(({ loading, workDiariesList }) => ({
  deletingWorkDiary: loading.effects['workDiariesList/eDeleteWorkDiary'],
  updatingWorkDiary: loading.effects['workDiariesList/eEditWorkDiary'],
  editWorkDiaryDrawerVisible: workDiariesList.editWorkDiaryDrawerVisible,
  editWorkDiary: workDiariesList.editWorkDiary,
}))(WrappedForm);
