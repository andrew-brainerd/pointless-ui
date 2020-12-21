import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
  let props;

  beforeEach(() => {
    props = {
      history: {}
    };
  });

  const render = () => shallow(
    <App {...props} />
  );

  it('should render', () => {
    const component = render();
    expect(component).toBeTruthy();
  });
});
