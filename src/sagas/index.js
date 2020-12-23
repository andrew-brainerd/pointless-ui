import { all } from 'redux-saga/effects';
import { loadPoolsWatcher, loadPoolWatcher, createPoolWatcher } from './pools';

export default function* rootSaga() {
  yield all([
    loadPoolsWatcher(),
    loadPoolWatcher(),
    createPoolWatcher()
  ]);
}
