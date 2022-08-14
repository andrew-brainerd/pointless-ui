import { call, put, takeLatest } from 'redux-saga/effects';
import { ListResponse } from '../types/api';
import { AcceptWagerRequest, CompleteWagerRequest, CreatePoolRequest, CreateWagerRequest, DeleteWagerRequest, Pool, PoolRequest, PoolUserRequest, UserPoolsRequest, Wager } from '../types/pools';
import { HOME_ROUTE } from '../constants/routes';
import * as api from '../api/pools';
import {
  poolsLoaded,
  poolLoaded,
  poolCreated,
  poolDeleted,
  wagerCreated,
  userInvited,
  wagerAccepted,
  wagerCompleted,
  loadPools,
  loadPool,
  createPool,
  deletePool,
  createWager,
  deleteWager,
  addUser,
  inviteUser,
  acceptWager,
  completeWager
} from '../actions/pools';
import { User } from '@auth0/auth0-react';

export function* loadPoolsSaga({ userEmail }: UserPoolsRequest) {
  try {
    const response: ListResponse<Pool> = yield call(api.loadPools, userEmail);
    if (response) {
      yield put(poolsLoaded(response.items));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* loadPoolSaga({ poolId }: PoolRequest) {
  try {
    const response: Pool = yield call(api.loadPool, poolId);
    if (response) {
      yield put(poolLoaded(response));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* createPoolSaga({ name, createdBy }: CreatePoolRequest) {
  try {
    const response: Pool = yield call(api.createPool, name, createdBy);
    if (response) {
      yield put(poolCreated(response));
      yield put(poolLoaded(response));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* deletePoolSaga({ poolId }: PoolRequest) {
  try {
    const response: Pool = yield call(api.deletePool, poolId);
    if (response) {
      yield put(poolDeleted(response));
      // TODO: Navigate to home page
      window.location.href = HOME_ROUTE;
    }
  } catch (err) {
    console.error(err);
  }
}

export function* createWagerSaga({ poolId, wager }: CreateWagerRequest) {
  try {
    const response: Wager = yield call(api.createWager, poolId, wager);
    if (response) {
      yield put(wagerCreated(response));
      // yield put(navTo(WAGER_ROUTE.replace(':poolId', poolId).replace(':wagerId', response.addition.wagers._id)));
      // TODO: Navigate to new wager
    }
  } catch (err) {
    console.error(err);
  }
}

export function* deleteWagerSaga({ poolId, wagerId }: DeleteWagerRequest) {
  try {
    const response: Wager = yield call(api.deleteWager, poolId, wagerId);
    if (response) {
      // yield put(navTo(POOL_ROUTE.replace(':poolId', poolId)));
      // TODO: Navigate back to pool
    }
  } catch (err) {
    console.error(err);
  }
}

export function* addUserSaga({ poolId, userEmail }: PoolUserRequest) {
  try {
    const response: User = yield call(api.addUser, poolId, userEmail);
    if (response) {
      yield loadPoolSaga({ poolId });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* inviteUserSaga({ poolId, userEmail }: PoolUserRequest) {
  try {
    const response: string = yield call(api.inviteUser, poolId, userEmail);
    if (response) {
      yield put(userInvited(response));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* acceptWagerSaga({ poolId, wagerId, userEmail }: AcceptWagerRequest) {
  try {
    const response: Wager = yield call(api.acceptWager, poolId, wagerId, userEmail);
    if (response) {
      yield put(wagerAccepted(response));
      yield loadPoolSaga({ poolId });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* completeWagerSaga({ poolId, wagerId, userEmail, winnerEmail }: CompleteWagerRequest) {
  try {
    const response: Wager = yield call(api.completeWager, poolId, wagerId, userEmail, winnerEmail);
    if (response) {
      yield put(wagerCompleted(response));
      yield loadPoolSaga({ poolId });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* loadPoolsWatcher() {
  yield takeLatest(loadPools, loadPoolsSaga);
}

export function* loadPoolWatcher() {
  yield takeLatest(loadPool, loadPoolSaga);
}

export function* createPoolWatcher() {
  yield takeLatest(createPool, createPoolSaga);
}

export function* deletePoolWatcher() {
  yield takeLatest(deletePool, deletePoolSaga);
}

export function* createWagerWatcher() {
  yield takeLatest(createWager, createWagerSaga);
}

export function* deleteWagerWatcher() {
  yield takeLatest(deleteWager, deleteWagerSaga);
}

export function* addUserWatcher() {
  yield takeLatest(addUser, addUserSaga);
}

export function* inviteUserWatcher() {
  yield takeLatest(inviteUser, inviteUserSaga);
}

export function* acceptWagerWatcher() {
  yield takeLatest(acceptWager, acceptWagerSaga);
}

export function* completeWagerWatcher() {
  yield takeLatest(completeWager, completeWagerSaga);
}
