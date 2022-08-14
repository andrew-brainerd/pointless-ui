import { Dispatch } from '../store/configureStore';
import { Notification } from '../types/notifications';

const PREFIX = 'NOTIFY';

export const SHOW_NOTIFICATION = `${PREFIX}/SHOW_NOTIFICATION`;
export const HIDE_NOTIFICATION = `${PREFIX}/HIDE_NOTIFICATION`;
export const LOAD_NOTIFICATIONS = `${PREFIX}/LOAD_NOTIFICATIONS`;
export const NOTIFICATIONS_LOADED = `${PREFIX}/NOTIFICATIONS_LOADED`;
export const MARK_ALL_AS_READ = `${PREFIX}/MARK_ALL_AS_READ`;
export const MARK_AS_READ = `${PREFIX}/MARK_AS_READ`;
export const DISMISS = `${PREFIX}/DISMISS`;

export const showNotification = (category: string, title: string, message: string) =>
  ({ type: SHOW_NOTIFICATION, category, title, message });

export const hideNotification = () => ({ type: HIDE_NOTIFICATION });

export const displayNotification = (category: string, title: string, message: string, time?: number) => async (dispatch: Dispatch) => {
  const openTime = time || 5000;

  dispatch(showNotification(category, title, message));
  setTimeout(() => dispatch(hideNotification), openTime);
};

export const loadNotifications = (userEmail: string, showLoading: boolean) => ({ type: LOAD_NOTIFICATIONS, userEmail, showLoading });
export const notificationsLoaded = (notifications: Array<Notification>) => ({ type: NOTIFICATIONS_LOADED, notifications });
export const markAllAsRead = (userEmail: string) => ({ type: MARK_ALL_AS_READ, userEmail });
export const markAsRead = (userEmail: string, notificationId: string) => ({ type: MARK_AS_READ, userEmail, notificationId });
export const dismiss = (userEmail: string, notificationId: string) => ({ type: DISMISS, userEmail, notificationId });
