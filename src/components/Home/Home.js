import React from 'react';
import { bool, array, func } from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import { POOL_ROUTE } from '../../constants/routes';
import Loading from '../common/Loading/Loading';
import styles from './Home.module.scss';

const Home = ({ isLoadingUser, userPools, navTo }) => {
  const { isLoading } = useAuth0();

  return isLoading ? <Loading /> : (
    <div className={styles.home}>
      <div className={styles.pageHeader}>
        <div className={styles.myPools}>
          {userPools.map(({ id, name }) => {
            return (
              <div
                key={id}
                className={styles.pool}
                onClick={() => navTo(POOL_ROUTE.replace(':poolId', id))}
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
  userPools: array,
  navTo: func.isRequired
};

export default Home;
