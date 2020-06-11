import { DeleteSpecialDebt, GetSpecialDebtList } from '@/services/project';
import { message } from 'antd';

export default {

  namespace: 'specialDebtList',

  state: {
    routes: [{ breadcrumbName: '专项债' }],

    searchParams: {},

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
    // * eDeleteSpecialDebt({ id, payload }, { select, call, put }) {
    //   try {
    //     const { msg } = yield call(DeleteSpecialDebt, id, payload);
    //     message.success(msg);
    //     const { specialDebtList: { current, pageSize } } = yield select(state => state['originList']);
    //     yield put({ type: 'GetSpecialDebtList', payload: { page: current, page_size: pageSize } });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    * eGetSpecialDebtList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetSpecialDebtList, payload);
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
