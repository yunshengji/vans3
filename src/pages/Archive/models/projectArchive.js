import { UploadProjectArchive, DeleteProjectArchive, GetProjectArchiveList } from '@/services/archive';
import { message } from 'antd';
import { UploadFile } from '@/services/files';
import _ from 'lodash';
import { GetStaffList } from '@/services/staff';

export default {

  namespace: 'projectArchiveList',

  state: {
    routes: [{ breadcrumbName: '项目档案' }],

    uploadProjectArchivesModalVisible: false,

    searchParams: {
      name: undefined,
      category: undefined,
      settlement: undefined,
    },

    projectArchives: {
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
    * eUploadProjectArchives({ payload }, { select, call, put }) {
      try {
        const { name, category, settlement, fileListOrdinary, fileListDetail } = payload;
        let attachment, detail;
        const { projectArchives: { current, pageSize } } = yield select(state => state['projectArchiveList']);

        // 上传文件
        if (fileListOrdinary) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListOrdinary, (value, key) => {
            formData.append('file', fileListOrdinary[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          attachment = _.map(data, 'id');
        }
        if (fileListDetail) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListDetail, (value, key) => {
            formData.append('file', fileListDetail[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          detail = _.map(data, 'id');
        }

        // 提交文件和分类信息
        const { msg } = yield call(UploadProjectArchive, { name, category, settlement, attachment, detail });
        yield put({ type: 'rUpdateState', payload: { uploadProjectArchivesModalVisible: false } });
        message.success(msg);

        // 更新列表数据
        yield put({ type: 'eLoadProjectArchive', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteProjectArchive({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteProjectArchive, id, payload);
        message.success(msg);
        const { projectArchives: { current, pageSize } } = yield select(state => state['projectArchiveList']);
        yield put({ type: 'eLoadProjectArchive', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadProjectArchive({ payload }, { select, call, put }) {
      try {
        const { searchParams, projectArchives: { current, pageSize } } = yield select(state => state['projectArchiveList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParams, payload);
        const { data } = yield call(GetProjectArchiveList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { projectArchives: data } });
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
