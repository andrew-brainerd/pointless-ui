import { prop } from 'ramda';
import { client } from './tools';

export const loadPools = async (userEmail = '') => {
  const response = await client.get('/pools', { params: { userEmail } })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const loadPool = async poolId => {
  const response = await client.get(`/pools/${poolId}`)
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const createPool = async (name, createdBy) => {
  const response = await client.post('/pools', { name, createdBy })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const deletePool = async poolId => {
  const response = await client.delete(`/pools/${poolId}`)
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const createWager = async (poolId, wager) => {
  const response = await client.post(`/pools/${poolId}/wagers`, wager)
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const deleteWager = async (poolId, wagerId) => {
  const response = await client.delete(`/pools/${poolId}/wagers/${wagerId}`)
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const addUser = async (poolId, userEmail) => {
  const response = await client.post(`/pools/${poolId}/users`, { userEmail })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const inviteUser = async (poolId, userEmail) => {
  const response = await client.post('/notifications/invitation', { to: userEmail, poolId, location: window.location })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};
