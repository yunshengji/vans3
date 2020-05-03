import { GetUsersList } from '@/services/users';


export default {

  namespace: 'createWorkDiary',

  state: {
    users: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetUsers({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetUsersList, payload);
        yield put({ type: 'rUpdateUsers', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateUsers(state, { payload }) {
      state.users = payload;
      return state;
    },
  },

};
