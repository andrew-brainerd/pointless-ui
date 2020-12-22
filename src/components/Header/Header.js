import React, { useState, useEffect, useRef } from 'react';
import { func } from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { HOME_ROUTE } from '../../constants/routes';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Button from '../common/Button/Button';
import styles from './Header.module.scss';

const Header = ({ connectClient, setCurrentUser, notify, navTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  const menuRef = useRef();

  useEffect(() => {
    user && setCurrentUser(user);
  }, [user, setCurrentUser]);

  useEffect(() => {
    user && connectClient(
      user.email,
      'poolCreated',
      data => notify(data.category, data.title, data.message)
    );
  }, [user, connectClient, notify]);

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
        <div className={styles.player}>{(user || {}).email}</div>
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
  connectClient: func.isRequired,
  setCurrentUser: func.isRequired,
  notify: func.isRequired,
  navTo: func.isRequired
};

export default Header;
