import { GetMe } from '@/services/staff';

export default {

  namespace: 'staffProfile',

  state: {
    routes: [{ breadcrumbName: '员工管理', path: '/staff' }, { breadcrumbName: '员工信息' }],
    staff: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetStaff({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetMe, id, payload);

        const { recruit, status } = data;
        if (recruit === true) {
          data['recruit'] = '自招';
        } else if (recruit === false) {
          data['recruit'] = '挂靠';
        }
        if (status === true) {
          data['status'] = '在职';
        } else if (recruit === false) {
          data['status'] = '已离职';
        }

        yield put({
          type: 'rUpdateState',
          payload: { staff: data },
        });
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
