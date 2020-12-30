import React, { useEffect } from 'react';
import { bool, string, array, func } from 'prop-types';
import getRelativeDate from '../../utils/getRelativeDate';
import Loading from '../common/Loading/Loading';
import styles from './Notifications.module.scss';

const Notifications = ({ isLoading, userEmail, notifications, loadNotifications }) => {
  useEffect(() => {
    userEmail && loadNotifications(userEmail);
  }, [userEmail, loadNotifications]);

  console.log('Notifications', notifications);

  return isLoading ? <Loading message='Loading Notifications' /> : (
    <div className={styles.notifications}>
      {notifications.map(notification => (
        <div key={notification._id} className={styles.notification}>
          <div className={styles.title}>{notification.title}</div>
          <div className={styles.message}>{notification.message}</div>
          <div className={styles.timestamp}>
            {getRelativeDate(notification.timestamp)}
          </div>
        </div>
      ))}
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
