import { connect } from 'react-redux';
import { navTo } from '../../actions/routing';
import UserSearch from './UserSearch';

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(null, mapDispatchToProps)(UserSearch);
