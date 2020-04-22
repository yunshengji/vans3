import request from '@/utils/request';

export async function GetMe() {
  return request('/api/me', {
    method: 'GET'
  });
}
