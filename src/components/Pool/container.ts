import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { getSelectedPool, getIsLoadingPool } from '../../selectors/pools';
import { loadPool, deletePool, addUser } from '../../actions/pools';
import PoolComponent from './Pool';

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: getIsLoadingPool(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = {
  loadPool: (poolId: string) => loadPool(poolId),
  deletePool: (poolId: string) => deletePool(poolId),
  addUser: (poolId: string, userEmail: string) => addUser(poolId, userEmail)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PoolProps = ConnectedProps<typeof connector>;

export default connector(PoolComponent);

