import { GetProjectsList } from '@/services/project';


export default {

  namespace: 'dashboard',

  state: {
    projectsData: {
      list: [],
      pagination: {
        total: 0,
        current: 0,
        pageSize: 10,
        showTotal: total => `共 ${total} 条`,
      },
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetProjectsData({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetProjectsList);
        yield put({ type: 'rUpdateProjectsData', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateProjectsData(state, { payload }) {
      state.projectsData = payload;
      return state;
    },
  },

};
