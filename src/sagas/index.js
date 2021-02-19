import { all } from 'redux-saga/effects';
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
import {
  loadNotificationsWatcher,
  markAllNotificationAsReadWatcher,
  markNotificationAsReadWatcher,
  markNotificationAsDismissedWatcher
} from './notifications';

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
    loadNotificationsWatcher(),
    markAllNotificationAsReadWatcher(),
    markNotificationAsReadWatcher(),
    markNotificationAsDismissedWatcher(),
    acceptWagerWatcher(),
    completeWagerWatcher()
  ]);
}
