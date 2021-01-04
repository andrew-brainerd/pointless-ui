import { connect } from 'react-redux';
import { getCurrentUserEmail, getCurrentUserId } from '../../selectors/user';
import { getPoolId } from '../../selectors/routing';
import { getSelectedPool, getIsLoadingPool } from '../../selectors/pools';
import { loadPool, deletePool, deleteWager, inviteUser, addUser } from '../../actions/pools';
import { navTo } from '../../actions/routing';
import Pool from './Pool';

const mapStateToProps = state => ({
  userEmail: getCurrentUserEmail(state),
  userId: getCurrentUserId(state),
  poolId: getPoolId(state),
  isLoading: getIsLoadingPool(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = dispatch => ({
  loadPool: poolId => dispatch(loadPool(poolId)),
  deletePool: poolId => dispatch(deletePool(poolId)),
  deleteWager: (poolId, wagerId) => dispatch(deleteWager(poolId, wagerId)),
  inviteUser: (poolId, inviteEmail) => dispatch(inviteUser(poolId, inviteEmail)),
  addUser: (poolId, userEmail) => dispatch(addUser(poolId, userEmail)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pool);
