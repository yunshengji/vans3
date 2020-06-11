import request from '@/utils/request';

export async function UploadProjectArchive(data) {
  return request('/project', {
    method: 'POST',
    data,
  });
}

export async function DeleteProjectArchive(id, data) {
  return request(`/project/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function GetProjectArchiveList(params) {
  return request('/project', {
    method: 'GET',
    params,
  });
}

export async function UploadContractArchive(data) {
  return request('/contract', {
    method: 'POST',
    data,
  });
}

export async function DeleteContractArchive(id, data) {
  return request(`/contract/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function GetContractArchiveList(params) {
  return request('/contract', {
    method: 'GET',
    params,
  });
}
