import { router } from 'umi';
import { message } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { getIdsFromWholeList, getIdsFromManagerList } from '@/utils/transfer';
import { SPECIAL_DEBT_FILE_TYPE } from '../../../../config/constant';
import { GetUsersList } from '@/services/users';
import { UploadFile } from '@/services/files';
import { DeleteSpecialDebt, UpdateSpecialDebt, GetSpecialDebtList, GetSpecialDebt } from '@/services/project';

export default {

  namespace: 'editSpecialDebt',

  state: {
    activeKey: 'EditSpecialDebtInfo',
    routesInfo: [{ breadcrumbName: '专项债项目', path: '/specialDebt' }, { breadcrumbName: '编辑项目' }],
    uploadVisible: false,
    historyVisible: false,
    historyIndex: '',
    usersList: [],
    editSpecialDebt: {
      debtDetails: [],
      outsourcings: [],
    },
    uploadedSummarizeFile: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetUsers({ payload }, { select, call, put }) {
      try {
        const { data: { list: users } } = yield call(GetUsersList, { page_size: 10000 });
        yield put({ type: 'rUpdateState', payload: { usersList: users } });
      } catch (err) {
        console.log(err);
      }
    },
    * eDeleteFile({ id, payload }, { select, call, put }) {
      const { msg, data } = yield call(UpdateSpecialDebt, id, payload);
      message.success(msg);
      yield put({ type: 'eGetSpecialDebt', id });
    },
    * eUpdateSpecialDebt({ id, payload }, { select, call, put }) {
      try {
        const {
          period, fileList, start,
          publishDebtCash, publishDebtYear, publishDebtDate, publishDebtFormItemsKeys,
          outSourceUser, outSourceCategory, outSourceContact, outSourceFormItemsKeys,
        } = payload;

        if (!_.isEmpty(period)) {
          payload['period'] = _.map(period, function(value) {
            return moment(value).valueOf() / 1000;
          });
        }

        if (!_.isEmpty(start)) {
          payload['start'] = moment(start).valueOf() / 1000;
        }

        let debtDetails = [];
        _.forEach(publishDebtFormItemsKeys, function(value) {
          debtDetails.push({
            cash: publishDebtCash[value],
            year: publishDebtYear[value],
            create: moment(publishDebtDate[value]).valueOf() / 1000,
          });
          delete payload['publishDebtCash'];
          delete payload['publishDebtYear'];
          delete payload['publishDebtDate'];
          delete payload['publishDebtFormItemsKeys'];
          payload['debtDetails'] = debtDetails;
        });

        let outsourcings = [];
        _.forEach(outSourceFormItemsKeys, function(value) {
          outsourcings.push({
            user: outSourceUser[value],
            category: outSourceCategory[value],
            contact: outSourceContact[value],
          });
          delete payload['outSourceUser'];
          delete payload['outSourceCategory'];
          delete payload['outSourceContact'];
          delete payload['outSourceFormItemsKeys'];
          payload['outsourcings'] = outsourcings;
        });

        if (!_.isEmpty(fileList)) {
          const formData = new FormData();
          formData.append('folder_path', 'special_debt');
          formData.append('file', _.head(fileList));
          const { data } = yield call(UploadFile, formData);
          payload['summarize'] = _.head(data).id;
          delete payload['fileList'];
        }

        const { msg, data } = yield call(UpdateSpecialDebt, id, payload);
        message.success(msg);
        yield put({ type: 'eGetSpecialDebt', id });
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateFiles({ id, payload }, { select, call, put }) {
      const { type, fileList } = payload;
      const field = SPECIAL_DEBT_FILE_TYPE[_.findIndex(SPECIAL_DEBT_FILE_TYPE, (o) => o.name === type)]['field'];

      const formData = new FormData();
      formData.append('folder_path', 'special_debt');
      _.forEach(fileList, item => {
        formData.append('file', item['originFileObj']);
      });
      const { data: files } = yield call(UploadFile, formData);

      const { msg, data } = yield call(UpdateSpecialDebt, id, {
        [field]: _.map(files, 'id'),
      });

      yield put({ type: 'rUpdateState', payload: { uploadVisible: false } });
      message.success(msg);
      yield put({ type: 'eGetSpecialDebt', id });
    },
    * eGetSpecialDebt({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetSpecialDebt, id, payload);

        const { period, menber_a, menber_b, menber_c, menber_d, menber_e, summarize } = data;
        let uploadedSummarizeFile = [];

        data['period'] = _.map(period, function(value) {
          return moment(value * 1000);
        });
        if (_.size(summarize) > 0) {
          uploadedSummarizeFile.push(summarize);
        }
        data['menber_a'] = _.map(menber_a, 'id');
        data['menber_b'] = _.map(menber_b, 'id');
        data['menber_c'] = _.map(menber_c, 'id');
        data['menber_d'] = _.map(menber_d, 'id');
        data['menber_e'] = _.map(menber_e, 'id');

        yield put({ type: 'rUpdateState', payload: { editSpecialDebt: data, uploadedSummarizeFile } });
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
