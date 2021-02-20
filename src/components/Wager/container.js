import { connect } from 'react-redux';
import { getCurrentUserEmail } from '../../selectors/user';
import { getPoolId, getWagerId } from '../../selectors/routing';
import {
  getIsLoadingPool,
  getIsAvailableWager,
  getIsAcceptingWager,
  getIsCompletingWager,
  getWager
} from '../../selectors/pools';
import { loadPool, acceptWager, deleteWager } from '../../actions/pools';
import { navTo } from '../../actions/routing';
import Wager from './Wager';

const mapStateToProps = state => ({
  isLoading: getIsLoadingPool(state),
  isAvailableWager: getIsAvailableWager(state),
  isAcceptingWager: getIsAcceptingWager(state),
  isCompletingWager: getIsCompletingWager(state),
  userEmail: getCurrentUserEmail(state),
  poolId: getPoolId(state),
  wagerId: getWagerId(state),
  wager: getWager(state)
});

const mapDispatchToProps = dispatch => ({
  loadPool: poolId => dispatch(loadPool(poolId)),
  acceptWager: (poolId, wagerId, userEmail) => dispatch(acceptWager(poolId, wagerId, userEmail)),
  deleteWager: (poolId, wagerId) => dispatch(deleteWager(poolId, wagerId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wager);
