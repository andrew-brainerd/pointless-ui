import { connect } from 'react-redux';
import { getPoolId } from '../../selectors/routing';
import { navTo } from '../../actions/routing';
import Pool from './Pool';

const mapStateToProps = state => ({
  poolId: getPoolId(state),
  currentWagers: [
    {
      id: 0,
      description: 'The hippies will finish their flags first',
      amount: 200,
      wagerWith: [
        'taylor.wilson@pointless.test'
      ]
    },
    {
      id: 1,
      description: 'The gays will be eliminated next',
      amount: 200,
      wagerWith: [
        'taylor.wilson@pointless.test'
      ]
    },
    {
      id: 2,
      description: 'The midget girl will go home this episode',
      amount: 200,
      wagerWith: [
        'taylor.wilson@pointless.test'
      ]
    },
    {
      id: 3,
      description: 'John will win immunity',
      amount: 200,
      wagerWith: [
        'taylor.wilson@pointless.test'
      ]
    },
    {
      id: 4,
      description: 'Kathy will win Survivor',
      amount: 200,
      wagerWith: [
        'taylor.wilson@pointless.test'
      ]
    }
  ]
});

const mapDispatchToProps = dispatch => ({
  navTo: path => dispatch(navTo(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pool);
