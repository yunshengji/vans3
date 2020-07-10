import request from '@/utils/request';

export async function GetDepartments(params) {
  return request('/department', {
    method: 'GET',
    params,
  });
}

export async function CreateStaff(data) {
  return request('/staff', {
    method: 'POST',
    data,
  });
}

export async function EditStaff(id, data) {
  return request(`/staff/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetStaffMe(id, params) {
  return request(`/staff/${id}`, {
    method: 'GET',
    params,
  });
}

export async function GetStaffList(params) {
  return request('/staff', {
    method: 'GET',
    params,
  });
}

export async function GetMe() {
  return request('/staff/me', {
    method: 'GET',
  });
}
