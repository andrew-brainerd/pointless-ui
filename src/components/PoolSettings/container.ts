import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from '../../store/configureStore';
import { ApplicationState } from '../../reducers';
import { getIsCreatingPool, getIsLoadingPool, getSelectedPool } from '../../selectors/pools';
import { createPool, loadPool } from '../../actions/pools';
import PoolSettings from './PoolSettings';

const mapStateToProps = (state: ApplicationState) => ({
  isCreatingPool: getIsCreatingPool(state),
  isLoadingPool: getIsLoadingPool(state),
  selectedPool: getSelectedPool(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadPool: (poolId: string) => loadPool(poolId),
  createPool: (name: string, userEmail: string) => dispatch(createPool(name, userEmail)),
  updatePool: () => new Promise(resolve => setTimeout(() => {
    console.log('Pool updated');
    resolve({ message: 'Pool updated' });
  }, 1500))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PoolSettingsProps = ConnectedProps<typeof connector>;

export default connector(PoolSettings);
