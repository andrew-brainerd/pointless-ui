import React, { useState, useEffect, useRef } from 'react';
import { string, func } from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { HOME_ROUTE } from '../../constants/routes';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Button from '../common/Button/Button';
import styles from './Header.module.scss';

const Header = ({ userEmail, connectClient, setCurrentUser, notify, loadPools, navTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  const menuRef = useRef();

  useEffect(() => {
    user && setCurrentUser(user);
  }, [user, setCurrentUser]);

  useEffect(() => {
    userEmail && connectClient(
      userEmail,
      'poolCreated',
      data => {
        notify(data.category, data.title, data.message);
        loadPools(userEmail);
      }
    );
  }, [userEmail, connectClient, notify, loadPools]);

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
  connectClient: func.isRequired,
  setCurrentUser: func.isRequired,
  notify: func.isRequired,
  loadPools: func.isRequired,
  navTo: func.isRequired
};

export default Header;
