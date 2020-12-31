import { connect } from 'react-redux';
import { getIsSubHeaderOpen } from '../../selectors/config';
import App from './App';

const mapStateToProps = state => ({
  isSubHeaderOpen: getIsSubHeaderOpen(state)
});

export default connect(mapStateToProps)(App);
