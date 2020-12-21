import { all } from 'redux-saga/effects';
import { userPoolsWatcher, poolWatcher } from './pools';

export default function* rootSaga() {
  yield all([
    userPoolsWatcher(),
    poolWatcher()
  ]);
}
