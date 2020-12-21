import React, { useEffect } from 'react';
import { bool, string, array, func } from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { POOL_ROUTE } from '../../constants/routes';
import Loading from '../common/Loading/Loading';
import styles from './Home.module.scss';

const Home = ({ userEmail, userPools, loadUserPools, navTo }) => {
  const { isLoading } = useAuth0();

  useEffect(() => {
    console.log('%cUser email', 'color: cyan', userEmail);
    !isLoading && userEmail && loadUserPools(userEmail);
  }, [isLoading, userEmail, loadUserPools]);

  return isLoading ? <Loading /> : (
    <div className={styles.home}>
      <div className={styles.pageHeader}>
        <div className={styles.myPools}>
          {userPools.map(({ _id, name }) => {
            return (
              <div
                key={_id}
                className={styles.pool}
                onClick={() => navTo(POOL_ROUTE.replace(':poolId', _id))}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  isLoadingUser: bool,
  userEmail: string,
  userPools: array,
  loadUserPools: func.isRequired,
  navTo: func.isRequired
};

export default Home;
