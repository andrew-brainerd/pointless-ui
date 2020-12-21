import React from 'react';
import { string, array, func } from 'prop-types';
import { isEmpty } from 'ramda';
import { WAGER_ROUTE } from '../../constants/routes';
import styles from './Pool.module.scss';

const Pool = ({ poolId, currentWagers, navTo }) => {
  return (
    <div className={styles.pool}>
      {isEmpty(currentWagers) ? (
        <div className={styles.noWagers}>
          No Open Wagers
        </div>
      ) : currentWagers.map(wager => {
        return (
          <div
            key={wager.id}
            className={styles.wager}
            onClick={() => navTo(
              WAGER_ROUTE.replace(':poolId', poolId).replace(':wagerId', wager.id)
            )}
          >
            <div className={styles.amount}>{wager.amount}</div>
            <div className={styles.description}>{wager.description}</div>
          </div>
        );
      })}
    </div>
  );
};

Pool.propTypes = {
  poolId: string.isRequired,
  currentWagers: array,
  navTo: func.isRequired
};

export default Pool;
