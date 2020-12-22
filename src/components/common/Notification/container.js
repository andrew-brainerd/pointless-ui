import { connect } from 'react-redux';
import { closeNotification } from '../../../actions/notify';
import Notification from './Notification';

const mapStateToProps = ({ notify }) => ({
  hidden: notify.hidden,
  category: notify.category,
  title: notify.title,
  message: notify.message
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closeNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
