import request from '@/utils/request';

export async function GetDepartments(params) {
  return request('/department', {
    method: 'GET',
    params,
  });
}

export async function CreateUser(data) {
  return request('/user', {
    method: 'POST',
    data,
  });
}

export async function EditUser(id, data) {
  return request(`/user/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetUsersList(params) {
  return request('/user', {
    method: 'GET',
    params,
  });
}

export async function GetMe() {
  return request('/user/me', {
    method: 'GET',
  });
}
