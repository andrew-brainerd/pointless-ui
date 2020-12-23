import { connect } from 'react-redux';
import { getCurrentUserEmail } from '../../selectors/user';
import { connectClient } from '../../actions/pusher';
import { setCurrentUser } from '../../actions/user';
import { displayNotification } from '../../actions/notify';
import { navTo } from '../../actions/routing';
import Header from './Header';
import { loadPools } from '../../actions/pools';

const mapStateToProps = state => ({
  userEmail: getCurrentUserEmail(state)
});

const mapDispatchToProps = dispatch => ({
  connectClient: (channel, event, action) => dispatch(connectClient(channel, event, action)),
  setCurrentUser: email => dispatch(setCurrentUser(email)),
  notify: (title, message, time) => dispatch(displayNotification(title, message, time)),
  loadPools: userEmail => dispatch(loadPools(userEmail)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
