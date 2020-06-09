import _ from 'lodash';
import { GetStaffList } from '@/services/staff';
import { GetDepartments } from '@/services/user';

export default {

  namespace: 'staffList',

  state: {
    routes: [{ breadcrumbName: '员工管理' }],

    departments: [],

    searchParams: {
      name: undefined,
      department: undefined,
      position: undefined,
    },

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
    * eGetDepartments({ payload }, { select, call, put }) {
      try {
        const { data: { list: departments } } = yield call(GetDepartments, payload);
        yield put({ type: 'rUpdateState', payload: { departments } });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadStaffs({ payload }, { select, call, put }) {
      try {
        const { searchParams, staffs: { current, pageSize } } = yield select(state => state['staffList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParams, payload);
        const { data } = yield call(GetStaffList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { staffs: data } });
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
