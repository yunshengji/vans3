import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button, Input, Col, Row } from 'antd';

class UploadProjectArchive extends React.Component {
  hideUploadProjectArchivesModal = () => {
    this.props.dispatch({
      type: 'projectArchiveList/rUpdateState',
      payload: { uploadProjectArchivesModalVisible: false },
    });
  };
  submitCreatedProjectArchive = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'projectArchiveList/eUploadProjectArchives', payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingProjectArchives, uploadProjectArchivesModalVisible } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
    const uploadOrdinaryConfig = {
      multiple: true,
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const fileListOrdinary = getFieldValue('fileListOrdinary');
        fileListOrdinary.splice(fileListOrdinary.indexOf(file), 1);
        setFieldsValue({ fileListOrdinary });
      },
    };
    const uploadDetailConfig = {
      multiple: true,
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const fileListDetail = getFieldValue('fileListDetail');
        fileListDetail.splice(fileListDetail.indexOf(file), 1);
        setFieldsValue({ fileListDetail });
      },
    };
    return (
      <Modal title="上传资质文件" visible={uploadProjectArchivesModalVisible} confirmLoading={uploadingProjectArchives}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitCreatedProjectArchive}
             onCancel={this.hideUploadProjectArchivesModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="档案名称">
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="档案类型">
            {form.getFieldDecorator('category', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select placeholder="请选择">
                <Select.Option key="上游档案" value="上游档案">上游档案</Select.Option>
                <Select.Option key="下游档案" value="下游档案">下游档案</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="是否结算">
            {form.getFieldDecorator('settlement', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select placeholder="请选择">
                <Select.Option key="已结算" value="已结算">已结算</Select.Option>
                <Select.Option key="未结算" value="未结算">未结算</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="普通文件">
            {getFieldDecorator('fileListOrdinary', {
              rules: [{ required: true, message: '请选择文件' }],
              valuePropName: 'fileList',
              getValueFromEvent: (e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
            })(
              <Upload {...uploadOrdinaryConfig}>
                <Button>
                  选择文件 <Icon type="cloud-upload"/>
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item label="明细文件">
            {getFieldDecorator('fileListDetail', {
              rules: [{ required: true, message: '请选择文件' }],
              valuePropName: 'fileList',
              getValueFromEvent: (e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
            })(
              <Upload {...uploadDetailConfig}>
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

const WrappedForm = Form.create({ name: 'UploadProjectArchive' })(UploadProjectArchive);

export default connect(({ loading, projectArchiveList }) => ({
  uploadingProjectArchives: loading.effects['projectArchiveList/eUploadProjectArchives'],
  uploadProjectArchivesModalVisible: projectArchiveList.uploadProjectArchivesModalVisible,
}))(WrappedForm);

