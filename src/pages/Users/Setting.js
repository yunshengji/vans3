import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import { Row, Col, Upload, Button, Breadcrumb, Spin, Form, Input, Avatar, message } from 'antd';

class Setting extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'setting/eGetMe' });
  }

  submitEdit = () => {
    const { form, dispatch, profile } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'setting/eSubmitEdit',
          id: profile.id,
          payload: { ...values },
        });
      }
    });
  };

  render() {
    const { form, routes, fetchingMine, submittingEdit, profile, avatarFile, avatarPreview } = this.props;
    const { getFieldDecorator } = form;
    const props = {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      showUploadList: false,
      listType: 'picture-card',
      beforeUpload: file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          this.props.dispatch({
            type: 'setting/rUpdateState',
            payload: {
              avatarFile: file,
              avatarPreview: e.target.result,
            },
          });
        };
        return false;
      },
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
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
          <Spin spinning={Boolean(fetchingMine)}>
            <Row>
              <Col xl={6} md={12} sm={24}>
                <Form layout="horizontal">
                  <Form.Item label="头像">
                    <Upload {...props}>
                      <Avatar size={200} src={avatarPreview || profile.avatar}/>
                    </Upload>
                  </Form.Item>
                  <Form.Item label="头像">
                    {getFieldDecorator('avatar', {
                      initialValue: profile.avatar,
                      rules: [
                        { required: true, message: '姓名不能为空' },
                      ],
                    })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                  <Form.Item label="姓名">
                    {getFieldDecorator('name', {
                      initialValue: profile.name,
                      rules: [
                        { required: true, message: '姓名不能为空' },
                      ],
                    })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                  <Form.Item label="账号">
                    {getFieldDecorator('username', {
                      initialValue: profile['username'],
                      rules: [
                        { required: true, message: '账号不能为空' },
                      ],
                    })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                  <Form.Item label="密码">
                    {getFieldDecorator('password', {
                      initialValue: profile['password'],
                    })(
                      <Input placeholder="请输入" type="password"/>,
                    )}
                  </Form.Item>
                  <Form.Item label="手机号码">
                    {getFieldDecorator('phone', {
                      initialValue: profile['phone'],
                      rules: [
                        { required: true, message: '请填写符合格式的手机号码' },
                      ],
                    })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                  <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                      initialValue: profile['email'],
                      rules: [
                        { type: 'email', message: '请填写符合格式的邮箱地址' },
                      ],
                    })(
                      <Input placeholder="请输入"/>,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={this.submitEdit} loading={submittingEdit}>
                      更新基本信息
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Spin>
        </div>
      </React.Fragment>
    );
  }
}

const WrappedForm = Form.create({ name: 'profile' })(Setting);

export default connect(({ loading, setting }) => ({
  fetchingMine: loading.effects['setting/eGetMe'],
  submittingEdit: loading.effects['setting/eSubmitEdit'],
  routes: setting.routes,
  profile: setting.profile,
  avatarFile: setting.avatarFile,
  avatarPreview: setting.avatarPreview,
}))(WrappedForm);
