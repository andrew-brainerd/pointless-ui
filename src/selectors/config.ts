import { ApplicationState } from '../reducers';

export const getIsSubHeaderOpen = (state: ApplicationState) => state.config.isSubHeaderOpen;
