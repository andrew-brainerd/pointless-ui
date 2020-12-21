import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import pools from './pools';
import user from './user';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  pools,
  user
});

export default rootReducer;
