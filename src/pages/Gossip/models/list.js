import { message } from 'antd';
import _ from 'lodash';
import { UploadFile } from '@/services/files';
import { WriteGossip, deleteGossip, publishComment, GetGossipWritings } from '@/services/gossip';

export default {

  namespace: 'gossipList',

  state: {
    routes: [{ breadcrumbName: '吐槽角' }],

    gossipPicturesFileList: [],
    uploadPicturePreviewImage: null,
    uploadPicturePreviewModalVisible: false,

    writingsPictureDetailModalVisible: false,
    writingsPictureDetailImage: null,

    gossipWritings: {
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
    * eWriteGossip({ payload }, { select, call, put }) {
      try {
        let attachments = [];
        const { content, isPrivate, form } = payload;
        const { gossipPicturesFileList } = yield select(state => state['gossipList']);

        if (!_.isEmpty(gossipPicturesFileList)) {
          const formData = new FormData();
          formData.append('folder_path', 'gossip');
          _.forEach(gossipPicturesFileList, item => {
            if (item.type.startsWith('image')) {
              formData.append('file', item.originFileObj);
            }
          });
          const { data } = yield call(UploadFile, formData);
          attachments = _.map(data, 'id');
        }

        const { msg } = yield call(WriteGossip, { content, private: isPrivate, attachments });
        message.success(msg);
        form.resetFields();
        yield put({
          type: 'rUpdateState',
          payload: { gossipPicturesFileList: [], uploadPicturePreviewImage: null },
        });
        yield put({ type: 'eLoadGossipWritings' });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteGossip({ id, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(deleteGossip, id, payload);
        message.success(msg);
        yield put({ type: 'eLoadGossipWritings' });
      } catch (err) {
        console.log(err);
      }
    },

    * ePublishComment({ form, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(publishComment, payload);
        message.success(msg);
        form.resetFields();
        yield put({ type: 'eLoadGossipWritings' });
      } catch (err) {
        console.log(err);
      }
    },

    * eLoadGossipWritings({ payload }, { select, call, put }) {
      try {
        const { gossipWritings: { current, pageSize } } = yield select(state => state['gossipList']);
        const queries = _.assign({ page: current, page_size: pageSize }, payload);
        const { data } = yield call(GetGossipWritings, { ...queries });
        yield put({ type: 'rUpdateState', payload: { gossipWritings: data } });
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
