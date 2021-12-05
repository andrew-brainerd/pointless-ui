import { connect } from 'react-redux';
import { getIsLoadingUser } from '../../selectors/user';
import Content from './Content';

const mapStateToProps = state => ({
  isLoadingUser: getIsLoadingUser(state)
});

export default connect(mapStateToProps)(Content);
