import { call, put, takeLatest } from 'redux-saga/effects';
import { ListResponse } from '../types/api';
import {
  NotificationRequest,
  NotificationsRequest,
  NotificationUpdateResponse,
  NotificationsUpdateResponse,
  Notification
} from '../types/notifications';
import * as api from '../api/notifications';
import { dismiss, loadNotifications, markAllAsRead, markAsRead, notificationsLoaded } from '../actions/notify';

export function* loadNotificationsSaga({ userEmail, showLoading }: NotificationsRequest) {
  try {
    const response: ListResponse<Notification> = yield call(api.loadNotifications, userEmail);
    if (response) {
      yield put(notificationsLoaded(response.items));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* markAllAsReadSaga({ userEmail }: NotificationsRequest) {
  try {
    const response: NotificationsUpdateResponse  = yield call(api.markAllAsRead, userEmail);
    if (response) {
      yield loadNotificationsSaga({ userEmail, showLoading: false });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* markAsReadSaga({ userEmail, notificationId }: NotificationRequest) {
  try {
    const response: NotificationUpdateResponse = yield call(api.markAsRead, userEmail, notificationId);
    if (response) {
      yield loadNotificationsSaga({ userEmail, showLoading: false });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* dismissSaga({ userEmail, notificationId }: NotificationRequest) {
  try {
    const response: NotificationUpdateResponse = yield call(api.dismiss, userEmail, notificationId);
    if (response) {
      yield loadNotificationsSaga({ userEmail, showLoading: false });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* loadNotificationsWatcher() {
  yield takeLatest(loadNotifications, loadNotificationsSaga);
}

export function* markAllNotificationAsReadWatcher() {
  yield takeLatest(markAllAsRead, markAllAsReadSaga);
}

export function* markNotificationAsReadWatcher() {
  yield takeLatest(markAsRead, markAsReadSaga);
}

export function* markNotificationAsDismissedWatcher() {
  yield takeLatest(dismiss, dismissSaga);
}
