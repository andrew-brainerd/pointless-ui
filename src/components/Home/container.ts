import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { getIsLoadingPools, getUserPools } from '../../selectors/pools';
import { loadPools, createPool } from '../../actions/pools';
import Home from './Home';

const mapStateToProps = (state: ApplicationState) => ({
  isLoadingPools: getIsLoadingPools(state),
  userPools: getUserPools(state)
});

const mapDispatchToProps = {
  loadPools: (userEmail: string) => loadPools(userEmail),
  createPool: (name: string, createdBy: string) => createPool(name, createdBy)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type HomeProps = ConnectedProps<typeof connector>;

export default connector(Home);
