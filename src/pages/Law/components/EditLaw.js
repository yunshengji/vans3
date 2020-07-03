import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Cascader, Input } from 'antd';
import _ from 'lodash';
import { LAWS_LABELS } from '../../../../config/constant';

class EditLaw extends React.Component {
  hideEditLawModal = () => {
    this.props.dispatch({ type: 'lawsList/rUpdateState', payload: { editLawModalVisible: false } });
  };
  submitUpdatedLaws = () => {
    const { id, attachment } = this.props.editLaw;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { belong_to } = values;
        if (belong_to.length > 1) {
          values['belong_to'] = _.head(belong_to);
          values['belong_to_2'] = _.last(belong_to);
        } else {
          values['belong_to'] = _.head(belong_to);
        }
        this.props.dispatch({
          type: 'lawsList/eUpdateLaw',
          id,
          payload: { ...values, attachment: attachment['id'] },
        });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, updatingLaw, editLawModalVisible, editLaw } = this.props;
    const belongTo = [editLaw['belong_to'], editLaw['belong_to_2']];
    return (
      <Modal title="法律法规文件" visible={editLawModalVisible} confirmLoading={updatingLaw}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitUpdatedLaws}
             onCancel={this.hideEditLawModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="类别">
            {getFieldDecorator('belong_to', {
              initialValue: belongTo,
              rules: [{ required: true, message: '请选择类别' }],
            })(
              <Cascader options={LAWS_LABELS} expandTrigger="hover" placeholder="请选择"/>,
            )}
          </Form.Item>
          <Form.Item label="备注">
            {getFieldDecorator('label', {
              initialValue: editLaw['label'],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditLaw' })(EditLaw);

export default connect(({ loading, lawsList }) => ({
  updatingLaw: loading.effects['lawsList/eUpdateLaw'],
  editLawModalVisible: lawsList.editLawModalVisible,
  editLaw: lawsList.editLaw,
}))(WrappedForm);

