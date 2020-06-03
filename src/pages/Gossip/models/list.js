import { message } from 'antd';
import { WriteGossip, publishComment, GetGossipWritings } from '@/services/gossip';
import { UploadFile } from '@/services/files';

export default {

  namespace: 'gossipList',

  state: {
    routes: [{ breadcrumbName: '吐槽角' }],

    gossipPicturesPreviewFileList: [],
    gossipPicturesFileList: [],
    uploadPicturePreviewModalVisible: false,
    uploadPicturePreviewImage: null,

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
        let attachment_ids = [];
        const { content, isPrivate, form } = payload;
        const { gossipPicturesFileList, gossipWritings: { current, pageSize } } = yield select(state => state['gossipList']);
        // 上传文件
        if (gossipPicturesFileList.length > 0) {
          const formData = new FormData();
          formData.append('folder_path', 'gossip');
          gossipPicturesFileList.forEach(item => {
            formData.append('file', item);
          });
          const { data } = yield call(UploadFile, formData);
          data.forEach(item => {
            attachment_ids.push(item.id);
          });
        }
        // 提交文件和分类信息
        const { msg } = yield call(WriteGossip, { content, private: isPrivate, attachment_ids });
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
        // 更新列表数据
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
        yield put({ type: 'rUpdateGossipWritings', payload: data });
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      console.log(payload);
      return { ...state, ...payload };
    },
    rUpdateGossipWritings(state, { payload }) {
      state.gossipWritings = payload;
      return state;
    },
  },

};
