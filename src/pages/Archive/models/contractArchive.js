import { message } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { UploadFile } from '@/services/files';
import { GetOriginTableList } from '@/services/approvalProjects';
import {
  UploadContractArchive,
  DeleteContractArchive,
  UpdateContractArchive,
  GetContractArchiveList,
} from '@/services/archive';

export default {

  namespace: 'contractArchiveList',

  state: {
    routes: [{ breadcrumbName: '合同档案' }],

    isEditing: false,
    editContractArchiveVisible: false,
    editContractArchive: {},

    originList: [],
    options: [],

    searchParams: {
      name: undefined,
      category: undefined,
      settlement: undefined,
      time: undefined,
    },

    contractArchives: {
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
    * eGetOriginList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetOriginTableList, payload);
        yield put({ type: 'rUpdateState', payload: { originList: data.list, options: data.list } });
      } catch (err) {
        console.log(err);
      }
    },
    * eUploadContractArchive({ payload }, { select, call, put }) {
      try {
        const { number, name, category, cash, travel_cash, settlement, time, fileList, origin } = payload;
        let attachment = [];

        if (!_.isEmpty(fileList)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_contract');
          _.forEach(fileList, (item => formData.append('file', item.originFileObj)));
          const { data } = yield call(UploadFile, formData);
          attachment = _.map(data, 'id');
        }

        const { msg } = yield call(UploadContractArchive, {
          number, name, category, cash, travel_cash, settlement,
          time: moment(time, 'YYYY').valueOf() / 1000,
          attachment, origin,
        });
        yield put({ type: 'rUpdateState', payload: { editContractArchiveVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadContracts' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteContractArchive({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteContractArchive, id, payload);
        message.success(msg);
        yield put({ type: 'eLoadContracts' });
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateContractArchive({ payload }, { select, call, put }) {
      try {
        const { number, name, category, cash, travel_cash, settlement, time, fileList, origin } = payload;
        const { editContractArchive } = yield select(state => state['contractArchiveList']);
        let attachment = _.map(editContractArchive['attachment'], 'id');

        if (!_.isEmpty(fileList)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_contract');
          _.forEach(fileList, (item => formData.append('file', item.originFileObj)));
          const { data } = yield call(UploadFile, formData);
          attachment = _.concat(attachment, _.map(data, 'id'));
        }

        const { msg } = yield call(UpdateContractArchive, editContractArchive['id'], {
          number, name, category, cash, travel_cash, settlement,
          time: moment(time, 'YYYY').valueOf() / 1000,
          attachment, origin,
        });
        yield put({ type: 'rUpdateState', payload: { editContractArchiveVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadContracts' });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadContracts({ payload }, { select, call, put }) {
      try {
        const { searchParams, contractArchives: { current, pageSize } } = yield select(state => state['contractArchiveList']);
        searchParams['time'] = searchParams['time'] ? moment(searchParams['time'], 'YYYY').valueOf() / 1000 : searchParams['time'];
        const queries = _.assign({ page: current, page_size: pageSize }, searchParams, payload);
        const { data } = yield call(GetContractArchiveList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { contractArchives: data } });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateContractFiles(state, { payload }) {
      return {
        ...state,
        editContractArchive: { ...state['editContractArchive'], attachment: payload },
      };
    },
  },

};
