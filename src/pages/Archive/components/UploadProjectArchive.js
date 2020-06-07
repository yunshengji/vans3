import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button, Input } from 'antd';
import { PAMPHLET_CATEGORIES } from '../../../../config/constant';

class UploadPamphlet extends React.Component {
  hideUploadPamphletsModal = () => {
    this.props.dispatch({ type: 'pamphletList/rUpdateState', payload: { uploadPamphletsModalVisible: false } });
  };
  submitCreatedPamphlet = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'pamphletList/eUploadPamphlets', payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingPamphlets, uploadPamphletsModalVisible } = this.props;
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
      <Modal title="上传资质文件" visible={uploadPamphletsModalVisible} confirmLoading={uploadingPamphlets}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitCreatedPamphlet}
             onCancel={this.hideUploadPamphletsModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="资质名称">
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Input placeholder="请输入"/>
            )}
          </Form.Item>
          <Form.Item label="资质描述">
            {getFieldDecorator('remark', {
              initialValue: '',
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Input.TextArea placeholder="请输入"/>
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

const WrappedForm = Form.create({ name: 'UploadPamphlet' })(UploadPamphlet);

export default connect(({ loading, pamphletList }) => ({
  uploadingPamphlets: loading.effects['pamphletList/eUploadPamphlets'],
  uploadPamphletsModalVisible: pamphletList.uploadPamphletsModalVisible,
}))(WrappedForm);

