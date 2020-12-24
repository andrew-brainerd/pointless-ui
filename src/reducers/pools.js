import {
  LOAD_POOLS,
  POOLS_LOADED,
  LOAD_POOL,
  POOL_LOADED,
  CREATE_WAGER
} from '../actions/pools';

export const initialState = {
  isLoadingPools: true,
  isLoadingPool: true,
  userPools: [],
  selectedPool: {}
};

const pools = (state = initialState, action) => {
  switch (action.type) {
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
        userPools: action.pools
      };
    case LOAD_POOL:
      return {
        ...state,
        isLoadingPool: true
      };
    case POOL_LOADED:
      console.log('POOL_LOADED', action.pool);
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
    default:
      return state;
  }
};

export default pools;
