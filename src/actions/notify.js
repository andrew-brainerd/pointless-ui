export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const showNotification = (category, title, message) => ({ type: SHOW_NOTIFICATION, category, title, message });

export const hideNotification = ({ type: HIDE_NOTIFICATION });

export const displayNotification = (category, title, message, time) => async dispatch => {
  const openTime = time || 5000;

  dispatch(showNotification(category, title, message));
  setTimeout(() => dispatch(hideNotification), openTime);
};

export const closeNotification = () => async dispatch => {
  dispatch(hideNotification);
};
