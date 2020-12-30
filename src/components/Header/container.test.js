import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { LOADING_USER } from '../../actions/users';
import Container from './container';
import Header from './Header';

describe('Header Container', () => {
  let store, props;

  const initialState = {
    router: {
      location: {
        pathname: '/pools/12345'
      }
    },
    pools: {
      currentPool: {}
    }
  };

  beforeEach(() => {
  });

  const render = () => {
    store = configureStore([thunk])(initialState);

    return mount(
      <Provider store={store}>
        <Container {...props} />
      </Provider>
    );
  };

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });

  it('should render a Header component', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Header);

    expect(component.exists()).toBeTruthy();
  });

  it('should dispatch setCurrentUser action', () => {
    const wrapper = render();
    const component = wrapper.find(Container).find(Header);
    store.clearActions();

    component.props().setCurrentUser('test@anorakgm.com');

    expect(store.getActions()).toEqual([
      { type: LOADING_USER }
    ]);
  });
});
