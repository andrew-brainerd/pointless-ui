import Lottie from 'lottie-react';
import loading from './loading.json';
import styles from './Loading.module.scss';
interface LoadingProps {
  className?: string,
  message?: string
}

const Loading = ({ className, message }: LoadingProps): JSX.Element => {
  return (
    <div className={[styles.loading, className].join(' ')}>
      {message && <div className={styles.message}>{message}</div>}
      <Lottie animationData={loading} autoplay loop />
    </div>
  );
};

export default Loading;
