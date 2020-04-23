import request from '@/utils/request';

export async function GetProjectsList(params) {
  return request('/api/projects', {
    method: 'GET',
    params,
  });
}
