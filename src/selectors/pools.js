import { compose, path, prop } from 'ramda';
import { createSelector } from 'reselect';
import { getWagerId } from './routing';
import { getCurrentUserEmail } from './user';

export const getPools = prop('pools');

export const getIsLoadingPools = path(['pools', 'isLoadingPools']);

export const getIsLoadingPool = path(['pools', 'isLoadingPool']);

export const getIsCreatingWager = path(['pools', 'isCreatingWager']);

export const getUserPools = path(['pools', 'userPools']);

export const getSelectedPool = path(['pools', 'selectedPool']);

export const getPoolUsers = compose(prop('users'), getSelectedPool);

export const getWager = createSelector([getSelectedPool, getWagerId], (selectedPool, wagerId) => {
  return selectedPool.wagers ? selectedPool.wagers.find(wager => wager._id === wagerId) : {};
});

export const getIsAvailableWager = createSelector(
  [getCurrentUserEmail, getWager], (userEmail, wager) =>
    wager && wager.activeUsers && !wager.activeUsers.includes(userEmail)
);

export const getIsAcceptingWager = path(['pools', 'isAcceptingWager']);

export const getIsCompletingWager = path(['pool', 'isCompletingWager']);
