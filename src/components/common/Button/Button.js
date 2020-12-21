import React from 'react';
import { node, bool, func, string, oneOfType, number } from 'prop-types';
import { isMobile } from 'react-device-detect';
import noop from '../../../utils/noop';
import styles from './Button.module.scss';

const Button = ({ children, className, disabled, name, onClick, text }) => (
  <div
    name={name}
    className={[
      styles.button,
      disabled ? styles.disabled : '',
      !isMobile ? styles.animateHover : '',
      className
    ].join(' ')}
    onClick={!disabled ? onClick : noop}
  >
    {children || text}
  </div>
);

Button.propTypes = {
  children: node,
  className: string,
  disabled: bool,
  name: string,
  onClick: func.isRequired,
  text: oneOfType([string, number])
};

export default Button;
