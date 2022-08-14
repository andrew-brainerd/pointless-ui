import { User } from '@auth0/auth0-react';
import { client } from './client';

export const createUser = async (user: User): Promise<User> =>
  await client.post('/users', { user })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const getUserByEmail = async (email: string): Promise<User> =>
  await client.get('/users/email', { params: { email } })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const getUserByUsername = async (username: string): Promise<User> =>
  await client.get('/users/username', { params: { username } })
    .then(response => response?.data)
    .catch(err => console.error(err));
