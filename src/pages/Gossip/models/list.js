import { message } from 'antd';
import _ from 'lodash';
import { WriteGossip, publishComment, GetGossipWritings } from '@/services/gossip';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'gossipList',

  state: {
    routes: [{ breadcrumbName: '吐槽角' }],

    gossipPicturesPreviewFileList: [],
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
        const { gossipPicturesFileList, gossipWritings: { current, pageSize } } = yield select(state => state['gossipList']);
        // 上传文件
        if (gossipPicturesFileList.length > 0) {
          const formData = new FormData();
          formData.append('folder_path', 'gossip');
          _.forEach(gossipPicturesFileList, item => {
            formData.append('file', item);
          });
          const { data } = yield call(UploadFile, formData);
          attachments = _.map(data, 'id');
        }
        // 提交图片和内容
        const { msg } = yield call(WriteGossip, { content, private: isPrivate, attachments });

        yield put({
          type: 'rUpdateState',
          payload: {
            gossipPicturesPreviewFileList: [],
            gossipPicturesFileList: [],
            uploadPicturePreviewImage: null,
          },
        });
        form.resetFields();
        message.success(msg);
        yield put({ type: 'eGetGossipWritings', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },
    * ePublishComment({ resetFields, payload }, { select, call, put }) {
      try {
        const { msg } = yield call(publishComment, payload);
        resetFields();
        message.success(msg);
        const { gossipWritings: { current, pageSize } } = yield select(state => state['gossipList']);
        yield put({ type: 'eGetGossipWritings', payload: { page: current, page_size: pageSize } });
      } catch (err) {
        console.log(err);
      }
    },

    * eGetGossipWritings({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetGossipWritings, payload);
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
