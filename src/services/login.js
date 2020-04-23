import request from '@/utils/request';

export async function Login(data) {
  return request('/api/login', {
    method: 'POST',
    data,
  });
}
