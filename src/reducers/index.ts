import { combineReducers } from 'redux';
import config, { ConfigurationState } from './config';
import pools, { PoolState } from './pools';
import users, { UserState } from './users';
import notify, { NotificationState } from './notify';

export interface ApplicationState {
  config: ConfigurationState,
  pools: PoolState,
  users: UserState
  notify: NotificationState
}

const rootReducer = combineReducers({
  config,
  pools,
  users,
  notify
});

export default rootReducer;
