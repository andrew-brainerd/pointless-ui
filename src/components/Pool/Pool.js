import React, { useState, useEffect } from 'react';
import { string, bool, object, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import { isEmpty } from 'ramda';
import { NEW_WAGER_ROUTE, WAGER_ROUTE } from '../../constants/routes';
import usePrevious from '../../hooks/usePrevious';
import SubHeader from '../common/SubHeader/SubHeader';
import Loading from '../common/Loading/Loading';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './Pool.module.scss';
import TextInput from '../common/TextInput/TextInput';

const Pool = ({ userEmail, poolId, isLoading, pool, loadPool, deletePool, inviteUser, addUser, navTo }) => {
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const prevPoolId = usePrevious(poolId);
  const shouldLoadPool = poolId && prevPoolId !== poolId;
  const hasSingleUser = (pool.users || []).length === 1;

  useEffect(() => {
    shouldLoadPool && loadPool(poolId);
  }, [shouldLoadPool, loadPool, poolId]);

  useEffect(() => {
    if (userEmail && pool.users) {
      if (!pool.users.includes(userEmail)) {
        alert(`Adding user [${userEmail}] to pool`);
        addUser(poolId, userEmail);
      }
    }
  }, [userEmail, pool.users, addUser, poolId]);

  return (
    <>
      <SubHeader className={styles.subHeader}>
        <div className={styles.poolName}>{pool.name}</div>
        <div className={styles.buttonContainer}>
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
            onClick={() => navTo(NEW_WAGER_ROUTE.replace(':poolId', poolId))}
            text={'New Wager'}
            title={hasSingleUser ? 'Add users to unlock wagers' : 'New Wager'}
            disabled={hasSingleUser}
          >
            <Icon name={'plus'} title={'New Wager'} />
          </Button>
          {(pool.wagers || []).length === 0 && (
            <Button
              className={styles.deleteButton}
              type={'hazard'}
              onClick={() => {
                if ((pool.wagers || []).length === 0) {
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
        </div>
      </SubHeader>
      {isLoading ? <Loading message={'Loading Pool'} /> : (
        <div className={styles.pool}>
          <div className={styles.wagerList}>
            {!pool.wagers || isEmpty(pool.wagers) ? (
              <div className={styles.noWagers}>
                No Wagers
              </div>
            ) : pool.wagers.map(wager => (
              <div
                key={wager._id}
                className={[
                  styles.wager,
                  !wager.isActive ? styles.inactive : ''
                ].join(' ')}
                onClick={() => {
                  navTo(WAGER_ROUTE.replace(':poolId', poolId).replace(':wagerId', wager._id));
                }}
              >
                <div className={styles.amount}>{wager.amount} pts.</div>
                <div className={styles.description}>{wager.description}</div>
              </div>
            ))}
          </div>
          {isUsersModalOpen && (
            <Modal
              className={styles.modal}
              contentClassName={styles.modalContent}
              isOpen={isUsersModalOpen}
              isDraggable={!isMobile}
              headerText={'Users in Pool'}
              contentHeight={250}
              closeModal={() => {
                setIsUsersModalOpen(false);
              }}
            >
              {isInvitingUser ? (
                <div className={styles.inviteUser}>
                  <TextInput
                    value={inviteEmail}
                    onChange={setInviteEmail}
                  />
                </div>
              ) : (
                <div className={styles.currentUsers}>
                  {pool.users.map((email, e) => (
                    <div key={e} className={styles.user}>
                      {email}
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.buttonContainer}>
                <Button
                  type={isInvitingUser ? 'hazard' : 'primary'}
                  onClick={() => {
                    setIsInvitingUser(!isInvitingUser);
                  }}
                  text={isInvitingUser ? 'Cancel' : 'Invite User'}
                />
                <Button
                  type={isInvitingUser ? 'primary' : 'default'}
                  onClick={() => {
                    if (isInvitingUser) {
                      inviteUser(poolId, inviteEmail);
                    } else {
                      setIsUsersModalOpen(false);
                    }
                    setIsInvitingUser(false);
                  }}
                  text={isInvitingUser ? 'Invite' : 'Close'}
                  disabled={isInvitingUser ? inviteEmail === '' : false}
                />
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

Pool.propTypes = {
  userEmail: string,
  poolId: string,
  isLoading: bool,
  pool: object,
  loadPool: func.isRequired,
  deletePool: func.isRequired,
  deleteWager: func.isRequired,
  inviteUser: func.isRequired,
  addUser: func.isRequired,
  navTo: func.isRequired
};

export default Pool;
