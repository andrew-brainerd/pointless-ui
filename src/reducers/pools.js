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
  WAGER_COMPLETED
} from '../actions/pools';

export const initialState = {
  isLoadingPools: true,
  isLoadingPool: true,
  isCreatingWager: false,
  isAcceptingWager: false,
  isCompletingWager: false,
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
