import React, { useState, useEffect } from 'react';
import { bool, string, func } from 'prop-types';
import { POOL_ROUTE } from '../../constants/routes';
import Loading from '../common/Loading/Loading';
import TextArea from '../common/TextArea/TextArea';
import NumberInput from '../common/NumberInput/NumberInput';
import Button from '../common/Button/Button';
import styles from './NewWager.module.scss';

const NewWager = ({ isLoading, poolId, userEmail, createWager, navTo }) => {
  const [wager, setWager] = useState({
    amount: 200,
    description: 'The hippies will finish their flags first',
    createdBy: 'drwb333@gmail.com',
    users: [
      'drwb333@gmail.com'
    ]
  });

  useEffect(() => {
    console.log('Wager', wager);
  }, [wager]);

  return isLoading ? <Loading /> : (
    <div className={styles.newWager}>
      <div className={styles.description}>
        <div className={styles.descriptionLabel}>I bet:</div>
        <TextArea
          className={styles.textArea}
          value={wager.description}
          onChange={value =>
            setWager({ ...wager, description: value })
          }
        />
      </div>
      <div className={styles.amount}>
        <div className={styles.amountLabel}>{'I\'m willing to risk: '}</div>
        <NumberInput
          value={wager.amount}
          onChange={value =>
            setWager({ ...wager, amount: value })
          }
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => navTo(POOL_ROUTE.replace(':poolId', poolId))}
          text={'Cancel'}
        />
        <Button
          type={'primary'}
          onClick={() => createWager(poolId, userEmail, wager)}
          text={'Create Wager'}
        />
      </div>
    </div>
  );
};

NewWager.propTypes = {
  isLoading: bool,
  poolId: string,
  userEmail: string,
  createWager: func.isRequired,
  navTo: func.isRequired
};

export default NewWager;
