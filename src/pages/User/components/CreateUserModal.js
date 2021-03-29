import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select } from 'antd';

class CreateUserModal extends React.Component {

  hideCreateUserModal = () => {
    this.props.dispatch({
      type: 'userList/rUpdateState',
      payload: { createUserModalVisible: false },
    });
  };

  submitCreatedUser = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'userList/eCreateUser',
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, submittingUser, departments, createUserModalVisible } = this.props;
    return (
      <React.Fragment>
        <Modal title="创建用户" width={420} visible={createUserModalVisible} confirmLoading={submittingUser}
               afterClose={() => this.props.form.resetFields()}
               onOk={this.submitCreatedUser}
               onCancel={this.hideCreateUserModal}>
          <Form layout="horizontal" labelCol={{ xs: 5 }} wrapperCol={{ xs: 17 }}>
            <Form.Item label="姓名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '姓名不能为空' }],
              })(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
            <Form.Item label="部门">
              {getFieldDecorator('department', {
                rules: [{ required: true, message: '部门不能为空' }],
              })(
                <Select placeholder="请选择">
                  {departments.map(item =>
                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>,
                  )}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="权限">
              {getFieldDecorator('level', {
                initialValue: 1,
                rules: [{ required: true, message: '权限不能为空' }],
              })(
                <Select placeholder="请选择">
                  <Select.Option value={1}>普通权限</Select.Option>
                  <Select.Option value={2}>主管权限</Select.Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="账号">
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: '账号不能为空' },
                  { min: 5, message: '账号长度不能少于 5 位！' },
                  { max: 20, message: '账号长度不能多于 20 位！！' },
                ],
              })(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '请输入密码！' },
                  { min: 5, message: '密码长度不能少于 5 位！' },
                ],
              })(
                <Input placeholder="请输入" type="password"/>,
              )}
            </Form.Item>
            <Form.Item label="手机号码">
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请填写符合格式的手机号码' },
                ],
              })(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  { type: 'email', message: '请填写符合格式的邮箱地址' },
                  { required: true, message: '邮箱为必填' },
                ],
              })(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'CreateUserModal' })(CreateUserModal);

export default connect(({ loading, userList }) => ({
  submittingUser: loading.effects['userList/eCreateUser'],
  departments: userList.departments,
  createUserModalVisible: userList.createUserModalVisible,
}))(WrappedForm);
