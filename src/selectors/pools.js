import { compose, path, prop } from 'ramda';
import { createSelector } from 'reselect';
import { getWagerId } from './routing';

export const getPools = prop('pools');

export const getIsLoadingPools = path(['pools', 'isLoadingPools']);

export const getIsLoadingPool = path(['pools', 'isLoadingPool']);

export const getUserPools = path(['pools', 'userPools']);

export const getSelectedPool = path(['pools', 'selectedPool']);

export const getPoolUsers = compose(prop('users'), getSelectedPool);

export const getWager = createSelector([getSelectedPool, getWagerId], (selectedPool, wagerId) => {
  return selectedPool.wagers ? selectedPool.wagers.find(wager => wager._id === wagerId) : {};
});

export const getIsAvailableWager = createSelector([getWager], wager => {
  console.log('Wager', wager);
  return !!wager;
});
