import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../api/pools';
import { HOME_ROUTE } from '../constants/routes';
import { navTo } from '../actions/routing';
import {
  poolsLoaded,
  poolLoaded,
  poolCreated,
  poolDeleted,
  LOAD_POOLS,
  LOAD_POOL,
  CREATE_POOL,
  DELETE_POOL
} from '../actions/pools';

export function* loadPools({ userEmail }) {
  try {
    const response = yield call(api.loadPools, userEmail);
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

export function* createPool({ name, createdBy }) {
  try {
    const response = yield call(api.createPool, name, createdBy);
    if (response) {
      yield put(poolCreated(response));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* deletePool({ poolId }) {
  try {
    const response = yield call(api.deletePool, poolId);
    if (response) {
      yield put(poolDeleted(response));
      yield put(navTo(HOME_ROUTE));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* loadPoolsWatcher() {
  yield takeLatest(LOAD_POOLS, loadPools);
}

export function* loadPoolWatcher() {
  yield takeLatest(LOAD_POOL, loadPool);
}

export function* createPoolWatcher() {
  yield takeLatest(CREATE_POOL, createPool);
}

export function* deletePoolWatcher() {
  yield takeLatest(DELETE_POOL, deletePool);
}

