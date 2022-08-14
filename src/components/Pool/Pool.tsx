import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isEmpty } from 'ramda';
import { NEW_WAGER_ROUTE, POOL_SETTINGS_ROUTE, WAGER_ROUTE } from '../../constants/routes';
import usePoolUrl from '../../hooks/usePoolUrl';
import usePrevious from '../../hooks/usePrevious';
import { PoolProps } from './container';
import SubHeader from '../common/SubHeader/SubHeader';
import Loading from '../common/Loading/Loading';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import UsersModal from '../modals/UsersModal/container';
import ButtonContainer from '../common/ButtonContainer/ButtonContainer';
import styles from './Pool.module.scss';
import useUser from '../../hooks/useUser';

const PoolComponent = ({ isLoading, pool, loadPool, deletePool, addUser }: PoolProps) => {
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const { poolId } = usePoolUrl();
  const { userEmail, userId } = useUser();
  const prevPoolId = usePrevious(poolId);
  const shouldLoadPool = poolId && prevPoolId !== poolId;
  const hasSingleUser = (pool?.users || []).length === 1;
  const navigate = useNavigate();

  useEffect(() => {
    shouldLoadPool && loadPool(poolId);
  }, [shouldLoadPool, loadPool, poolId]);

  useEffect(() => {
    if (userEmail && pool?.users) {
      if (!pool.users.includes(userEmail)) {
        alert(`Adding user [${userEmail}] to pool`);
        addUser(poolId, userEmail);
      }
    }
  }, [userEmail, pool?.users, addUser, poolId]);

  return (
    <>
      <SubHeader className={styles.subHeader}>
        <div className={styles.poolName}>{pool?.name}</div>
        {userId && <div className={styles.points}>{pool?.pointTotals?.[userId]} pts</div>}
        <ButtonContainer>
          <Button
            className={styles.usersButton}
            onClick={() => setIsUsersModalOpen(true)}
            text={'Users'}
            title={'View Users'}
          >
            <Icon name={'group'} title={'Pool Members'} />
          </Button>
          <Button
            className={styles.newWagerButton}
            onClick={() => navigate(NEW_WAGER_ROUTE.replace(':poolId', poolId))}
            text={'New Wager'}
            title={hasSingleUser ? 'Add users to unlock wagers' : 'New Wager'}
            disabled={hasSingleUser}
          >
            <Icon name={'plus'} title={'New Wager'} />
          </Button>
          <Button
            className={styles.settingsButton}
            onClick={() => {
              navigate(POOL_SETTINGS_ROUTE.replace(':poolId', poolId));
            }}
            text={'Pool Settings'}
          >
            <Icon name={'trash'} title={'Pool Settings'} />
          </Button>
          {(pool?.wagers || []).length === 0 && (
            <Button
              className={styles.deleteButton}
              type={'hazard'}
              onClick={() => {
                if ((pool?.wagers || []).length === 0) {
                  deletePool(poolId);
                } else {
                  console.error('Can\'t delete a pool with wagers');
                }
              }}
              text={'Delete Pool'}
            >
              <Icon name={'trash'} title={'Delete Pool'} />
            </Button>
          )}
        </ButtonContainer>
      </SubHeader>
      {isLoading || !userId ? <Loading message={'Loading Pool'} /> : (
        <div className={styles.pool}>
          <div className={styles.wagerList}>
            {!pool?.wagers || isEmpty(pool.wagers) ? (
              <div className={styles.noWagers}>
                No Wagers
              </div>
            ) : (
              <>
                {/* <div className={styles.wagerGroupHeading}>New</div> */}
                <div className={styles.inactiveWagers}>
                  {(pool?.inactiveWagers || []).map(wager => {
                    return (
                      <div
                        key={wager._id}
                        className={[
                          styles.wager,
                          styles.inactive,
                          wager.createdBy !== userEmail ? styles.waiting : ''
                        ].join(' ')}
                        onClick={() => {
                          navigate(WAGER_ROUTE.replace(':poolId', poolId).replace(':wagerId', wager._id));
                        }}
                      >
                        <div className={styles.amount}>{wager.amount}</div>
                        <div className={styles.description}>{wager.description}</div>
                      </div>
                    );
                  })}
                </div>
                {/* <div className={styles.wagerGroupHeading}>Active</div> */}
                <div className={styles.activeWagers}>
                  {(pool?.activeWagers || []).map(wager => {
                    return (
                      <div
                        key={wager._id}
                        className={styles.wager}
                        onClick={() => {
                          navigate(WAGER_ROUTE.replace(':poolId', poolId).replace(':wagerId', wager._id));
                        }}
                      >
                        <div className={styles.amount}>{wager.amount}</div>
                        <div className={styles.description}>{wager.description}</div>
                      </div>
                    );
                  })}
                </div>
                {/* <div className={styles.wagerGroupHeading}>Complete</div> */}
                <div className={styles.completedWagers}>
                  {(pool?.completedWagers || []).map(wager => {
                    const completeClass = wager.winners && wager.winners.includes(userEmail) ? styles.winner : styles.loser;
                    return (
                      <div
                        key={wager._id}
                        className={[
                          styles.wager,
                          !wager.isActive ? styles.inactive : '',
                          wager.isComplete ? completeClass : ''
                        ].join(' ')}
                        onClick={() => {
                          navigate(WAGER_ROUTE.replace(':poolId', poolId).replace(':wagerId', wager._id));
                        }}
                      >
                        <div className={styles.amount}>{wager.amount}</div>
                        <div className={styles.description}>{wager.description}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          {isUsersModalOpen && <UsersModal openHandler={setIsUsersModalOpen} />}
        </div>
      )}
    </>
  );
};

export default PoolComponent;
