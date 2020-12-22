import {
  LOAD_POOLS,
  POOLS_LOADED,
  LOAD_POOL,
  POOL_LOADED
} from '../actions/pools';

export const initialState = {
  isLoadingPools: false,
  isLoadingPool: false,
  userPools: [],
  selectedPool: {}
};

const pools = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POOLS:
      return {
        ...state,
        isLoadingPools: true
      };
    case POOLS_LOADED:
      return {
        ...state,
        isLoadingPools: false,
        isLoadingPool: false,
        userPools: action.pools
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
    default:
      return state;
  }
};

export default pools;
