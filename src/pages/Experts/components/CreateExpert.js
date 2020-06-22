import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Switch } from 'antd';

class CreateExpert extends React.Component {

  hideCreateExpert = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { createExpertVisible: false },
    });
  };

  submitCreatedExpert = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'experts/eCreateExpert',
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { submittingExpert, form: { getFieldDecorator }, createExpertVisible } = this.props;
    return (
      <Modal title="新建专家" width={420} visible={createExpertVisible} confirmLoading={submittingExpert}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitCreatedExpert}
             onCancel={this.hideCreateExpert}>
        <Form layout="horizontal" labelCol={{ xs: 5 }} wrapperCol={{ xs: 17 }}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '姓名不能为空' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="采购证号">
            {getFieldDecorator('procurement_num', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="发改证号">
            {getFieldDecorator('law_num', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="库内号码">
            {getFieldDecorator('phone_inner', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="库外号码">
            {getFieldDecorator('phone_outer', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('alive', {
              valuePropName: 'checked',
              initialValue: true,
              rules: [{ required: true }],
            })(
              <Switch checkedChildren="正常" unCheckedChildren="不可用"/>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'CreateExpert' })(CreateExpert);

export default connect(({ loading, experts }) => ({
  submittingExpert: loading.effects['experts/eCreateExpert'],
  createExpertVisible: experts.createExpertVisible,
}))(WrappedForm);
