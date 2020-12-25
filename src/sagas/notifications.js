import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api/notifications';
import { notificationsLoaded, LOAD_NOTIFICATIONS } from '../actions/notify';

export function* loadNotifications({ userEmail }) {
  try {
    const response = yield call(api.loadNotifications, userEmail);
    if (response) {
      yield put(notificationsLoaded(response.items));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* loadNotificationsWatcher() {
  yield takeLatest(LOAD_NOTIFICATIONS, loadNotifications);
}
