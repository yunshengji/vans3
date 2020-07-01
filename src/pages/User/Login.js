import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Spin, Icon } from 'antd';
import styles from './Login.less';

class Login extends React.Component {

  componentDidMount() {
    const username = localStorage.getItem('username');
    this.props.form.setFieldsValue({ username });
  }

  handleSubmit = e => {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password, remember } = values;
        dispatch({
          type: 'login/eLogin',
          payload: { username, password, remember },
        });
      }
    });
    e.preventDefault();
  };

  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.root}>
        <video autoPlay="autoplay" muted preload="auto" className={styles.video}>
          <source src="https://wanmingcrm.oss-cn-shanghai.aliyuncs.com/static/staffs.mp4" type="video/mp4"/>
        </video>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img src="/system-welcome.png" alt=""/>
            <div className={styles.background}></div>
          </div>
          <div className={styles.loginWrapper}>
            <img src="/system-name-blue.png" alt="万铭星系统"/>
            <Form className={styles.formWrap} onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '请输入用户名！' },
                    { min: 5, message: '账号长度不能少于 5 位！' },
                    { max: 20, message: '账号长度不能多于 20 位！！' },
                  ],
                })(
                  <Input prefix="账号" size="large" placeholder="请输入账号"/>,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码！' }],
                })(
                  <Input.Password prefix="密码" size="large" type="password" placeholder="请输入密码"/>,
                )}
              </Form.Item>
              <Form.Item style={{ marginLeft: '2em', marginTop: '-1em' }}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住账号</Checkbox>)}
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Spin spinning={Boolean(submitting)}>
                  <Button size="large" type="primary" htmlType="submit" block
                          style={{ width: '70%', marginTop: '4em', borderRadius: '20px' }}>
                    登录
                  </Button>
                </Spin>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'login' })(Login);

export default connect(({ loading }) => ({
  submitting: loading.effects['login/eLogin'],
}))(WrappedForm);
