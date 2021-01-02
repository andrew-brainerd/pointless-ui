import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api/notifications';
import {
  notificationsLoaded,
  LOAD_NOTIFICATIONS,
  MARK_ALL_AS_READ,
  MARK_AS_READ,
  DISMISS
} from '../actions/notify';

export function* loadNotifications({ userEmail, showLoading }) {
  try {
    const response = yield call(api.loadNotifications, userEmail);
    if (response) {
      yield put(notificationsLoaded(response.items, showLoading));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* markAllAsRead({ userEmail }) {
  try {
    const response = yield call(api.markAllAsRead, userEmail);
    if (response) {
      yield loadNotifications({ userEmail, showLoading: false });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* markAsRead({ userEmail, notificationId }) {
  try {
    const response = yield call(api.markAsRead, userEmail, notificationId);
    if (response) {
      yield loadNotifications({ userEmail, showLoading: false });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* dismiss({ userEmail, notificationId }) {
  try {
    const response = yield call(api.dismiss, userEmail, notificationId);
    if (response) {
      yield loadNotifications({ userEmail, showLoading: false });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* loadNotificationsWatcher() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}

export function* markAllNotificationAsReadWatcher() {
  yield takeLatest(MARK_ALL_AS_READ, markAllAsRead);
}

export function* markNotificationAsReadWatcher() {
  yield takeLatest(MARK_AS_READ, markAsRead);
}

export function* markNotificationAsDismissedWatcher() {
  yield takeLatest(DISMISS, dismiss);
}
