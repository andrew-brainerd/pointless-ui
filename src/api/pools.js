import { prop } from 'ramda';
import { client } from './tools';

export const loadUserPools = async (userEmail = '') => {
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
