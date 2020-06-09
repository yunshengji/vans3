import { router } from 'umi';
import { message } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { UploadFile } from '@/services/files';
import { GetDepartments } from '@/services/user';
import { CreateStaff, EditStaff, GetStaff } from '@/services/staff';

export default {

  namespace: 'editStaff',

  state: {
    routes: [{ breadcrumbName: '人事管理', path: '/staff' }, { breadcrumbName: '编辑员工信息' }],
    departments: [],
    staff: {},

    uploadIDCardFrontFile: null,
    uploadIDCardFrontPreview: null,
    uploadIDCardBackFile: null,
    uploadIDCardBackPreview: null,
    uploadDiplomaFile: null,
    uploadDiplomaPreview: null,

    uploadedContractFiles: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * eGetDepartments({ payload }, { select, call, put }) {
      try {
        const { data: { list: departments } } = yield call(GetDepartments, payload);
        yield put({ type: 'rUpdateState', payload: { departments } });
      } catch (err) {
        console.log(err);
      }
    },
    * eCreateStaff({ payload }, { select, call, put }) {
      try {
        const { uploadIDCardFrontFile, uploadIDCardBackFile, uploadDiplomaFile } = yield select(state => state['editStaff']);
        const { recruit, status, entry_time, contract } = payload;
        if (recruit === '自招') {
          payload['recruit'] = true;
        } else if (recruit === '挂靠') {
          payload['recruit'] = false;
        }
        if (status === '在职') {
          payload['status'] = true;
        } else if (status === '已离职') {
          payload['status'] = false;
        }
        if (entry_time) {
          payload['entry_time'] = moment(payload['entry_time']).valueOf() / 1000;
        }

        if (contract) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_contract');
          contract.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          payload['contract'] = _.map(data, 'id');
        }
        if (uploadIDCardFrontFile) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_id_card_front');
          formData.append('file', uploadIDCardFrontFile);
          const { data: ids } = yield call(UploadFile, formData);
          payload['credentials_front'] = ids[0]['id'];
        }
        if (uploadIDCardBackFile) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_id_card_back');
          formData.append('file', uploadIDCardBackFile);
          const { data: ids } = yield call(UploadFile, formData);
          payload['credentials_back'] = ids[0]['id'];
        }
        if (uploadDiplomaFile) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_diploma');
          formData.append('file', uploadDiplomaFile);
          const { data: ids } = yield call(UploadFile, formData);
          payload['diploma'] = ids[0]['id'];
        }

        const { msg, data: { id: staffId } } = yield call(CreateStaff, payload);
        message.success(msg);
        router.push(`/staff/edit/${staffId}`);
        yield put({ type: 'eGetStaff', id: staffId });
      } catch (err) {
        console.log(err);
      }
    },
    * eUpdateStaff({ id, payload }, { select, call, put }) {
      try {
        const { uploadIDCardFrontFile, uploadIDCardBackFile, uploadDiplomaFile, uploadedContractFiles } = yield select(state => state['editStaff']);
        const { recruit, status, entry_time, contract } = payload;
        if (recruit === '自招') {
          payload['recruit'] = true;
        } else if (recruit === '挂靠') {
          payload['recruit'] = false;
        }
        if (status === '在职') {
          payload['status'] = true;
        } else if (status === '已离职') {
          payload['status'] = false;
        }
        if (entry_time) {
          payload['entry_time'] = moment(payload['entry_time']).valueOf() / 1000;
        }

        if (contract) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_contract');
          contract.forEach(item => {
            formData.append('file', item.originFileObj);
          });
          const { data } = yield call(UploadFile, formData);
          payload['contract'] = _.map(data, 'id');
        }
        payload['contract'] = _.concat(payload['contract'] || [], _.map(uploadedContractFiles, 'id'));
        if (uploadIDCardFrontFile) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_id_card_front');
          formData.append('file', uploadIDCardFrontFile);
          const { data: ids } = yield call(UploadFile, formData);
          payload['credentials_front'] = ids[0]['id'];
        }
        if (uploadIDCardBackFile) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_id_card_back');
          formData.append('file', uploadIDCardBackFile);
          const { data: ids } = yield call(UploadFile, formData);
          payload['credentials_back'] = ids[0]['id'];
        }
        if (uploadDiplomaFile) {
          const formData = new FormData();
          formData.append('folder_path', 'staff_diploma');
          formData.append('file', uploadDiplomaFile);
          const { data: ids } = yield call(UploadFile, formData);
          payload['diploma'] = ids[0]['id'];
        }
        const { msg } = yield call(EditStaff, id, payload);
        message.success(msg);
        yield put({ type: 'eGetStaff', id });
      } catch (err) {
        console.log(err);
      }
    },
    * eGetStaff({ id, payload }, { select, call, put }) {
      try {
        const { data } = yield call(GetStaff, id, payload);
        console.log(data);
        const { department, recruit, status, contract } = data;
        if (recruit === true) {
          data['recruit'] = '自招';
        } else if (recruit === false) {
          data['recruit'] = '挂靠';
        }
        if (status === true) {
          data['status'] = '在职';
        } else if (recruit === false) {
          data['status'] = '已离职';
        }
        if (department) {
          data['department'] = department['id'];
        }
        yield put({ type: 'rUpdateState', payload: { uploadedContractFiles: data['contract'] } });
        yield put({ type: 'rUpdateStaff', payload: data });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    rUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    rUpdateStaff(state, { payload }) {
      return {
        ...state,
        staff: payload,
      };
    },
  },

};
