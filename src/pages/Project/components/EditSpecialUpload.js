import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button } from 'antd';
import { SPECIAL_DEBT_FILE_TYPE } from '../../../../config/constant';

const { Option } = Select;

class EditSpecialUpload extends React.Component {

  hideUpdateFilesModal = () => {
    this.props.dispatch({ type: 'editSpecialDebt/rUpdateState', payload: { uploadVisible: false } });
  };
  submitCreatedFiles = () => {
    const { dispatch, form, editSpecialDebt } = this.props;
    const { id } = editSpecialDebt;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'editSpecialDebt/eUpdateFiles', id, payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingFiles, uploadVisible } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
    const uploadConfig = {
      multiple: true,
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const fileList = getFieldValue('fileList');
        fileList.splice(fileList.indexOf(file), 1);
        setFieldsValue({ fileList });
      },
    };
    return (
      <Modal title="上传项目相关文件" visible={uploadVisible} confirmLoading={uploadingFiles}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitCreatedFiles}
             onCancel={this.hideUpdateFilesModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="类别">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择类别' }],
            })(
              <Select showSearch placeholder="请选择">
                {SPECIAL_DEBT_FILE_TYPE.map((item) =>
                  <Option key={item.field} value={item.name}>{item.name}</Option>,
                )}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="文件资料">
            {getFieldDecorator('fileList', {
              rules: [{ required: true, message: '请选择文件' }],
              valuePropName: 'fileList',
              getValueFromEvent: (e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
            })(
              <Upload {...uploadConfig}>
                <Button>
                  选择文件 <Icon type="cloud-upload"/>
                </Button>
              </Upload>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'EditSpecialUpload' })(EditSpecialUpload);

export default connect(({ loading, editSpecialDebt }) => ({
  uploadingFiles: loading.effects['editSpecialDebt/eUpdateFiles'],
  uploadVisible: editSpecialDebt.uploadVisible,
  editSpecialDebt: editSpecialDebt.editSpecialDebt,
}))(WrappedForm);

