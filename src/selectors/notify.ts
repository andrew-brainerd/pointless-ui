import { ApplicationState } from '../reducers';

export const getIsLoadingNotifications = (state: ApplicationState) => state.notify.isLoadingNotifications;

export const getNotifications = (state: ApplicationState) => state.notify.notifications;
