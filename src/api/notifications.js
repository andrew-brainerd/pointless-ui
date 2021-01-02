import { prop } from 'ramda';
import { client } from './tools';

export const loadNotifications = async userEmail => {
  const response = await client.get('/notifications', { params: { userEmail } })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const markAsRead = async (userEmail, notificationId) => {
  const response = await client.patch(`/notifications/${notificationId}/read`, { userEmail })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};

export const dismiss = async (userEmail, notificationId) => {
  const response = await client.patch(`/notifications/${notificationId}/dismiss`, { userEmail })
    .then(prop('data'))
    .catch(err => console.error(err));

  return response;
};
