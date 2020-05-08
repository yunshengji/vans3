import request from '@/utils/request';

export async function UploadFile(data) {
  return request('/attachment', {
    method: 'POST',
    data,
  });
}
