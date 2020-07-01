import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Switch, InputNumber } from 'antd';
import { limitDecimals } from '@/utils/transfer';

class EditExpert extends React.Component {
  hideEditExpert = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { editExpertVisible: false },
    });
  };
  submitEditedExpert = () => {
    const { dispatch, form, editExpert: { id } } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'experts/eEditExpert',
          id,
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, submittingEditedExpert, editExpertVisible, editExpert } = this.props;
    return (
      <Modal title="编辑专家信息" width={550} centered visible={editExpertVisible} confirmLoading={submittingEditedExpert}
             afterClose={() => this.props.form.resetFields()}
             onCancel={this.hideEditExpert}
             onOk={this.submitEditedExpert}>
        <Form layout="horizontal" labelCol={{ xs: 8 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="序号">
            {getFieldDecorator('num', { initialValue: editExpert['num'] })(
              <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}
                           placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: editExpert['name'],
              rules: [{ required: true, message: '姓名不能为空' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="身份证">
            {getFieldDecorator('card', { initialValue: editExpert['card'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="政府采购专家证号">
            {getFieldDecorator('procurement_num', { initialValue: editExpert['procurement_num'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="政府采购评审专业类别">
            {getFieldDecorator('procurement_category', { initialValue: editExpert['procurement_category'] })(
              <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1 }}/>,
            )}
          </Form.Item>
          <Form.Item label="四川省评标专家证号">
            {getFieldDecorator('law_num', { initialValue: editExpert['law_num'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="四川省评标专家评审类别">
            {getFieldDecorator('law_category', { initialValue: editExpert['law_category'] })(
              <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1 }}/>,
            )}
          </Form.Item>
          <Form.Item label="职称级别">
            {getFieldDecorator('level', { initialValue: editExpert['level'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="职称专业">
            {getFieldDecorator('profession', { initialValue: editExpert['profession'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="工作单位">
            {getFieldDecorator('unit', { initialValue: editExpert['unit'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('phone_inner', { initialValue: editExpert['phone_inner'] })(
              <Input.TextArea placeholder="请输入" autoSize={{ minRows: 1 }}/>,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('remarks', { initialValue: editExpert['remarks'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>

          <Form.Item label="状态">
            {getFieldDecorator('alive', {
              valuePropName: 'checked',
              initialValue: editExpert['alive'],
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

const WrappedForm = Form.create({ name: 'EditExpert' })(EditExpert);

export default connect(({ loading, experts }) => ({
  submittingEditedExpert: loading.effects['experts/eEditExpert'],
  editExpertVisible: experts.editExpertVisible,
  editExpert: experts.editExpert,
}))(WrappedForm);
