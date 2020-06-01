import { router } from 'umi';
import { message } from 'antd';
import { getIdsFromWholeList, getIdsFromManagerList } from '@/utils/transfer';
import {
  CreateOriginTable, UpdateOriginTable, GetOriginTable,
  CreateRecordTable, UpdateRecordTable, GetRecordTable,
  CreateServiceTable, UpdateServiceTable, GetServiceTable,
  CreateExecuteTable, UpdateExecuteTable, GetExecuteTable,
} from '@/services/approvalProjects';
import { GetUsersList } from '@/services/users';

export default {

  namespace: 'editApprovalProject',

  state: {
    activeKey: 'EditTableOrigin',
    routesCreating: [{ breadcrumbName: '项目立项', path: '/originList' }, { breadcrumbName: '创建新项目' }],
    routesEditing: [{ breadcrumbName: '项目立项', path: '/originList' }, { breadcrumbName: '编辑项目详情' }],

    usersList: [],
    managersList: [],

    editOrigin: {},
    editRecord: {},
    editService: {},
    editExecute: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetUsers({ payload }, { select, call, put }) {
      try {
        const { data: { list: users } } = yield call(GetUsersList, { page_size: 10000 });
        const managers = users.filter(item => item.level === 2);
        yield put({ type: 'rUpdateState', payload: { usersList: users, managersList: managers } });
      } catch (err) {
        console.log(err);
      }
    },

    * eCreateOriginTable({ payload }, { select, call, put }) {
      try {
        const { msg, data: { id } } = yield call(CreateOriginTable, payload);
        message.success(msg);
        router.push(`/approvalProject/edit/${id}`);
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateOriginTable({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(UpdateOriginTable, id, payload);
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eGetOriginTable({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetOriginTable, id, payload);
        const { members = [], confirm_list = [] } = data;
        data.members = getIdsFromWholeList(members);
        data.confirm_list = getIdsFromManagerList(confirm_list);
        yield put({ type: 'rUpdateState', payload: { editOrigin: data } });
      } catch (err) {
        console.log(err);
      }
    },

    * eCreateRecordTable({ payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(CreateRecordTable, payload);
        yield put({ type: 'rUpdateState', payload: { editRecord: data } });
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateRecordTable({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(UpdateRecordTable, id, payload);
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eGetRecordTable({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetRecordTable, payload);
        yield put({ type: 'rUpdateState', payload: { editRecord: data } });
      } catch (err) {
        console.log(err);
      }
    },

    * eCreateServiceTable({ payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(CreateServiceTable, payload);
        yield put({ type: 'rUpdateState', payload: { editService: data } });
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateServiceTable({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(UpdateServiceTable, id, payload);
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eGetServiceTable({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetServiceTable, payload);
        yield put({ type: 'rUpdateState', payload: { editService: data } });
      } catch (err) {
        console.log(err);
      }
    },

    * eCreateExecuteTable({ payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(CreateExecuteTable, payload);
        yield put({ type: 'rUpdateState', payload: { editExecute: data } });
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateExecuteTable({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(UpdateExecuteTable, id, payload);
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eGetExecuteTable({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetExecuteTable, payload);
        yield put({ type: 'rUpdateState', payload: { editExecute: data } });
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
