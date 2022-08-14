import { ListResponse } from '../types/api';
import { Pool, Wager } from '../types/pools';
import { client } from './client';

export const loadPools = async (userEmail = ''): Promise<ListResponse<Pool>> =>
  await client.get('/pools', { params: { userEmail } })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const loadPool = async (poolId: string) =>
  await client.get(`/pools/${poolId}`)
    .then(response => response?.data)
    .catch(err => console.error(err));

export const createPool = async (name: string, createdBy: string) =>
  await client.post('/pools', { name, createdBy })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const deletePool = async (poolId: string) =>
  await client.delete(`/pools/${poolId}`)
    .then(response => response?.data)
    .catch(err => console.error(err));

export const createWager = async (poolId: string, wager: Wager) =>
  await client.post(`/pools/${poolId}/wagers`, wager)
    .then(response => response?.data)
    .catch(err => console.error(err));

export const deleteWager = async (poolId: string, wagerId: string) =>
  await client.delete(`/pools/${poolId}/wagers/${wagerId}`)
    .then(response => response?.data)
    .catch(err => console.error(err));

export const addUser = async (poolId: string, userEmail: string) =>
  await client.post(`/pools/${poolId}/users`, { userEmail })
    .then(response => response?.data)
    .catch(err => console.error(err));


export const inviteUser = async (poolId: string, userEmail: string) =>
  await client.post('/notifications/invitation', { to: userEmail, poolId, location: window.location })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const acceptWager = async (poolId: string, wagerId: string, userEmail: string) =>
  await client.patch(`/pools/${poolId}/wagers/${wagerId}/accept`, { userEmail })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const completeWager = async (poolId: string, wagerId: string, completedBy: string, winnerEmail: string) =>
  await client.patch(`/pools/${poolId}/wagers/${wagerId}/complete`, { completedBy, winners: [winnerEmail] })
    .then(response => response?.data)
    .catch(err => console.error(err));

