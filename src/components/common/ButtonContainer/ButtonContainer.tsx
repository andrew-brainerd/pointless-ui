import React from 'react';
import styles from './ButtonContainer.module.scss';

interface Props {
  className?: string,
  children: React.ReactNode
}

const ButtonContainer = ({ className, children }: Props) => {
  return (
    <div className={[
      styles.buttonContainer,
      className || ''
    ].join(' ')}>
      {children}
    </div>
  );
};

export default ButtonContainer;
