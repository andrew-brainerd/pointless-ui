import { connect } from 'react-redux';
import { completeWager } from '../../actions/pools';
import { getSelectedPool } from '../../selectors/pools';
import { getPoolId, getWagerId } from '../../selectors/routing';
import { getCurrentUserEmail } from '../../selectors/user';
import WinnersModal from './WinnersModal';

const mapStateToProps = state => ({
  poolId: getPoolId(state),
  wagerId: getWagerId(state),
  pool: getSelectedPool(state),
  userEmail: getCurrentUserEmail(state)
});

const mapDispatchToProps = dispatch => ({
  completeWager: (poolId, wagerId, completedBy, winnerEmail) => dispatch(completeWager(poolId, wagerId, completedBy, winnerEmail))
});

export default connect(mapStateToProps, mapDispatchToProps)(WinnersModal);
