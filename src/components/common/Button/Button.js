import React from 'react';
import { node, bool, func, string, oneOfType, number } from 'prop-types';
import { isMobile } from 'react-device-detect';
import noop from '../../../utils/noop';
import styles from './Button.module.scss';

const Button = ({ animate = false, children, className, disabled, name, onClick, text, title, type }) => (
  <div
    name={name}
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

Button.propTypes = {
  animate: bool,
  children: node,
  className: string,
  disabled: bool,
  name: string,
  onClick: func.isRequired,
  text: oneOfType([string, number]),
  title: string,
  type: string
};

export default Button;
