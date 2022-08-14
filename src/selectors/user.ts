import { ApplicationState } from '../reducers';

export const getUser = (state: ApplicationState) => state.users;

export const getIsLoadingUser = (state: ApplicationState) => getUser(state).isLoadingUser;

export const getCurrentUser = (state: ApplicationState) => getUser(state).currentUser;

export const getIsCheckingUsername = (state: ApplicationState) => getUser(state).isCheckingUsername;

export const getIsUsernameAvailable = (state: ApplicationState) => getUser(state).isUsernameAvailable;
