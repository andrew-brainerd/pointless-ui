import React, { useRef, useEffect } from 'react';
import { string, number, bool, func } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './NumberInput.module.scss';

const NumberInput = ({
  name,
  className,
  value = 0,
  inputClassName,
  autofocus,
  isValid = true,
  onChange,
  onPressEnter,
  onFocus,
  onBlur
}) => {
  const inputRef = useRef();

  useEffect(() => {
    autofocus && inputRef.current.focus();
  }, [autofocus]);

  const handleChange = event => {
    const newValue = event.target.value;
    onChange ? onChange(newValue) : noop();
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      if (isValid && onPressEnter) {
        onPressEnter();
        handleChange({ target: { value: 0 } });
      } else {
        noop();
      }
    }
  };

  return (
    <div className={[
      styles.numberInputContainer,
      className || ''
    ].join(' ')}
    >
      <input
        name={name}
        type={'number'}
        className={[
          styles.numberInput,
          inputClassName || ''
        ].join(' ')}
        ref={inputRef}
        value={value}
        autoComplete={'false'}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={onFocus || noop}
        onBlur={onBlur || noop}
      />
    </div>
  );
};

NumberInput.propTypes = {
  name: string,
  className: string,
  value: number,
  inputClassName: string,
  error: string,
  autofocus: bool,
  isValid: bool,
  onChange: func.isRequired,
  onPressEnter: func,
  onFocus: func,
  onBlur: func
};

export default NumberInput;
