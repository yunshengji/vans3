import router from 'umi/router';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { login } from '@/services/login';


export default {

  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * e_login({ payload }, { select, call, put }) {
      try {
        const { username, password, remember } = payload;
        const { code, data } = yield call(login, { username, password });
        const { token } = data;
        Cookies.set('token', token, { expires: 7 });
        if (code) {
          if (remember) {
            localStorage.setItem('username', username);
          } else {
            localStorage.removeItem('username');
          }
          notification.success({
            message: 'Notification Message',
            description: '登录成功',
            placement: 'topRight',
          });
          router.push('/dashboard');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {},

};
