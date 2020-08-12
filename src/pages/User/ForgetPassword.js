import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Spin, notification } from 'antd';
import { GetValidateCode, ChangePassword } from '@/services/user';
import styles from './ForgetPassword.less';
import Cookies from 'js-cookie';

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '发送验证码',
      disabled: false,
    };
  }

  componentDidMount() {
  }

  getCode = () => {
    const phone = this.props.form.getFieldValue('phone');
    if (phone) {
      GetValidateCode({ phone }).then(res => {
        const { code, msg } = res;
        if (code === 400) {
          notification.warn({ message: msg });
        } else {
          this.setState({
            message: '',
            disabled: true,
          });
          let number = 60;
          this.setState({
            message: number + '秒后重发',
          });
          const timer = setInterval(() => {
            if (number > 0) {
              number--;
              this.setState({
                message: number + '秒后重发',
              });
            } else {
              this.setState({
                message: '发送验证码',
                disabled: false,
              });
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    }
  };

  handleCheckPwd(rules, value, callback) {
    let confirmPassword = this.props.form.getFieldValue('pass_2');
    if (confirmPassword && confirmPassword !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {

      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  }

  handleCfmPwd(rules, value, callback) {
    let password = this.props.form.getFieldValue('pass_1');
    if (password && password !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {

      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  }

  handleSubmit = e => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { phone, code, pass_1, pass_2 } = values;
        ChangePassword({ phone, code, pass_1, pass_2 }).then(res => {
          const { msg, data: { access_token } } = res;
          if (access_token) {
            notification.info({ message: '修改成功' });
            Cookies.set('token', access_token, { expires: 6 });
            window.location.href = '/originList';
          } else {
            notification.warn({ message: msg });
          }
        });
      } else {
        console.log(err);
      }
    });
    e.preventDefault();
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className={styles.formWrap}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    const re = /^[0-9]*[1-9][0-9]*$/;
                    if (value.length == 11 && re.test(value)) {
                      callback();
                    } else {
                      callback('账号名为邮箱或手机号');
                    }
                  },
                },
              ],
            })(
              <Input size="large" prefix="手机号码" placeholder="请输入您的手机号码"/>,
            )}
          </Form.Item>
          <Button style={{ marginBottom: '2em' }} onClick={this.getCode} disabled={this.state.disabled}>
            {this.state.message}
          </Button>
          <Form.Item>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入验证码！' }],
            })(
              <Input size="large" prefix="验证码" placeholder="请输入验证码"/>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('pass_1', {
              rules: [
                { required: true, message: '请输入密码！' },
                {
                  validator: (rules, value, callback) => {
                    this.handleCheckPwd(rules, value, callback);
                  },
                },
              ],
            })(
              <Input.Password size="large" prefix="新密码" type="password" placeholder="设置新密码"/>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('pass_2', {
              rules: [
                { required: true, message: '请输入密码！' },
                {
                  validator: (rules, value, callback) => {
                    this.handleCfmPwd(rules, value, callback);
                  },
                },
              ],
            })(
              <Input.Password size="large" prefix="确认密码" type="password" placeholder="再次输入新密码"/>,
            )}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button size="large" type="primary" htmlType="submit" block
                    style={{ width: '70%', marginTop: '4em', borderRadius: '20px' }}>
              完成
            </Button>
            <p>
              已有账号，<a href="/login">去登录</a>
            </p>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'ForgetPassword' })(ForgetPassword);

export default connect(({ loading }) => ({}))(WrappedForm);
