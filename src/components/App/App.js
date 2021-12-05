import React from 'react';
import { object, bool } from 'prop-types';
import { Auth0Provider } from '@auth0/auth0-react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import {
  HOME_ROUTE,
  POOL_ROUTE,
  NEW_WAGER_ROUTE,
  NOTIFICATIONS_ROUTE,
  WAGER_ROUTE
} from '../../constants/routes';
import Home from '../Home/container';
import Header from '../Header/container';
import Content from '../Content/container';
import Pool from '../Pool/container';
import NewWager from '../NewWager/container';
import Wager from '../Wager/container';
import Notifications from '../Notifications/container';
import Notification from '../common/Notification/container';
// import Attribution from '../Attribution/Attribution';
import styles from './App.module.scss';

const App = ({ history, isSubHeaderOpen }) => {
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
          <Content>
            <div className={[
              styles.content,
              isSubHeaderOpen ? styles.subHeaderOpen : ''
            ].join(' ')}>
              <Switch>
                <Route path={HOME_ROUTE} exact component={Home} />
                <Route path={POOL_ROUTE} exact component={Pool} />
                <Route path={NEW_WAGER_ROUTE} exact component={NewWager} />
                <Route path={WAGER_ROUTE} exact component={Wager} />
                <Route path={NOTIFICATIONS_ROUTE} exact component={Notifications} />
              </Switch>
            </div>
          </Content>
        </ConnectedRouter>
      </Auth0Provider>
      <Notification />
      {/* <Attribution /> */}
    </div>
  );
};

App.propTypes = {
  history: object.isRequired,
  isSubHeaderOpen: bool
};

export default App;
