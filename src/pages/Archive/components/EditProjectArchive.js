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
      <Modal title="????????????" width={600}
             visible={editProjectArchiveVisible} confirmLoading={uploadingProjectArchive || updatingProjectArchive}
             afterClose={() => this.props.form.resetFields()}
             onOk={this.submitProjectArchive}
             onCancel={this.hideUploadProjectArchiveModal}>
        <Form layout="horizontal" labelCol={{ xs: 6 }} wrapperCol={{ xs: 15 }}>
          <Form.Item label="??????">
            {form.getFieldDecorator('num', {
              initialValue: editProjectArchive['num'],
              rules: [{
                message: '????????? "??????-??????" ?????????????????????"2020-68"',
                pattern:/^[0-9]+-[0-9]+$/,
              }],
            })(
              <Input placeholder="??????-???????????? ??????2020-68"/>,
            )}
          </Form.Item>
          <Form.Item label="????????????">
            {form.getFieldDecorator('name', {
              initialValue: editProjectArchive['name'],
              rules: [{ required: true, message: '???????????????' }],
            })(
              <Input placeholder="?????????"/>,
            )}
          </Form.Item>
          <Form.Item label="????????????">
            {form.getFieldDecorator('category', {
              initialValue: editProjectArchive['category'],
              rules: [{ required: true, message: '?????????' }],
            })(
              <Select placeholder="?????????" allowClear>
                {TABLE_FOR_MAKING_PROJECT_CATEGORIES.map(item =>
                  <Select.Option key={item} value={item}>{item}</Select.Option>,
                )}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="????????????">
            {form.getFieldDecorator('settlement', {
              initialValue: editProjectArchive['settlement'],
              rules: [{ required: true, message: '?????????' }],
            })(
              <Select placeholder="?????????">
                <Select.Option key="?????????" value="?????????">?????????</Select.Option>
                <Select.Option key="?????????" value="?????????">?????????</Select.Option>
              </Select>,
            )}
          </Form.Item>
          {
            isEditing && (mine.department.name === '?????????' || mine.department.name === '?????????') &&
            <Form.Item label="???????????????????????????">
              <List itemLayout="horizontal" className="noPaddingList" size="small"
                    dataSource={editProjectArchive['attachment']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Button type="link" className="redButton" onClick={() => this.deleteAttachmentFile(item)}>
                            ??????
                          </Button>,
                        ]}>
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          {
            isEditing && (mine.department.name === '?????????' || mine.department.name === '?????????' || mine.department.name === '?????????') &&
            <Form.Item label="???????????????????????????">
              <List itemLayout="horizontal" className="noPaddingList" size="small"
                    dataSource={editProjectArchive['detail']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Button type="link" className="redButton" onClick={() => this.deleteDetailFile(item)}>
                            ??????
                          </Button>,
                        ]}>
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          {
            isEditing && (mine.department.name === '???????????????' || mine.department.name === '?????????' || mine.department.name === '?????????') &&
            <Form.Item label="???????????????????????????">
              <List itemLayout="horizontal" className="noPaddingList" size="small"
                    dataSource={editProjectArchive['result']}
                    renderItem={(item, index) => (
                      <List.Item
                        key={item.id}
                        actions={[
                          <Button type="link" className="redButton" onClick={() => this.deleteResultFile(item)}>
                            ??????
                          </Button>,
                        ]}>
                        <a href={getFileURL(item.id)} target="_blank">{item['file_name_local']}</a>
                      </List.Item>
                    )}
              />
            </Form.Item>
          }
          {
            (mine.department.name === '?????????' || mine.department.name === '?????????') &&
            <Form.Item label="????????????">
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
                    ???????????? <Icon type="cloud-upload"/>
                  </Button>
                </Upload>,
              )}
            </Form.Item>
          }
          {
            (mine.department.name === '?????????' || mine.department.name === '?????????' || mine.department.name === '?????????') &&
            <Form.Item label="????????????">
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
                    ???????????? <Icon type="cloud-upload"/>
                  </Button>
                </Upload>,
              )}
            </Form.Item>
          }
          {
            (mine.department.name === '???????????????' || mine.department.name === '?????????' || mine.department.name === '?????????') &&
            <Form.Item label="????????????">
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
                    ???????????? <Icon type="cloud-upload"/>
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

