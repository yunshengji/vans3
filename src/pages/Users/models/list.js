import { GetDepartments, CreateUser, EditUser, GetUsersList } from '@/services/users';
import { message } from 'antd';

export default {

  namespace: 'usersList',

  state: {
    routes: [{ breadcrumbName: '用户列表' }],

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
        const { users: { current, pageSize } } = yield select(state => state.usersList);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { createUserModalVisible: false } });
        yield put({ type: 'eGetUsers', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eEditUser({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditUser, id, payload);
        const { users: { current, pageSize } } = yield select(state => state.usersList);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { editUserModalVisible: false } });
        yield put({ type: 'eGetUsers', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetUsers({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetUsersList, payload);
        yield put({ type: 'rUpdateUsers', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateUsers(state, { payload }) {
      state.users = payload;
      return state;
    },
  },

};
