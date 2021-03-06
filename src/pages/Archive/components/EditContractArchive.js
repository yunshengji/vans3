import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button, InputNumber, Input, List } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { getFileURL, limitDecimals, selectYearList } from '../../../utils/transfer';
import { TABLE_FOR_MAKING_PROJECT_CATEGORIES } from '../../../../config/constant';

class EditContractArchive extends React.Component {
  hideUploadContractArchiveModal = () => {
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateState',
      payload: { editContractArchiveVisible: false },
    });
  };
  deleteUploadedFile = (deletedFile) => {
    const { editContractArchive: { attachment } } = this.props;
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateContractFiles',
      payload: _.filter(attachment, value => value['id'] !== deletedFile['id']),
    });
  };
  deleteUploadedTemplateFile = (deletedFile) => {
    const { editContractArchive: { template } } = this.props;
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateTemplateFiles',
      payload: _.filter(template, value => value['id'] !== deletedFile['id']),
    });
  };
  close = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'contractArchiveList/rUpdateState',
      payload: { editContractArchive: {} },
    });
  };
  submitContractArchive = () => {
    const { dispatch, form, isEditing } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        isEditing ?
          dispatch({ type: 'contractArchiveList/eUpdateContractArchive', payload: { ...values } })
          :
          dispatch({ type: 'contractArchiveList/eUploadContractArchive', payload: { ...values } });
      }
    });
  };

  render() {
    const { form, uploadingContractArchive, updatingContractArchive, editContractArchiveVisible, editContractArchive, options, isEditing } = this.props;
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
    const uploadTemplateConfig = {
      multiple: true,
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const templateList = getFieldValue('templateList');
        templateList.splice(templateList.indexOf(file), 1);
        setFieldsValue({ templateList });
      },
    };
    return (
      <Modal title="????????????" visible={editContractArchiveVisible}
             confirmLoading={uploadingContractArchive || updatingContractArchive} width={600}
             afterClose={this.close}
             onOk={this.submitContractArchive}
             onCancel={this.hideUploadContractArchiveModal}>
        <Form layout="horizontal" labelCol={{ xs: 5 }} wrapperCol={{ xs: 18 }}>
          <Form.Item label="????????????">
            {form.getFieldDecorator('number', {
              initialValue: editContractArchive['number'],
            })(
              <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}
                           placeholder="?????????"/>,
            )}
          </Form.Item>
          <Form.Item label="????????????">
            {form.getFieldDecorator('name', {
              initialValue: editContractArchive['name'],
            })(
              <Input.TextArea autoSize={{ minRows: 4 }} placeholder="?????????"/>,
            )}
          </Form.Item>
          {
            isEditing &&
            <Form.Item label="????????????">
              {form.getFieldDecorator('origin', {
                initialValue: editContractArchive['origin'] && editContractArchive['origin']['id'],
              })(
                <Select showSearch placeholder="?????????" allowClear
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                  {options.map((item, index) => {
                    return (
                      <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                    );
                  })}
                </Select>,
              )}
            </Form.Item>
          }
          <Form.Item label="????????????">
            {form.getFieldDecorator('category', {
              rules: [{ required: true, message: '?????????' }],
              initialValue: editContractArchive['category'],
            })(
              <Select placeholder="?????????" allowClear>
                {TABLE_FOR_MAKING_PROJECT_CATEGORIES.map(item =>
                  <Select.Option key={item} value={item}>{item}</Select.Option>,
                )}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="?????????????????????">
            {form.getFieldDecorator('cash', {
              initialValue: editContractArchive['cash'],
            })(
              <InputNumber min={0} style={{ width: '100%' }}/>,
            )}
          </Form.Item>
          <Form.Item label="????????????">
            {form.getFieldDecorator('settlement', {
              initialValue: editContractArchive['settlement'] || '?????????',
              rules: [{ required: true, message: '?????????' }],
            })(
              <Select placeholder="?????????">
                <Select.Option key="?????????" value="?????????">?????????</Select.Option>
                <Select.Option key="?????????" value="?????????">?????????</Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="????????????">
            {form.getFieldDecorator('time', {
              initialValue: (editContractArchive['time'] && moment(1000 * editContractArchive['time']).format('YYYY')) || moment().get('year'),
              rules: [{ required: true, message: '?????????' }],
            })(
              <Select>
                {_.map(selectYearList, item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
              </Select>,
            )}
          </Form.Item>
          {
            isEditing &&
            <Form.Item label="??????????????????">
              <List itemLayout="horizontal" className="noPaddingList" size="small" locale={{ emptyText: '????????????' }}
                    dataSource={editContractArchive['attachment']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[<Button type="link" className="redButton" onClick={() => {
                          this.deleteUploadedFile(item);
                        }}>??????</Button>]}
                      >
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          <Form.Item label="????????????">
            {getFieldDecorator('fileList', {
              valuePropName: 'fileList',
              getValueFromEvent: ({ file, fileList }) => fileList,
            })(
              <Upload {...uploadConfig}>
                <Button>
                  ???????????? <Icon type="cloud-upload"/>
                </Button>
              </Upload>,
            )}
          </Form.Item>
          {
            isEditing &&
            <Form.Item label="??????????????????">
              <List itemLayout="horizontal" className="noPaddingList" size="small" locale={{ emptyText: '????????????' }}
                    dataSource={editContractArchive['template']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[<Button type="link" className="redButton" onClick={() => {
                          this.deleteUploadedTemplateFile(item);
                        }}>??????</Button>]}
                      >
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          <Form.Item label="????????????">
            {getFieldDecorator('templateList', {
              valuePropName: 'fileList',
              getValueFromEvent: ({ file, fileList }) => fileList,
            })(
              <Upload {...uploadTemplateConfig}>
                <Button>
                  ???????????? <Icon type="cloud-upload"/>
                </Button>
              </Upload>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'UploadContractArchive' })(EditContractArchive);

export default connect(({ loading, contractArchiveList }) => ({
  uploadingContractArchive: loading.effects['contractArchiveList/eUploadContractArchive'],
  updatingContractArchive: loading.effects['contractArchiveList/eUpdateContractArchive'],
  editContractArchiveVisible: contractArchiveList.editContractArchiveVisible,
  isEditing: contractArchiveList.isEditing,
  editContractArchive: contractArchiveList.editContractArchive,
  originList: contractArchiveList.originList,
  options: contractArchiveList.options,
}))(WrappedForm);

