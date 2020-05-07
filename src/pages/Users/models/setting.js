import { message } from 'antd';
import { UploadFile } from '@/services/uploadFiles';
import { EditUser } from '@/services/users';

export default {

  namespace: 'setting',

  state: {
    routes: [{ breadcrumbName: '用户', path: '/users' }, { breadcrumbName: '个人设置' }],
    avatarFile: null,
    avatarPreview: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eSubmitUpdate({ id, payload }, { select, call, put }) {
      try {
        const { avatarFile } = yield select(state => state['setting']);
        if (avatarFile) {
          const formData = new FormData();
          const { avatarFile } = yield select(state => state['setting']);
          formData.append('file', avatarFile);
          formData.append('folder_path', 'avatar');
          const { data: { file_url } } = yield call(UploadFile, formData);
          payload.avatar = file_url;
        }
        const { msg } = yield call(EditUser, id, payload);
        message.success(msg);
        yield put({ type: 'basicLayout/eGetMe' });
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
