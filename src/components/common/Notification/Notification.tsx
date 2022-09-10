import { useNavigate } from 'react-router';
import { isMobile } from 'react-device-detect';
import { NotificationProps } from './container';
import { NOTIFICATIONS_ROUTE } from '../../../constants/routes';
import Icon from '../Icon/Icon';
import styles from './Notification.module.scss';

const Notification = ({ hidden, category, title, message, close }: NotificationProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={[
        styles.notification,
        styles[category],
        isMobile ? styles.mobile : '',
        hidden ? styles.hidden : ''
      ].join(' ')}
      onClick={() => {
        navigate(NOTIFICATIONS_ROUTE);
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

export default Notification;
