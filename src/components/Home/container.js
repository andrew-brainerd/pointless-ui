import { connect } from 'react-redux';
import { getIsLoadingUser } from '../../selectors/user';
import { navTo } from '../../actions/routing';
import Home from './Home';

const mapStateToProps = state => ({
  isLoadingUser: getIsLoadingUser(state),
  userPools: [
    {
      id: 0,
      name: 'Test Pool 1'
    },
    {
      id: 1,
      name: 'Test Pool 2'
    },
    {
      id: 2,
      name: 'Test Pool 3'
    }
  ]
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
