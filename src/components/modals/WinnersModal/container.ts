import { connect, ConnectedProps } from 'react-redux';
import { completeWager } from '../../../actions/pools';
import { ApplicationState } from '../../../reducers';
import { getSelectedPool } from '../../../selectors/pools';
import WinnersModal from './WinnersModal';

interface Props {
  setIsModalOpen: (isOpen: boolean) => void
}

const mapStateToProps = (state: ApplicationState) => ({
  pool: getSelectedPool(state)
});

const mapDispatchToProps = {
  completeWager: (poolId: string, wagerId: string, completedBy: string, winnerEmail: string) => completeWager(poolId, wagerId, completedBy, winnerEmail)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type WinnersModalProps = ConnectedProps<typeof connector> & Props;

export default connector(WinnersModal);