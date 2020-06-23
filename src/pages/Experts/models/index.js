import { message } from 'antd';
import _ from 'lodash';
import {
  CreateExpert, DeleteExpert, EditExpert, GetExpertsList,
  CreateProject, DeleteProject, EditProject, GetProjectsList, GetNewExpertFromProject,
} from '@/services/experts';

export default {

  namespace: 'experts',

  state: {
    activeKey: 'resultsLibrary',
    routes: {
      resultsLibrary: [{ breadcrumbName: '专家组', path: '/experts' }, { breadcrumbName: '评审组' }],
      expertsLibrary: [{ breadcrumbName: '专家组', path: '/experts' }, { breadcrumbName: '专家库' }],
    },

    searchExpertParams: {
      name: undefined,
      procurement_num: undefined,
      law_num: undefined,
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

    searchProjectParams: {
      name: undefined,
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
        yield put({ type: 'rUpdateState', payload: { createExpertVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadExperts' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteExpert({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteExpert, id, payload);
        message.success(msg);
        yield put({ type: 'eLoadExperts' });
      } catch (err) {
        console.log(err);
      }
    },
    * eEditExpert({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditExpert, id, payload);
        yield put({ type: 'rUpdateState', payload: { editExpertVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadExperts' });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadExperts({ payload }, { select, call, put }) {
      try {
        const { searchExpertParams, expertsList: { current, pageSize } } = yield select(state => state['experts']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchExpertParams, payload);
        const { data } = yield call(GetExpertsList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { expertsList: data } });
      } catch (err) {
        console.log(err);
      }
    },

    * eCreateProject({ payload }, { select, call, put }) {
      try {
        const { msg } = yield call(CreateProject, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { createProjectVisible: false } });
        yield put({ type: 'eLoadProjects' });
      } catch (err) {
        console.log(err);
      }
    },
    * eCreateProjectExpertsList({ id, payload }, { select, call, put }) {
      try {
        const { data: expertList } = yield call(GetNewExpertFromProject, id, payload);
        const { chooseExpertsNumProjectId } = yield select(state => state['experts']);
        yield put({ type: 'rUpdateState', payload: { chooseExpertsNumVisible: false } });

        const expertIds = _.map(expertList, 'id');
        const { msg } = yield call(EditProject, chooseExpertsNumProjectId, { expert_list: expertIds });
        message.success(msg);
        yield put({ type: 'eLoadProjects' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteProject({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(DeleteProject, id, payload);
        message.success(msg);
        yield put({ type: 'eLoadProjects' });
      } catch (err) {
        console.log(err);
      }
    },
    * eRemoveExpertFromProject({ payload }, { select, call, put }) {
      try {
        const { id, expertsList, record } = payload;
        const { data } = yield call(GetNewExpertFromProject, id, { action: 'reroll' });
        expertsList.splice(expertsList.indexOf(record), 1, data);
        const expertIds = _.map(expertsList, 'id');
        const { msg } = yield call(EditProject, id, { expert_list: expertIds });
        message.success(msg);
        yield put({ type: 'eLoadProjects' });
      } catch (err) {
        console.log(err);
      }
    },
    * eEditProject({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditProject, id, payload);
        yield put({ type: 'rUpdateState', payload: { editProjectVisible: false } });
        message.success(msg);
        yield put({ type: 'eLoadProjects' });
      } catch (err) {
        console.log(err);
      }
    },
    * eLoadProjects({ payload }, { select, call, put }) {
      try {
        const { searchProjectParams, projectsList: { current, pageSize } } = yield select(state => state['experts']);
        const queries = _.assign({ page: current, page_size: pageSize }, searchProjectParams, payload);
        const { data } = yield call(GetProjectsList, { ...queries });
        yield put({ type: 'rUpdateState', payload: { projectsList: data } });
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
