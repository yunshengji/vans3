import request from '@/utils/request';

export async function GetMe(params) {
  return request('/api/Me', {
    method: 'GET'
  });
}
