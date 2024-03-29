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
      <Modal title="合同档案" visible={editContractArchiveVisible}
             confirmLoading={uploadingContractArchive || updatingContractArchive} width={600}
             afterClose={this.close}
             onOk={this.submitContractArchive}
             onCancel={this.hideUploadContractArchiveModal}>
        <Form layout="horizontal" labelCol={{ xs: 5 }} wrapperCol={{ xs: 18 }}>
          <Form.Item label="合同编号">
            {form.getFieldDecorator('number', {
              initialValue: editContractArchive['number'],
            })(
              <InputNumber min={1} formatter={limitDecimals} parser={limitDecimals} style={{ width: '100%' }}
                           placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="合同名称">
            {form.getFieldDecorator('name', {
              initialValue: editContractArchive['name'],
            })(
              <Input.TextArea autoSize={{ minRows: 4 }} placeholder="请输入"/>,
            )}
          </Form.Item>
          {
            isEditing &&
            <Form.Item label="关联项目">
              {form.getFieldDecorator('origin', {
                initialValue: editContractArchive['origin'] && editContractArchive['origin']['id'],
              })(
                <Select showSearch placeholder="请选择" allowClear
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
          <Form.Item label="档案类型">
            {form.getFieldDecorator('category', {
              rules: [{ required: true, message: '请选择' }],
              initialValue: editContractArchive['category'],
            })(
              <Select placeholder="请选择" allowClear>
                {TABLE_FOR_MAKING_PROJECT_CATEGORIES.map(item =>
                  <Select.Option key={item} value={item}>{item}</Select.Option>,
                )}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="合同金额（元）">
            {form.getFieldDecorator('cash', {
              initialValue: editContractArchive['cash'],
            })(
              <InputNumber min={0} style={{ width: '100%' }}/>,
            )}
          </Form.Item>
          <Form.Item label="结算情况">
            {form.getFieldDecorator('settlement', {
              initialValue: editContractArchive['settlement'] || '未结算',
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
              initialValue: (editContractArchive['time'] && moment(1000 * editContractArchive['time']).format('YYYY')) || moment().get('year'),
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select>
                {_.map(selectYearList, item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
              </Select>,
            )}
          </Form.Item>
          {
            isEditing &&
            <Form.Item label="已上传文件：">
              <List itemLayout="horizontal" className="noPaddingList" size="small" locale={{ emptyText: '暂无数据' }}
                    dataSource={editContractArchive['attachment']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[<Button type="link" className="redButton" onClick={() => {
                          this.deleteUploadedFile(item);
                        }}>删除</Button>]}
                      >
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          <Form.Item label="合同文件">
            {getFieldDecorator('fileList', {
              valuePropName: 'fileList',
              getValueFromEvent: ({ file, fileList }) => fileList,
            })(
              <Upload {...uploadConfig}>
                <Button>
                  选择文件 <Icon type="cloud-upload"/>
                </Button>
              </Upload>,
            )}
          </Form.Item>
          {
            isEditing &&
            <Form.Item label="已上传模板：">
              <List itemLayout="horizontal" className="noPaddingList" size="small" locale={{ emptyText: '暂无数据' }}
                    dataSource={editContractArchive['template']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[<Button type="link" className="redButton" onClick={() => {
                          this.deleteUploadedTemplateFile(item);
                        }}>删除</Button>]}
                      >
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          <Form.Item label="合同模板">
            {getFieldDecorator('templateList', {
              valuePropName: 'fileList',
              getValueFromEvent: ({ file, fileList }) => fileList,
            })(
              <Upload {...uploadTemplateConfig}>
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

