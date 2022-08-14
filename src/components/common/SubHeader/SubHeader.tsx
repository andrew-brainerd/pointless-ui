import React from 'react';
import styles from './SubHeader.module.scss';

interface Props {
  className?: string,
  children: React.ReactNode
}

const SubHeader = ({ className, children }: Props) => {
  return (
    <div className={styles.subHeader}>
      <div className={[styles.content, className || ''].join(' ')}>
        {children}
      </div>
    </div>
  );
};

export default SubHeader;
