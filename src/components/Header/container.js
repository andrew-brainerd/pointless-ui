import { connect } from 'react-redux';
import { getCurrentUserEmail, getCurrentUserPicture } from '../../selectors/user';
import { getPoolId, getPathname } from '../../selectors/routing';
import { connectClient } from '../../actions/pusher';
import { setCurrentUser } from '../../actions/users';
import { loadPool } from '../../actions/pools';
import { displayNotification, loadNotifications } from '../../actions/notify';
import { showSubHeader, hideSubHeader } from '../../actions/config';
import { navTo } from '../../actions/routing';
import Header from './Header';

const mapStateToProps = state => ({
  userEmail: getCurrentUserEmail(state),
  userPicture: getCurrentUserPicture(state),
  poolId: getPoolId(state),
  pathname: getPathname(state)
});

const mapDispatchToProps = dispatch => ({
  connectClient: (channel, event, action) => dispatch(connectClient(channel, event, action)),
  setCurrentUser: email => dispatch(setCurrentUser(email)),
  notify: (title, message, time) => dispatch(displayNotification(title, message, time)),
  loadPool: poolId => dispatch(loadPool(poolId)),
  showSubHeader: () => dispatch(showSubHeader),
  hideSubHeader: () => dispatch(hideSubHeader),
  loadNotifications: userEmail => dispatch(loadNotifications(userEmail)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
