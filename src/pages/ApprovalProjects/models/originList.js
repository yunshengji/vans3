import { DeleteOriginTable, GetOriginTableList } from '@/services/approvalProjects';
import { message } from 'antd';
import _ from 'lodash';

export default {

  namespace: 'originList',

  state: {
    routes: [{ breadcrumbName: '立项表' }],

    searchParams: {
      name: undefined,
      area: undefined,
      category: undefined,
    },

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
        yield put({ type: 'eLoadOriginList', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadOriginList({ payload }, { select, call, put }) {
      try {
        const { searchParams, originTableList: { current, pageSize } } = yield select(state => state['originList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParams, payload);
        const { data } = yield call(GetOriginTableList, { ...queries });
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
