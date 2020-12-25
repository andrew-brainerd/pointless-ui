import React from 'react';
import { string } from 'prop-types';
import Lottie from 'lottie-react-web';
import spinner from './loading.json';
import styles from './Loading.module.scss';

const Loading = ({ className, message }) => {
  return (
    <div className={[styles.loading, className].join(' ')}>
      {message && <div className={styles.message}>{message}</div>}
      <Lottie
        options={{
          animationData: spinner,
          autoplay: true,
          loop: true
        }}
      />
    </div>
  );
};

Loading.propTypes = {
  className: string,
  message: string
};

export default Loading;
