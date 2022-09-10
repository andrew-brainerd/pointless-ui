import React from 'react';
import ReactDOM from 'react-dom/client';
import WebFont from 'webfontloader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';
import ReactModal from 'react-modal';
import store, { sagaMiddleware } from './store/configureStore';
import sagas from './sagas';
import {
  HOME_ROUTE,
  POOL_ROUTE,
  POOL_SETTINGS_ROUTE,
  NEW_POOL_SETTINGS_ROUTE,
  NEW_WAGER_ROUTE,
  NOTIFICATIONS_ROUTE,
  WAGER_ROUTE
} from './constants/routes';
import App from './components/App/App';
import Home from './components/Home/container';
import Pool from './components/Pool/container';
import PoolSettings from './components/PoolSettings/container';
import NewWager from './components/NewWager/container';
import Wager from './components/Wager/container';
import Notifications from './components/Notifications/container';
import './index.scss';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

sagaMiddleware.run(sagas);

const AppleApp = () => {
  // window.location.reload();
  return <></>;
};

WebFont.load({
  google: {
    families: [
      'Exo 2: 400',
      'Chilanka: 400'
    ]
  }
});

root.render(
  <HttpsRedirect disabled={process.env.NODE_ENV === 'development'}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/apple-app-site-association' element={<AppleApp />} />
          <Route path='/' element={<App />}>
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={POOL_ROUTE} element={<Pool />} />
            <Route path={POOL_SETTINGS_ROUTE} element={<PoolSettings />} />
            <Route path={NEW_POOL_SETTINGS_ROUTE} element={<PoolSettings />} />
            <Route path={NEW_WAGER_ROUTE} element={<NewWager />} />
            <Route path={WAGER_ROUTE} element={<Wager />} />
            <Route path={NOTIFICATIONS_ROUTE} element={<Notifications />} />
          </Route>
          <Route path='*' element={<h1>Ur shit is missing</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </HttpsRedirect>
);

ReactModal.setAppElement(rootElement);
