import { connect } from 'react-redux';
import { getPoolId } from '../../selectors/routing';
import { getSelectedPool, getIsLoadingPool } from '../../selectors/pools';
import { loadPool, deletePool, deleteWager } from '../../actions/pools';
import { navTo } from '../../actions/routing';
import Pool from './Pool';

const mapStateToProps = state => ({
  poolId: getPoolId(state),
  isLoading: getIsLoadingPool(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = dispatch => ({
  loadPool: poolId => dispatch(loadPool(poolId)),
  deletePool: poolId => dispatch(deletePool(poolId)),
  deleteWager: (poolId, wagerId) => dispatch(deleteWager(poolId, wagerId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pool);
