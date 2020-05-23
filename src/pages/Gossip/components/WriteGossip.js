import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Radio, Upload, Modal, Icon, Row, Button, Breadcrumb, Form, Input, message } from 'antd';

const { TextArea } = Input;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class GossipList extends React.Component {
  cancelPreview = () => {
    this.props.dispatch({
      type: 'gossipList/rUpdateState',
      payload: { uploadPicturePreviewModalVisible: false },
    });
  };
  handleSubmit = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'gossipList/eWriteGossip',
          payload: { ...values, form },
        });
      }
    });
  };

  render() {
    const { dispatch, form, submittingGossip, routes, gossipPicturesPreviewFileList, gossipPicturesFileList, uploadPicturePreviewModalVisible, uploadPicturePreviewImage } = this.props;
    const { getFieldDecorator } = form;
    const uploadConfig = {
      listType: 'picture-card',
      showUploadList: true,
      fileList: gossipPicturesPreviewFileList,
      beforeUpload: () => false,
      onChange: ({ file, fileList }) => {
        const isLt2M = file.size / 1024 / 1024 < 2;
        const isImage = file.type === 'image/gif' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/svg';
        if (!isLt2M) {
          message.warn('图片大小不能超过 2MB');
          return false;
        }
        if (!isImage) {
          message.warn('图片只能是 PNG JPG JPEG SVG GIF 格式!');
          return false;
        }
        gossipPicturesFileList.push(file);
        dispatch({
          type: 'gossipList/rUpdateState',
          payload: { gossipPicturesPreviewFileList: fileList, gossipPicturesFileList },
        });
      },
      onPreview: async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        dispatch({
          type: 'gossipList/rUpdateState',
          payload: { uploadPicturePreviewModalVisible: true, uploadPicturePreviewImage: file.preview },
        });
      },
    };
    return (
      <React.Fragment>
        <div className="headerWrapper">
          <Breadcrumb>
            {routes.map((item, index) => {
              const { path, breadcrumbName } = item;
              if (path) {
                return (
                  <Breadcrumb.Item key={index}>
                    <Link to={path}>{breadcrumbName}</Link>
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item key={index}>
                    <span>{breadcrumbName}</span>
                  </Breadcrumb.Item>
                );
              }
            })}
          </Breadcrumb>
        </div>
        <div className="contentWrapper">
          <Form.Item>
            {getFieldDecorator('content', {
              initialValue: '',
              rules: [{ required: true, message: '请填写内容' }],
            })(
              <TextArea autoSize={{ minRows: 6 }} placeholder="发表你的想法"/>,
            )}
          </Form.Item>
          <Row style={{ marginTop: '20px' }}>
            <Upload {...uploadConfig}>
              {gossipPicturesFileList.length <= 8 &&
              <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">选择图片</div>
              </div>
              }
            </Upload>
            <Modal visible={uploadPicturePreviewModalVisible} footer={null} onCancel={this.cancelPreview}>
              <img style={{ width: '100%' }} src={uploadPicturePreviewImage}/>
            </Modal>
          </Row>
          <Row type="flex" justify="end" style={{ marginTop: '20px' }}>
            <Form.Item>
              {getFieldDecorator('isPrivate', {
                initialValue: true,
                rules: [{ required: true, message: '请选择' }],
              })(
                <Radio.Group>
                  <Radio value={false}>实名</Radio>
                  <Radio value={true}>匿名</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Button type="primary" onClick={this.handleSubmit} loading={submittingGossip}>发布</Button>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'gossipList' })(GossipList);

export default connect(({ loading, common, gossipList }) => ({
  submittingGossip: loading.effects['gossipList/eWriteGossip'],
  routes: gossipList.routes,
  gossipPicturesPreviewFileList: gossipList.gossipPicturesPreviewFileList,
  gossipPicturesFileList: gossipList.gossipPicturesFileList,
  uploadPicturePreviewModalVisible: gossipList.uploadPicturePreviewModalVisible,
  uploadPicturePreviewImage: gossipList.uploadPicturePreviewImage,
}))(WrappedForm);
