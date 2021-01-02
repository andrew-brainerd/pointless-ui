import { connect } from 'react-redux';
import { getCurrentUserEmail } from '../../selectors/user';
import { getIsLoadingNotifications, getNotifications } from '../../selectors/notify';
import { loadNotifications, markAsRead, dismiss } from '../../actions/notify';
import Notifications from './Notifications';

const mapStateToProps = state => ({
  isLoading: getIsLoadingNotifications(state),
  userEmail: getCurrentUserEmail(state),
  notifications: getNotifications(state)
});

const mapDispatchToProps = dispatch => ({
  loadNotifications: (userEmail, showLoading) => dispatch(loadNotifications(userEmail, showLoading)),
  markAsRead: (userEmail, notificationId) => dispatch(markAsRead(userEmail, notificationId)),
  dismiss: (userEmail, notificationId) => dispatch(dismiss(userEmail, notificationId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
