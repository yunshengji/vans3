import { GetMe, EditUser } from '@/services/users';
import { message } from 'antd';

export default {

  namespace: 'setting',

  state: {
    routes: [{ breadcrumbName: '个人设置' }],
    profile: {},
    avatarFile: null,
    avatarPreview: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetMe({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetMe);
        yield put({ type: 'rUpdateMine', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
    * eSubmitEdit({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditUser, id, payload);
        message.success(msg);
        yield put({ type: 'eGetMe' });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateMine(state, { payload }) {
      state.profile = payload;
      return state;
    },
  },

};
