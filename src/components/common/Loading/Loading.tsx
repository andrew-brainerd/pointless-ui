import Lottie from 'lottie-react';
import spinner from './loading.json';
import styles from './Loading.module.scss';

interface LoadingProps {
  className?: string,
  message?: string
}

const Loading = ({ className, message }: LoadingProps) => {
  return (
    <div className={[styles.loading, className].join(' ')}>
      {message && <div className={styles.message}>{message}</div>}
      <Lottie
        animationData={spinner}
        autoplay={true}
        loop={true}
      />
    </div>
  );
};

export default Loading;
