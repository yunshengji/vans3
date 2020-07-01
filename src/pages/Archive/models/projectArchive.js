import { message } from 'antd';
import _ from 'lodash';
import { UploadFile } from '@/services/files';
import {
  UploadProjectArchive,
  DeleteProjectArchive,
  UpdateProjectArchive,
  GetProjectArchiveList,
} from '@/services/archive';

export default {

  namespace: 'projectArchiveList',

  state: {
    routes: [{ breadcrumbName: '项目档案' }],

    isEditing: false,
    editProjectArchiveVisible: false,
    editProjectArchive: {},

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
    * eUploadProjectArchive({ payload }, { select, call, put }) {
      try {
        const { name, category, settlement, fileListOrdinary, fileListDetail, fileListResult } = payload;
        let attachment, detail, result;

        // 上传文件
        if (!_.isEmpty(fileListOrdinary)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListOrdinary, (value, key) => {
            formData.append('file', fileListOrdinary[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          attachment = _.map(data, 'id');
        }
        if (!_.isEmpty(fileListDetail)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListDetail, (value, key) => {
            formData.append('file', fileListDetail[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          detail = _.map(data, 'id');
        }
        if (!_.isEmpty(fileListResult)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListResult, (value, key) => {
            formData.append('file', fileListResult[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          result = _.map(data, 'id');
        }

        const { msg } = yield call(UploadProjectArchive, { name, category, settlement, attachment, detail, result });
        yield put({ type: 'rUpdateState', payload: { editProjectArchiveVisible: false } });
        message.success(msg);

        yield put({ type: 'eLoadProjectArchive' });
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
    * eUpdateProjectArchive({ payload }, { select, call, put }) {
      try {
        const { name, category, settlement, fileListOrdinary, fileListDetail, fileListResult } = payload;
        const { editProjectArchive } = yield select(state => state['projectArchiveList']);
        let attachment = _.map(editProjectArchive['attachment'], 'id');
        let detail = _.map(editProjectArchive['detail'], 'id');
        let result = _.map(editProjectArchive['result'], 'id');

        // 上传文件
        if (!_.isEmpty(fileListOrdinary)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListOrdinary, (value, key) => {
            formData.append('file', fileListOrdinary[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          attachment = _.concat(attachment, _.map(data, 'id'));
        }
        if (!_.isEmpty(fileListDetail)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListDetail, (value, key) => {
            formData.append('file', fileListDetail[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          detail = _.concat(detail, _.map(data, 'id'));
        }
        if (!_.isEmpty(fileListResult)) {
          const formData = new FormData();
          formData.append('folder_path', 'archive_project');
          _.forEach(fileListResult, (value, key) => {
            formData.append('file', fileListResult[key]['originFileObj']);
          });
          const { data } = yield call(UploadFile, formData);
          result = _.concat(result, _.map(data, 'id'));
        }
        const { msg } = yield call(
          UpdateProjectArchive,
          editProjectArchive['id'],
          { name, category, settlement, attachment, detail, result },
        );
        yield put({ type: 'rUpdateState', payload: { editProjectArchiveVisible: false } });
        message.success(msg);

        yield put({ type: 'eLoadProjectArchive' });
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
    rUpdateAttachmentFiles(state, { payload }) {
      return {
        ...state,
        editProjectArchive: { ...state['editProjectArchive'], attachment: payload },
      };
    },
    rUpdateDetailFiles(state, { payload }) {
      return {
        ...state,
        editProjectArchive: { ...state['editProjectArchive'], detail: payload },
      };
    },
    rUpdateResultFiles(state, { payload }) {
      return {
        ...state,
        editProjectArchive: { ...state['editProjectArchive'], result: payload },
      };
    },
  },

};
