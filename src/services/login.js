import request from '@/utils/request';

export async function Login(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
