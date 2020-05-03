import { GetMe } from '@/services/users';

export default {

  namespace: 'basicLayout',

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
        yield put({ type: 'rUpdateMine', payload: data });
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
      state.mine = payload;
      return state;
    },
  },

};
