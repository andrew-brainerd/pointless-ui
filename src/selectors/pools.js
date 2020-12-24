import { compose, path, prop } from 'ramda';

export const getPools = prop('pools');

export const getIsLoadingPools = path(['pools', 'isLoadingPools']);

export const getIsLoadingPool = path(['pools', 'isLoadingPool']);

export const getUserPools = path(['pools', 'userPools']);

export const getSelectedPool = path(['pools', 'selectedPool']);

export const getPoolUsers = compose(prop('users'), getSelectedPool);
