import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDebouncedCallback } from 'use-debounce';
import { Auth0Provider } from '@auth0/auth0-react';
import { HOME_ROUTE } from '../../constants/routes';
import Header from '../Header/container';
import Content from '../Content/container';
import Notification from '../common/Notification/container';
import styles from './App.module.scss';

const getWindowHeight = () => window.innerHeight - 5;

const App = (): JSX.Element => {
  const [appHeight, setAppHeight] = useState(getWindowHeight());
  const navigate = useNavigate();

  const resizeHandler = useDebouncedCallback(() => {
    setAppHeight(getWindowHeight());
  }, 250);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div className={styles.app} style={{ height: appHeight }}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
        redirectUri={window.location.origin}
        onRedirectCallback={(appState) => navigate(appState?.targetUrl || HOME_ROUTE)}
      >
        <Header />
        <Content />
      </Auth0Provider>
      <Notification />
    </div>
  );
};

export default App;
