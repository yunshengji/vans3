import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button } from 'antd';
import { LAWS_LABELS } from '../../../../config/constant';

const { Option } = Select;

class UploadLaws extends React.Component {

  hideUploadLawsModal = () => {
    this.props.dispatch({ type: 'lawsList/rUpdateState', payload: { uploadLawsModalVisible: false } });
  };

  submitCreatedLaws = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'lawsList/eUploadLaws', payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingLaws, uploadLawsModalVisible } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
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
            })(
              <Select placeholder="请选择">
                {LAWS_LABELS.map((item) =>
                  <Option key={item} value={item}>{item}</Option>,
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
                  <Icon type="upload"/> 选择文件
                </Button>
              </Upload>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'setting' })(UploadLaws);

export default connect(({ loading, lawsList }) => ({
  uploadingLaws: loading.effects['lawsList/eUploadLaws'],
  uploadLawsModalVisible: lawsList.uploadLawsModalVisible,
}))(WrappedForm);

