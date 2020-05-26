import { message } from 'antd';
import {
  CreateExpert, DeleteExpert, EditExpert, GetExpertsList,
  CreateProject, DeleteProject, EditProject, GetProjectsList, GetNewExpertFromProject,
} from '@/services/experts';

export default {

  namespace: 'experts',

  state: {
    activeKey: 'resultsLibrary',
    routes: {
      resultsLibrary: [{ breadcrumbName: '抽取结果' }],
      expertsLibrary: [{ breadcrumbName: '专家库' }],
    },

    createExpertVisible: false,
    editExpertVisible: false,
    editExpert: {},
    expertsList: {
      total: 0,
      current: 1,
      pageSize: 10,
      list: [],
    },

    createProjectVisible: false,
    editProjectVisible: false,
    editProject: {},
    projectsList: {
      total: 0,
      current: 1,
      pageSize: 10,
      list: [],
    },

    chooseExpertsNumVisible: false,
    chooseExpertsNumProjectId: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eCreateExpert({ payload }, { select, call, put }) {
      try {
        const { msg } = yield call(CreateExpert, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { createExpertVisible: false } });
        yield put({ type: 'eReloadExpertsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteExpert({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteExpert, id, payload);
        message.success(msg);
        yield put({ type: 'eReloadExpertsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eEditExpert({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditExpert, id, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { editExpertVisible: false } });
        yield put({ type: 'eReloadExpertsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetExpertsList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetExpertsList, payload);
        yield put({ type: 'rUpdateExpertsList', payload: data });
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      } catch (err) {
        console.log(err);
      }
    },
    * eReloadExpertsList({ payload }, { select, call, put }) {
      try {
        const { expertsList: { current, pageSize } } = yield select(state => state['experts']);
        yield put({ type: 'eGetExpertsList', payload: { page: current, page_size: pageSize } });
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      } catch (err) {
        console.log(err);
      }
    },
    * eCreateProject({ payload }, { select, call, put }) {
      try {
        const { msg } = yield call(CreateProject, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { createProjectVisible: false } });
        yield put({ type: 'eReloadProjectsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eCreateProjectExpertsList({ payload }, { select, call, put }) {
      try {
        const { data: expertList } = yield call(GetProjectsList, payload);
        const { chooseExpertsNumProjectId } = yield select(state => state['experts']);
        yield put({ type: 'rUpdateState', payload: { chooseExpertsNumVisible: false } });
        let expertIds = [];
        expertList.forEach(item => {
          expertIds.push(item.id);
        });
        const { msg } = yield call(EditProject, chooseExpertsNumProjectId, { expert_list: expertIds });
        message.success(msg);
        yield put({ type: 'eReloadProjectsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteProject({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteProject, id, payload);
        message.success(msg);
        yield put({ type: 'eReloadProjectsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eRemoveExpertFromProject({ payload }, { select, call, put }) {
      try {
        const { id, expertsList, record } = payload;
        const { data } = yield call(GetNewExpertFromProject, id, { action: 'reroll' });
        const position = expertsList.indexOf(record);
        expertsList.splice(position, 1, data);
        let expertIds = [];
        expertsList.forEach(item => {
          expertIds.push(item.id);
        });
        const { msg } = yield call(EditProject, id, { expert_list: expertIds });
        message.success(msg);
        yield put({ type: 'eReloadProjectsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eEditProject({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditProject, id, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { editProjectVisible: false } });
        yield put({ type: 'eReloadProjectsList' });
      } catch (err) {
        console.log(err);
      }
    },
    * eReloadProjectsList({ payload }, { select, call, put }) {
      try {
        const { projectsList: { current, pageSize } } = yield select(state => state['experts']);
        yield put({ type: 'eGetProjectsList', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetProjectsList({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetProjectsList, payload);
        yield put({ type: 'rUpdateProjectsList', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateExpertsList(state, { payload }) {
      state.expertsList = payload;
      return state;
    },
    rUpdateProjectsList(state, { payload }) {
      state.projectsList = payload;
      return state;
    },
  },

};
