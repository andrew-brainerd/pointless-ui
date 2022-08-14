import { all } from 'redux-saga/effects';

import {
  loadNotificationsWatcher,
  markAllNotificationAsReadWatcher,
  markNotificationAsReadWatcher,
  markNotificationAsDismissedWatcher
} from './notifications';
import {
  loadPoolsWatcher,
  loadPoolWatcher,
  createPoolWatcher,
  deletePoolWatcher,
  createWagerWatcher,
  deleteWagerWatcher,
  addUserWatcher,
  inviteUserWatcher,
  acceptWagerWatcher,
  completeWagerWatcher
} from './pools';

export default function* rootSaga() {
  yield all([
    loadPoolsWatcher(),
    loadPoolWatcher(),
    createPoolWatcher(),
    deletePoolWatcher(),
    createWagerWatcher(),
    deleteWagerWatcher(),
    addUserWatcher(),
    inviteUserWatcher(),
    acceptWagerWatcher(),
    completeWagerWatcher(),
    loadNotificationsWatcher(),
    markAllNotificationAsReadWatcher(),
    markNotificationAsReadWatcher(),
    markNotificationAsDismissedWatcher()
  ]);
}
