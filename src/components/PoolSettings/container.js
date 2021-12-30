import { connect } from 'react-redux';
import { getCurrentUserEmail } from '../../selectors/user';
import { getIsNewPool, getPoolId } from '../../selectors/routing';
import { getIsLoadingPool, getSelectedPool } from '../../selectors/pools';
import { createPool, loadPool } from '../../actions/pools';
import PoolSettings from './PoolSettings';

const mapStateToProps = state => ({
  userEmail: getCurrentUserEmail(state),
  isNewPool: getIsNewPool(state),
  isLoadingPool: getIsLoadingPool(state),
  poolId: getPoolId(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = dispatch => ({
  loadPool: poolId => dispatch(loadPool(poolId)),
  createPool: (name, userEmail, config) => dispatch(createPool(name, userEmail, config)),
  updatePool: () => new Promise(resolve => setTimeout(() => {
    console.log('Pool updated');
    resolve({ message: 'Pool updated' });
  }, 1500))
});

export default connect(mapStateToProps, mapDispatchToProps)(PoolSettings);
