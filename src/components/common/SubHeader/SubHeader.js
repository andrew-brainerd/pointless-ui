import React from 'react';
import { string, node } from 'prop-types';
import styles from './SubHeader.module.scss';

const SubHeader = ({ className, children }) => {
  return (
    <div className={styles.subHeader}>
      <div className={[styles.content, className || ''].join(' ')}>
        {children}
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  className: string,
  children: node.isRequired
};

export default SubHeader;
