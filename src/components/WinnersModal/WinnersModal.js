import React, { useState } from 'react';
import { string, object, func } from 'prop-types';
import { isMobile } from 'react-device-detect';
import Modal from '../common/Modal/Modal';
import Select from '../common/Select/Select';
import Button from '../common/Button/Button';
import styles from './WinnersModal.module.scss';

const WinnersModal = ({ poolId, wagerId, pool, userEmail, completeWager, setIsModalOpen }) => {
  const [winnerEmail, setWinnerEmail] = useState(userEmail);

  console.log('Pool', pool.users);

  return (
    <Modal
      className={styles.modal}
      contentClassName={styles.modalContent}
      isOpen={true}
      isDraggable={false && !isMobile}
      headerText={'Choose the Winner'}
      closeModal={() => {
        setIsModalOpen(false);
      }}
    >
      <>
        <Select
          className={styles.selectUsers}
          options={pool.users.map(email => ({ value: email, label: email }))}
          onChange={selectedUser => {
            setWinnerEmail(selectedUser);
          }}
          value={winnerEmail}
        />
        <div className={styles.buttonContainer}>
          <Button
            type={'primary'}
            onClick={() => {
              completeWager(poolId, wagerId, userEmail, winnerEmail);
              setIsModalOpen(false);
            }}
            text={'Complete'}
          />
          <Button
            type={'default'}
            onClick={() => {
              setIsModalOpen(false);
            }}
            text={'Close'}
          />
        </div>
      </>
    </Modal>
  );
};

WinnersModal.propTypes = {
  poolId: string,
  wagerId: string,
  pool: object,
  userEmail: string,
  completeWager: func.isRequired,
  setIsModalOpen: func.isRequired
};

export default WinnersModal;
