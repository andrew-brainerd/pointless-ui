import React from 'react';
import { bool, string } from 'prop-types';
import Lottie from 'lottie-react-web';
import spinner from './loading.json';
import styles from './Loading.module.scss';

const Loading = ({ isActive = true, className }) => isActive ? (
  <div className={[styles.loading, className].join(' ')}>
    <Lottie
      options={{
        animationData: spinner
      }}
    />
  </div>
) : null;

Loading.propTypes = {
  isActive: bool,
  className: string
};

export default Loading;
