import { router } from 'umi';
import { message } from 'antd';
import Cookies from 'js-cookie';
import { Login } from '@/services/login';

export default {

  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eLogin({ payload }, { select, call, put }) {
      try {
        const { username, password, remember } = payload;
        const { msg, data } = yield call(Login, { username, password });
        const { access_token } = data;
        const from = new URLSearchParams(window.location.search).get('from');
        Cookies.set('token', access_token, { expires: 6 });
        remember ?
          localStorage.setItem('username', username)
          :
          localStorage.removeItem('username');
        message.success(msg);
        router.push(from || '/users');
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {},

};
