import { CreateWorkDiary, DeleteWorkDiary, EditWorkDiary, GetWorkDiariesList } from '@/services/workDiaries';
import { message } from 'antd';


export default {

  namespace: 'workDiariesList',

  state: {
    routes: [{ breadcrumbName: '工作日志' }],

    editWorkDiaryDrawerVisible: false,
    editWorkDiary: {},

    workDiaries: {
      total: 0,
      current: 1,
      pageSize: 5,
      list: [],
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eCreateWorkDiary({ payload }, { select, call, put }) {
      try {
        const { msg } = yield call(CreateWorkDiary, payload);
        message.success(msg);
        const { workDiaries: { current, pageSize } } = yield select(state => state.workDiariesList);
        yield put({ type: 'eGetWorkDiaries', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteWorkDiary({ payload }, { select, call, put }) {
      try {
        const { id } = payload;
        const { msg } = yield call(DeleteWorkDiary, id, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { editWorkDiaryDrawerVisible: false } });
        const { workDiaries: { current, pageSize } } = yield select(state => state.workDiariesList);
        yield put({ type: 'eGetWorkDiaries', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * eEditWorkDiary({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(EditWorkDiary, id, payload);
        message.success(msg);
        yield put({ type: 'rUpdateState', payload: { editWorkDiaryDrawerVisible: false } });
        const { workDiaries: { current, pageSize } } = yield select(state => state.workDiariesList);
        yield put({ type: 'eGetWorkDiaries', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
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
