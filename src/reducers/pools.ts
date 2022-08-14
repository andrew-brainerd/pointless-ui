import { AnyAction } from 'redux';
import { Pool } from '../types/pools';
import {
  LOAD_POOLS,
  POOLS_LOADED,
  LOAD_POOL,
  POOL_LOADED,
  CREATE_WAGER,
  WAGER_CREATED,
  ACCEPT_WAGER,
  WAGER_ACCEPTED,
  COMPLETE_WAGER,
  WAGER_COMPLETED,
  CREATE_POOL,
  POOL_CREATED
} from '../actions/pools';

export interface PoolState {
  isLoadingPool: boolean,
  isLoadingPools: boolean,
  isCreatingPool: boolean,
  isCreatingWager: boolean,
  isAcceptingWager: boolean,
  isCompletingWager: boolean,
  userPools: Array<Pool>,
  selectedPool?: Pool
}

export const initialState: PoolState = {
  isLoadingPool: false,
  isLoadingPools: false,
  isCreatingPool: false,
  isCreatingWager: false,
  isAcceptingWager: false,
  isCompletingWager: false,
  userPools: [],
  selectedPool: undefined
};

const pools = (state = initialState, action: AnyAction): PoolState => {
  switch (action.type) {
    case CREATE_POOL:
      return {
        ...state,
        isCreatingPool: true
      };
    case POOL_CREATED:
      return {
        ...state,
        isCreatingPool: false
      };
    case LOAD_POOLS:
      return {
        ...state,
        isLoadingPools: true,
        userPools: []
      };
    case POOLS_LOADED:
      return {
        ...state,
        isLoadingPools: false,
        isLoadingPool: false,
        userPools: action.pools.map((pool: Pool) => ({
          ...pool,
          activeWagers: (pool.wagers || []).filter(wager => wager.isActive && !wager.isComplete),
          inactiveWagers: (pool.wagers || []).filter(wager => !wager.isActive),
          completedWagers: (pool.wagers || []).filter(wager => wager.isComplete)
        }))
      };
    case LOAD_POOL:
      return {
        ...state,
        isLoadingPool: true
      };
    case POOL_LOADED:
      return {
        ...state,
        isLoadingPool: false,
        selectedPool: action.pool
      };
    case CREATE_WAGER:
      return {
        ...state,
        isCreatingWager: true,
        userPools: []
      };
    case WAGER_CREATED:
      return {
        ...state,
        isCreatingWager: false
      };
    case ACCEPT_WAGER:
      return {
        ...state,
        isAcceptingWager: true
      };
    case WAGER_ACCEPTED:
      return {
        ...state,
        isAcceptingWager: false
      };
    case COMPLETE_WAGER:
      return {
        ...state,
        isCompletingWager: true
      };
    case WAGER_COMPLETED:
      return {
        ...state,
        isCompletingWager: false
      };
    default:
      return state;
  }
};

export default pools;
