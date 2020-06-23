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
    const { chooseExpertsNumProjectId: id } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'experts/eCreateProjectExpertsList',
          id,
          payload: { ...values, action: 'roll' },
        });
      }
    });
  };

  render() {
    const { submittingProject, form: { getFieldDecorator }, chooseExpertsNumVisible } = this.props;
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

const WrappedForm = Form.create({ name: 'ChooseExpertsNumber' })(ChooseExpertsNumber);

export default connect(({ loading, experts }) => ({
  submittingProject: loading.effects['experts/eCreateProject'],
  chooseExpertsNumVisible: experts.chooseExpertsNumVisible,
  chooseExpertsNumProjectId: experts.chooseExpertsNumProjectId,
}))(WrappedForm);
