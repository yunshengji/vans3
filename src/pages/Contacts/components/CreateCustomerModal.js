import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select, Switch, Rate } from 'antd';

class CreateCustomerModal extends React.Component {

  hideCreateCustomerModal = () => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { createCustomerModalVisible: false },
    });
  };

  submitCreatedCustomer = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'contactsList/eCreateCustomer',
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, creatingCustomer, createCustomerModalVisible } = this.props;
    return (
      <Modal title="新建客户" visible={createCustomerModalVisible} confirmLoading={creatingCustomer}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitCreatedCustomer}
             onCancel={this.hideCreateCustomerModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '姓名不能为空' },
              ],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', { rules: [{ required: true, message: '请选择性别' }] })(
              <Select placeholder="请选择">
                <Select.Option key="male" value="male">男</Select.Option>
                <Select.Option key="female" value="female">女</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="地区">
            {getFieldDecorator('area', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="公司">
            {getFieldDecorator('company', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="职务">
            {getFieldDecorator('job_title', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="手机号码">
            {getFieldDecorator('phone', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="微信">
            {getFieldDecorator('wx', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ type: 'email', message: '请填写符合格式的邮箱地址' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="客户特点">
            {getFieldDecorator('personality', {})(
              <Input.TextArea placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('description', {})(
              <Input.TextArea placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="重点关注度">
            {getFieldDecorator('points', {})(
              <Rate count={3}/>,
            )}
          </Form.Item>
          <Form.Item label="客户信息">
            {getFieldDecorator('private', {
              valuePropName: 'checked',
              initialValue: true,
              rules: [{ required: true }],
            })(
              <Switch checkedChildren="不公开" unCheckedChildren="公开"/>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'CreateCustomerModal' })(CreateCustomerModal);

export default connect(({ loading, contactsList }) => ({
  creatingCustomer: loading.effects['contactsList/eCreateCustomer'],
  createCustomerModalVisible: contactsList.createCustomerModalVisible,
}))(WrappedForm);
