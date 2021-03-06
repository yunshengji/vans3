import { message } from 'antd';
import _ from 'lodash';
import { UploadFile } from '@/services/files';
import { EditUser } from '@/services/user';

export default {

  namespace: 'setting',

  state: {
    routes: [{ breadcrumbName: '系统用户', path: '/users' }, { breadcrumbName: '个人设置' }],
    avatarFile: null,
    avatarPreview: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eUpdate({ id, payload }, { select, call, put }) {
      try {
        const { avatarFile } = yield select(state => state['setting']);
        if (avatarFile) {
          const formData = new FormData();
          const { avatarFile } = yield select(state => state['setting']);
          formData.append('file', avatarFile);
          formData.append('folder_path', 'avatar');
          const { data } = yield call(UploadFile, formData);
          payload.avatar = _.head(data).id;
        }
        const { msg } = yield call(EditUser, id, payload);
        message.success(msg);
        yield put({ type: 'common/eGetMe' });
        yield put({ type: 'rUpdateState', payload: { avatarFile: null, avatarPreview: '' } });
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
