import React from 'react';
import { bool, string, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import Icon from '../../common/Icon/Icon';
import styles from './Notification.module.scss';

const Notification = ({ hidden, category, title, message, close }) => {
  console.log('Notification', { hidden, category, title, message });

  return (
    <div
      className={[
        styles.notification,
        styles[category],
        isMobile ? styles.mobile : '',
        hidden ? styles.hidden : ''
      ].join(' ')}
      onClick={close}
    >
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
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
  close: func.isRequired
};

export default Notification;
