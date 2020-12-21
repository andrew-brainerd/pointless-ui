import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

export const history = createBrowserHistory();

export const sagaMiddleware = createSagaMiddleware();

const configureStore = initialState =>
  createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
      thunk
    ))
  );

export default configureStore;
