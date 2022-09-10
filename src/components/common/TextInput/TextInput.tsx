import React, { useRef, useEffect } from 'react';
import noop from '../../../utils/noop';
import styles from './TextInput.module.scss';

interface Props {
  name?: string,
  className?: string,
  placeholder?: string,
  value: string,
  inputClassName?: string,
  error?: string,
  autofocus?: boolean,
  isValid?: boolean,
  onChange: (value: string) => void,
  onPressEnter?: () => void,
  onFocus?: () => void,
  onBlur?: () => void
}

const TextInput = ({
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
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    autofocus && inputRef?.current?.focus();
  }, [autofocus]);

  const handleChange = (value: string) => {
    onChange ? onChange(value) : noop();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isValid && onPressEnter) {
        onPressEnter();
        handleChange('');
      } else {
        noop();
      }
    }
  };

  return (
    <div className={[
      styles.textInputContainer,
      className || ''
    ].join(' ')}
    >
      <input
        name={name}
        type={'text'}
        className={[
          styles.textInput,
          inputClassName || ''
        ].join(' ')}
        placeholder={placeholder || ''}
        ref={inputRef}
        value={value}
        autoComplete={'false'}
        onChange={e => handleChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={onFocus || noop}
        onBlur={onBlur || noop}
      />
    </div>
  );
};

export default TextInput;
