import { GetCustomersList, GetContractorsList } from '@/services/contacts';

export default {

  namespace: 'contactsList',

  state: {
    activeKey: 'customers',

    customersModalVisible: false,
    customersEditModalVisible: false,
    customersEditForm: {},

    contractorsModalVisible: false,
    contractorsEditModalVisible: false,
    contractorsEditForm: {},

    customers: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
    },

    contractors: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
      },
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetCustomers({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetCustomersList, payload);
        yield put({ type: 'rUpdateCustomers', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetContractors({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetContractorsList, payload);
        yield put({ type: 'rUpdateContractors', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateCustomers(state, { payload }) {
      state.customers = payload;
      return state;
    },
    rUpdateContractors(state, { payload }) {
      state.contractors = payload;
      return state;
    },
  },

};
