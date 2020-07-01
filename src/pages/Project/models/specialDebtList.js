import { message } from 'antd';
import _ from 'lodash';
import { UpdateSpecialDebt, GetSpecialDebtList } from '@/services/project';

export default {

  namespace: 'specialDebtList',

  state: {
    routes: [{ breadcrumbName: '专项债' }],

    searchParams: {
      name: undefined,
      location: undefined,
    },

    specialDebtList: {
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
    * eUpdateSpecialDebtStatus({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(UpdateSpecialDebt, id, payload);
        message.success(msg);
        yield put({ type: 'eLoadSpecialDebtList', id, payload: {} });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadSpecialDebtList({ payload }, { select, call, put }) {
      try {
        const { searchParams, specialDebtList: { current, pageSize } } = yield select(state => state['specialDebtList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParams, payload);
        const { data } = yield call(GetSpecialDebtList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { specialDebtList: data } });
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
