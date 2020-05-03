import request from '@/utils/request';

export async function Login(data) {
  return request('/login', {
    method: 'POST',
    data,
  });
}
