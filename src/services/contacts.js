import request from '@/utils/request';

export async function GetContactsList(params) {
  return request('/api/contacts', {
    method: 'GET',
    params,
  });
}
