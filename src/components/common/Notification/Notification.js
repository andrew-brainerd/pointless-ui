import React from 'react';
import { bool, string, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import Icon from '../../common/Icon/Icon';
import styles from './Notification.module.scss';
import { NOTIFICATIONS_ROUTE } from '../../../constants/routes';

const Notification = ({ hidden, category, title, message, close, navTo }) => {
  return (
    <div
      className={[
        styles.notification,
        styles[category],
        isMobile ? styles.mobile : '',
        hidden ? styles.hidden : ''
      ].join(' ')}
      onClick={() => {
        navTo(NOTIFICATIONS_ROUTE)
        close();
      }}
    >
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div
          className={styles.message}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
      <div className={styles.icon}>
        <Icon
          name={'success'}
          title={'Success!'}
        />
      </div>
    </div>
  );
};

Notification.propTypes = {
  hidden: bool,
  category: string,
  title: string.isRequired,
  message: string.isRequired,
  close: func.isRequired,
  navTo: func.isRequired
};

export default Notification;
