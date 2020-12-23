import React, { useState, useEffect } from 'react';
import { string, bool, object, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import { isEmpty } from 'ramda';
import usePrevious from '../../hooks/usePrevious';
import SubHeader from '../common/SubHeader/SubHeader';
import Loading from '../common/Loading/Loading';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import styles from './Pool.module.scss';

const Pool = ({ poolId, isLoading, pool, loadPool, navTo }) => {
  const [selectedWager, setSelectedWager] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prevPoolId = usePrevious(poolId);
  const shouldLoadPool = poolId && prevPoolId !== poolId && !isLoading;

  useEffect(() => {
    shouldLoadPool && loadPool(poolId);
  }, [shouldLoadPool, loadPool, poolId]);

  !isEmpty(pool) && console.log('Pool', pool);

  return (
    <>
      <SubHeader>
        <Button

        />
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
                className={styles.wager}
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
              isOpen={isModalOpen}
              isDraggable={!isMobile}
              closeModal={() => {
                setIsModalOpen(false);
              }}>
              <div className={styles.selectedWager}>
                <div className={styles.amount}>{selectedWager.amount}</div>
                <div className={styles.description}>{selectedWager.description}</div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

Pool.propTypes = {
  poolId: string.isRequired,
  isLoading: bool,
  pool: object,
  loadPool: func.isRequired,
  navTo: func.isRequired
};

export default Pool;
