import React, { useState, useEffect, useRef } from 'react';
import { string, func } from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { HOME_ROUTE, NOTIFICATIONS_ROUTE } from '../../constants/routes';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './Header.module.scss';

const Header = ({
  userEmail,
  poolId,
  pathname,
  connectClient,
  setCurrentUser,
  notify,
  loadPool,
  showSubHeader,
  hideSubHeader,
  navTo
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  const menuRef = useRef();

  useEffect(() => {
    user && setCurrentUser(user);
  }, [user, setCurrentUser]);

  useEffect(() => {
    if (userEmail) {
      connectClient(
        userEmail,
        'push',
        data => notify(data.category, data.title, data.message)
      );
      connectClient(
        userEmail,
        'notify',
        data => console.log('Notification Added', data)
      );
    }
  }, [userEmail, connectClient, notify, loadPool, poolId]);

  useEffect(() => {
    if (pathname === '/notifications') {
      hideSubHeader();
    } else {
      showSubHeader();
    }
  }, [pathname, hideSubHeader, showSubHeader]);

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <>
      <div className={styles.header}>
        <div
          name={'menu'}
          className={styles.menuIcon}
          onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}
        >
          |||
        </div>
        <div className={styles.player}>{userEmail}</div>
        <div className={styles.buttonContainer}>
          <Button
            text={'Notifications'}
            onClick={() => navTo(NOTIFICATIONS_ROUTE.replace(':userEmail', userEmail))}
          >
            <Icon name={'bell'} title={'Notifications'} />
          </Button>
        </div>
      </div>
      {isMenuOpen &&
        <div className={styles.headerMenu} ref={menuRef}>
          {!isAuthenticated && (
            <Button
              name={'signIn'}
              className={styles.menuButton}
              text={isLoading ? 'Loading...' : 'Sign In'}
              onClick={() => !isLoading && loginWithRedirect()}
            />
          )}
          {isAuthenticated && (
            <>
              <Button
                className={styles.menuButton}
                text='Home'
                onClick={() => {
                  setIsMenuOpen(false);
                  navTo(HOME_ROUTE);
                }}
              />
              <Button
                className={styles.menuButton}
                text='Sign Out'
                onClick={() => logout()}
              />
            </>
          )}
        </div>
      }
    </>
  );
};

Header.propTypes = {
  userEmail: string,
  poolId: string,
  pathname: string,
  connectClient: func.isRequired,
  setCurrentUser: func.isRequired,
  notify: func.isRequired,
  loadPool: func.isRequired,
  showSubHeader: func.isRequired,
  hideSubHeader: func.isRequired,
  navTo: func.isRequired
};

export default Header;
