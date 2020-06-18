import request from '@/utils/request';

export async function WriteGossip(data) {
  return request('/gossip', {
    method: 'POST',
    data,
  });
}

export async function deleteGossip(id, data) {
  return request(`/gossip/${id}`, {
    method: 'DELETE',
    data,
  });
}

export async function publishComment(data) {
  return request(`/comment`, {
    method: 'POST',
    data,
  });
}

export async function GetGossipWritings(params) {
  return request('/gossip', {
    method: 'GET',
    params,
  });
}
