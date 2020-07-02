import React from 'react';
import { connect } from 'dva';
import { Form, Modal, Select, Upload, Icon, Button, Input, List } from 'antd';
import { TABLE_FOR_MAKING_PROJECT_CATEGORIES } from '../../../../config/constant';
import { getFileURL } from '@/utils/transfer';
import _ from 'lodash';

class EditProjectArchive extends React.Component {
  hideUploadProjectArchiveModal = () => {
    this.props.dispatch({
      type: 'projectArchiveList/rUpdateState',
      payload: { editProjectArchiveVisible: false },
    });
  };
  deleteAttachmentFile = (deletedFile) => {
    const { editProjectArchive: { attachment } } = this.props;
    this.props.dispatch({
      type: 'projectArchiveList/rUpdateAttachmentFiles',
      payload: _.filter(attachment, value => value['id'] !== deletedFile['id']),
    });
  };
  deleteDetailFile = (deletedFile) => {
    const { editProjectArchive: { detail } } = this.props;
    this.props.dispatch({
      type: 'projectArchiveList/rUpdateDetailFiles',
      payload: _.filter(detail, value => value['id'] !== deletedFile['id']),
    });
  };
  deleteResultFile = (deletedFile) => {
    const { editProjectArchive: { result } } = this.props;
    this.props.dispatch({
      type: 'projectArchiveList/rUpdateResultFiles',
      payload: _.filter(result, value => value['id'] !== deletedFile['id']),
    });
  };
  submitProjectArchive = (e) => {
    const { dispatch, form, isEditing } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        isEditing ?
          dispatch({ type: 'projectArchiveList/eUpdateProjectArchive', payload: { ...values } })
          :
          dispatch({ type: 'projectArchiveList/eUploadProjectArchive', payload: { ...values } });
      }
    });
    e.preventDefault();
  };

  render() {
    const { form, mine, uploadingProjectArchive, updatingProjectArchive, editProjectArchiveVisible, editProjectArchive, isEditing } = this.props;
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
    const uploadResultConfig = {
      multiple: true,
      showUploadList: true,
      beforeUpload: () => false,
      onRemove: file => {
        const fileListResult = getFieldValue('fileListResult');
        fileListResult.splice(fileListResult.indexOf(file), 1);
        setFieldsValue({ fileListResult });
      },
    };
    return (
      <Modal title="项目档案" width={600}
             visible={editProjectArchiveVisible} confirmLoading={uploadingProjectArchive || updatingProjectArchive}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitProjectArchive}
             onCancel={this.hideUploadProjectArchiveModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="编号">
            {form.getFieldDecorator('num', { initialValue: editProjectArchive['num'] })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="档案名称">
            {form.getFieldDecorator('name', {
              initialValue: editProjectArchive['name'],
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Input placeholder="请输入"/>,
            )}
          </Form.Item>
          <Form.Item label="档案类型">
            {form.getFieldDecorator('category', {
              initialValue: editProjectArchive['category'],
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select placeholder="请选择" allowClear>
                {TABLE_FOR_MAKING_PROJECT_CATEGORIES.map(item =>
                  <Select.Option key={item} value={item}>{item}</Select.Option>,
                )}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="是否结算">
            {form.getFieldDecorator('settlement', {
              initialValue: editProjectArchive['settlement'],
              rules: [{ required: true, message: '请选择' }],
            })(
              <Select placeholder="请选择">
                <Select.Option key="已结算" value="已结算">已结算</Select.Option>
                <Select.Option key="未结算" value="未结算">未结算</Select.Option>
              </Select>,
            )}
          </Form.Item>
          {
            isEditing && (mine.department.name === '运营部' || mine.department.name === '总裁部') &&
            <Form.Item label="已上传的相关文件：">
              <List itemLayout="horizontal" className="noPaddingList" size="small"
                    dataSource={editProjectArchive['attachment']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Button type="link" className="redButton" onClick={() => this.deleteAttachmentFile(item)}>
                            删除
                          </Button>,
                        ]}>
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          {
            isEditing && (mine.department.name === '营销部' || mine.department.name === '运营部' || mine.department.name === '总裁部') &&
            <Form.Item label="已上传的明细文件：">
              <List itemLayout="horizontal" className="noPaddingList" size="small"
                    dataSource={editProjectArchive['detail']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Button type="link" className="redButton" onClick={() => this.deleteDetailFile(item)}>
                            删除
                          </Button>,
                        ]}>
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          {
            isEditing && (mine.department.name === '产品技术部' || mine.department.name === '运营部' || mine.department.name === '总裁部') &&
            <Form.Item label="已上传的成果文件：">
              <List itemLayout="horizontal" className="noPaddingList" size="small"
                    dataSource={editProjectArchive['result']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Button type="link" className="redButton" onClick={() => this.deleteResultFile(item)}>
                            删除
                          </Button>,
                        ]}>
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          {
            (mine.department.name === '运营部' || mine.department.name === '总裁部') &&
            <Form.Item label="相关文件">
              {getFieldDecorator('fileListOrdinary', {
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
          }
          {
            (mine.department.name === '营销部' || mine.department.name === '运营部' || mine.department.name === '总裁部') &&
            <Form.Item label="明细文件">
              {getFieldDecorator('fileListDetail', {
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
          }
          {
            (mine.department.name === '产品技术部' || mine.department.name === '运营部' || mine.department.name === '总裁部') &&
            <Form.Item label="成果文件">
              {getFieldDecorator('fileListResult', {
                valuePropName: 'fileList',
                getValueFromEvent: (e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                },
              })(
                <Upload {...uploadResultConfig}>
                  <Button>
                    选择文件 <Icon type="cloud-upload"/>
                  </Button>
                </Upload>,
              )}
            </Form.Item>
          }
        </Form>
      </Modal>
    );
  }
}

const WrappedForm = Form.create({ name: 'UploadProjectArchive' })(EditProjectArchive);

export default connect(({ loading, common, projectArchiveList }) => ({
  uploadingProjectArchive: loading.effects['projectArchiveList/eUploadProjectArchive'],
  updatingProjectArchive: loading.effects['projectArchiveList/eUpdateProjectArchive'],
  mine: common.mine,
  isEditing: projectArchiveList.isEditing,
  editProjectArchiveVisible: projectArchiveList.editProjectArchiveVisible,
  editProjectArchive: projectArchiveList.editProjectArchive,
}))(WrappedForm);

