import { compose, path, prop } from 'ramda';

export const getIsLoadingUser = path(['user', 'isLoadingUser']);

export const getCurrentUser = path(['user', 'currentUser']);

export const getCurrentUserEmail = compose(prop('email'), getCurrentUser);

export const getIsCheckingUsername = path(['user', 'isCheckingUsername']);

export const getIsUsernameAvailable = path(['user', 'isUsernameAvailable']);
