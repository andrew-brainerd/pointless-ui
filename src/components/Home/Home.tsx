import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isMobile } from 'react-device-detect';
import { useAuth0 } from '@auth0/auth0-react';
import { POOL_ROUTE, NEW_POOL_SETTINGS_ROUTE } from '../../constants/routes';
import { HomeProps } from './container';
import SubHeader from '../common/SubHeader/SubHeader';
import Button from '../common/Button/Button';
import TextInput from '../common/TextInput/TextInput';
import Loading from '../common/Loading/Loading';
import styles from './Home.module.scss';
import Icon from '../common/Icon/Icon';

const Home = ({ isLoadingPools, userPools, loadPools, createPool }: HomeProps) => {
  const [isCreatingNewPool, setIsCreatingNewPool] = useState(false);
  const [newPoolName, setNewPoolName] = useState('');
  const { user } = useAuth0();
  const userEmail = user?.email;
  const navigate = useNavigate();

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
            onClick={() => navigate(NEW_POOL_SETTINGS_ROUTE)}
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
                    onClick={() => navigate(POOL_ROUTE.replace(':poolId', _id))}
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

export default Home;
