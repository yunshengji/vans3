import { router } from 'umi';
import { message } from 'antd';
import _ from 'lodash';
import { getIdsFromWholeList, getIdsFromManagerList } from '@/utils/transfer';
import { GetUsersList } from '@/services/user';
import { UploadFile } from '@/services/files';
import { GetContractArchiveList } from '@/services/archive';

import {
  CreateOriginTable, UpdateOriginTable, GetOriginTable,
  CreateRecordTable, UpdateRecordTable, GetRecordTable,
  CreateServiceTable, UpdateServiceTable, GetServiceTable,
  CreateExecuteTable, UpdateExecuteTable, GetExecuteTable,
  CreateEasyProcess, UpdateEasyProcess, GetEasyProcess,
  CreatePurchaseProcess, UpdatePurchaseProcess, GetPurchaseProcess, ConfirmOrigin,
} from '@/services/approvalProjects';

export default {

  namespace: 'profileApprovalProject',

  state: {
    routes: [{ breadcrumbName: '项目立项', path: '/originList' }, { breadcrumbName: '项目详情' }],

    usersList: [],
    managersList: [],
    contracts: [],

    profileOrigin: {},
    profileContract: {},
    profileRecord: {},
    profileService: {},
    profileExecute: {},

    process: '',

    editEasyProcess: {},
    uploadedEasyFile: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetUsers({ payload }, { select, call, put }) {
      try {
        const { data: { list: users } } = yield call(GetUsersList, { page_size: 10000 });
        const managers = users.filter(item => item.level > 1);
        yield put({ type: 'rUpdateState', payload: { usersList: users, managersList: managers } });
      } catch (err) {
        console.log(err);
      }
    },
    * eConfirmOrigin({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(ConfirmOrigin, id, payload);
        message.success(msg);
        yield put({ type: 'eGetOriginTable', id, payload: {} });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetOriginContract({ payload }, { select, call, put }) {
      try {
        const { data: { list } } = yield call(GetContractArchiveList, { ...payload });
        yield put({ type: 'rUpdateState', payload: { profileContract: _.head(list) || {} } });
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
    * eGetOriginTable({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetOriginTable, id, payload);
        yield put({ type: 'rUpdateState', payload: { profileOrigin: data } });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetRecordTable({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetRecordTable, payload);
        yield put({ type: 'rUpdateState', payload: { profileRecord: data } });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetServiceTable({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetServiceTable, payload);
        yield put({ type: 'rUpdateState', payload: { profileService: data } });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetExecuteTable({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetExecuteTable, payload);
        yield put({ type: 'rUpdateState', payload: { profileExecute: data } });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetEasyProcess({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetEasyProcess, id, payload);
        const { company_worker_list } = data;
        data.company_worker_list = getIdsFromWholeList(company_worker_list);
        yield put({ type: 'rUpdateState', payload: { editEasyProcess: data } });
        yield put({ type: 'rUpdateUploadedEasyFile', payload: data.formal_files });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetPurchaseProcess({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetPurchaseProcess, id, payload);
        const { company_worker_list } = data;
        data.company_worker_list = getIdsFromWholeList(company_worker_list);
        yield put({ type: 'rUpdateState', payload: { editPurchaseProcess: data } });
        yield put({ type: 'rUpdateUploadedPurchaseBaseFile', payload: data.base_files });
        yield put({ type: 'rUpdateUploadedPurchaseFormalFile', payload: data.formal_files });
        yield put({ type: 'rUpdateUploadedPurchaseBidWinFile', payload: data.bid_win_files });
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
