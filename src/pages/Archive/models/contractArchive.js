import { UploadContractArchive, DeleteContractArchive, GetContractArchiveList } from '@/services/archive';
import { GetOriginTableList } from '@/services/approvalProjects';
import { message } from 'antd';
import moment from 'moment';
import { UploadFile } from '@/services/files';
import _ from 'lodash';

export default {

  namespace: 'contractArchiveList',

  state: {
    routes: [{ breadcrumbName: '合同档案' }],

    uploadContractArchivesModalVisible: false,

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
    * eUploadContractArchives({ payload }, { select, call, put }) {
      try {
        let { name, category, cash, travel_cash, settlement, time, fileList, origin } = payload;
        const { contractArchives: { current, pageSize } } = yield select(state => state['contractArchiveList']);
        // 上传文件;
        const formData = new FormData();
        formData.append('folder_path', 'archive_contract');
        _.forEach(fileList, (item => {
          formData.append('file', item.originFileObj);
        }));
        const { data } = yield call(UploadFile, formData);
        const attachment = _.map(data, 'id');

        const { msg } = yield call(UploadContractArchive, {
          name,
          category,
          cash,
          travel_cash,
          settlement,
          time: moment(time, 'YYYY').valueOf() / 1000,
          attachment,
          origin,
        });
        yield put({ type: 'rUpdateState', payload: { uploadContractArchivesModalVisible: false } });
        message.success(msg);

        // 更新列表数据
        yield put({ type: 'eLoadContracts', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteContractArchive({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteContractArchive, id, payload);
        message.success(msg);
        const { contractArchives: { current, pageSize } } = yield select(state => state['contractArchiveList']);
        yield put({ type: 'eLoadContracts', payload: { page: current, page_size: pageSize } });
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
  },

};
