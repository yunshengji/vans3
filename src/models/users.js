import { GetUsersList } from '@/services/users';


export default {

  namespace: 'users',

  state: {
    usersData: {
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
    * eGetUsersData({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetUsersList, payload);
        yield put({ type: 'rUpdateUsersData', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateUsersData(state, { payload }) {
      state.usersData = payload;
      return state;
    },
  },

};
