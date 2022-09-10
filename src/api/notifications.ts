import { ListResponse } from '../types/api';
import {
  Notification,
  NotificationsUpdateResponse,
  NotificationUpdateResponse
} from '../types/notifications';
import { client } from './client';

export const loadNotifications = async (userEmail: string): Promise<ListResponse<Notification>> =>
  await client.get('/notifications', { params: { userEmail } })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const markAllAsRead = async (userEmail: string): Promise<NotificationsUpdateResponse> =>
  await client.patch('/notifications/readAll', { userEmail })
    .then(response => response?.data)
    .catch(err => console.error(err));

export const markAsRead = async (userEmail: string, notificationId: string): Promise<NotificationUpdateResponse> =>
  await client.patch(`/notifications/${notificationId}/read`, { userEmail })
    .then(response => response?.data)
    .catch(err => console.error(err));


export const dismiss = async (userEmail: string, notificationId: string): Promise<NotificationUpdateResponse> =>
  await client.patch(`/notifications/${notificationId}/dismiss`, { userEmail })
    .then(response => response?.data)
    .catch(err => console.error(err));
