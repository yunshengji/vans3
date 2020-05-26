import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

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
    const { form, submittingEditedExpert, editExpertVisible, editExpert } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal title="编辑专家" width={420} visible={editExpertVisible} afterClose={() => this.props.form.resetFields()}
             confirmLoading={submittingEditedExpert}
             onOk={this.submitEditedExpert} onCancel={this.hideEditExpert}>
        <Form layout="horizontal" labelCol={{ xs: 5 }} wrapperCol={{ xs: 17 }}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: editExpert['name'],
              rules: [{ required: true, message: '姓名不能为空' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="采购证号">
            {getFieldDecorator('procurement_num', {
              initialValue: editExpert['procurement_num'],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="法改证号">
            {getFieldDecorator('law_num', {
              initialValue: editExpert['law_num'],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="库内号码">
            {getFieldDecorator('phone_inner', {
              initialValue: editExpert['phone_inner'],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="库外号码">
            {getFieldDecorator('phone_outer', {
              initialValue: editExpert['phone_outer'],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'editExpert' })(EditExpert);

export default connect(({ loading, experts }) => ({
  submittingEditedExpert: loading.effects['experts/eEditExpert'],
  editExpertVisible: experts.editExpertVisible,
  editExpert: experts.editExpert,
}))(WrappedForm);
