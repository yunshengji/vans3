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
        {/*<video autoPlay="autoplay" muted preload="auto" className={styles.video}>*/}
        {/*  <source src="https://wanmingcrm.oss-cn-shanghai.aliyuncs.com/%E6%B5%8B%E8%AF%95/video319.mp4?Expires=1592900349&OSSAccessKeyId=TMP.3KenUqYpgbn7dTH6tRPFHiAGNgV1XxV9i8zcC73Dz1gDBi6x2ByLcjeg2doDaTm5wzXaMYMbgPLdigKQUfjuhCEkNgzU7S&Signature=FJbtlms3Qj08gHRBgTYo7dnUnTc%3D" type="video/mp4"/>*/}
        {/*</video>*/}
        <div className={styles.background}/>
        <img src="/system-name.svg" alt="万铭星系统"/>
        <Form className={styles.formWrap} onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: '请输入用户名！' },
                { min: 5, message: '账号长度不能少于 5 位！' },
                { max: 20, message: '账号长度不能多于 20 位！！' },
              ],
            })(
              <Input prefix={<Icon type="smile" style={{ color: '#CCC' }}/>} size="large" placeholder="请输入账号"/>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(
              <Input prefix={<Icon type="lock" theme="filled" style={{ color: '#CCC' }}/>} size="large" type="password"
                     placeholder="请输入密码"/>,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住账号</Checkbox>)}
          </Form.Item>
          <Form.Item>
            <Spin spinning={Boolean(submitting)}>
              <Button size="large" type="primary" htmlType="submit" block>
                登录
              </Button>
            </Spin>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedForm = Form.create({ name: 'login' })(Login);

export default connect(({ loading }) => ({
  submitting: loading.effects['login/eLogin'],
}))(WrappedForm);
