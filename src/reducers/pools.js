import {
  LOAD_POOLS,
  POOLS_LOADED,
  LOAD_POOL,
  POOL_LOADED,
  CREATE_WAGER,
  WAGER_CREATED
} from '../actions/pools';

export const initialState = {
  isLoadingPools: true,
  isLoadingPool: true,
  isCreatingWager: false,
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
    default:
      return state;
  }
};

export default pools;
