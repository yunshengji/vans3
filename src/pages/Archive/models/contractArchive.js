import { UploadContractArchive, DeleteContractArchive, GetContractArchiveList } from '@/services/archive';
import { GetOriginTableList } from '@/services/approvalProjects';
import { message } from 'antd';
import moment from 'moment';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'contractArchiveList',

  state: {
    routes: [{ breadcrumbName: '合同档案' }],

    uploadContractArchivesModalVisible: false,

    originList: [],
    options: [],

    searchParams: {
      belong_to: '',
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
        let { category, cash, travel_cash, settlement, time, fileList, origin } = payload;
        let attachment, name;
        const { contractArchives: { current, pageSize } } = yield select(state => state['contractArchiveList']);

        // 上传文件
        const formData = new FormData();
        formData.append('folder_path', 'archive_contract');
        formData.append('file', fileList[0]);
        const { data } = yield call(UploadFile, formData);
        attachment = data[0].id;
        name = data[0]['file_name_local'].split('.')[0];

        // 时间转换
        time = moment(time).valueOf() / 1000;

        const { msg } = yield call(UploadContractArchive, {
          name,
          category,
          cash,
          travel_cash,
          settlement,
          time,
          attachment,
          origin,
        });
        yield put({ type: 'rUpdateState', payload: { uploadContractArchivesModalVisible: false } });
        message.success(msg);

        // 更新列表数据
        yield put({ type: 'eGetContractArchives', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteContractArchive({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteContractArchive, id, payload);
        message.success(msg);
        const { contractArchives: { current, pageSize } } = yield select(state => state['contractArchiveList']);
        yield put({ type: 'eGetContractArchives', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },

    * eGetContractArchives({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetContractArchiveList, payload);
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
