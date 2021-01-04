import { compose, path, prop } from 'ramda';

export const getIsLoadingUser = path(['users', 'isLoadingUser']);

export const getCurrentUser = path(['users', 'currentUser']);

export const getCurrentUserEmail = compose(prop('email'), getCurrentUser);

export const getCurrentUserId = compose(prop('_id'), getCurrentUser);

export const getCurrentUserPicture = compose(prop('picture'), getCurrentUser);

export const getIsCheckingUsername = path(['users', 'isCheckingUsername']);

export const getIsUsernameAvailable = path(['users', 'isUsernameAvailable']);
