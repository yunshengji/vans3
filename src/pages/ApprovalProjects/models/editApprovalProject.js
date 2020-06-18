import { router } from 'umi';
import { message } from 'antd';
import _ from 'lodash';
import { getIdsFromWholeList, getIdsFromManagerList } from '@/utils/transfer';
import { GetUsersList } from '@/services/user';
import { UploadFile } from '@/services/files';
import { GetContractArchiveList } from '@/services/archive';

import {
  CreateOriginTable, UpdateOriginTable, GetOriginTable, ConfirmOrigin,
  CreateRecordTable, UpdateRecordTable, GetRecordTable,
  CreateServiceTable, UpdateServiceTable, GetServiceTable,
  CreateExecuteTable, UpdateExecuteTable, GetExecuteTable,
  CreateEasyProcess, UpdateEasyProcess, GetEasyProcess,
  CreatePurchaseProcess, UpdatePurchaseProcess, GetPurchaseProcess,
} from '@/services/approvalProjects';

export default {

  namespace: 'editApprovalProject',

  state: {
    activeKey: 'EditTableOrigin',

    usersList: [],
    managersList: [],
    contracts: [],

    editOrigin: {},
    editRecord: {},
    editService: {},
    editExecute: {},

    process: '',

    editEasyProcess: {},
    uploadedEasyFile: [],

    editPurchaseProcess: {},
    uploadedPurchaseBaseFiles: [],
    uploadedPurchaseFormalFiles: [],
    uploadedPurchaseBidWinFiles: [],
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
    * eGetContracts({ payload }, { select, call, put }) {
      try {
        const { data: { list: contracts } } = yield call(GetContractArchiveList, { page_size: 10000 });
        console.log(contracts);
        yield put({ type: 'rUpdateState', payload: { contracts } });
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
    * eUpdateOriginStatus({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(UpdateOriginTable, id, payload);
        message.success(msg);
        yield put({ type: 'originList/eLoadOriginList', id, payload: {} });
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateOriginTable({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(UpdateOriginTable, id, payload);
        yield put({ type: 'eGetOriginTable', id, payload: {} });
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateOriginConfirms({ id, payload }, { select, call, put }) {
      try {
        const { msg, data } = yield call(UpdateOriginTable, id, payload);
        yield put({ type: 'eGetOriginTable', id, payload: {} });
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eGetOriginTable({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetOriginTable, id, payload);
        const { members = [] } = data;
        data.members = getIdsFromWholeList(members);
        if (Array.isArray(data['sign_contract']) && Array.isArray(data['sign_contract']).length > 0) {
          data['sign_contract'] = _.map(data['sign_contract'], 'id');
        }
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
        if (Array.isArray(data['act_contract']) && data['act_contract'].length > 0) {
          data['act_contract'] = _.map(data['act_contract'], 'id');
        }
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
        if (Array.isArray(data['sign_contract']) && data['sign_contract'].length > 0) {
          data['sign_contract'] = _.map(data['sign_contract'], 'id');
        }
        yield put({ type: 'rUpdateState', payload: { editExecute: data } });
      } catch (err) {
        console.log(err);
      }
    },

    * eCreateEasyProcess({ payload }, { select, call, put }) {
      try {
        const { origin, company_outer, company_worker_list, fileList } = payload;

        const formal_files = [];
        if (fileList) {
          const formData = new FormData();
          formData.append('folder_path', 'easy_process');
          fileList.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            formal_files.push(item.id);
          });
        }

        const createPayload = { origin };
        if (company_outer) {
          createPayload.company_outer = company_outer;
        }
        if (company_worker_list) {
          createPayload.company_worker_list = company_worker_list;
        }
        if (formal_files.length > 0) {
          createPayload.formal_files = formal_files;
        }
        const { msg, data } = yield call(CreateEasyProcess, createPayload);
        yield put({ type: 'rUpdateState', payload: { editEasyProcess: data } });
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateEasyProcess({ id, form, payload }, { select, call, put }) {
      try {
        const { company_outer, company_worker_list, fileList, uploadedEasyFile } = payload;

        const formal_files = [];
        if (fileList) {
          const formData = new FormData();
          formData.append('folder_path', 'easy_process');
          fileList.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            formal_files.push(item.id);
          });
        }
        if (uploadedEasyFile) {
          uploadedEasyFile.forEach(item => {
            formal_files.push(item.id);
          });
        }

        const updatedProcess = {};
        if (company_outer) {
          updatedProcess.company_outer = company_outer;
        }
        if (company_worker_list) {
          updatedProcess.company_worker_list = company_worker_list;
        }
        updatedProcess.formal_files = formal_files;
        const { msg, data: { origin: { id: originId } } } = yield call(UpdateEasyProcess, id, updatedProcess);
        message.success(msg);
        form.resetFields();
        yield put({ type: 'eGetEasyProcess', id: originId });
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
    * eCreatePurchaseProcess({ payload }, { select, call, put }) {
      try {

        let { base_files, formal_files, bid_win_files } = payload;

        if (base_files) {
          const ids = [];
          const formData = new FormData();
          formData.append('folder_path', 'purchase_process');
          base_files.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            ids.push(item.id);
          });
          payload['base_files'] = ids;
        }

        if (formal_files) {
          const ids = [];
          const formData = new FormData();
          formData.append('folder_path', 'purchase_process');
          formal_files.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            ids.push(item.id);
          });
          payload['formal_files'] = ids;
        }

        if (bid_win_files) {
          const ids = [];
          const formData = new FormData();
          formData.append('folder_path', 'purchase_process');
          bid_win_files.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            ids.push(item.id);
          });
          payload['bid_win_files'] = ids;
        }

        const { msg, data } = yield call(CreatePurchaseProcess, payload);
        yield put({ type: 'rUpdateState', payload: { editPurchaseProcess: data } });
        message.success(msg);
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdatePurchaseProcess({ id, form, payload }, { select, call, put }) {
      try {
        let { base_files, formal_files, bid_win_files, uploadedPurchaseBaseFiles, uploadedPurchaseFormalFiles, uploadedPurchaseBidWinFiles } = payload;

        const base_files_ids = [];
        if (base_files) {
          const formData = new FormData();
          formData.append('folder_path', 'purchase_process');
          base_files.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            base_files_ids.push(item.id);
          });
        }
        if (uploadedPurchaseBaseFiles) {
          uploadedPurchaseBaseFiles.forEach(item => {
            base_files_ids.push(item.id);
          });
        }
        payload['base_files'] = base_files_ids;
        delete payload['uploadedPurchaseBaseFiles'];

        const formal_files_ids = [];
        if (formal_files) {
          const formData = new FormData();
          formData.append('folder_path', 'purchase_process');
          formal_files.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            formal_files_ids.push(item.id);
          });
        }
        if (uploadedPurchaseFormalFiles) {
          uploadedPurchaseFormalFiles.forEach(item => {
            formal_files_ids.push(item.id);
          });
        }
        payload['formal_files'] = formal_files_ids;
        delete payload['uploadedPurchaseFormalFiles'];

        const bid_win_files_ids = [];
        if (bid_win_files) {
          const formData = new FormData();
          formData.append('folder_path', 'purchase_process');
          bid_win_files.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            bid_win_files_ids.push(item.id);
          });
        }
        if (uploadedPurchaseBidWinFiles) {
          uploadedPurchaseBidWinFiles.forEach(item => {
            bid_win_files_ids.push(item.id);
          });
        }
        payload['bid_win_files'] = bid_win_files_ids;
        delete payload['uploadedPurchaseBidWinFiles'];

        const { msg, data: { origin: { id: originId } } } = yield call(UpdatePurchaseProcess, id, payload);
        message.success(msg);
        form.resetFields();
        yield put({ type: 'eGetPurchaseProcess', id: originId });
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
    rUpdateUploadedEasyFile(state, { payload }) {
      return {
        ...state,
        uploadedEasyFile: payload,
      };
    },
    rUpdateUploadedPurchaseBaseFile(state, { payload }) {
      return {
        ...state,
        uploadedPurchaseBaseFiles: payload,
      };
    },
    rUpdateUploadedPurchaseFormalFile(state, { payload }) {
      return {
        ...state,
        uploadedPurchaseFormalFiles: payload,
      };
    },
    rUpdateUploadedPurchaseBidWinFile(state, { payload }) {
      return {
        ...state,
        uploadedPurchaseBidWinFiles: payload,
      };
    },
  },

};
