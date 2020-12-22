import { connect } from 'react-redux';
import { getCurrentUser } from '../../selectors/user';
import { connectClient } from '../../actions/pusher';
import { setCurrentUser } from '../../actions/user';
import { displayNotification } from '../../actions/notify';
import { navTo } from '../../actions/routing';
import Header from './Header';

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  connectClient: (channel, event, action) => dispatch(connectClient(channel, event, action)),
  setCurrentUser: email => dispatch(setCurrentUser(email)),
  notify: (title, message, time) => dispatch(displayNotification(title, message, time)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
