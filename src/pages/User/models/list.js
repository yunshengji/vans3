import { message } from 'antd';
import _ from 'lodash';
import { GetDepartments, CreateUser, EditUser, GetUsersList } from '@/services/user';

export default {

  namespace: 'userList',

  state: {
    routes: [{ breadcrumbName: '系统用户' }],

    searchParams: {
      name: undefined,
      department: undefined,
      level: undefined,
    },

    departments: [],

    createUserModalVisible: false,

    editUserModalVisible: false,
    editUser: { department: {} },

    users: {
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
    * eGetDepartments({ payload }, { select, call, put }) {
      try {
        const { data: { list: departments } } = yield call(GetDepartments, payload);
        yield put({ type: 'rUpdateState', payload: { departments } });
      } catch (err) {
        console.log(err);
      }
    },
    * eCreateUser({ payload }, { select, call, put }) {
      try {
        const { msg } = yield call(CreateUser, payload);
        yield put({ type: 'rUpdateState', payload: { createUserModalVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadUsers' });
      } catch (err) {
        console.log(err);
      }
    },
    * eEditUser({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditUser, id, payload);
        yield put({ type: 'rUpdateState', payload: { editUserModalVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadUsers' });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadUsers({ payload }, { select, call, put }) {
      try {
        const { searchParams, users: { current, pageSize } } = yield select(state => state['userList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParams, payload);
        const { data } = yield call(GetUsersList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { users: data } });
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
