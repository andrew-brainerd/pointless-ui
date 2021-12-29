import { connect } from 'react-redux';
import { getPoolId } from '../../../selectors/routing';
import { getSelectedPool } from '../../../selectors/pools';
import { inviteUser } from '../../../actions/pools';
import UsersModal from './UsersModal';

const mapStateToProps = state => ({
  poolId: getPoolId(state),
  pool: getSelectedPool(state)
});

const mapDispatchToProps = dispatch => ({
  inviteUser: (poolId, inviteEmail) => dispatch(inviteUser(poolId, inviteEmail))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersModal);
