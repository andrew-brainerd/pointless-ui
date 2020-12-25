const PREFIX = 'NOTIFY';

export const SHOW_NOTIFICATION = `${PREFIX}/SHOW_NOTIFICATION`;
export const HIDE_NOTIFICATION = `${PREFIX}/HIDE_NOTIFICATION`;
export const LOAD_NOTIFICATIONS = `${PREFIX}/LOAD_NOTIFICATIONS`;
export const NOTIFICATIONS_LOADED = `${PREFIX}/NOTIFICATIONS_LOADED`;

export const showNotification = (category, title, message) => ({ type: SHOW_NOTIFICATION, category, title, message });

export const hideNotification = ({ type: HIDE_NOTIFICATION });

export const displayNotification = (category, title, message, time) => async dispatch => {
  const openTime = time || 5000;

  dispatch(showNotification(category, title, message));
  setTimeout(() => dispatch(hideNotification), openTime);
};

export const loadNotifications = userEmail => ({ type: LOAD_NOTIFICATIONS, userEmail });
export const notificationsLoaded = notifications => ({ type: NOTIFICATIONS_LOADED, notifications });
