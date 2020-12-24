import { connect } from 'react-redux';
import { getPoolId } from '../../selectors/routing';
import { getCurrentUserEmail } from '../../selectors/user';
import { getPoolUsers } from '../../selectors/pools';
import { loadPool, createWager } from '../../actions/pools';
import { navTo } from '../../actions/routing';
import NewWager from './NewWager';

const mapStateToProps = state => ({
  poolId: getPoolId(state),
  userEmail: getCurrentUserEmail(state),
  poolUsers: getPoolUsers(state)
});

const mapDispatchToProps = dispatch => ({
  loadPool: poolId => dispatch(loadPool(poolId)),
  createWager: (poolId, createdBy, wager) => dispatch(createWager(poolId, createdBy, wager)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewWager);
