import { connect } from 'react-redux';
import { getCurrentUserEmail } from '../../selectors/user';
import { getIsLoadingNotifications, getNotifications } from '../../selectors/notify';
import { loadNotifications } from '../../actions/notify';
import Notifications from './Notifications';

const mapStateToProps = state => ({
  isLoading: getIsLoadingNotifications(state),
  userEmail: getCurrentUserEmail(state),
  notifications: getNotifications(state)
});

const mapDispatchToProps = dispatch => ({
  loadNotifications: userEmail => dispatch(loadNotifications(userEmail))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
