import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

class ChooseGroupExpertProperty extends React.Component {

  hideChooseExpertsNum = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { chooseNewExpertVisible: false },
    });
  };

  submitChooseExpertsNum = (e) => {
    const { dispatch, chooseNewExpertProjectId, exitsExpertList, chooseNewExpertDetail } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'experts/eRemoveExpertFromProject',
          payload: {
            id: chooseNewExpertProjectId,
            expertsList: exitsExpertList,
            record: chooseNewExpertDetail,
            values,
          },
        });
      }
    });
    e.preventDefault();
  };

  render() {
    const { form: { getFieldDecorator }, removingExpertFromProject, chooseNewExpertVisible, chooseNewExpertProjectType, exitsExpertList } = this.props;
    return (
      <Modal title="填写专家擅长专业" width={420} visible={chooseNewExpertVisible} confirmLoading={removingExpertFromProject}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitChooseExpertsNum}
             onCancel={this.hideChooseExpertsNum}>
        <Form layout="horizontal" labelCol={{ xs: 7 }} wrapperCol={{ xs: 15 }}>
          {
            chooseNewExpertProjectType === '发改专家摇号' &&
            <Form.Item label="专家擅长专业">
              {getFieldDecorator('law_category', {})(
                <Input placeholder="请输入"/>,
              )}
            </Form.Item>
          }
          {
            chooseNewExpertProjectType === '采购专家摇号' &&
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

const WrappedForm = Form.create({ name: 'ChooseExpertsNumber' })(ChooseGroupExpertProperty);

export default connect(({ loading, experts }) => ({
  removingExpertFromProject: loading.effects['experts/eRemoveExpertFromProject'],
  chooseNewExpertVisible: experts.chooseNewExpertVisible,
  chooseNewExpertProjectId: experts.chooseNewExpertProjectId,
  chooseNewExpertProjectType: experts.chooseNewExpertProjectType,
  exitsExpertList: experts.exitsExpertList,
  chooseNewExpertDetail: experts.chooseNewExpertDetail,
}))(WrappedForm);
