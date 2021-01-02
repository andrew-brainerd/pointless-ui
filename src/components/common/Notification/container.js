import { connect } from 'react-redux';
import { hideNotification } from '../../../actions/notify';
import { navTo } from '../../../actions/routing';
import Notification from './Notification';

const mapStateToProps = ({ notify }) => ({
  hidden: notify.hidden,
  category: notify.category,
  title: notify.title,
  message: notify.message
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(hideNotification),
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
