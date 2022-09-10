import { Outlet } from 'react-router';
import { ContentProps } from './container';
import Loading from '../common/Loading/Loading';
import styles from './Content.module.scss';

const Content = ({ isLoading, isSubHeaderOpen }: ContentProps) => {
  return (
    <div className={[
      styles.content,
      isSubHeaderOpen ? styles.subHeaderOpen : ''
    ].join(' ')}>
      {isLoading ? <Loading /> : <Outlet />}
    </div>
  );
};

export default Content;
