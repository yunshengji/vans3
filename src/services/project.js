import request from '@/utils/request';

export async function UploadSpecialDebt(data) {
  return request('/specialDebt', {
    method: 'POST',
    data,
  });
}

export async function DeleteSpecialDebt(id, data) {
  return request(`/specialDebt/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function UpdateSpecialDebt(id, data) {
  return request(`/specialDebt/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetSpecialDebt(id, params) {
  return request(`/specialDebt/${id}`, {
    method: 'GET',
    params,
  });
}

export async function GetSpecialDebtList(params) {
  return request('/specialDebt', {
    method: 'GET',
    params,
  });
}
