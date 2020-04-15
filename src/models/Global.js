import { GetMe } from '@/services/Global';


export default {

  namespace: 'Global',

  state: {
    // User info
    nickname: '',
    avatar: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetMe({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetMe);
        yield put({ type: 'rUpdateState', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
