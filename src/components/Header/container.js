import { connect } from 'react-redux';
import { getCurrentUser } from '../../selectors/user';
import { setCurrentUser } from '../../actions/user';
import { navTo } from '../../actions/routing';
import Header from './Header';

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: email => dispatch(setCurrentUser(email)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
