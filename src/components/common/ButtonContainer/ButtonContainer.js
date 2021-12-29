import React from 'react';
import { string, node } from 'prop-types';
import styles from './ButtonContainer.module.scss';

const ButtonContainer = ({ className, children }) => {
  return (
    <div className={[
      styles.buttonContainer,
      className || ''
    ].join(' ')}>
      {children}
    </div>
  );
};

ButtonContainer.propTypes = {
  className: string,
  children: node
};

export default ButtonContainer;
