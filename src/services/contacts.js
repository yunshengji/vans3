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

export async function UpdateCustomer(id, data) {
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

export async function CreateContractor(data) {
  return request('/partner', {
    method: 'POST',
    data,
  });
}

export async function DeleteContractor(id, data) {
  return request(`/partner/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function UpdateContractor(id, data) {
  return request(`/partner/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function GetContractors(params) {
  return request('/partner', {
    method: 'GET',
    params,
  });
}
