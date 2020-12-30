import { prop } from 'ramda';
import { client } from './tools';

export const createUser = async user => {
  const response = await client.post('/users', { user });

  return prop('data', response);
};

export const getUserByEmail = async email => {
  const response = await client.get('/users/email', { params: { email } });

  return prop('data', response);
};

export const getUserByUsername = async username => {
  const response = await client.get('/users/username', { params: { username } });

  return prop('data', response);
};
