import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button } from 'antd';
import { PERFORMANCE_CATEGORIES } from '../../../../config/constant';

class UploadPerformance extends React.Component {
  hideUploadPerformancesModal = () => {
    this.props.dispatch({ type: 'performanceList/rUpdateState', payload: { uploadPerformancesModalVisible: false } });
  };
  submitCreatedPerformance = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'performanceList/eUploadPerformances', payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingPerformances, uploadPerformancesModalVisible } = this.props;
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
      <Modal title="上传业绩文件" visible={uploadPerformancesModalVisible} confirmLoading={uploadingPerformances}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitCreatedPerformance}
             onCancel={this.hideUploadPerformancesModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="类别">
            {getFieldDecorator('category', {
              initialValue: '',
              rules: [{ required: true, message: '请选择类别' }],
            })(
              <Select placeholder="请选择">
                {PERFORMANCE_CATEGORIES.map((item) =>
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

const WrappedForm = Form.create({ name: 'UploadPerformance' })(UploadPerformance);

export default connect(({ loading, performanceList }) => ({
  uploadingPerformances: loading.effects['performanceList/eUploadPerformances'],
  uploadPerformancesModalVisible: performanceList.uploadPerformancesModalVisible,
}))(WrappedForm);

