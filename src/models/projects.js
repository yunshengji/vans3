import { GetProjectsList } from '@/services/projects';


export default {

  namespace: 'projects',

  state: {
    projectsData: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
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
        const { data } = yield call(GetProjectsList, payload);
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
