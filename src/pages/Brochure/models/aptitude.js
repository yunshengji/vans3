import { message } from 'antd';
import _ from 'lodash';
import { UploadAptitude, DeleteAptitude, GetAptitudeList } from '@/services/brochure';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'aptitudeList',

  state: {
    routes: [{ breadcrumbName: '宣传册' }],

    uploadAptitudesModalVisible: false,

    searchParams: {
      belong_to: '',
    },

    aptitudes: {
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
    * eUploadAptitudes({ payload }, { select, call, put }) {
      try {
        const { name, remark, fileList } = payload;
        const { aptitudes: { current, pageSize } } = yield select(state => state['aptitudeList']);

        // 上传文件
        const formData = new FormData();
        formData.append('folder_path', 'aptitude');
        _.forEach(fileList, (value,key) => {
          formData.append('file', fileList[key]['originFileObj']);
        });
        const { data } = yield call(UploadFile, formData);
        yield put({ type: 'rUpdateState', payload: { uploadAptitudesModalVisible: false } });

        // 提交文件和分类信息
        const { msg } = yield call(UploadAptitude, { name, remark, attachment: _.map(data, 'id') });
        message.success(msg);

        // 更新列表数据
        yield put({ type: 'eGetAptitudes', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteAptitude({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteAptitude, id, payload);
        message.success(msg);
        const { aptitudes: { current, pageSize } } = yield select(state => state['aptitudeList']);
        yield put({ type: 'eGetAptitudes', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },

    * eGetAptitudes({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetAptitudeList, payload);
        yield put({ type: 'rUpdateState', payload: { aptitudes: data } });
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
