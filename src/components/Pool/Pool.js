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
import styles from './Pool.module.scss';

const Pool = ({ poolId, isLoading, pool, loadPool, deletePool, deleteWager, navTo }) => {
  const [selectedWager, setSelectedWager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevPoolId = usePrevious(poolId);
  const shouldLoadPool = poolId && prevPoolId !== poolId && !isLoading;

  useEffect(() => {
    shouldLoadPool && loadPool(poolId);
  }, [shouldLoadPool, loadPool, poolId]);

  return (
    <>
      <SubHeader className={styles.subHeader}>
        <div className={styles.poolName}>{pool.name}</div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => navTo(NEW_WAGER_ROUTE.replace(':poolId', poolId))}
            text={'New Wager'}
          />
          <Button
            type={'hazard'}
            onClick={() => {
              if ((pool.wagers || []).length === 0) {
                deletePool(poolId);
              } else {
                console.error('Can\'t delete a pool with wagers');
              }
            }}
            text={'Delete Pool'}
          />
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
                  setIsModalOpen(true);
                }}
              >
                <div className={styles.amount}>{wager.amount} pts.</div>
                <div className={styles.description}>{wager.description}</div>
              </div>
            ))}
          </div>
          {isModalOpen && (
            <Modal
              className={styles.modal}
              contentClassName={styles.modalContent}
              isOpen={isModalOpen}
              isDraggable={!isMobile}
              showHeader={false}
              contentHeight={250}
              closeModal={() => {
                setIsModalOpen(false);
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
                    setIsModalOpen(false);
                  }}
                  text={'Cancel Wager'}
                />
                <Button
                  onClick={() => setIsModalOpen(false)}
                  text={'Close'}
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
  navTo: func.isRequired
};

export default Pool;
