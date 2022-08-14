import React from 'react';
import { isMobile } from 'react-device-detect';
import noop from '../../../utils/noop';
import styles from './Button.module.scss';

interface ButtonProps {
  animate?: boolean,
  children?: React.ReactNode,
  className?: string,
  disabled?: boolean,
  onClick: () => void,
  text?: string | number,
  title?: string,
  type?: string
}

const Button = ({
  animate = false,
  children,
  className,
  disabled,
  onClick,
  text,
  title,
  type
}: ButtonProps) => (
  <div
    className={[
      styles.button,
      type ? styles[type] : '',
      disabled ? styles.disabled : '',
      !isMobile && animate ? styles.animateHover : '',
      className
    ].join(' ')}
    onClick={!disabled ? onClick : noop}
    title={title}
  >
    {children || text}
  </div>
);

export default Button;
