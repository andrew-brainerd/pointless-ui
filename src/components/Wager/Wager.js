import React, { useState, useEffect } from 'react';
import { bool, string, shape, number, func } from 'prop-types';
import { POOL_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import Loading from '../common/Loading/Loading';
import SubHeader from '../common/SubHeader/SubHeader';
import Icon from '../common/Icon/Icon';
import WinnersModal from '../WinnersModal/container';
import styles from './Wager.module.scss';

const Wager = ({
  isLoading,
  isAvailableWager,
  isAcceptingWager,
  isCompletingWager,
  userEmail,
  poolId,
  wager = {},
  loadPool,
  acceptWager,
  deleteWager,
  navTo
}) => {
  const [isWinnersModalOpen, setIsWinnersModalOpen] = useState(false);

  useEffect(() => {
    userEmail && poolId && loadPool(poolId);
  }, [userEmail, loadPool, poolId]);

  return isLoading ? <Loading message={'Loading Wager'} /> : (
    <>
      <SubHeader className={styles.subHeader}>
        <Button
          className={styles.backButton}
          onClick={() => navTo(POOL_ROUTE.replace(':poolId', poolId))}
        >
          <Icon
            name={'previous'}
            title={'Back to Pool'}
          />
        </Button>
      </SubHeader>
      <div className={styles.wager}>
        <div className={styles.content}>
          <div className={styles.amount}>{wager.amount}</div>
          <div className={styles.description}>{wager.description}</div>
        </div>
        <div className={styles.buttonContainer}>
          {isAvailableWager && (
            <Button
              className={styles.acceptButton}
              text={'Accept Wager'}
              onClick={() => acceptWager(poolId, wager._id, userEmail)}
              disabled={isAcceptingWager || isLoading}
            />
          )}
          {wager.isActive && !wager.isComplete && (
            <Button
              className={styles.acceptButton}
              text={'Complete Wager'}
              onClick={() => setIsWinnersModalOpen(true)}
              disabled={isCompletingWager || isLoading}
            />
          )}
          {!wager.isComplete && (
            <Button
              type={'hazard'}
              onClick={() => deleteWager(poolId, wager._id)}
              text={'Cancel Wager'}
            />
          )}
        </div>
      </div>
      {isWinnersModalOpen &&
        <WinnersModal setIsModalOpen={setIsWinnersModalOpen} />
      }
    </>
  );
};

Wager.propTypes = {
  isLoading: bool,
  isAvailableWager: bool,
  isAcceptingWager: bool,
  isCompletingWager: bool,
  userEmail: string,
  poolId: string,
  wagerId: string,
  wager: shape({
    _id: string,
    amount: number,
    description: string
  }),
  loadPool: func.isRequired,
  acceptWager: func.isRequired,
  deleteWager: func.isRequired,
  navTo: func.isRequired
};

export default Wager;
