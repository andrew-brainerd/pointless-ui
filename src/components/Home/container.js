import { connect } from 'react-redux';
import { getCurrentUserEmail } from '../../selectors/user';
import { getUserPools } from '../../selectors/pools';
import { loadPools, createPool } from '../../actions/pools';
import { navTo } from '../../actions/routing';
import Home from './Home';

const mapStateToProps = state => ({
  userEmail: getCurrentUserEmail(state),
  userPools: getUserPools(state)
});

const mapDispatchToProps = dispatch => ({
  loadPools: userEmail => dispatch(loadPools(userEmail)),
  createPool: (name, createdBy) => dispatch(createPool(name, createdBy)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
