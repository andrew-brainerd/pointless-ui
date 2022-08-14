import { useEffect } from 'react';
import { isEmpty } from 'ramda';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NotificationsProps } from './container';
import getRelativeDate from '../../utils/getRelativeDate';
import useUser from '../../hooks/useUser';
import Loading from '../common/Loading/Loading';
import Button from '../common/Button/Button';
import styles from './Notifications.module.scss';
import './animation.css';


const Notifications = ({
  isLoading,
  notifications,
  loadNotifications,
  markAllAsRead,
  markAsRead,
  dismiss
}: NotificationsProps) => {
  const { userEmail } = useUser();

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
        <>
          <div className={styles.header}>
            <h2>Notifications</h2>
            <Button
              text={'Mark all as read'}
              onClick={() => markAllAsRead(userEmail)}
              disabled={isEmpty(notifications.filter(n => !n.isRead))}
            />
          </div>
          <TransitionGroup className={styles.notificationList}>
            {notifications.map(notification => {
              return (
                <CSSTransition
                  key={notification._id}
                  timeout={500}
                  classNames='animation'
                >
                  <div
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
                    <a
                      className={[
                        styles.content,
                        !notification.link ? styles.disabled : ''
                      ].join(' ')}
                      href={notification.link}
                      rel={'noopener noreferrer'}
                      onClick={() => markAsRead(userEmail, notification._id)}
                    >
                      <div className={styles.title}>{notification.title}</div>
                      <div
                        className={styles.message}
                        dangerouslySetInnerHTML={{ __html: notification.message }}
                      ></div>
                      <div className={styles.timestamp}>
                        {getRelativeDate(notification.timestamp)}
                      </div>
                    </a>
                    <div className={styles.controls}>
                      <div
                        className={styles.readButton}
                        title={notification.isRead ? '' : 'Mark As Read'}
                        onClick={() => markAsRead(userEmail, notification._id)}
                      />
                      <Button
                        className={styles.dismissButton}
                        text='X'
                        title={notification.isDismissed ? '' : 'Dismiss'}
                        onClick={() => dismiss(userEmail, notification._id)}
                      />
                    </div>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </>
      )}
    </div>
  );
};

export default Notifications;
