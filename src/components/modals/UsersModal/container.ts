import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getSelectedPool } from '../../../selectors/pools';
import { inviteUser } from '../../../actions/pools';
import UsersModal from './UsersModal';

interface Props {
  openHandler: (isOpen: boolean) => void
}

const mapStateToProps = (state: ApplicationState) => ({
  pool: getSelectedPool(state)
});

const mapDispatchToProps = {
  inviteUser: (poolId: string, inviteEmail: string) => inviteUser(poolId, inviteEmail)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type UsersModalProps = ConnectedProps<typeof connector> & Props;

export default connector(UsersModal);
