import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select, Switch, Rate } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class EditCustomerModal extends React.Component {

  hideEditCustomerModal = () => {
    this.props.dispatch({
      type: 'contactsList/rUpdateState',
      payload: { editCustomerModalVisible: false },
    });
  };

  submitEditedCustomer = () => {
    const { dispatch, form, editCustomerForm } = this.props;
    const { id } = editCustomerForm;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'contactsList/eUpdateCustomer', id, payload: { ...values } });
      }
    });
  };

  render() {
    const { updatingCustomer, form, editCustomerModalVisible, editCustomerForm } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal title="修改客户信息" visible={editCustomerModalVisible} confirmLoading={updatingCustomer}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitEditedCustomer}
             onCancel={this.hideEditCustomerModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: editCustomerForm['name'],
              rules: [
                { required: true, message: '姓名不能为空' },
              ],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', { initialValue: editCustomerForm['gender'] })(
              <Select placeholder="请选择">
                <Option key="unknown" value="unknown">不清楚</Option>
                <Option key="male" value="male">男</Option>
                <Option key="female" value="female">女</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="地区">
            {getFieldDecorator('area', { initialValue: editCustomerForm['area'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="公司">
            {getFieldDecorator('company', { initialValue: editCustomerForm['company'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="职务">
            {getFieldDecorator('job_title', { initialValue: editCustomerForm['job_title'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="手机号码">
            {getFieldDecorator('phone', { initialValue: editCustomerForm['phone'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="微信">
            {getFieldDecorator('wx', { initialValue: editCustomerForm['wx'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              initialValue: editCustomerForm['email'],
              rules: [{ type: 'email', message: '请填写符合格式的邮箱地址' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="客户特点">
            {getFieldDecorator('personality', { initialValue: editCustomerForm['personality'] })(
              <TextArea placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('description', { initialValue: editCustomerForm['description'] })(
              <TextArea placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="重点关注度">
            {getFieldDecorator('points', { initialValue: editCustomerForm['points'] })(
              <Rate count={3}/>,
            )}
          </Form.Item>
          <Form.Item label="客户信息">
            {getFieldDecorator('private', {
              valuePropName: 'checked',
              initialValue: !!editCustomerForm['private'],
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

const WrappedForm = Form.create({ name: 'editCustomer' })(EditCustomerModal);

export default connect(({ loading, contactsList }) => ({
  updatingCustomer: loading.effects['contactsList/eUpdateCustomer'],
  editCustomerModalVisible: contactsList.editCustomerModalVisible,
  editCustomerForm: contactsList.editCustomerForm,
}))(WrappedForm);
