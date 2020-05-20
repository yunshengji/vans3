import { GetMe } from '@/services/users';
// import { UploadFile } from '@/services/files';

export default {

  namespace: 'common',

  state: {
    menuCollapsed: false,
    drawerMenuVisible: false,
    isLogOuting: false,

    mine: {},
  },


  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetMe({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetMe);
        yield put({ type: 'rUpdateMine', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
    // * eUploadFile({ payload }, { select, call, put }) {
    //   const { folder_path, file } = payload;
    //   const formData = new FormData();
    //   formData.append('folder_path', folder_path);
    //   formData.append('file', file);
    //   const { data } = yield call(UploadFile, formData);
    //   return data;
    // },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateMine(state, { payload }) {
      state.mine = payload;
      return state;
    },
  },

};
