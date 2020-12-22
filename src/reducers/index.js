import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import pools from './pools';
import user from './user';
import notify from './notify';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  pools,
  user,
  notify
});

export default rootReducer;
