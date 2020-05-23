import { UploadLaws, DeleteLaw, GetLawsList } from '@/services/laws';
import { message } from 'antd';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'lawsList',

  state: {
    routes: [{ breadcrumbName: '法律法规资料' }],

    uploadLawsModalVisible: false,

    searchParams: {
      belong_to: '',
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
        formData.append('file', fileList[0]);
        const { data: { id: attachmentId } } = yield call(UploadFile, formData);
        yield put({ type: 'rUpdateState', payload: { uploadLawsModalVisible: false } });

        // 提交文件和分类信息
        const { msg } = yield call(UploadLaws, { belong_to, attachment: attachmentId });
        message.success(msg);

        // 更新列表数据
        yield put({ type: 'eGetLaws', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteLaw({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteLaw, id, payload);
        message.success(msg);
        const { laws: { current, pageSize } } = yield select(state => state['lawsList']);
        yield put({ type: 'eGetLaws', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },

    * eGetLaws({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetLawsList, payload);
        yield put({ type: 'rUpdateLaws', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateLaws(state, { payload }) {
      state.laws = payload;
      return state;
    },
  },

};
