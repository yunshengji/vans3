import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Switch, InputNumber } from 'antd';
import { limitDecimals } from '@/utils/transfer';

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
    return false;
  };

  render() {
    const { submittingExpert, form: { getFieldDecorator }, createExpertVisible } = this.props;
    return (
      <Modal title="新建专家" width={550} centered visible={createExpertVisible} confirmLoading={submittingExpert}
             afterClose={() => this.props.form.resetFields()}
             onCancel={this.hideCreateExpert}
             onOk={this.submitCreatedExpert}>
        <Form layout="horizontal" labelCol={{ xs: 8 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="序号">
            {getFieldDecorator('num', {})(
              <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}
                           placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '姓名不能为空' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="身份证">
            {getFieldDecorator('card', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="政府采购专家证号">
            {getFieldDecorator('procurement_num', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="政府采购评审专业类别">
            {getFieldDecorator('procurement_category', {})(
              <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1 }}/>,
            )}
          </Form.Item>
          <Form.Item label="四川省评标专家证号">
            {getFieldDecorator('law_num', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="四川省评标专家评审类别">
            {getFieldDecorator('law_category', {})(
              <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1 }}/>,
            )}
          </Form.Item>
          <Form.Item label="职称级别">
            {getFieldDecorator('level', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="职称专业">
            {getFieldDecorator('profession', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="工作单位">
            {getFieldDecorator('unit', {})(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('phone_inner', {})(
              <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1 }}/>,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('remarks', {})(
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
