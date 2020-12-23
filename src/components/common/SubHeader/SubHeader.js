import React from 'react';
import { node } from 'prop-types';
import styles from './SubHeader.module.scss';

const SubHeader = ({ children }) => {
  return (
    <div className={styles.subHeader}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  children: node.isRequired
};

export default SubHeader;
