import request from '@/utils/request';

export async function CreateWorkDiary(data) {
  return request('/diary', {
    method: 'POST',
    data,
  });
}

export async function DeleteWorkDiary(id) {
  return request(`/diary/${id}`, {
    method: 'DELETE',
  });
}

export async function EditWorkDiary(id, data) {
  return request(`/diary/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetWorkDiariesList(params) {
  return request('/diary', {
    method: 'GET',
    params,
  });
}
