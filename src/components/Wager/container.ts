import { connect } from 'react-redux';
import { ApplicationState } from '../../reducers';
import {
  getIsLoadingPool,
  getIsAcceptingWager,
  getIsCompletingWager,
  getSelectedPool
} from '../../selectors/pools';
import { loadPool, acceptWager, deleteWager } from '../../actions/pools';
import Wager from './Wager';

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: getIsLoadingPool(state),
  isAvailableWager: false, // TODO: getIsAvailableWager(state),
  isAcceptingWager: getIsAcceptingWager(state),
  isCompletingWager: getIsCompletingWager(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = {
  loadPool: (poolId: string) => loadPool(poolId),
  acceptWager: (poolId: string, wagerId: string, userEmail: string) => acceptWager(poolId, wagerId, userEmail),
  deleteWager: (poolId: string, wagerId: string) => deleteWager(poolId, wagerId)
};

export default connect(mapStateToProps, mapDispatchToProps)(Wager);
