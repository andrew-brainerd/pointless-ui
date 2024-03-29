import React, { useState, useEffect } from 'react';
import { bool, string, array, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import { POOL_ROUTE, NEW_POOL_SETTINGS_ROUTE } from '../../constants/routes';
import SubHeader from '../common/SubHeader/SubHeader';
import Button from '../common/Button/Button';
import TextInput from '../common/TextInput/TextInput';
import Loading from '../common/Loading/Loading';
import styles from './Home.module.scss';
import Icon from '../common/Icon/Icon';

const Home = ({ isLoadingPools, userEmail, userPools, loadPools, createPool, navTo }) => {
  const [isCreatingNewPool, setIsCreatingNewPool] = useState(false);
  const [newPoolName, setNewPoolName] = useState('');

  useEffect(() => {
    userEmail && loadPools(userEmail);
  }, [userEmail, loadPools]);

  return userEmail ? (
    <>
      <SubHeader>
        {isCreatingNewPool && (
          <div className={styles.poolControls}>
            <TextInput
              className={styles.newPoolName}
              inputClassName={styles.newPoolNameInput}
              value={newPoolName}
              onChange={setNewPoolName}
              onPressEnter={() => {
                createPool(newPoolName, userEmail);
                setNewPoolName('');
                setIsCreatingNewPool(false);
              }}
              isValid={!!newPoolName}
              autofocus
            />
            <Button
              className={styles.newPoolButton}
              type={'primary'}
              onClick={() => {
                createPool(newPoolName, userEmail);
                setNewPoolName('');
                setIsCreatingNewPool(false);
              }}
              text={'Create'}
              disabled={!newPoolName}
            />
            <Button
              className={styles.cancelNewPoolButton}
              onClick={() => {
                setNewPoolName('');
                setIsCreatingNewPool(false);
              }}
              text={'Cancel'}
            />
          </div>
        )}
        {!isCreatingNewPool && (
          <Button
            className={styles.newPool}
            onClick={() => navTo(NEW_POOL_SETTINGS_ROUTE)}
            text={'New Pool'}
          />
        )}
      </SubHeader>
      {isLoadingPools ? <Loading message={'Loading Pools'} /> : (
        <div className={[styles.home, isMobile ? styles.mobile : ''].join(' ')}>
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
      )}
    </>
  ) : (
    <div className={styles.notSignedIn}>
      <div className={styles.notSignedInArrow}>
        <Icon name={'arrow'} />
      </div>
      Please sign in to continue
    </div>
  );
};

Home.propTypes = {
  isLoadingPools: bool,
  isLoadingUser: bool,
  userEmail: string,
  userPools: array,
  loadPools: func.isRequired,
  createPool: func.isRequired,
  navTo: func.isRequired
};

export default Home;
