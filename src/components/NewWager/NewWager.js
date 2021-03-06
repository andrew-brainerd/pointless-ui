import React, { useState, useEffect } from 'react';
import { bool, string, array, func } from 'prop-types';
import { isEmpty } from 'ramda';
import { POOL_ROUTE } from '../../constants/routes';
import Loading from '../common/Loading/Loading';
import TextArea from '../common/TextArea/TextArea';
import NumberInput from '../common/NumberInput/NumberInput';
import Select from '../common/Select/Select';
import Button from '../common/Button/Button';
import styles from './NewWager.module.scss';

const NewWager = ({ isLoading, isCreatingWager, poolId, userEmail, poolUsers, loadPool, createWager, navTo }) => {
  const [wager, setWager] = useState({
    amount: '0',
    description: '',
    users: []
  });

  useEffect(() => {
    (!poolUsers || poolUsers.length === 0) && loadPool(poolId);
  }, [poolUsers, poolId, loadPool]);

  const remainingUsers = (poolUsers || []).filter(poolUser => {
    return !wager.users.includes(poolUser) && poolUser !== userEmail;
  }).map(user => ({ value: user, label: user }));

  const isWagerInvalid = () => wager.amount <= 0 || wager.description === '' || isEmpty(wager.users);

  return isLoading || !userEmail ? <Loading message={'Loading Wager'} /> : (
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
          step={5}
          onChange={value =>
            setWager({ ...wager, amount: value })
          }
        />
      </div>
      <div className={styles.users}>
        <div className={styles.usersLabel}>I want to challenge:</div>
        <Select
          className={styles.selectUsers}
          options={remainingUsers}
          onChange={selectedUser => {
            setWager({
              ...wager,
              users: [...wager.users, selectedUser]
            });
          }}
        />
        <div className={styles.selectedUsers}>
          {wager.users.filter(email => email !== userEmail).map((email, u) => {
            return (
              <div key={u} className={styles.selectedUser}>
                <div className={styles.selectedUserEmail}>{email}</div>
                <div
                  className={styles.remove}
                  onClick={() => {
                    setWager({
                      ...wager,
                      users: wager.users.filter(user => user !== email)
                    });
                  }}
                >x</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => navTo(POOL_ROUTE.replace(':poolId', poolId))}
          text={'Cancel'}
        />
        <Button
          type={'primary'}
          onClick={() => {
            createWager(
              poolId,
              userEmail,
              {
                ...wager,
                createdBy: userEmail,
                users: [...wager.users, userEmail]
              });
          }}
          text={'Create Wager'}
          disabled={isWagerInvalid() || isCreatingWager}
        />
      </div>
    </div>
  );
};

NewWager.propTypes = {
  isLoading: bool,
  isCreatingWager: bool,
  poolId: string,
  userEmail: string,
  poolUsers: array,
  loadPool: func.isRequired,
  createWager: func.isRequired,
  navTo: func.isRequired
};

export default NewWager;
