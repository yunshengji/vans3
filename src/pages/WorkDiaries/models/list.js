import { GetWorkDiariesList } from '@/services/workDiaries';


export default {

  namespace: 'workDiariesList',

  state: {
    routes: [{ breadcrumbName: '工作日志' }],
    workDiaries: {
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
    * eGetWorkDiaries({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetWorkDiariesList, payload);
        yield put({ type: 'rUpdateWorkDiaries', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateWorkDiaries(state, { payload }) {
      state.workDiaries = payload;
      return state;
    },
  },

};
