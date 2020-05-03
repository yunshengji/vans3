import request from '@/utils/request';

export async function GetWorkDiariesList(params) {
  return request('/diary', {
    method: 'GET',
    params,
  });
}
