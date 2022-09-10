import { EMPTY_POOL } from '../constants/pools';
import { ApplicationState } from '../reducers';

export const getPools = (state: ApplicationState) => state.pools;

export const getIsLoadingPools = (state: ApplicationState) => getPools(state).isLoadingPools;

export const getIsLoadingPool = (state: ApplicationState) => getPools(state).isLoadingPool;

export const getIsCreatingPool = (state: ApplicationState) => getPools(state).isCreatingPool;

export const getIsCreatingWager = (state: ApplicationState) => getPools(state).isCreatingWager;

export const getUserPools = (state: ApplicationState) => getPools(state).userPools;

export const getSelectedPool = (state: ApplicationState) => getPools(state).selectedPool || EMPTY_POOL;

export const getIsAcceptingWager = (state: ApplicationState) => getPools(state).isAcceptingWager;

export const getIsCompletingWager = (state: ApplicationState) => getPools(state).isCompletingWager;
