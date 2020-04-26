import { GetContactsList } from '@/services/contacts';


export default {

  namespace: 'contacts',

  state: {
    contactsData: {
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
    * eGetContactsData({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetContactsList, payload);
        yield put({ type: 'rUpdateContactsData', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateContactsData(state, { payload }) {
      state.contactsData = payload;
      return state;
    },
  },

};
