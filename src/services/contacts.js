import request from '@/utils/request';

export async function GetCustomersList(params) {
  return request('/api/customers', {
    method: 'GET',
    params,
  });
}

export async function GetContractorsList(params) {
  return request('/api/contractors', {
    method: 'GET',
    params,
  });
}
