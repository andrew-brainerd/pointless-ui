import { connect } from 'react-redux';
import { getCurrentUserEmail } from '../../selectors/user';
import { getPoolId } from '../../selectors/routing';
import { connectClient } from '../../actions/pusher';
import { setCurrentUser } from '../../actions/users';
import { loadPool } from '../../actions/pools';
import { displayNotification } from '../../actions/notify';
import { navTo } from '../../actions/routing';
import Header from './Header';

const mapStateToProps = state => ({
  userEmail: getCurrentUserEmail(state),
  poolId: getPoolId(state)
});

const mapDispatchToProps = dispatch => ({
  connectClient: (channel, event, action) => dispatch(connectClient(channel, event, action)),
  setCurrentUser: email => dispatch(setCurrentUser(email)),
  notify: (title, message, time) => dispatch(displayNotification(title, message, time)),
  loadPool: poolId => dispatch(loadPool(poolId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
