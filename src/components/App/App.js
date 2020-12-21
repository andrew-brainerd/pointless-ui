import React from 'react';
import { object } from 'prop-types';
import { Auth0Provider } from '@auth0/auth0-react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { HOME_ROUTE, POOL_ROUTE } from '../../constants/routes';
import Home from '../Home/container';
import Header from '../Header/container';
import Pool from '../Pool/container';
// import Attribution from '../Attribution/Attribution';
import styles from './App.module.scss';

const App = ({ history }) => {
  return (
    <div className={styles.app}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
        onRedirectCallback={appState =>
          history.push((appState || {}).targetUrl ? appState.targetUrl : window.location.pathname)
        }>
        <ConnectedRouter history={history}>
          <Header />
          <Switch>
            <Route path={HOME_ROUTE} exact component={Home} />
            <Route path={POOL_ROUTE} exact component={Pool} />
          </Switch>
        </ConnectedRouter>
      </Auth0Provider>
      {/* <Attribution /> */}
    </div>
  );
};

App.propTypes = {
  history: object.isRequired
};

export default App;
