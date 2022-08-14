import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { Wager } from '../../types/pools';
import { getIsCreatingWager, getSelectedPool } from '../../selectors/pools';
import { loadPool, createWager } from '../../actions/pools';
import NewWager from './NewWager';

const mapStateToProps = (state: ApplicationState) => ({
  isCreatingWager: getIsCreatingWager(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = {
  loadPool: (poolId: string) => loadPool(poolId),
  createWager: (poolId: string, createdBy: string, wager: Wager) => createWager(poolId, createdBy, wager)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type NewWagerProps = ConnectedProps<typeof connector>;

export default connector(NewWager);
