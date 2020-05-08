import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Upload, Button, Breadcrumb, Form, Input, Avatar, message } from 'antd';
import { getFileURL } from '@/utils/transfer';

class Setting extends React.Component {

  submitEdit = () => {
    const { form, dispatch, mine } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'setting/eSubmitUpdate',
          id: mine.id,
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { form, routes, submittingEdit, mine, avatarPreview } = this.props;
    const { getFieldDecorator } = form;
    const uploadConfig = {
      showUploadList: false,
      listType: 'picture-card',
      beforeUpload: file => {
        const reader = new FileReader();
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
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.props.dispatch({
            type: 'setting/rUpdateState',
            payload: { avatarFile: file, avatarPreview: e.target.result },
          });
        };
        return false;
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
          <Row>
            <Form layout="horizontal">
              <Col xl={6} lg={8} md={12} sm={14} xs={24}>
                <Form.Item label="头像">
                  <Upload {...uploadConfig}>
                    <Avatar size={120} src={avatarPreview || getFileURL(mine.avatar)}/>
                  </Upload>
                </Form.Item>
                <Form.Item label="姓名">
                  {getFieldDecorator('name', {
                    initialValue: mine.name,
                    rules: [{ required: true, message: '姓名不能为空' }],
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
                <Form.Item label="账号">
                  {getFieldDecorator('username', {
                    initialValue: mine['username'],
                    rules: [
                      { required: true, message: '账号不能为空' },
                      { min: 5, message: '账号长度不能少于 5 位！' },
                      { max: 20, message: '账号长度不能多于 20 位！！' },
                    ],
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
                <Form.Item label="密码">
                  {getFieldDecorator('password', {
                    initialValue: mine['password'],
                    rules: [{ min: 5, message: '密码长度不能少于 5 位！' }],
                  })(
                    <Input placeholder="请输入" type="password"/>,
                  )}
                </Form.Item>
                <Form.Item label="手机号码">
                  {getFieldDecorator('phone', {
                    initialValue: mine['phone'],
                    rules: [{ required: true, message: '请填写符合格式的手机号码' }],
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
                <Form.Item label="邮箱">
                  {getFieldDecorator('email', {
                    initialValue: mine['email'],
                    rules: [{ type: 'email', message: '请填写符合格式的邮箱地址' }],
                  })(
                    <Input placeholder="请输入"/>,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.submitEdit} loading={submittingEdit}>
                    更新基本信息
                  </Button>
                </Form.Item>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'setting' })(Setting);

export default connect(({ loading, basicLayout, setting }) => ({
  submittingEdit: loading.effects['setting/eSubmitUpdate'],
  mine: basicLayout.mine,
  routes: setting.routes,
  avatarFile: setting.avatarFile,
  avatarPreview: setting.avatarPreview,
}))(WrappedForm);
