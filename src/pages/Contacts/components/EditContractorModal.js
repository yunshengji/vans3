import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

class EditContractorModal extends React.Component {

  hideEditContractorModal = () => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { editContractorModalVisible: false },
    });
  };

  submitEditedContractor = () => {
    const { dispatch, form, editContractorForm } = this.props;
    const { id } = editContractorForm;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'contactsList/eUpdateContractor', id, payload: { ...values } });
      }
    });
  };

  render() {
    const { updatingContractor, form, editContractorModalVisible, editContractorForm } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal title="修改合作伙伴信息" visible={editContractorModalVisible} confirmLoading={updatingContractor}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitEditedContractor}
             onCancel={this.hideEditContractorModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: editContractorForm['name'],
              rules: [
                { required: true, message: '姓名不能为空' },
              ],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', { initialValue: editContractorForm['gender'] })(
              <Select placeholder="请选择">
                <Option key="unknown" value="unknown">不清楚</Option>
                <Option key="male" value="male">男</Option>
                <Option key="female" value="female">女</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="公司">
            {getFieldDecorator('company', { initialValue: editContractorForm['company'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="职务">
            {getFieldDecorator('job_title', { initialValue: editContractorForm['job_title'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="手机号码">
            {getFieldDecorator('phone', { initialValue: editContractorForm['phone'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="微信">
            {getFieldDecorator('wx', { initialValue: editContractorForm['wx'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              initialValue: editContractorForm['email'],
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

const WrappedForm = Form.create({ name: 'editContractor' })(EditContractorModal);

export default connect(({ loading, contactsList }) => ({
  updatingContractor: loading.effects['contactsList/eUpdateContractor'],
  editContractorModalVisible: contactsList.editContractorModalVisible,
  editContractorForm: contactsList.editContractorForm,
}))(WrappedForm);
