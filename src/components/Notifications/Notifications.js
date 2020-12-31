import React, { useEffect } from 'react';
import { bool, string, array, func } from 'prop-types';
import getRelativeDate from '../../utils/getRelativeDate';
import Loading from '../common/Loading/Loading';
import styles from './Notifications.module.scss';
import { isEmpty } from 'ramda';

const Notifications = ({ isLoading, userEmail, notifications, loadNotifications }) => {
  useEffect(() => {
    userEmail && loadNotifications(userEmail);
  }, [userEmail, loadNotifications]);

  return isLoading ? <Loading message='Loading Notifications' /> : (
    <div className={styles.notifications}>
      {isEmpty(notifications) ? (
        <div className={styles.noNotifications}>
          No notifications
        </div>
      ) : notifications.map(notification => {
        console.log('Notification', notification);

        return (
          <div key={notification._id} className={styles.notification}>
            {notification.createdByUser && (
              <div className={styles.profilePic}>
                <img src={(notification.createdByUser || {}).picture} alt='Profile Pic' />
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.title}>{notification.title}</div>
              <div className={styles.message}>{notification.message}</div>
              <div className={styles.timestamp}>
                {getRelativeDate(notification.timestamp)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Notifications.propTypes = {
  isLoading: bool,
  userEmail: string,
  notifications: array,
  loadNotifications: func.isRequired
};

export default Notifications;
