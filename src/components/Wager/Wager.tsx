import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Pool, Wager } from '../../types/pools';
import { POOL_ROUTE } from '../../constants/routes';
import usePoolUrl from '../../hooks/usePoolUrl';
import useUser from '../../hooks/useUser';
import Button from '../common/Button/Button';
import Loading from '../common/Loading/Loading';
import SubHeader from '../common/SubHeader/SubHeader';
import Icon from '../common/Icon/Icon';
import WinnersModal from '../modals/WinnersModal/container';
import styles from './Wager.module.scss';

interface Props {
  isLoading: boolean,
  isAvailableWager: boolean,
  isAcceptingWager: boolean,
  isCompletingWager: boolean,
  pool: Pool,
  loadPool: (poolId: string) => void,
  acceptWager: (poolId: string, wagerId: string, userEmail: string) => void,
  deleteWager: (poolId: string, wagerId: string) => void
}

const WagerComponent = ({
  isLoading,
  isAvailableWager,
  isAcceptingWager,
  isCompletingWager,
  pool,
  loadPool,
  acceptWager,
  deleteWager
}: Props) => {
  const [isWinnersModalOpen, setIsWinnersModalOpen] = useState(false);
  const { poolId, wagerId } = usePoolUrl();
  const { userEmail } = useUser();
  const navigate = useNavigate();
  const wager = useMemo<Wager | undefined>(() => pool.wagers.find(w => w._id === wagerId), [wagerId]);

  useEffect(() => {
    userEmail && poolId && loadPool(poolId);
  }, [userEmail, loadPool, poolId]);

  return isLoading ? <Loading message={'Loading Wager'} /> : (
    <>
      <SubHeader className={styles.subHeader}>
        <Button
          className={styles.backButton}
          onClick={() => navigate(POOL_ROUTE.replace(':poolId', poolId))}
        >
          <Icon
            name={'previous'}
            title={'Back to Pool'}
          />
        </Button>
      </SubHeader>
      <div className={styles.wager}>
        <div className={styles.content}>
          <div className={styles.amount}>{wager?.amount}</div>
          <div className={styles.description}>{wager?.description}</div>
        </div>
        <div className={styles.buttonContainer}>
          {isAvailableWager && (
            <Button
              className={styles.acceptButton}
              text={'Accept Wager'}
              onClick={() => acceptWager(poolId, wagerId, userEmail)}
              disabled={isAcceptingWager || isLoading}
            />
          )}
          {wager?.isActive && !wager?.isComplete && (
            <Button
              className={styles.acceptButton}
              text={'Complete Wager'}
              onClick={() => setIsWinnersModalOpen(true)}
              disabled={isCompletingWager || isLoading}
            />
          )}
          {!wager?.isComplete && (
            <Button
              type={'hazard'}
              onClick={() => deleteWager(poolId, wagerId)}
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

export default WagerComponent;
