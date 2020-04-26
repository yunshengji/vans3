import request from '@/utils/request';

export async function GetUsersList(params) {
  return request('/api/users', {
    method: 'GET',
    params,
  });
}
