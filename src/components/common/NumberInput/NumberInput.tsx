import { useRef, useEffect } from 'react';
import noop from '../../../utils/noop';
import styles from './NumberInput.module.scss';

interface Props {
  name?: string,
  className?: string,
  value: number,
  minimum?: number,
  maximum?: number,
  step?: number,
  inputClassName?: string,
  error?: string,
  autofocus?: boolean,
  isValid?: boolean,
  onChange?: (value: number) => void,
  onPressEnter?: () => void,
  onFocus?: () => void,
  onBlur?: () => void
}

const NumberInput = ({
  name,
  className,
  value = 0,
  minimum = 0,
  maximum = Infinity,
  step = 1,
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
    onChange ? onChange(parseInt(value)) : noop();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isValid && onPressEnter) {
        onPressEnter();
        handleChange('0');
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
        min={minimum}
        max={maximum}
        step={step}
        autoComplete={'false'}
        onChange={e => handleChange(e.target.value)}
        onKeyPress={handleKeyPress}
        onFocus={onFocus || noop}
        onBlur={onBlur || noop}
      />
    </div>
  );
};

export default NumberInput;
