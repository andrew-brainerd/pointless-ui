import { connect, ConnectedProps } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { hideNotification } from '../../../actions/notify';
import Notification from './Notification';

const mapStateToProps = (state: ApplicationState) => ({
  hidden: state.notify.hidden,
  category: state.notify.category,
  title: state.notify.title,
  message: state.notify.message
});

const mapDispatchToProps = {
  close: () => hideNotification()
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export type NotificationProps = ConnectedProps<typeof connector>;

export default connector(Notification);