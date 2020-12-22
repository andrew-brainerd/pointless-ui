import { connect } from 'react-redux';
import { getPoolId } from '../../selectors/routing';
import { getSelectedPool, getIsLoadingPool } from '../../selectors/pools';
import { navTo } from '../../actions/routing';
import Pool from './Pool';
import { loadPool } from '../../actions/pools';

const mapStateToProps = state => ({
  poolId: getPoolId(state),
  isLoading: getIsLoadingPool(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = dispatch => ({
  loadPool: poolId => dispatch(loadPool(poolId)),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pool);
