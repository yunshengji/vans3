import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, InputNumber } from 'antd';
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
    return false;
  };

  render() {
    const { submittingProject, form: { getFieldDecorator }, chooseExpertsNumVisible, chooseExpertsNumProjectCategory } = this.props;
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
          {
            chooseExpertsNumProjectCategory === '发改专家摇号' &&
            <Form.Item label="专家擅长专业">
              {getFieldDecorator('law_category', {})(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
          }
          {
            chooseExpertsNumProjectCategory === '采购专家摇号' &&
            <Form.Item label="专家擅长专业">
              {getFieldDecorator('procurement_category', {})(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
          }
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
  chooseExpertsNumProjectCategory: experts.chooseExpertsNumProjectCategory,
}))(WrappedForm);
