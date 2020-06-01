import React from 'react';
import { connect } from 'dva';
import { Modal, Form, InputNumber } from 'antd';
import { limitDecimals } from '@/utils/transfer';

class ChooseExpertsNumber extends React.Component {

  hideChooseExpertsNum = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { chooseExpertsNumVisible: false },
    });
  };

  submitChooseExpertsNum = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'experts/eCreateProjectExpertsList',
          payload: { ...values, action: 'roll' },
        });
      }
    });
  };

  render() {
    const { submittingProject, form, chooseExpertsNumVisible } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal title="确定专家人数" width={420} visible={chooseExpertsNumVisible} confirmLoading={submittingProject}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitChooseExpertsNum}
             onCancel={this.hideChooseExpertsNum}>
        <Form layout="horizontal" labelCol={{ xs: 12 }} wrapperCol={{ xs: 10 }}>
          <Form.Item label="项目参与专家人数">
            {getFieldDecorator('expert_num', {
              rules: [{ required: true, message: '专家人数不能为空' }],
            })(
              <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals}/>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'chooseExpertsNumber' })(ChooseExpertsNumber);

export default connect(({ loading, experts }) => ({
  submittingProject: loading.effects['experts/eCreateProject'],
  chooseExpertsNumVisible: experts.chooseExpertsNumVisible,
}))(WrappedForm);
