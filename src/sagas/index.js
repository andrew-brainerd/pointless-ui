import { all } from 'redux-saga/effects';
import {
  loadPoolsWatcher,
  loadPoolWatcher,
  createPoolWatcher,
  deletePoolWatcher,
  createWagerWatcher,
  deleteWagerWatcher,
  addUserWatcher,
  inviteUserWatcher
} from './pools';
import { loadNotificationsWatcher } from './notifications';

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
    loadNotificationsWatcher()
  ]);
}
