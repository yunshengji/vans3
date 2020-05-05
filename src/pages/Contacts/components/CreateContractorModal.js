import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

class CreateContractorModal extends React.Component {

  hideCreateContractorModal = () => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { createContractorModalVisible: false },
    });
  };

  submitCreatedContractor = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'contactsList/eCreateContractor',
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { creatingContractor, form, createContractorModalVisible } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal title="新建合作伙伴" visible={createContractorModalVisible} confirmLoading={creatingContractor}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitCreatedContractor}
             onCancel={this.hideCreateContractorModal}>
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
            {getFieldDecorator('gender', { initialValue: 'unknown' })(
              <Select placeholder="请选择">
                <Option key="unknown" value="unknown">不清楚</Option>
                <Option key="male" value="male">男</Option>
                <Option key="female" value="female">女</Option>
              </Select>,
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
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'createCustomer' })(CreateContractorModal);

export default connect(({ loading, contactsList }) => ({
  creatingContractor: loading.effects['contactsList/eCreateContractor'],
  createContractorModalVisible: contactsList.createContractorModalVisible,
}))(WrappedForm);
