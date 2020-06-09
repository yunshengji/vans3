import { GetMe } from '@/services/user';

export default {

  namespace: 'common',

  state: {
    menuCollapsed: false,
    drawerMenuVisible: false,
    isLogOuting: false,

    mine: {},
  },


  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetMe({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetMe);
        yield put({ type: 'rUpdateState', payload: { mine: data } });
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
