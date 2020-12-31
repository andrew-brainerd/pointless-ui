import React, { useState, useEffect } from 'react';
import { string, bool, object, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import { isEmpty } from 'ramda';
import { NEW_WAGER_ROUTE } from '../../constants/routes';
import usePrevious from '../../hooks/usePrevious';
import SubHeader from '../common/SubHeader/SubHeader';
import Loading from '../common/Loading/Loading';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './Pool.module.scss';
import TextInput from '../common/TextInput/TextInput';

const Pool = ({ poolId, isLoading, pool, loadPool, deletePool, deleteWager, inviteUser, addUser, navTo }) => {
  const [selectedWager, setSelectedWager] = useState(null);
  const [isWagerModalOpen, setIsWagerModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [isInvitingUser, setIsInvitingUser] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const prevPoolId = usePrevious(poolId);
  const shouldLoadPool = poolId && prevPoolId !== poolId;
  const hasSingleUser = (pool.users || []).length === 1;

  useEffect(() => {
    shouldLoadPool && loadPool(poolId);
  }, [shouldLoadPool, loadPool, poolId]);

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
        </div>
      </SubHeader>
      {isLoading ? <Loading /> : (
        <div className={styles.pool}>
          <div className={styles.wagerList}>
            {isEmpty(pool.wagers) ? (
              <div className={styles.noWagers}>
                No Open Wagers
              </div>
            ) : (pool.wagers || []).map(wager => (
              <div
                key={wager._id}
                className={[
                  styles.wager,
                  !wager.isActive ? styles.inactive : ''
                ].join(' ')}
                onClick={() => {
                  setSelectedWager(wager);
                  setIsWagerModalOpen(true);
                }}
              >
                <div className={styles.amount}>{wager.amount} pts.</div>
                <div className={styles.description}>{wager.description}</div>
              </div>
            ))}
          </div>
          {isWagerModalOpen && (
            <Modal
              className={styles.modal}
              contentClassName={styles.modalContent}
              isOpen={isWagerModalOpen}
              isDraggable={!isMobile}
              showHeader={false}
              contentHeight={250}
              closeModal={() => {
                setIsWagerModalOpen(false);
              }}
            >
              <div className={styles.selectedWager}>
                <div className={styles.amount}>{selectedWager.amount}</div>
                <div className={styles.description}>{selectedWager.description}</div>
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  type={'hazard'}
                  onClick={() => {
                    deleteWager(poolId, selectedWager._id);
                    setIsWagerModalOpen(false);
                  }}
                  text={'Cancel Wager'}
                />
                <Button
                  onClick={() => setIsWagerModalOpen(false)}
                  text={'Close'}
                />
              </div>
            </Modal>
          )}
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
                      addUser(poolId, inviteEmail);
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
