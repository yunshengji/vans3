import { router } from 'umi';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { Login } from '@/services/Login';


export default {

  namespace: 'Login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eLogin({ payload }, { select, call, put }) {
      try {
        const { username, password, remember } = payload;
        const { code, data } = yield call(Login, { username, password });
        const { token } = data;
        Cookies.set('token', token, { expires: 7 });
        if (code) {
          if (remember) {
            localStorage.setItem('username', username);
          } else {
            localStorage.removeItem('username');
          }
          message.success('登录成功！');
          const query = new URLSearchParams(window.location.search);
          const from = query.get('from');
          router.push(from || '/dashboard');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {},

};
