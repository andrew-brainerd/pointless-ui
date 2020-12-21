import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api/pools';
import { poolsLoaded, poolLoaded, LOAD_POOLS, LOAD_POOL } from '../actions/pools';

export function* loadUserPools({ userEmail }) {
  try {
    const response = yield call(api.loadUserPools, userEmail);
    if (response) {
      yield put(poolsLoaded(response.items));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* loadPool({ poolId }) {
  try {
    const response = yield call(api.loadPool, poolId);
    if (response) {
      yield put(poolLoaded(response));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* userPoolsWatcher() {
  yield takeLatest(LOAD_POOLS, loadUserPools);
}

export function* poolWatcher() {
  yield takeLatest(LOAD_POOL, loadPool);
}
