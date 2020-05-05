import { router } from 'umi';
import { extend } from 'umi-request';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { prefix } from '../../config/api';

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const { msg = '参数错误' } = error.data;
    const { status, statusText, url } = response;
    const { pathname } = window.location;
    switch (status) {
      case 400:
        notification.error({
          message: '参数错误',
          description: msg,
        });
        break;
      case 401:
        notification.warn({
          message: '认证失败',
          description: '登录信息已过期，请重新登录',
        });
        router.push(`/login?from=${pathname}`);
        break;
      case 403:
        router.push(`/403?from=${pathname}`);
        break;
      case 500:
        router.push(`/500?from=${pathname}`);
        break;
      default:
        notification.warn({
          message: `请求错误：${status}\n路径：${url}`,
          description: statusText,
        });
        break;
    }
  } else {
    notification.error({
      message: '网络异常',
      description: '无法连接服务器，请检查你的网络',
    });
  }

  return response;
};

const request = extend({
  prefix,
  timeout: 3000,
  errorHandler,
});

request.interceptors.request.use(async (url, options) => {
  const token = Cookies.get('token');
  if (token) {
    return ({
      url,
      options: {
        ...options,
        headers: { Authorization: `JWT ${token}` },
      },
    });
  }
});

export default request;
