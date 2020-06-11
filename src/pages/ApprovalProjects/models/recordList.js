import { DeleteRecordTable, GetRecordTableList } from '@/services/approvalProjects';
import { message } from 'antd';

export default {

  namespace: 'recordList',

  state: {
    routes: [{ breadcrumbName: '备案表' }],

    searchParams: {},

    recordTableList: {
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
    * eDeleteRecordTable({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteRecordTable, id, payload);
        message.success(msg);
        const { recordTableList: { current, pageSize } } = yield select(state => state['recordList']);
        yield put({ type: 'GetRecordTableList', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * GetRecordTableList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetRecordTableList, payload);
        yield put({ type: 'rUpdateState', payload: { recordTableList: data } });
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
