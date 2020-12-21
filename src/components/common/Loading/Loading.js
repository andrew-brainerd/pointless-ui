import React from 'react';
import { bool, string } from 'prop-types';
import loadingImage from '../../../img/loading.png';
import styles from './Loading.module.scss';

const Loading = ({ isActive = true, className }) => isActive ? (
  <div className={[styles.loading, className].join(' ')}>
    <img src={loadingImage} alt='Loading' />
  </div>
) : null;

Loading.propTypes = {
  isActive: bool,
  className: string
};

export default Loading;
