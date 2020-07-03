import { message } from 'antd';
import _ from 'lodash';
import { UploadLaws, DeleteLaw, UpdateLaw, GetLawsList } from '@/services/laws';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'lawsList',

  state: {
    routes: [{ breadcrumbName: '法律法规资料' }],

    uploadLawsModalVisible: false,

    editLawModalVisible: false,
    editLaw: {},

    searchParams: {
      belong_to: [],
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
        const { belong_to, belong_to_2, label, fileList } = payload;

        // 上传文件
        const formData = new FormData();
        formData.append('folder_path', 'law');
        _.forEach(fileList, (item => formData.append('file', item.originFileObj)));
        const { data } = yield call(UploadFile, formData);
        const attachment = _.map(data, 'id');

        // 提交
        const { msg } = yield call(UploadLaws, { belong_to, belong_to_2, label, attachment });
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
    * eUpdateLaw({ id, payload }, { select, call, put }) {
      try {
        const { belong_to, belong_to_2, label, attachment } = payload;

        const { msg } = yield call(UpdateLaw, id, { belong_to, belong_to_2, label, attachment });
        yield put({ type: 'rUpdateState', payload: { editLawModalVisible: false } });
        message.success(msg);

        yield put({ type: 'eLoadLaws' });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadLaws({ payload }, { select, call, put }) {
      try {
        const { searchParams, laws: { current, pageSize } } = yield select(state => state['lawsList']);
        if (searchParams['belong_to'].length === 1) {
          searchParams['belong_to'] = _.head(searchParams['belong_to']);
        } else if (searchParams['belong_to'].length > 1) {
          const belong_to = _.head(searchParams['belong_to']);
          const belong_to_2 = _.last(searchParams['belong_to']);
          searchParams['belong_to'] = belong_to;
          searchParams['belong_to_2'] = belong_to_2;
        }
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
