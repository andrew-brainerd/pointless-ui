import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { getIsLoadingNotifications, getNotifications } from '../../selectors/notify';
import { loadNotifications, markAllAsRead, markAsRead, dismiss } from '../../actions/notify';
import Notifications from './Notifications';

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: getIsLoadingNotifications(state),
  notifications: getNotifications(state)
});

const mapDispatchToProps = {
  loadNotifications: (userEmail: string, showLoading: boolean) => loadNotifications(userEmail, showLoading),
  markAllAsRead: (userEmail: string) => markAllAsRead(userEmail),
  markAsRead: (userEmail: string, notificationId: string) => markAsRead(userEmail, notificationId),
  dismiss: (userEmail: string, notificationId: string) => dismiss(userEmail, notificationId)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type NotificationsProps = ConnectedProps<typeof connector>;

export default connector(Notifications);
