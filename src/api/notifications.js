import { prop } from 'ramda';
import { client } from './tools';

export const loadNotifications = async userEmail => {
  const response = await client.get('/notifications', { params: { userEmail } })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};
