import React from 'react';
import { mount } from 'enzyme';
import noop from '../../../utils/noop';
import NumberInput from './NumberInput';

describe('NumberInput Component', () => {
  let props;

  beforeEach(() => {
    props = {
      value: undefined,
      inputClassName: '',
      error: null,
      autoFocus: false,
      onChange: jest.fn(),
      onPressEnter: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
  });

  const render = () => mount(
    <NumberInput {...props} />
  );

  it('should render', () => {
    const component = render();

    expect(component).toBeTruthy();
  });

  it('should show input error', () => {
    props.error = 'input error';
    const component = render();

    expect(component.find('.inputError')).toBeTruthy();
  });

  describe('Default input value', () => {
    it('should set input value to given value', () => {
      props.value = 42;
      const component = render().find('input');

      expect(component.props().value).toEqual(42);
    });

    it('should set input value to default value', () => {
      props.value = undefined;
      const component = render().find('input');

      expect(component.props().value).toEqual(0);
    });
  });

  describe('onKeyPress', () => {
    it('should call the provided enter function', () => {
      const input = render().find('input');

      input.simulate('keypress', { key: 'Enter' });

      expect(props.onPressEnter).toHaveBeenCalled();
    });
  });

  describe('onFocus', () => {
    it('should call the provided focus function', () => {
      const input = render().find('input');

      input.simulate('focus');

      expect(props.onFocus).toHaveBeenCalled();
    });

    it('should call noop when no focus function provided', () => {
      props.onFocus = undefined;
      const input = render().find('input');

      expect(input.props().onFocus).toEqual(noop);
    });
  });

  describe('onBlur', () => {
    it('should call the provided blur function', () => {
      const input = render().find('input');

      input.simulate('blur');

      expect(props.onBlur).toHaveBeenCalled();
    });

    it('should call call noop when no blur function provided', () => {
      props.onBlur = undefined;
      const input = render().find('input');

      expect(input.props().onBlur).toEqual(noop);
    });
  });
});
