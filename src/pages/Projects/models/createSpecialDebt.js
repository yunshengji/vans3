import { GetProjectsList } from '@/services/projects';


export default {

  namespace: 'createSpecialDebt',

  state: {
    breadcrumbs: [
      { breadcrumbName: '项目库', path: '/projects' },
      { breadcrumbName: '新建专项债项目' },
    ],
    createModalVisible: false,
    projects: {
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
    * eGetProjects({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetProjectsList, payload);
        yield put({ type: 'rUpdateProjects', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateProjects(state, { payload }) {
      state.projects = payload;
      return state;
    },
  },

};
