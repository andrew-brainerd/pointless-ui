import React, { useEffect } from 'react';
import { bool, string, array, func } from 'prop-types';
import { isEmpty } from 'ramda';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import getRelativeDate from '../../utils/getRelativeDate';
import Loading from '../common/Loading/Loading';
import Button from '../common/Button/Button';
import styles from './Notifications.module.scss';
import './animation.css';

const Notifications = ({ isLoading, userEmail, notifications, loadNotifications, markAsRead, dismiss }) => {
  useEffect(() => {
    userEmail && loadNotifications(userEmail, true);
  }, [userEmail, loadNotifications]);

  return isLoading ? <Loading message='Loading Notifications' /> : (
    <div className={styles.notifications}>
      {userEmail && isEmpty(notifications) ? (
        <div className={styles.noNotifications}>
          No notifications
        </div>
      ) : (
        <TransitionGroup>
          {notifications.map((notification, n) => {
            return (
              <CSSTransition
                key={notification._id}
                timeout={500}
                classNames='animation'
              >
                <div
                  key={notification._id}
                  className={[
                    styles.notification,
                    notification.isRead ? styles.read : '',
                    notification.isDismissed ? styles.dismissed : ''
                  ].join(' ')}
                >
                  {notification.createdByUser && (
                    <div className={styles.profilePic}>
                      <img src={(notification.createdByUser || {}).picture} alt='Profile Pic' />
                    </div>
                  )}
                  <div className={styles.content}>
                    <div className={styles.title}>{notification.title}</div>
                    <div
                      className={styles.message}
                      dangerouslySetInnerHTML={{ __html: notification.message }}
                    ></div>
                    <div className={styles.timestamp}>
                      {getRelativeDate(notification.timestamp)}
                    </div>
                  </div>
                  <div className={styles.controls}>
                    <div
                      className={styles.readButton}
                      title={'Mark As Read'}
                      onClick={() => markAsRead(userEmail, notification._id)}
                    />
                    <Button
                      className={styles.dismissButton}
                      text='X'
                      onClick={() => dismiss(userEmail, notification._id)}
                    />
                  </div>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </div>
  );
};

Notifications.propTypes = {
  isLoading: bool,
  userEmail: string,
  notifications: array,
  loadNotifications: func.isRequired,
  markAsRead: func.isRequired,
  dismiss: func.isRequired
};

export default Notifications;
