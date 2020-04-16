import { GetMe } from '@/services/global';


export default {

  namespace: 'global',

  state: {
    menuCollapsed: false,
    drawerMenuVisible: false,
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
