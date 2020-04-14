import request from '@/utils/request';

export async function Login(params) {
  return request('/api/Login', {
    method: 'POST',
    data: params,
  });
}
