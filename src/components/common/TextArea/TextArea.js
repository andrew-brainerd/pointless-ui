import React, { useRef, useEffect } from 'react';
import { string, bool, func } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './TextArea.module.scss';

const TextArea = ({
  name,
  className,
  placeholder,
  value = '',
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
        handleChange({ target: { value: '' } });
      } else {
        noop();
      }
    }
  };

  return (
    <div className={[
      styles.textAreaContainer,
      className || ''
    ].join(' ')}
    >
      <textarea
        name={name}
        className={[
          styles.textArea,
          inputClassName || ''
        ].join(' ')}
        placeholder={placeholder || ''}
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

TextArea.propTypes = {
  name: string,
  className: string,
  placeholder: string,
  value: string,
  inputClassName: string,
  error: string,
  autofocus: bool,
  isValid: bool,
  onChange: func.isRequired,
  onPressEnter: func,
  onFocus: func,
  onBlur: func
};

export default TextArea;
