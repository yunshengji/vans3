import request from '@/utils/request';

export async function CreateCustomer(data) {
  return request('/customer', {
    method: 'POST',
    data,
  });
}

export async function DeleteCustomer(id, data) {
  return request(`/customer/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function EditCustomer(id, data) {
  return request(`/customer/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetCustomers(params) {
  return request('/customer', {
    method: 'GET',
    params,
  });
}

export async function GetContractorsList(params) {
  return request('/contractors', {
    method: 'GET',
    params,
  });
}
