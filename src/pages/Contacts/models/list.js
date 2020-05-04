import {
  CreateCustomer, DeleteCustomer, EditCustomer, GetCustomers,
  GetContractorsList,
} from '@/services/contacts';
import { message } from 'antd';

export default {

  namespace: 'contactsList',

  state: {
    activeKey: 'customers',

    createCustomerModalVisible: false,
    editCustomerModalVisible: false,
    editCustomerForm: {},
    customers: {
      total: 0,
      current: 1,
      pageSize: 10,
      list: [],
    },

    contractorsModalVisible: false,
    contractorsEditModalVisible: false,
    contractorsEditForm: {},
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
    * eCreateCustomer({ payload }, { select, call, put }) {
      try {
        const { msg } = yield call(CreateCustomer, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { createCustomerModalVisible: false } });
        const { customers: { current, pageSize } } = yield select(state => state.contactsList);
        yield put({ type: 'eGetCustomers', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteCustomer({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteCustomer, id, payload);
        message.success(msg);
        const { customers: { current, pageSize } } = yield select(state => state.contactsList);
        yield put({ type: 'eGetCustomers', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetCustomers({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetCustomers, payload);
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
