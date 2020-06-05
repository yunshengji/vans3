import { GetStaffList } from '@/services/staff';

export default {

  namespace: 'staffList',

  state: {
    routes: [{ breadcrumbName: '人事管理' }],

    departments: [],

    staffs: {
      total: 0,
      current: 1,
      pageSize: 10,
      list: [],
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetStaffList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetStaffList, payload);
        yield put({ type: 'rUpdateState', payload: { staffs: data } });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },

};
