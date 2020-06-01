import { DeleteOriginTable, GetOriginTableList } from '@/services/approvalProjects';
import { message } from 'antd';

export default {

  namespace: 'originList',

  state: {
    routes: [{ breadcrumbName: '立项表' }],

    searchParams: {},

    originTableList: {
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
    * eDeleteOriginTable({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteOriginTable, id, payload);
        message.success(msg);
        const { originTableList: { current, pageSize } } = yield select(state => state['originList']);
        yield put({ type: 'GetOriginTableList', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * GetOriginTableList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetOriginTableList, payload);
        yield put({ type: 'rUpdateState', payload: { originTableList: data } });
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
