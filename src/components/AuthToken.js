import React from 'react';
import { router } from 'umi';
import { notification } from 'antd';
import Cookies from 'js-cookie';

class AuthToken extends React.Component {

  componentDidMount() {
    const token = Cookies.get('token');
    if (!token) {
      notification.warn({
        message: '认证失败',
        description: '登录后使用系统功能',
      });
    }
  }

  render() {
    const token = Cookies.get('token');
    const props = this.props;
    return (
      <React.Fragment>
        {token ? this.props.children : router.push('/login')}
      </React.Fragment>
    );
  }
}

export default AuthToken;
