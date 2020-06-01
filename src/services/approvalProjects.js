import request from '@/utils/request';

export async function CreateOriginTable(data) {
  return request('/origin', {
    method: 'POST',
    data,
  });
}

export async function DeleteOriginTable(id, data) {
  return request(`/origin/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function UpdateOriginTable(id, data) {
  return request(`/origin/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetOriginTable(id, params) {
  return request(`/origin/${id}`, {
    method: 'GET',
    params,
  });
}

export async function GetOriginTableList(params) {
  return request('/origin', {
    method: 'GET',
    params,
  });
}

export async function CreateRecordTable(data) {
  return request('/filingTable', {
    method: 'POST',
    data,
  });
}

export async function DeleteRecordTable(id, data) {
  return request(`/filingTable/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function UpdateRecordTable(id, data) {
  return request(`/filingTable/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetRecordTable(params) {
  return request(`/filingTable`, {
    method: 'GET',
    params,
  });
}

export async function GetRecordTableList(params) {
  return request('/filingTable', {
    method: 'GET',
    params,
  });
}

export async function CreateServiceTable(data) {
  return request('/serviceTable', {
    method: 'POST',
    data,
  });
}

export async function DeleteServiceTable(id, data) {
  return request(`/serviceTable/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function UpdateServiceTable(id, data) {
  return request(`/serviceTable/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetServiceTable(params) {
  return request(`/serviceTable`, {
    method: 'GET',
    params,
  });
}

export async function GetServiceTableList(params) {
  return request('/serviceTable', {
    method: 'GET',
    params,
  });
}

export async function CreateExecuteTable(data) {
  return request('/actTable', {
    method: 'POST',
    data,
  });
}

export async function DeleteExecuteTable(id, data) {
  return request(`/actTable/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function UpdateExecuteTable(id, data) {
  return request(`/actTable/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetExecuteTable(params) {
  return request(`/actTable`, {
    method: 'GET',
    params,
  });
}

export async function GetExecuteTableList(params) {
  return request('/actTable', {
    method: 'GET',
    params,
  });
}
