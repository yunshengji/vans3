import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button } from 'antd';
import { LAWS_LABELS } from '../../../../config/constant';

class UploadLaws extends React.Component {
  hideUploadLawsModal = () => {
    this.props.dispatch({ type: 'lawsList/rUpdateState', payload: { uploadLawsModalVisible: false } });
  };
  submitCreatedLaws = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({ type: 'lawsList/eUploadLaws', payload: { ...values } });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator, getFieldValue, setFieldsValue }, uploadingLaws, uploadLawsModalVisible } = this.props;
    const uploadConfig = {
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const fileList = getFieldValue('fileList');
        fileList.splice(fileList.indexOf(file), 1);
        setFieldsValue({ fileList });
      },
    };
    return (
      <Modal title="上传法律法规文件" visible={uploadLawsModalVisible} confirmLoading={uploadingLaws}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitCreatedLaws}
             onCancel={this.hideUploadLawsModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="类别">
            {getFieldDecorator('belong_to', {
              initialValue: '其他',
              rules: [{ required: true, message: '请选择类别' }],
            })(
              <Select placeholder="请选择">
                {LAWS_LABELS.map((item) =>
                  <Select.Option key={item} value={item}>{item}</Select.Option>,
                )}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="文件资料">
            {getFieldDecorator('fileList', {
              rules: [{ required: true, message: '请选择文件' }],
              valuePropName: 'fileList',
              getValueFromEvent: ({ file }) => [file],
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

const WrappedForm = Form.create({ name: 'UploadLaws' })(UploadLaws);

export default connect(({ loading, lawsList }) => ({
  uploadingLaws: loading.effects['lawsList/eUploadLaws'],
  uploadLawsModalVisible: lawsList.uploadLawsModalVisible,
}))(WrappedForm);
