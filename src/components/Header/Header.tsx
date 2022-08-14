import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { HeaderProps } from './container';
import { useAuth0} from '@auth0/auth0-react';
import { HOME_ROUTE, NOTIFICATIONS_ROUTE } from '../../constants/routes';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useUser from '../../hooks/useUser';
import usePoolUrl from '../../hooks/usePoolUrl';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './Header.module.scss';

const { log } = window.console;

const Header = ({
  connectClient,
  setCurrentUser,
  notify,
  loadPool,
  showSubHeader,
  hideSubHeader,
  loadNotifications
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { poolId } = usePoolUrl();
  const { userEmail, userPicture } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect({
        appState: {
          targetUrl: window.location.pathname
        }
      });
    } else {
      user && setCurrentUser(user);
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, user, setCurrentUser]);

  useEffect(() => {
    if (userEmail) {
      connectClient(
        userEmail,
        'push',
        data => {
          notify(data.category, data.title, data.message);
          if (data.title === 'User Added') {
            loadPool(poolId);
          }
        }
      );
      connectClient(
        userEmail,
        'notify',
        data => {
          log('%cNotification Added', 'color: cyan', data);
          loadNotifications(userEmail, false);
        });
    }
  }, [userEmail, connectClient, notify, loadPool, poolId, loadNotifications]);

  useEffect(() => {
    if (pathname === NOTIFICATIONS_ROUTE) {
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
          id={'menu'}
          className={styles.menuIcon}
          onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}
        >
          |||
        </div>
        {userPicture && (
          <div className={styles.user}>
            <img src={userPicture} alt='User Profile' referrerPolicy='no-referrer' />
          </div>
        )}
        {userEmail && (
          <div className={styles.buttonContainer}>
            <Button
              text={'Notifications'}
              onClick={() => navigate(NOTIFICATIONS_ROUTE.replace(':userEmail', userEmail))}
            >
              <Icon name={'bell'} title={'Notifications'} />
            </Button>
          </div>
        )}
      </div>
      {isMenuOpen &&
        <div className={styles.headerMenu} ref={menuRef}>
          {!isAuthenticated && (
            <Button
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
                  navigate(HOME_ROUTE);
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

export default Header;
