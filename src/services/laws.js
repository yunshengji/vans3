import request from '@/utils/request';

export async function UploadLaws(data) {
  return request('/law', {
    method: 'POST',
    data,
  });
}

export async function DeleteLaw(id, data) {
  return request(`/law/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function GetLawsList(params) {
  return request('/law', {
    method: 'GET',
    params,
  });
}
