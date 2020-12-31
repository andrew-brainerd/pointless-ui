import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import config from './config';
import pools from './pools';
import users from './users';
import notify from './notify';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  config,
  pools,
  users,
  notify
});

export default rootReducer;
