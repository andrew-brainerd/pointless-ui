import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { isEmpty } from 'ramda';
import { Wager } from '../../types/pools';
import { POOL_ROUTE } from '../../constants/routes';
import usePoolUrl from '../../hooks/usePoolUrl';
import useUser from '../../hooks/useUser';
import Loading from '../common/Loading/Loading';
import TextArea from '../common/TextArea/TextArea';
import NumberInput from '../common/NumberInput/NumberInput';
import Select from '../common/Select/Select';
import Button from '../common/Button/Button';
import styles from './NewWager.module.scss';
import { NewWagerProps } from './container';

const NewWager = ({ isCreatingWager, pool, loadPool, createWager }: NewWagerProps) => {
  const { poolId } = usePoolUrl();
  const { userEmail } = useUser();
  const poolUsers = pool?.users;
  const [wager, setWager] = useState({
    amount: 0,
    description: '',
    createdBy: userEmail,
    users: [userEmail]
  } as Wager);
  const navigate = useNavigate();

  useEffect(() => {
    (!poolUsers || poolUsers.length === 0) && loadPool(poolId);
  }, [poolUsers, poolId, loadPool]);

  const remainingUsers = (poolUsers || []).filter(poolUser => {
    return !wager.users.includes(poolUser) && poolUser !== userEmail;
  }).map(user => ({ value: user, label: user }));

  const isWagerInvalid = () => wager.amount <= 0 || wager.description === '' || isEmpty(wager.users);

  return !userEmail ? <Loading message={'Loading Wager'} /> : (
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
          onClick={() => navigate(POOL_ROUTE.replace(':poolId', poolId))}
          text={'Cancel'}
        />
        <Button
          type={'primary'}
          onClick={() => {
            createWager(poolId, userEmail, wager);
          }}
          text={'Create Wager'}
          disabled={isWagerInvalid() || isCreatingWager}
        />
      </div>
    </div>
  );
};

export default NewWager;
