import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Spin, Icon } from 'antd';
import styles from './index.less';

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
          type: 'Login/eLogin',
          payload: { username, password, remember },
        });
      }
    });
    e.preventDefault();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.root}>
        <div className={styles.background}/>
        <img src="/system-name.svg" alt="万铭星系统"/>
        <div className={styles.formWrap}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名！' }] })(
                <Input
                  prefix={<Icon type="user" style={{ color: '#CCC' }}/>}
                  size="large"
                  placeholder="请输入用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码！' }] })(
                <Input
                  prefix={<Icon type="lock" theme="filled" style={{ color: '#CCC' }}/>}
                  size="large"
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住账号</Checkbox>)}
            </Form.Item>
            <Form.Item>
              <Spin spinning={Boolean(this.props.submitting)}>
                <Button size="large" type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Spin>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedLogin = Form.create({ name: 'login' })(Login);

export default connect(({ loading }) => ({
  submitting: loading.effects['Login/eLogin'],
}))(WrappedLogin);
