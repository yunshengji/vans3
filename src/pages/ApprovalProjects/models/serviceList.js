import { DeleteServiceTable, GetServiceTableList } from '@/services/approvalProjects';
import { message } from 'antd';

export default {

  namespace: 'serviceList',

  state: {
    routes: [{ breadcrumbName: '跟踪服务表' }],

    searchParams: {},

    serviceTableList: {
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
    * eDeleteServiceTable({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteServiceTable, id, payload);
        message.success(msg);
        const { serviceTableList: { current, pageSize } } = yield select(state => state['serviceList']);
        yield put({ type: 'GetServiceTableList', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * GetServiceTableList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetServiceTableList, payload);
        yield put({ type: 'rUpdateState', payload: { serviceTableList: data } });
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
