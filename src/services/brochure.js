import request from '@/utils/request';

export async function UploadPamphlet(data) {
  return request('/propagandize', {
    method: 'POST',
    data,
  });
}

export async function DeletePamphlet(id, data) {
  return request(`/propagandize/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function GetPamphletList(params) {
  return request('/propagandize', {
    method: 'GET',
    params,
  });
}

export async function UploadPerformance(data) {
  return request('/performance', {
    method: 'POST',
    data,
  });
}

export async function DeletePerformance(id, data) {
  return request(`/performance/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function GetPerformanceList(params) {
  return request('/performance', {
    method: 'GET',
    params,
  });
}

export async function UploadAptitude(data) {
  return request('/information', {
    method: 'POST',
    data,
  });
}

export async function DeleteAptitude(id, data) {
  return request(`/information/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function GetAptitudeList(params) {
  return request('/information', {
    method: 'GET',
    params,
  });
}
