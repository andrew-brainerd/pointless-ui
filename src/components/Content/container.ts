import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../../reducers';
import { getIsLoadingUser } from '../../selectors/user';
import { getIsSubHeaderOpen } from '../../selectors/config';
import Content from './Content';

const mapStateToProps = (state: ApplicationState) => ({
  isLoading: getIsLoadingUser(state),
  isSubHeaderOpen: getIsSubHeaderOpen(state)
});

const connector = connect(mapStateToProps);

export type ContentProps = ConnectedProps<typeof connector>;

export default connector(Content);