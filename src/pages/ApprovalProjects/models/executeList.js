import { DeleteExecuteTable, GetExecuteTableList } from '@/services/approvalProjects';
import { message } from 'antd';

export default {

  namespace: 'executeList',

  state: {
    routes: [{ breadcrumbName: '营销实施情况表' }],

    searchParams: {},

    executeTableList: {
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
    * eDeleteExecuteTable({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteExecuteTable, id, payload);
        message.success(msg);
        const { executeTableList: { current, pageSize } } = yield select(state => state['executeList']);
        yield put({ type: 'GetExecuteTableList', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * GetExecuteTableList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetExecuteTableList, payload);
        yield put({ type: 'rUpdateState', payload: { executeTableList: data } });
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
