import { UploadPamphlet, DeletePamphlet, GetPamphletList } from '@/services/brochure';
import { message } from 'antd';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'pamphletList',

  state: {
    routes: [{ breadcrumbName: '宣传册' }],

    uploadPamphletsModalVisible: false,

    searchParams: {
      belong_to: '',
    },

    pamphlets: {
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
    * eUploadPamphlets({ payload }, { select, call, put }) {
      try {
        const { category, fileList } = payload;
        const { pamphlets: { current, pageSize } } = yield select(state => state['pamphletList']);

        // 上传文件
        const formData = new FormData();
        formData.append('folder_path', 'pamphlet');
        formData.append('file', fileList[0]);
        const { data } = yield call(UploadFile, formData);
        yield put({ type: 'rUpdateState', payload: { uploadPamphletsModalVisible: false } });

        // 提交文件和分类信息
        const { msg } = yield call(UploadPamphlet, { category, attachment: data[0].id });
        message.success(msg);

        // 更新列表数据
        yield put({ type: 'eGetPamphlets', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeletePamphlet({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeletePamphlet, id, payload);
        message.success(msg);
        const { pamphlets: { current, pageSize } } = yield select(state => state['pamphletList']);
        yield put({ type: 'eGetPamphlets', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },

    * eGetPamphlets({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetPamphletList, payload);
        yield put({ type: 'rUpdateState', payload: { pamphlets: data } });
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
