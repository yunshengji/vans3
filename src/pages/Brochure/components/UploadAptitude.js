import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Upload, Icon, Button, Input } from 'antd';

class UploadAptitude extends React.Component {
  hideUploadAptitudesModal = () => {
    this.props.dispatch({ type: 'aptitudeList/rUpdateState', payload: { uploadAptitudesModalVisible: false } });
  };
  submitCreatedAptitude = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
      dispatch({ type: 'aptitudeList/eUploadAptitudes', payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingAptitudes, uploadAptitudesModalVisible } = this.props;
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
      <Modal title="上传资质文件" visible={uploadAptitudesModalVisible} confirmLoading={uploadingAptitudes}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitCreatedAptitude}
             onCancel={this.hideUploadAptitudesModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="资质名称">
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="资质描述">
            {getFieldDecorator('remark', {
              initialValue: '',
            })(
              <Input.TextArea placeholder="请输入" autoSize={{ minRows: 4 }}/>,
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

const WrappedForm = Form.create({ name: 'UploadAptitude' })(UploadAptitude);

export default connect(({ loading, aptitudeList }) => ({
  uploadingAptitudes: loading.effects['aptitudeList/eUploadAptitudes'],
  uploadAptitudesModalVisible: aptitudeList.uploadAptitudesModalVisible,
}))(WrappedForm);

