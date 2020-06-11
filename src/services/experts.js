import request from '@/utils/request';

export async function CreateExpert(data) {
  return request('/expert', {
    method: 'POST',
    data,
  });
}

export async function DeleteExpert(id, data) {
  return request(`/expert/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function EditExpert(id, data) {
  return request(`/expert/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetExpertsList(params) {
  return request('/expert', {
    method: 'GET',
    params,
  });
}

export async function CreateProject(data) {
  return request('/roll', {
    method: 'POST',
    data,
  });
}

export async function EditProject(id, data) {
  return request(`/roll/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function DeleteProject(id, data) {
  return request(`/roll/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function GetProjectsList(params) {
  return request('/roll', {
    method: 'GET',
    params,
  });
}

export async function GetNewExpertFromProject(id, params) {
  return request(`/roll/${id}`, {
    method: 'GET',
    params,
  });
}

