import { UploadPerformance, DeletePerformance, GetPerformanceList } from '@/services/brochure';
import { message } from 'antd';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'performanceList',

  state: {
    routes: [{ breadcrumbName: '业绩表' }],

    uploadPerformancesModalVisible: false,

    searchParams: {
      belong_to: '',
    },

    performances: {
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
    * eUploadPerformances({ payload }, { select, call, put }) {
      try {
        const { category, fileList } = payload;
        const { performances: { current, pageSize } } = yield select(state => state['performanceList']);

        // 上传文件
        const formData = new FormData();
        formData.append('folder_path', 'performance');
        formData.append('file', fileList[0]);
        const { data } = yield call(UploadFile, formData);
        yield put({ type: 'rUpdateState', payload: { uploadPerformancesModalVisible: false } });

        // 提交文件和分类信息
        const { msg } = yield call(UploadPerformance, { category, attachment: data[0].id });
        message.success(msg);

        // 更新列表数据
        yield put({ type: 'eGetPerformances', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeletePerformance({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeletePerformance, id, payload);
        message.success(msg);
        const { performances: { current, pageSize } } = yield select(state => state['performanceList']);
        yield put({ type: 'eGetPerformances', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },

    * eGetPerformances({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetPerformanceList, payload);
        yield put({ type: 'rUpdateState', payload: { performances: data } });
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
