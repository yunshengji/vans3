import { message } from 'antd';
import _ from 'lodash';
import {
  CreateCustomer, DeleteCustomer, UpdateCustomer, GetCustomers,
  CreateContractor, DeleteContractor, UpdateContractor, GetContractors,
} from '@/services/contacts';

export default {

  namespace: 'contactsList',

  state: {
    activeKey: 'customers',

    createCustomerModalVisible: false,
    editCustomerModalVisible: false,
    editCustomerForm: {},
    customerProfileModalVisible: false,
    customerProfile: { creator: {} },
    searchParamsCustomer: {
      name: undefined,
      area: undefined,
      company: undefined,
    },
    customers: {
      total: 0,
      current: 1,
      pageSize: 10,
      list: [],
    },

    createContractorModalVisible: false,
    editContractorModalVisible: false,
    editContractorForm: {},
    searchParamsContractor: {
      name: undefined,
      area: undefined,
      company: undefined,
    },
    contractors: {
      total: 0,
      current: 1,
      pageSize: 2,
      list: [],
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
        const { customers: { current, pageSize } } = yield select(state => state['contactsList']);
        yield put({ type: 'eLoadCustomers', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteCustomer({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteCustomer, id, payload);
        message.success(msg);
        const { customers: { current, pageSize } } = yield select(state => state['contactsList']);
        yield put({ type: 'eLoadCustomers', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateCustomer({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(UpdateCustomer, id, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { editCustomerModalVisible: false } });
        const { customers: { current, pageSize } } = yield select(state => state['contactsList']);
        yield put({ type: 'eLoadCustomers', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadCustomers({ payload }, { select, call, put }) {
      try {
        const { searchParamsCustomer, customers: { current, pageSize } } = yield select(state => state['contactsList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParamsCustomer, payload);
        const { data } = yield call(GetCustomers, { ...queries });
        yield put({ type: 'rUpdateState', payload: { customers: data } });
      } catch (err) {
        console.log(err);
      }
    },
    * eCreateContractor({ payload }, { select, call, put }) {
      try {
        const { msg } = yield call(CreateContractor, payload);
        yield put({ type: 'rUpdateState', payload: { createContractorModalVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadContractors' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteContractor({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteContractor, id, payload);
        message.success(msg);
        yield put({ type: 'eLoadContractors' });
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateContractor({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(UpdateContractor, id, payload);
        yield put({ type: 'rUpdateState', payload: { editContractorModalVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadContractors' });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadContractors({ payload }, { select, call, put }) {
      try {
        const { searchParamsContractor, contractors: { current, pageSize } } = yield select(state => state['contactsList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParamsContractor, payload);
        const { data } = yield call(GetContractors, { ...queries });
        yield put({ type: 'rUpdateState', payload: { contractors: data } });
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
