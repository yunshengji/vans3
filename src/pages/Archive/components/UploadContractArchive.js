import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Form, Modal, Select, Upload, Icon, Button, InputNumber, DatePicker } from 'antd';

class UploadContractArchive extends React.Component {
  hideUploadContractArchivesModal = () => {
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateState',
      payload: { uploadContractArchivesModalVisible: false },
    });
  };
  handleSearch = (content) => {
    const { originList } = this.props;
    if (content) {
      this.props.dispatch({
        type: 'contractArchiveList/rUpdateState',
        payload: { options: _.filter(originList, value => value['name'].indexOf(content) > -1) },
      });
    } else {
      this.props.dispatch({
        type: 'contractArchiveList/rUpdateState',
        payload: { options: originList },
      });
    }
  };
  submitCreatedContractArchive = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'contractArchiveList/eUploadContractArchives', payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingContractArchives, uploadContractArchivesModalVisible, options } = this.props;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
    const uploadConfig = {
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
      <Modal title="上传合同档案文件" visible={uploadContractArchivesModalVisible} confirmLoading={uploadingContractArchives}
             afterClose={() => {
               this.props.form.resetFields();
             }}
             onOk={this.submitCreatedContractArchive}
             onCancel={this.hideUploadContractArchivesModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="关联项目">
            {form.getFieldDecorator('origin', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select placeholder="请选择" showSearch onSearch={this.handleSearch}>
                {options.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                  );
                })}
              </Select>,
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
          <Form.Item label="合同金额">
            {form.getFieldDecorator('cash', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <InputNumber min={0} style={{ width: '100%' }}/>,
            )}
          </Form.Item>
          <Form.Item label="差旅费">
            {form.getFieldDecorator('travel_cash', {})(
              <InputNumber min={0} style={{ width: '100%' }}/>,
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
          <Form.Item label="合同年份">
            {form.getFieldDecorator('time', {
              rules: [{ required: true, message: '请选择' }],
            })(
              <DatePicker.MonthPicker style={{ width: '100%' }}/>,
            )}
          </Form.Item>
          <Form.Item label="合同文件">
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

const WrappedForm = Form.create({ name: 'UploadContractArchive' })(UploadContractArchive);

export default connect(({ loading, contractArchiveList }) => ({
  uploadingContractArchives: loading.effects['contractArchiveList/eUploadContractArchives'],
  uploadContractArchivesModalVisible: contractArchiveList.uploadContractArchivesModalVisible,
  originList: contractArchiveList.originList,
  options: contractArchiveList.options,
}))(WrappedForm);

