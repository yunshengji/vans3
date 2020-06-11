import { message } from 'antd';
import _ from 'lodash';
import { UploadLaws, DeleteLaw, GetLawsList } from '@/services/laws';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'lawsList',

  state: {
    routes: [{ breadcrumbName: '法律法规资料' }],

    uploadLawsModalVisible: false,

    searchParams: {
      belong_to: undefined,
      name: undefined,
    },

    laws: {
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
    * eUploadLaws({ payload }, { select, call, put }) {
      try {
        const { belong_to, fileList } = payload;
        const { laws: { current, pageSize } } = yield select(state => state['lawsList']);

        // 上传文件
        const formData = new FormData();
        formData.append('folder_path', 'law');
        formData.append('file', _.head(fileList));
        const { data } = yield call(UploadFile, formData);

        // 提交
        const { msg } = yield call(UploadLaws, { belong_to, attachment: _.head(data).id });
        yield put({ type: 'rUpdateState', payload: { uploadLawsModalVisible: false } });
        message.success(msg);

        yield put({ type: 'eLoadLaws' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteLaw({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteLaw, id, payload);
        message.success(msg);
        yield put({ type: 'eLoadLaws' });
      } catch (err) {
        console.log(err);
      }
    },

    * eLoadLaws({ payload }, { select, call, put }) {
      try {
        const { searchParams, laws: { current, pageSize } } = yield select(state => state['lawsList']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchParams, payload);
        const { data } = yield call(GetLawsList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { laws: data } });
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
