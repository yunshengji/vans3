import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

class CreateProject extends React.Component {

  hideCreateProject = () => {
    this.props.dispatch({
      type: 'experts/rUpdateState',
      payload: { createProjectVisible: false },
    });
  };

  submitCreatedProject = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'experts/eCreateProject',
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { submittingProject, form, createProjectVisible } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal title="新建项目" width={500} visible={createProjectVisible} confirmLoading={submittingProject}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitCreatedProject}
             onCancel={this.hideCreateProject}>
        <Form layout="horizontal" labelCol={{ xs: 5 }} wrapperCol={{ xs: 17 }}>
          <Form.Item label="记录表名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '记录表名称不能为空' }],
            })(
              <Input placeholder="如：四川省采购评审专家抽取结果记录表"/>,
            )}
          </Form.Item>
          <Form.Item label="项目编号">
            {getFieldDecorator('project_num', {
              rules: [{ required: true, message: '项目编号不能为空' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="项目名称">
            {getFieldDecorator('project_name', {
              rules: [{ required: true, message: '项目名称不能为空' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'createProject' })(CreateProject);

export default connect(({ loading, experts }) => ({
  submittingProject: loading.effects['experts/eCreateProject'],
  createProjectVisible: experts.createProjectVisible,
}))(WrappedForm);
